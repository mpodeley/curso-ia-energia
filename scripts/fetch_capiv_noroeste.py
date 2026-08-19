#!/usr/bin/env python
"""Fetch the monthly production AND injection series of every well of Argentina's
Noroeste basin from the Capítulo IV open dataset.

Sibling of fetch_capiv_gas.py, which keeps only conventional gas wells and drops the
two columns a waterflooding screening actually needs: iny_agua (water injected) and
tef (effective producing days). This one keeps both, keeps every tipopozo, and carries
the field/formation/state columns so a field can be picked after the fact.

Why the whole basin instead of one field: the download cost is the same — the yearly
CSVs are streamed and parsed in full either way — and the extra rows are what let the
portfolio sheet rank several fields against each other.

    python scripts/fetch_capiv_noroeste.py

Output: scripts/_cache/capiv_noroeste_oil_monthly.csv (gitignored)
            idpozo, ym, prod_pet, prod_gas, prod_agua, iny_agua, tef
        scripts/_cache/capiv_noroeste_oil_wells.json (gitignored)
            idpozo -> sigla, area, yacimiento, formaciones, tipopozo, tipoestado, empresa
"""

from __future__ import annotations

import csv
import json
import os
import sys

import requests

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '_cache')

UPSTREAM = os.path.join(
    os.path.expanduser('~'),
    'Projects', 'research', 'subsidencia-vaca-muerta',
    'exploraciones', 'escala_pozo', '_data',
)
PROD_URLS = os.path.join(UPSTREAM, 'prod_urls.json')

CUENCA = 'NOROESTE'

# Summed across the formations a well produces from in a given month.
VOLUMENES = ['prod_pet', 'prod_gas', 'prod_agua', 'iny_agua']
# NOT summed: the same well-month repeats tef once per formation row.
DIAS = 'tef'

HDRS = {'User-Agent': 'Mozilla/5.0'}
csv.field_size_limit(1 << 24)


def ym(row: dict) -> str:
    a = (row.get('anio') or '').strip()
    m = (row.get('mes') or '').strip()
    if not (a and m):
        return ''
    try:
        return f'{int(a):04d}-{int(m):02d}'
    except ValueError:
        return ''


def num(v) -> float:
    if not v:
        return 0.0
    try:
        return float(v)
    except ValueError:
        return 0.0


def main() -> None:
    with open(PROD_URLS) as f:
        urls = json.load(f)

    # acc[(idpozo, ym)] = {volumenes..., tef}
    acc: dict[tuple[str, str], dict[str, float]] = {}
    wells: dict[str, dict] = {}

    for year in sorted(urls):
        url = urls[year]['url']
        rows = hits = 0
        with requests.get(url, headers=HDRS, stream=True, timeout=1800) as r:
            r.raise_for_status()
            lines = (ln for ln in r.iter_lines(decode_unicode=True) if ln)
            for row in csv.DictReader(lines):
                rows += 1
                if (row.get('cuenca') or '').strip().upper() != CUENCA:
                    continue
                idp = (row.get('idpozo') or '').strip()
                mes = ym(row)
                if not (idp and mes):
                    continue
                hits += 1

                d = acc.setdefault((idp, mes), {k: 0.0 for k in VOLUMENES} | {DIAS: 0.0})
                for k in VOLUMENES:
                    d[k] += num(row.get(k))
                # tef repeats per formation row: keep the largest, never the sum.
                d[DIAS] = max(d[DIAS], num(row.get(DIAS)))

                w = wells.setdefault(idp, {
                    'idpozo': idp,
                    'sigla': (row.get('sigla') or '').strip(),
                    'area': (row.get('areapermisoconcesion') or '').strip(),
                    'yacimiento': (row.get('areayacimiento') or '').strip(),
                    'empresa': (row.get('empresa') or '').strip(),
                    'provincia': (row.get('provincia') or '').strip(),
                    'formaciones': [],
                    'tipopozo': '',
                    'tipoestado': '',
                })
                form = (row.get('formacion') or '').strip()
                if form and form not in w['formaciones']:
                    w['formaciones'].append(form)
                # Type and state drift over a well's life; the last row read wins,
                # and the years are walked in ascending order, so it is the newest.
                for campo in ('tipopozo', 'tipoestado'):
                    v = (row.get(campo) or '').strip()
                    if v:
                        w[campo] = v

        print(f'  {year}: {rows:,} filas leídas, {hits:,} del {CUENCA}', flush=True)

    os.makedirs(CACHE, exist_ok=True)

    out_csv = os.path.join(CACHE, 'capiv_noroeste_oil_monthly.csv')
    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['idpozo', 'ym'] + VOLUMENES + [DIAS])
        for (idp, mes), d in sorted(acc.items()):
            w.writerow([idp, mes] + [round(d[k], 2) for k in VOLUMENES] + [round(d[DIAS], 2)])

    out_meta = os.path.join(CACHE, 'capiv_noroeste_oil_wells.json')
    with open(out_meta, 'w', encoding='utf-8') as f:
        json.dump(wells, f, ensure_ascii=False, indent=2)

    con_iny = len({idp for (idp, _), d in acc.items() if d['iny_agua'] > 0})
    con_pet = len({idp for (idp, _), d in acc.items() if d['prod_pet'] > 0})
    print(f'\nOK: {len(acc):,} registros mensuales, {len(wells)} pozos')
    print(f'  {con_pet} con petróleo > 0, {con_iny} con inyección de agua > 0')
    print(f'  {out_csv}')
    print(f'  {out_meta}')


if __name__ == '__main__':
    sys.exit(main())
