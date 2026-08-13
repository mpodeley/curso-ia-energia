#!/usr/bin/env python
"""Build the downloadable Volve daily-production CSV for session 4.

The "para curiosos" exercise of session 4 needs daily rates WITH pressures,
and the official Volve access (Databricks Marketplace) puts a registration
wall in front of a 5-person cohort. The license allows exactly this shortcut:
the Equinor Open Data Licence grants use for commercial and non-commercial
purposes and explicitly permits sharing the Licensed/Adapted Material, as
long as Equinor and the former Volve license partners (ExxonMobil Exploration
& Production Norway AS, Bayerngas Norge AS) are credited, a link to the terms
is provided, and the material is not sold. The session-4 page carries that
notice next to the download link. Terms:
https://cdn.equinor.com/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf

Input: scripts/_cache/volve_production.xlsx — the official "Volve production
data.xlsx" of the 2018 release (sheet "Daily Production Data"). Download it
from https://www.equinor.com/energy/volve-data-sharing or a public mirror and
drop it there; the xlsx itself stays out of git only because 2.3 MB of source
binary does not belong in the repo, not for license reasons.

Wells kept: the two producers with the best downhole-pressure coverage, the
same two the page's prompt analyzes — 15/9-F-14 (2008-2016) and 15/9-F-11
(2013-2016), producer rows only (WELL_TYPE = OP).

    python scripts/build_csv_volve.py

Output: public/descargas/volve_diario_2pozos.csv (committed).
Columns: fecha, pozo, horas_linea, p_fondo_bar, p_boca_bar, oil_sm3,
gas_sm3, agua_sm3.
"""

from __future__ import annotations

import csv
import os

import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
XLSX_IN = os.path.join(HERE, '_cache', 'volve_production.xlsx')
OUT = os.path.join(HERE, '..', 'public', 'descargas', 'volve_diario_2pozos.csv')

WELLS = ('15/9-F-14', '15/9-F-11')


def main() -> None:
    if not os.path.exists(XLSX_IN):
        raise SystemExit(f'Falta {XLSX_IN}: ver el docstring para bajarlo.')
    wb = openpyxl.load_workbook(XLSX_IN, read_only=True)
    ws = wb['Daily Production Data']
    rows = ws.iter_rows(values_only=True)
    hdr = list(next(rows))

    out_rows = []
    for r in rows:
        d = dict(zip(hdr, r))
        if d['NPD_WELL_BORE_NAME'] not in WELLS or d['WELL_TYPE'] != 'OP':
            continue
        def num(key, digits=2):
            v = d[key]
            return round(float(v), digits) if v is not None else ''
        out_rows.append([
            d['DATEPRD'].date().isoformat(), d['NPD_WELL_BORE_NAME'],
            num('ON_STREAM_HRS'), num('AVG_DOWNHOLE_PRESSURE'),
            num('AVG_WHP_P'), num('BORE_OIL_VOL'), num('BORE_GAS_VOL', 1),
            num('BORE_WAT_VOL'),
        ])

    out_rows.sort(key=lambda r: (r[1], r[0]))
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['fecha', 'pozo', 'horas_linea', 'p_fondo_bar',
                    'p_boca_bar', 'oil_sm3', 'gas_sm3', 'agua_sm3'])
        w.writerows(out_rows)

    for p in WELLS:
        n = sum(1 for r in out_rows if r[1] == p)
        print(f'  {p}: {n} días')
    print(f'OK: {len(out_rows)} filas -> {OUT}')


if __name__ == '__main__':
    main()
