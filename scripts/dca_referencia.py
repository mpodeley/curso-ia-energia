#!/usr/bin/env python
"""Reference decline-curve analysis for the session-4 batch-forecast demo.

Implements EXACTLY the rules of the prompt printed on the session-4 page, so the
instructor has independent numbers to check whatever the chatbot returns. If the
prompt on the page changes, this script changes with it — they are two copies of
the same contract, and the demo only teaches if they agree.

Rules (mirror of the prompt):
  1. Rate basis: q = gas_miles_m3 / dias_efectivos (miles de m3/dia). Months with
     dias_efectivos < 10 stay in the history but are excluded from every fit.
  2. Regime changes: if consecutive 6-month medians of the rate jump by more
     than 2.2x either way, the well changed regime (intervention, breakdown,
     new destination). Only the stretch AFTER the last jump is fittable; if
     fewer than 24 usable months remain, the well is "sin ajuste".
  3. Fit window: within that stretch, from the peak of the 3-month
     median-smoothed rate onward; at least 24 usable months required.
  4. Three Arps fits on ln(q): exponential (b=0), hyperbolic (b free in
     [0.01, 1.2]), harmonic (b=1). Di reported as nominal annual.
  5. Model choice: lowest RMSE on ln(q); the hyperbolic must beat the
     exponential by >2% RMSE to earn the extra parameter. b at a bound is
     flagged.
  6. Validity bands on R2 (log space): >= 0.6 "ok"; 0.25-0.6 "dudoso" (forecast
     anyway, flagged as order-of-magnitude only); < 0.25 "no ajustable". Rising
     trend inside the window (last-12 mean > first-12 mean) -> "Arps no
     aplica"; effectively dead (last-6 mean rate < 0.1) -> "parado".
  7. Backtest: refit chosen model without the last 12 months, forecast them,
     report mean absolute % error on monthly volumes.
  8. Forecast: monthly, 2026-07 to 2036-12 or economic limit 2.0 miles m3/dia,
     whichever comes first. Monthly volume = q(mid-month) * calendar days *
     service factor (median dias_efectivos/dias_calendario of last 24 months).
  9. Remaining EUR = sum of forecast volumes.

    python scripts/dca_referencia.py

Outputs (gitignored, instructor-side):
  scripts/_cache/dca_referencia.xlsx  - Resumen + one sheet per well + Supuestos
  scripts/_cache/dca_referencia.png   - semilog panel, history + fits + forecast
"""

from __future__ import annotations

import calendar
import csv
import os
from dataclasses import dataclass, field

import numpy as np
from scipy.optimize import curve_fit

HERE = os.path.dirname(os.path.abspath(__file__))
CSV_IN = os.path.join(HERE, '..', 'public', 'descargas', 'produccion_noroeste_10pozos.csv')
OUT_XLSX = os.path.join(HERE, '_cache', 'dca_referencia.xlsx')
OUT_PNG = os.path.join(HERE, '_cache', 'dca_referencia.png')

MIN_DIAS_EF = 10.0      # months below this stay out of the fits
MIN_FIT_MONTHS = 24
Q_LIM = 2.0             # miles de m3/dia, economic limit
HORIZONTE = '2036-12'
Q_DEAD = 0.1            # last-6-months mean below this = parado
R2_OK = 0.6
R2_MIN = 0.25
B_MAX = 1.2
SALTO = 2.2             # 6-month median ratio that flags a regime change


def month_days(ym: str) -> int:
    y, m = int(ym[:4]), int(ym[5:7])
    return calendar.monthrange(y, m)[1]


def month_seq(start: str, end: str) -> list[str]:
    y, m = int(start[:4]), int(start[5:7])
    out = []
    while True:
        ym = f'{y:04d}-{m:02d}'
        out.append(ym)
        if ym == end:
            return out
        m += 1
        if m == 13:
            y, m = y + 1, 1


def q_arps(t, qi, di, b):
    """Rate at t days; di nominal per day; b=0 handled as exponential."""
    if b < 1e-6:
        return qi * np.exp(-di * t)
    return qi * (1.0 + b * di * t) ** (-1.0 / b)


@dataclass
class Well:
    idpozo: str
    pozo: str
    yacimiento: str
    formacion: str
    meses: list[str] = field(default_factory=list)
    gas: list[float] = field(default_factory=list)
    dias_ef: list[float] = field(default_factory=list)


def load() -> list[Well]:
    wells: dict[str, Well] = {}
    with open(CSV_IN, encoding='utf-8') as f:
        for r in csv.DictReader(f):
            w = wells.setdefault(r['pozo'], Well(
                r['idpozo'], r['pozo'], r['yacimiento'], r['formacion']))
            w.meses.append(r['mes'])
            w.gas.append(float(r['gas_miles_m3']))
            w.dias_ef.append(float(r['dias_efectivos']))
    return sorted(wells.values(), key=lambda w: w.pozo)


def analyze(w: Well) -> dict:
    n = len(w.meses)
    # cumulative day at each month midpoint, from series start
    mdays = np.array([month_days(m) for m in w.meses], float)
    t_mid = np.concatenate(([0.0], np.cumsum(mdays)))[:-1] + mdays / 2

    q = np.array([g / d if d >= 1 else 0.0 for g, d in zip(w.gas, w.dias_ef)])
    usable = np.array([d >= MIN_DIAS_EF and qq > 0 for d, qq in zip(w.dias_ef, q)])

    out: dict = {
        'pozo': w.pozo, 'yacimiento': w.yacimiento, 'formacion': w.formacion,
        'meses_historia': n, 'acum_hist': round(sum(w.gas), 0),
        'estado': '', 'modelo': '', 'qi': None, 'di_anual': None, 'b': None,
        'r2': None, 'backtest_err': None, 'eur_restante': None,
        'fin_pronostico': None, 'notas': [],
        # for plotting/sheets
        '_q': q, '_t': t_mid, '_usable': usable, '_fits': {}, '_forecast': None,
    }

    # dead?
    if np.mean(q[-6:]) < Q_DEAD:
        out['estado'] = 'parado'
        out['notas'].append('promedio de los últimos 6 meses ~cero: sin pronóstico')
        return out

    # regime changes: consecutive 6-month medians jumping > SALTO either way.
    # Only the stretch after the LAST jump is fittable.
    uidx = [i for i in range(n) if usable[i]]
    i_regime = 0
    for k in range(6, len(uidx) - 5):
        before = np.median([q[i] for i in uidx[k - 6:k]])
        after = np.median([q[i] for i in uidx[k:k + 6]])
        if before > 0 and (after / before > SALTO or before / after > SALTO):
            i_regime = uidx[k]
    if i_regime > 0:
        out['notas'].append(
            f'cambio de régimen detectado: se ajusta solo desde {w.meses[i_regime]}')

    # peak of 3-month median smoothing, over usable months of the last regime
    qs = q.copy()
    smooth = np.array([np.median(qs[max(0, i - 1):i + 2]) for i in range(n)])
    smooth[~usable] = -1
    smooth[:i_regime] = -1
    i0 = int(np.argmax(smooth))
    fit_idx = np.array([i >= i0 and usable[i] for i in range(n)])
    if fit_idx.sum() < MIN_FIT_MONTHS:
        out['estado'] = 'sin ajuste'
        out['notas'].append(f'solo {int(fit_idx.sum())} meses útiles desde el pico del último régimen')
        return out

    tf = t_mid[fit_idx] - t_mid[i0]
    qf = q[fit_idx]

    # rising trend inside the window?
    if np.mean(qf[-12:]) > np.mean(qf[:12]):
        out['estado'] = 'no aplica'
        out['notas'].append('la producción sube: Arps no describe este pozo')
        return out

    lnq = np.log(qf)
    fits = {}
    for name, blo, bhi in (('exponencial', 0.0, 0.0),
                           ('hiperbólica', 0.01, B_MAX),
                           ('armónica', 1.0, 1.0)):
        try:
            if blo == bhi:
                f = lambda t, qi, di: np.log(q_arps(t, qi, di, blo))
                p0 = [qf[0], 0.001]
                bounds = ([1e-3, 1e-6], [qf.max() * 5, 0.1])
                popt, _ = curve_fit(f, tf, lnq, p0=p0, bounds=bounds, maxfev=20000)
                qi, di, b = popt[0], popt[1], blo
            else:
                f = lambda t, qi, di, b: np.log(q_arps(t, qi, di, b))
                p0 = [qf[0], 0.001, 0.5]
                bounds = ([1e-3, 1e-6, blo], [qf.max() * 5, 0.1, bhi])
                popt, _ = curve_fit(f, tf, lnq, p0=p0, bounds=bounds, maxfev=20000)
                qi, di, b = popt
            resid = lnq - np.log(q_arps(tf, qi, di, b))
            rmse = float(np.sqrt(np.mean(resid ** 2)))
            r2 = 1.0 - np.sum(resid ** 2) / np.sum((lnq - lnq.mean()) ** 2)
            fits[name] = {'qi': qi, 'di': di, 'b': b, 'rmse': rmse, 'r2': r2}
        except RuntimeError:
            pass

    if not fits:
        out['estado'] = 'sin ajuste'
        out['notas'].append('ningún modelo convergió')
        return out
    out['_fits'] = fits

    # choice: best rmse; hyperbolic must beat exponential by >2%
    best = min(fits, key=lambda k: fits[k]['rmse'])
    if best == 'hiperbólica' and 'exponencial' in fits:
        if fits['hiperbólica']['rmse'] > 0.98 * fits['exponencial']['rmse']:
            best = 'exponencial'
    fb = fits[best]
    if fb['r2'] < R2_MIN:
        out['estado'] = 'no ajustable'
        out['notas'].append(f'mejor R² = {fb["r2"]:.2f} < {R2_MIN}: la serie no es una declinación')
        return out
    if best == 'hiperbólica' and fb['b'] > B_MAX - 0.01:
        out['notas'].append(f'b en el tope ({B_MAX}): ajuste dudoso')

    if fb['r2'] < R2_OK:
        out['estado'] = 'dudoso'
        out['notas'].append(
            f'R² = {fb["r2"]:.2f}: declinación lenta o ruidosa; el pronóstico es orden de magnitud')
    else:
        out['estado'] = 'ok'
    out['modelo'] = best
    out['qi'] = round(fb['qi'], 2)
    out['di_anual'] = round(fb['di'] * 365.25, 4)
    out['b'] = round(fb['b'], 2)
    out['r2'] = round(fb['r2'], 3)

    # backtest: refit chosen model without last 12 months, forecast them
    cut = fit_idx.copy()
    last12 = np.where(fit_idx)[0][-12:]
    cut[last12] = False
    if cut.sum() >= MIN_FIT_MONTHS - 12:
        tb = t_mid[cut] - t_mid[i0]
        qb = np.log(q[cut])
        try:
            if best == 'hiperbólica':
                f = lambda t, qi, di, b: np.log(q_arps(t, qi, di, b))
                popt, _ = curve_fit(f, tb, qb, p0=[fb['qi'], fb['di'], fb['b']],
                                    bounds=([1e-3, 1e-6, 0.01], [q.max() * 5, 0.1, B_MAX]),
                                    maxfev=20000)
                qi_b, di_b, b_b = popt
            else:
                bfix = fb['b']
                f = lambda t, qi, di: np.log(q_arps(t, qi, di, bfix))
                popt, _ = curve_fit(f, tb, qb, p0=[fb['qi'], fb['di']],
                                    bounds=([1e-3, 1e-6], [q.max() * 5, 0.1]), maxfev=20000)
                qi_b, di_b, b_b = popt[0], popt[1], bfix
            pred = q_arps(t_mid[last12] - t_mid[i0], qi_b, di_b, b_b)
            vol_pred = pred * np.array([month_days(w.meses[i]) for i in last12])
            vol_real = np.array([w.gas[i] for i in last12])
            err = float(np.mean(np.abs(vol_pred - vol_real) / vol_real)) * 100
            out['backtest_err'] = round(err, 1)
        except RuntimeError:
            out['notas'].append('backtest no convergió')

    # forecast
    sf = float(np.median((np.array(w.dias_ef) / mdays)[-24:]))
    fut = month_seq('2026-07', HORIZONTE)
    t0 = t_mid[i0]
    t_end_hist = float(np.cumsum(mdays)[-1])
    rows, acc = [], 0.0
    t_cursor = t_end_hist
    for ym in fut:
        d = month_days(ym)
        tm = t_cursor + d / 2 - t0
        qm = float(q_arps(tm, fb['qi'], fb['di'], fb['b']))
        if qm < Q_LIM:
            break
        vol = qm * d * sf
        acc += vol
        rows.append({'mes': ym, 'q_diario': round(qm, 2), 'gas_miles_m3': round(vol, 1)})
        t_cursor += d
    out['eur_restante'] = round(acc, 0)
    out['fin_pronostico'] = rows[-1]['mes'] if rows else 'ya bajo el límite'
    out['factor_servicio'] = round(sf, 3)
    out['_forecast'] = rows
    out['_i0'] = i0
    return out


def write_xlsx(results: list[dict], wells: list[Well]) -> None:
    from openpyxl import Workbook
    wb = Workbook()

    ws = wb.active
    ws.title = 'Resumen'
    cols = ['pozo', 'yacimiento', 'formacion', 'estado', 'modelo', 'qi', 'di_anual',
            'b', 'r2', 'backtest_err', 'meses_historia', 'acum_hist',
            'eur_restante', 'fin_pronostico', 'notas']
    ws.append(['pozo', 'yacimiento', 'formación', 'estado', 'modelo elegido',
               'qi (miles m3/d)', 'Di nominal anual', 'b', 'R² (log)',
               'error backtest 12m (%)', 'meses de historia',
               'acumulada histórica (miles m3)', 'EUR restante (miles m3)',
               'fin del pronóstico', 'notas'])
    for r in results:
        ws.append([', '.join(r[c]) if c == 'notas' else r.get(c) for c in cols])

    for r, w in zip(results, wells):
        sh = wb.create_sheet(w.pozo[:31])
        sh.append(['mes', 'gas_miles_m3', 'dias_efectivos', 'q_diario',
                   'usado_en_ajuste', 'q_modelo'])
        for i, ym in enumerate(w.meses):
            qm = ''
            if r['estado'] in ('ok', 'dudoso') and i >= r['_i0']:
                fb = r['_fits'][r['modelo']]
                qm = round(float(q_arps(r['_t'][i] - r['_t'][r['_i0']],
                                        fb['qi'], fb['di'], fb['b'])), 2)
            sh.append([ym, w.gas[i], w.dias_ef[i], round(float(r['_q'][i]), 2),
                       bool(r['_usable'][i] and i >= r.get('_i0', 10 ** 9)), qm])
        if r['_forecast']:
            sh.append([])
            sh.append(['-- pronóstico --'])
            sh.append(['mes', 'gas_miles_m3', '', 'q_diario'])
            for fr in r['_forecast']:
                sh.append([fr['mes'], fr['gas_miles_m3'], '', fr['q_diario']])

    sh = wb.create_sheet('Supuestos')
    for line in (
        f'caudal = gas_miles_m3 / dias_efectivos; meses con dias_efectivos < {MIN_DIAS_EF} fuera del ajuste',
        'ventana de ajuste: desde el pico de la mediana móvil de 3 meses',
        f'mínimo {MIN_FIT_MONTHS} meses útiles para ajustar',
        f'b acotado a [0, {B_MAX}]; hiperbólica debe mejorar RMSE >2% sobre exponencial',
        f'límite económico {Q_LIM} miles de m3/día; horizonte {HORIZONTE}',
        'volumen mensual pronosticado = q(medio mes) × días calendario × factor de servicio',
        'factor de servicio = mediana(dias_efectivos/días del mes) de los últimos 24 meses',
        f'backtest: reajuste sin los últimos 12 meses, error absoluto medio en volumen',
    ):
        sh.append([line])

    os.makedirs(os.path.dirname(OUT_XLSX), exist_ok=True)
    wb.save(OUT_XLSX)


def write_png(results: list[dict], wells: list[Well]) -> None:
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    fig, axes = plt.subplots(2, 5, figsize=(22, 8), sharex=False)
    for ax, r, w in zip(axes.flat, results, wells):
        t = r['_t'] / 365.25
        ax.semilogy(t, np.where(r['_q'] > 0, r['_q'], np.nan), '.', ms=3, color='#888')
        if r['estado'] in ('ok', 'dudoso'):
            i0 = r['_i0']
            colors = {'exponencial': '#1f77b4', 'hiperbólica': '#d62728', 'armónica': '#2ca02c'}
            for name, fp in r['_fits'].items():
                tt = np.linspace(r['_t'][i0], r['_t'][-1] + 3653, 200)
                qq = q_arps(tt - r['_t'][i0], fp['qi'], fp['di'], fp['b'])
                lw = 2.2 if name == r['modelo'] else 0.9
                ax.semilogy(tt / 365.25, qq, color=colors[name], lw=lw,
                            label=f'{name}{" *" if name == r["modelo"] else ""}')
            ax.axhline(Q_LIM, color='#bbb', ls=':', lw=0.8)
            ax.legend(fontsize=6)
        ax.set_title(f'{w.pozo}\n[{r["estado"]}]', fontsize=8)
        ax.set_ylim(bottom=0.05)
    fig.suptitle('DCA de referencia — 10 pozos Noroeste (q en miles m³/d vs años desde 2019)')
    fig.tight_layout()
    fig.savefig(OUT_PNG, dpi=110)


def main() -> None:
    wells = load()
    results = [analyze(w) for w in wells]
    hdr = f'{"pozo":<24} {"estado":<12} {"modelo":<12} {"qi":>7} {"Di/a":>7} {"b":>5} {"R²":>6} {"bt%":>6} {"EUR rest":>9}'
    print(hdr)
    print('-' * len(hdr))
    for r in results:
        print(f'{r["pozo"]:<24} {r["estado"]:<12} {r["modelo"]:<12} '
              f'{r["qi"] if r["qi"] is not None else "":>7} '
              f'{r["di_anual"] if r["di_anual"] is not None else "":>7} '
              f'{r["b"] if r["b"] is not None else "":>5} '
              f'{r["r2"] if r["r2"] is not None else "":>6} '
              f'{r["backtest_err"] if r["backtest_err"] is not None else "":>6} '
              f'{r["eur_restante"] if r["eur_restante"] is not None else "":>9}')
        for nnote in r['notas']:
            print(f'    · {nnote}')
    write_xlsx(results, wells)
    write_png(results, wells)
    print(f'\n{OUT_XLSX}\n{OUT_PNG}')


if __name__ == '__main__':
    main()
