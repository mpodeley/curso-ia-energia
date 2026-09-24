"""Build public/data/pozos_aprendizaje.json for the "con y sin etiquetas" exercise
of session 1 (supervised vs unsupervised learning, on real wells).

Every active oil or gas well of Argentina's Noroeste basin, described by two
numbers a reservoir engineer reads at a glance: the gas-oil ratio (RGP, m3/m3)
and the water cut of its last 12 producing months. The label is the well type the
operator declares to the Secretaría de Energía (petrolífero / gasífero).

Why these two axes: with them the declared type is almost a straight line on the
chart (RGP alone separates it), so the supervised half has something to learn,
and k-means with two groups recovers it without ever seeing a label. Checked on
2026-09-24 with the cache cut at 2026-07: 84 wells, 5-nearest-neighbour
leave-one-out 82/84, k-means (k=2) matches the declared type on 81/84.

Reads the Capítulo IV cache written by fetch_capiv_noroeste.py (gitignored).

Usage: python scripts/build_pozos_aprendizaje.py
"""

import csv
import json
import os
import sys
from collections import defaultdict

sys.path.insert(0, os.path.dirname(__file__))
from _meta import write_json

HERE = os.path.dirname(__file__)
CACHE = os.path.join(HERE, '_cache')
OUT = os.path.join(HERE, '..', 'public', 'data', 'pozos_aprendizaje.json')

MESES = 12          # last producing months that describe a well
MIN_MESES = 6       # fewer than this and the ratios are noise
ACTIVO_DESDE = '2024-01'  # last producing month at or after this = active well
TIPOS = {'Petrolífero': 'petrolifero', 'Gasífero': 'gasifero'}


def main():
    with open(os.path.join(CACHE, 'capiv_noroeste_oil_wells.json'), encoding='utf-8') as f:
        pozos = json.load(f)

    series = defaultdict(list)
    with open(os.path.join(CACHE, 'capiv_noroeste_oil_monthly.csv'), encoding='utf-8') as f:
        for r in csv.DictReader(f):
            pet, gas = float(r['prod_pet'] or 0), float(r['prod_gas'] or 0)
            if pet + gas > 0:
                series[r['idpozo']].append((r['ym'], pet, gas, float(r['prod_agua'] or 0)))

    corte_datos = max(ym for s in series.values() for ym, *_ in s)
    data = []
    for idpozo, s in series.items():
        meta = pozos.get(idpozo, {})
        tipo = TIPOS.get(meta.get('tipopozo'))
        if not tipo:
            continue
        ultimos = sorted(s)[-MESES:]
        if len(ultimos) < MIN_MESES or ultimos[-1][0] < ACTIVO_DESDE:
            continue
        pet = sum(m[1] for m in ultimos)
        gas = sum(m[2] for m in ultimos)  # miles de m3
        agua = sum(m[3] for m in ultimos)
        if pet <= 0:
            continue  # RGP undefined: a dry gas well has no place on a log axis
        data.append({
            'id': idpozo,
            'sigla': meta.get('sigla', ''),
            'area': meta.get('area', ''),
            'tipo': tipo,
            # gas is reported in thousands of m3, oil in m3
            'rgp': round(gas * 1000 / pet, 1),
            'corte': round(agua / (agua + pet), 4),
            'meses': len(ultimos),
        })

    data.sort(key=lambda d: d['id'])
    write_json(
        OUT,
        data,
        source='Secretaría de Energía, Capítulo IV (producción por pozo), cuenca Noroeste. '
        'RGP y corte de agua de los últimos 12 meses con producción; tipo de pozo declarado '
        'por la operadora.',
        source_date=corte_datos,
    )
    n = {t: sum(d['tipo'] == t for d in data) for t in TIPOS.values()}
    print(f'{len(data)} pozos ({n}), datos hasta {corte_datos} -> {os.path.relpath(OUT)}')


if __name__ == '__main__':
    main()
