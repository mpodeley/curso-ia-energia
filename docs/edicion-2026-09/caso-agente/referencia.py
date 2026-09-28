"""Expected numbers for the live agent demo of session 6.

Computes, from the same two files the agent gets, every figure the instructor
checks on screen: the basin totals, the three tables of session 8, the water
diagnosis of Puesto Guardián (yacoraite) under the Libro A rules, and the
level-1 field ranking defined in CLAUDE.md.

It is the instructor's answer key. preparar_datos.py never copies it into the
agent's working folder: an agent that can read the answers proves nothing.

    uv run --with pandas python referencia.py [DATA_DIR]

DATA_DIR defaults to the repo's scripts/_cache/ (the Capítulo IV cache that
scripts/fetch_capiv_noroeste.py writes). The Chan and WOR-vs-Np logic mirrors
construccion/referencia_diagnosticos.py and the Serie sheet of the Libro A in
public/descargas/waterflood-screening_2026-08-19.zip.
"""

from __future__ import annotations

import json
import math
import sys
from pathlib import Path

import pandas as pd

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
DEFAULT_DATA = REPO / "scripts" / "_cache"

M3_TO_BBL = 6.28981
DAYS_PER_MONTH = 30.4375
MIN_EFFECTIVE_DAYS = 10.0          # Libro A: months below this are dropped
NOT_A_RESERVOIR = {"formación improductiva", "formacion improductiva", ""}

# Chan classifier thresholds, frozen in the Libro A (calibrated on golden cases)
CHAN_WOR_MIN = 0.05
CHAN_WINDOW = 3                     # months each side for the centered derivative
CHAN_MIN_POINTS = 18
CHAN_CHANNELING = 0.25
CHAN_CONING = -1.00
WOR_ECONOMIC = 20.0

# Level-1 ranking filters (same values as CLAUDE.md, section "El ranking")
GOR_CONDENSATE = 590.0              # m3/m3, about 3,300 scf/bbl
ACTIVE_SINCE = "2025-01"
MIN_NP_MBBL = 50.0
MIN_OIL_WELLS = 3

CASE_FIELD = "PUESTO GUARDIAN"
CASE_RESERVOIR = "yacoraite"


def load(data_dir: Path) -> tuple[pd.DataFrame, dict]:
    wells = json.loads((data_dir / "capiv_noroeste_oil_wells.json").read_text(encoding="utf-8"))
    monthly = pd.read_csv(data_dir / "capiv_noroeste_oil_monthly.csv", dtype={"idpozo": str})
    meta = pd.DataFrame(wells.values()).set_index("idpozo")
    monthly = monthly.join(meta[["sigla", "yacimiento", "tipopozo", "tipoestado"]], on="idpozo")
    return monthly, wells


def reservoir_of(well: dict) -> str:
    for f in well.get("formaciones") or []:
        if f.lower().strip() not in NOT_A_RESERVOIR:
            return f.lower().strip()
    return ""


def linreg(xs: list[float], ys: list[float]) -> tuple[float, float] | None:
    n = len(xs)
    if n < 3:
        return None
    sx, sy = sum(xs), sum(ys)
    sxx = sum(x * x for x in xs)
    sxy = sum(x * y for x, y in zip(xs, ys))
    den = n * sxx - sx * sx
    if abs(den) < 1e-15:
        return None
    m = (n * sxy - sx * sy) / den
    return m, (sy - m * sx) / n


def section(title: str) -> None:
    print()
    print(title)
    print("-" * len(title))


def basin(df: pd.DataFrame, wells: dict) -> None:
    section("0. La cuenca")
    print(f"pozos en el padrón: {len(wells):,} · pozos con filas: {df.idpozo.nunique():,} · "
          f"filas mensuales: {len(df):,} · {df.ym.min()} a {df.ym.max()}")
    inj = df[df.iny_agua > 0]
    print(f"filas con inyección: {len(inj):,}, de ellas con tef = 0: {(inj.tef == 0).sum():,}")


def table_1(df: pd.DataFrame) -> None:
    section("1. Quién inyecta agua (filas con iny_agua > 0)")
    inj = df[df.iny_agua > 0]
    g = inj.groupby("tipopozo").agg(pozos=("idpozo", "nunique"), m3=("iny_agua", "sum"))
    g = g.sort_values("m3", ascending=False)
    total = g.m3.sum()
    for t, r in g.iterrows():
        print(f"{t:<20} {int(r.pozos):>4} pozos {r.m3:>14,.0f} m3 {r.m3 / total:>7.1%}")
    print(f"{'total':<20} {g.pozos.sum():>4} pozos {total:>14,.0f} m3")


def table_2(df: pd.DataFrame, wells: dict) -> None:
    section("2. Pozos declarados como inyección de agua")
    declared = [k for k, v in wells.items() if v.get("tipopozo") == "Inyección de Agua"]
    per_well = df.groupby("idpozo").iny_agua.sum()
    months = df[df.iny_agua > 0].groupby("idpozo").size()
    for k in sorted(declared, key=lambda k: -per_well.get(k, 0.0)):
        w = wells[k]
        print(f"{w['sigla']:<18} {w['yacimiento']:<24} {per_well.get(k, 0.0):>10,.0f} m3 "
              f"en {int(months.get(k, 0)):>2} meses · {w['tipoestado']}")


def table_3(df: pd.DataFrame) -> None:
    section(f"3. {CASE_FIELD}: pozos con petróleo o inyección")
    sub = df[df.yacimiento == CASE_FIELD]
    rows = []
    for idp, g in sub.groupby("idpozo"):
        oil, inj = g.prod_pet.sum(), g.iny_agua.sum()
        if oil == 0 and inj == 0:
            continue
        vol = oil if oil > 0 else inj
        active = int(((g.prod_pet > 0) if oil > 0 else (g.iny_agua > 0)).sum())
        rows.append((g.sigla.iloc[0], g.tipopozo.iloc[0], g.tipoestado.iloc[0],
                     "petróleo" if oil > 0 else "inyección", len(g), active,
                     vol * M3_TO_BBL / (len(g) * DAYS_PER_MONTH),
                     vol * M3_TO_BBL / (active * DAYS_PER_MONTH)))
    print(f"{'pozo':<17} {'tipo':<18} {'qué':<10} {'meses':>5} {'activos':>7} "
          f"{'bpd todos':>9} {'bpd activos':>11}")
    for r in sorted(rows, key=lambda r: -r[6]):
        print(f"{r[0]:<17} {r[1]:<18} {r[3]:<10} {r[4]:>5} {r[5]:>7} {r[6]:>9.1f} {r[7]:>11.1f}")
    print(f"último mes con datos del campo: {sub[(sub.prod_pet > 0) | (sub.iny_agua > 0)].ym.max()}")


def case_diagnosis(df: pd.DataFrame, wells: dict) -> None:
    section(f"4. Diagnóstico de agua, {CASE_FIELD} ({CASE_RESERVOIR}), reglas del Libro A")
    sub = df[df.yacimiento == CASE_FIELD].copy()
    print(f"filas del campo en el archivo: {len(sub):,} ({sub.idpozo.nunique()} pozos)")
    vols = ["prod_pet", "prod_gas", "prod_agua", "iny_agua"]
    sub = sub[(sub[vols] > 0).any(axis=1)]
    print(f"con algún volumen distinto de cero: {len(sub):,}")
    keep = (sub.tef >= MIN_EFFECTIVE_DAYS) | (sub.iny_agua > 0)
    dropped = sub[~keep]
    print(f"afuera por menos de {MIN_EFFECTIVE_DAYS:.0f} días efectivos: {len(dropped)} filas "
          f"({dropped.prod_pet.sum() * M3_TO_BBL / 1000:.1f} Mbbl de petróleo)")
    print(f"filas de inyección con tef < 10 (se toman igual): "
          f"{int(((sub.tef < MIN_EFFECTIVE_DAYS) & (sub.iny_agua > 0)).sum())}")
    sub = sub[keep].copy()
    sub["res"] = sub.idpozo.map(lambda i: reservoir_of(wells[i]))
    print(f"quedan: {len(sub):,} filas de {sub.idpozo.nunique()} pozos · por reservorio: "
          f"{sub.groupby('res').size().to_dict()}")

    y = sub[sub.res == CASE_RESERVOIR]
    s = y.groupby("ym")[vols].sum()
    months = pd.period_range(s.index.min(), s.index.max(), freq="M").astype(str)
    s = s.reindex(months, fill_value=0.0)
    vo, vw, vi = (s[c] * M3_TO_BBL for c in ("prod_pet", "prod_agua", "iny_agua"))
    active = (s.prod_pet > 0) | (s.prod_agua > 0) | (s.prod_gas > 0)
    np_mbbl = vo.cumsum() / 1000
    wor = [(w / o if o > 0 else None) for o, w in zip(vo, vw)]
    print(f"serie: {months[0]} a {months[-1]}, {len(months)} meses, {int(active.sum())} con actividad")
    print(f"Np desde {months[0]}: {np_mbbl.iloc[-1]:,.1f} Mbbl · Wp: {vw.sum() / 1000:,.1f} Mbbl · "
          f"Wi: {vi.sum() / 1000:,.1f} Mbbl")
    last = [i for i, a in enumerate(active) if a][-1]
    print(f"WOR del primer mes ({months[0]}): {wor[0]:.2f} · último WOR ({months[last]}): "
          f"{wor[last]:.2f} · corte de agua: {vw.iloc[last] / (vo.iloc[last] + vw.iloc[last]):.1%}")

    # Chan: centered derivative over +/- 3 months, t in years from the first month
    n = len(months)
    deriv = [None] * n
    for i in range(CHAN_WINDOW, n - CHAN_WINDOW):
        a, b = wor[i - CHAN_WINDOW], wor[i + CHAN_WINDOW]
        if a is not None and b is not None:
            deriv[i] = (b - a) / (2 * CHAN_WINDOW / 12)
    pts = [(i / 12, wor[i], deriv[i]) for i in range(1, n)
           if active.iloc[i] and wor[i] is not None and wor[i] > CHAN_WOR_MIN
           and deriv[i] is not None and deriv[i] > 0]
    has_water = any(w is not None and w > CHAN_WOR_MIN for w in wor)
    if not has_water:
        cls, pw, pd_ = "SIN AGUA", None, None
    elif len(pts) < CHAN_MIN_POINTS:
        cls, pw, pd_ = "INDETERMINADO", None, None
    else:
        lt = [math.log(p[0]) for p in pts]
        pw = linreg(lt, [math.log(p[1]) for p in pts])[0]
        pd_ = linreg(lt, [math.log(p[2]) for p in pts])[0]
        cls = ("CANALIZACION" if pd_ >= CHAN_CHANNELING else
               "CONIFICACION" if pd_ <= CHAN_CONING else "DESPLAZAMIENTO NORMAL")
    print(f"Chan: {len(pts)} puntos válidos (mínimo {CHAN_MIN_POINTS}) · "
          f"pendiente log-log de WOR: {pw if pw is None else round(pw, 3)} · "
          f"de WOR': {pd_ if pd_ is None else round(pd_, 3)} · {cls}")

    # WOR vs Np: ln(WOR) against Np over active months with WOR > 0.05
    xy = [(np_mbbl.iloc[i], math.log(wor[i])) for i in range(n)
          if active.iloc[i] and wor[i] is not None and wor[i] > CHAN_WOR_MIN]
    m, b = linreg([p[0] for p in xy], [p[1] for p in xy])
    verdict = ("no se extrapola: el WOR baja a medida que crece Np" if m <= 0 else
               f"Np al WOR {WOR_ECONOMIC:.0f}: {(math.log(WOR_ECONOMIC) - b) / m:,.1f} Mbbl")
    print(f"ln(WOR) vs Np: {len(xy)} puntos · pendiente {m:.6f} por Mbbl · "
          f"intercepto {b:.4f} · {verdict}")


def ranking(df: pd.DataFrame) -> None:
    section("5. Ranking de nivel 1 (filtros de CLAUDE.md)")
    oil = df[df.prod_pet > 0]
    g = df.groupby("yacimiento")
    f = pd.DataFrame({
        "np_mbbl": g.prod_pet.sum() * M3_TO_BBL / 1000,
        "gor_m3m3": g.prod_gas.sum() * 1000 / g.prod_pet.sum(),
        "last_oil": oil.groupby("yacimiento").ym.max(),
        "oil_wells": oil.groupby("yacimiento").idpozo.nunique(),
    })
    f = f[f.np_mbbl > 0]
    steps = [
        ("campos con petróleo desde 2019", f),
        (f"RGP <= {GOR_CONDENSATE:.0f} m3/m3 (afuera, rama condensado)",
         f[f.gor_m3m3 <= GOR_CONDENSATE]),
    ]
    steps.append((f"último mes con petróleo >= {ACTIVE_SINCE}",
                  steps[-1][1][steps[-1][1].last_oil >= ACTIVE_SINCE]))
    steps.append((f"Np desde 2019 >= {MIN_NP_MBBL:.0f} Mbbl",
                  steps[-1][1][steps[-1][1].np_mbbl >= MIN_NP_MBBL]))
    steps.append((f"al menos {MIN_OIL_WELLS} pozos con petróleo",
                  steps[-1][1][steps[-1][1].oil_wells >= MIN_OIL_WELLS]))
    for label, t in steps:
        print(f"{len(t):>3}  {label}")
    out = steps[-1][1].sort_values("np_mbbl", ascending=False)
    print()
    print(f"{'#':>2} {'campo':<16} {'Np Mbbl':>8} {'pozos':>5} {'RGP':>6} {'WOR 12m':>7} "
          f"{'fw 12m':>7} {'agua bpd':>8} {'sumid. m3':>10} {'iny. m3':>9} {'último':>8}")
    for k, (name, r) in enumerate(out.iterrows(), start=1):
        d = df[df.yacimiento == name]
        months = sorted(d[(d.prod_pet > 0) | (d.prod_agua > 0)].ym.unique())[-12:]
        last12 = d[d.ym.isin(months)]
        wor = last12.prod_agua.sum() / last12.prod_pet.sum()
        fw = last12.prod_agua.sum() / (last12.prod_agua.sum() + last12.prod_pet.sum())
        water_bpd = last12.prod_agua.sum() * M3_TO_BBL / (len(months) * DAYS_PER_MONTH)
        sink = d[d.tipopozo == "Sumidero"].iny_agua.sum()
        inj = d[d.tipopozo == "Inyección de Agua"].iny_agua.sum()
        print(f"{k:>2} {name[:16]:<16} {r.np_mbbl:>8.1f} {int(r.oil_wells):>5} {r.gor_m3m3:>6.0f} "
              f"{wor:>7.2f} {fw:>7.1%} {water_bpd:>8.0f} {sink:>10,.0f} {inj:>9,.0f} "
              f"{r.last_oil:>8}")


def main() -> int:
    data_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_DATA
    df, wells = load(data_dir)
    print(f"Datos: {data_dir}")
    basin(df, wells)
    table_1(df)
    table_2(df, wells)
    table_3(df)
    case_diagnosis(df, wells)
    ranking(df)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
