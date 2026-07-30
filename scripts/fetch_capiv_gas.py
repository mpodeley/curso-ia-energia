#!/usr/bin/env python
"""Fetch the monthly production series of the conventional gas wells of Argentina's
Noroeste basin (Salta) from the Capítulo IV open dataset.

Why these wells: Aguaragüe, Ramos and Acambuco produce from huamampampa, tupambi, icla
and santa rosa — the same Devonian-Carboniferous sub-andean reservoirs YPFB Andina
produces from across the border. Same play, conventional gas, no mental translation
needed for the course audience.

The yearly production CSVs are ~100 MB each (~2.3 GB total), so they are streamed and
filtered on the fly by well id — nothing but the filtered subset touches disk.

    python scripts/fetch_capiv_gas.py

Output: scripts/_cache/capiv_noroeste_monthly.csv (gitignored)
        idpozo, ym, prod_gas, prod_pet, prod_agua
"""

from __future__ import annotations

import csv
import json
import os
import sys

import requests

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '_cache')

# The upstream repo that already curated these two inputs.
UPSTREAM = os.path.join(
    os.path.expanduser('~'),
    'Projects', 'research', 'subsidencia-vaca-muerta',
    'exploraciones', 'escala_pozo', '_data',
)
POZOS_CSV = os.path.join(UPSTREAM, 'capitulo_iv_pozos.csv')
PROD_URLS = os.path.join(UPSTREAM, 'prod_urls.json')

CUENCA = 'NOROESTE'
TIPO_POZO = 'Gasífero'  # accented, title case — as it appears in the source
FIELDS = ['prod_gas', 'prod_pet', 'prod_agua']
HDRS = {'User-Agent': 'Mozilla/5.0'}

csv.field_size_limit(1 << 24)


def target_wells() -> dict[str, dict]:
    """idpozo -> metadata, for conventional gas wells of the Noroeste basin.

    A well appears once per producing formation, so metadata is keyed by well and the
    formations are collected into a list.
    """
    wells: dict[str, dict] = {}
    with open(POZOS_CSV, encoding='utf-8-sig') as f:
        for row in csv.DictReader(f):
            if (row.get('cuenca') or '').strip() != CUENCA:
                continue
            if (row.get('tipopozo') or '').strip() != TIPO_POZO:
                continue
            idp = (row.get('idpozo') or '').strip()
            if not idp:
                continue
            w = wells.setdefault(idp, {
                'idpozo': idp,
                'sigla': (row.get('sigla') or '').strip(),
                'area': (row.get('area') or '').strip(),
                'empresa': (row.get('empresa') or '').strip(),
                'provincia': (row.get('provincia') or '').strip(),
                'formaciones': [],
            })
            form = (row.get('formacion') or '').strip()
            if form and form not in w['formaciones']:
                w['formaciones'].append(form)
    return wells


def ym(row: dict) -> str:
    a = (row.get('anio') or '').strip()
    m = (row.get('mes') or '').strip()
    if not (a and m):
        return ''
    try:
        return f'{int(a):04d}-{int(m):02d}'
    except ValueError:
        return ''


def main() -> None:
    wells = target_wells()
    print(f'pozos objetivo: {len(wells)} ({CUENCA}, {TIPO_POZO})', flush=True)

    with open(PROD_URLS) as f:
        urls = json.load(f)

    # acc[(idpozo, ym)] = {field: value} — summed across producing formations.
    acc: dict[tuple[str, str], dict[str, float]] = {}

    for year in sorted(urls):
        url = urls[year]['url']
        rows = hits = 0
        with requests.get(url, headers=HDRS, stream=True, timeout=1800) as r:
            r.raise_for_status()
            lines = (ln for ln in r.iter_lines(decode_unicode=True) if ln)
            for row in csv.DictReader(lines):
                rows += 1
                idp = (row.get('idpozo') or '').strip()
                if idp not in wells:
                    continue
                key = (idp, ym(row))
                if not key[1]:
                    continue
                hits += 1
                d = acc.setdefault(key, {k: 0.0 for k in FIELDS})
                for k in FIELDS:
                    v = row.get(k)
                    if not v:
                        continue
                    try:
                        d[k] += float(v)
                    except ValueError:
                        pass
        print(f'  {year}: {rows:,} filas leídas, {hits:,} del Noroeste', flush=True)

    os.makedirs(CACHE, exist_ok=True)

    out_csv = os.path.join(CACHE, 'capiv_noroeste_monthly.csv')
    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(['idpozo', 'ym'] + FIELDS)
        for (idp, m), d in sorted(acc.items()):
            w.writerow([idp, m] + [round(d[k], 2) for k in FIELDS])

    out_meta = os.path.join(CACHE, 'capiv_noroeste_wells.json')
    with open(out_meta, 'w', encoding='utf-8') as f:
        json.dump(wells, f, ensure_ascii=False, indent=2)

    activos = len({idp for (idp, _), d in acc.items() if d['prod_gas'] > 0})
    print(f'\nOK: {len(acc):,} registros mensuales, {activos} pozos con gas > 0')
    print(f'  {out_csv}')
    print(f'  {out_meta}')


if __name__ == '__main__':
    sys.exit(main())
