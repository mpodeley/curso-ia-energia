#!/usr/bin/env python
"""Build the downloadable multi-well production CSV for session 4.

The session-4 page teaches batch decline forecasting with a chatbot: the student
downloads this CSV, uploads it to a chatbot with the prompt printed on the page,
and gets back per-well Arps forecasts. The well mix is deliberate — the six wells
of the DeclineLab (already familiar from the hand-fitting exercise) plus four
teachable pathologies: two clean decliners, one well that died mid-series and one
whose production RISES, where a decline model does not apply and the prompt's
rules must say so instead of forcing a fit.

Source: scripts/_cache/capiv_noroeste_monthly_tef.csv, the Capítulo IV subset
(cuenca Noroeste, gas wells) with tef = effective producing days per month.
Regenerate that cache with scripts/fetch_capiv_gas.py (see its docstring; the
tef variant streams the same yearly CSVs keeping the tef column).

    python scripts/build_csv_descarga.py

Output: public/descargas/produccion_noroeste_10pozos.csv (committed).
Columns: idpozo, pozo, yacimiento, formacion, mes, gas_miles_m3, petroleo_m3,
agua_m3, dias_efectivos. idpozo is the Capítulo IV well id, kept so any number
in the file can be traced back to the official dataset — provenance is part of
the pedagogy.
"""

from __future__ import annotations

import csv
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '_cache')
OUT_DIR = os.path.join(HERE, '..', 'public', 'descargas')

# idpozo -> why it is in the set (kept here, not in the CSV: the page tells the
# story; the file plays it straight, like any export the student would bring).
WELLS = {
    '34585': 'DeclineLab: declinador limpio grande (ACAMBUCO, icla)',
    '153510': 'DeclineLab: declinador limpio (ACAMBUCO, icla)',
    '79164': 'DeclineLab: declinación lenta (RAMOS, huamampampa)',
    '127112': 'DeclineLab: pozo del laboratorio (AGUARAGÜE, santa rosa)',
    '10639': 'DeclineLab: lento y ruidoso (AGUARAGÜE, tupambi)',
    '34663': 'DeclineLab: el pozo que no ajusta (ACAMBUCO, huamampampa)',
    '159335': 'nuevo: declinador limpio (AGUARAGÜE, tupambi)',
    '79177': 'nuevo: declinador (RAMOS, huamampampa)',
    '154216': 'nuevo: murió a mitad de serie (AGUARAGÜE, tranquitas)',
    '155093': 'nuevo: producción creciente — Arps no aplica (AGUARAGÜE, tupambi)',
}

YM_FIRST, YM_LAST = '2019-01', '2026-06'


def main() -> None:
    with open(os.path.join(CACHE, 'capiv_noroeste_wells.json')) as f:
        meta = json.load(f)

    rows = []
    with open(os.path.join(CACHE, 'capiv_noroeste_monthly_tef.csv')) as f:
        for r in csv.DictReader(f):
            if r['idpozo'] not in WELLS:
                continue
            if not (YM_FIRST <= r['ym'] <= YM_LAST):
                continue
            w = meta[r['idpozo']]
            rows.append({
                'idpozo': r['idpozo'],
                'pozo': w['sigla'],
                'yacimiento': w['area'],
                'formacion': ' / '.join(w['formaciones']),
                'mes': r['ym'],
                'gas_miles_m3': r['prod_gas'],
                'petroleo_m3': r['prod_pet'],
                'agua_m3': r['prod_agua'],
                'dias_efectivos': r['tef'],
            })

    rows.sort(key=lambda r: (r['pozo'], r['mes']))

    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, 'produccion_noroeste_10pozos.csv')
    with open(out, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    wells_seen = sorted({r['pozo'] for r in rows})
    print(f'OK: {len(rows)} filas, {len(wells_seen)} pozos -> {out}')
    for p in wells_seen:
        n = sum(1 for r in rows if r['pozo'] == p)
        print(f'  {p}: {n} meses')


if __name__ == '__main__':
    main()
