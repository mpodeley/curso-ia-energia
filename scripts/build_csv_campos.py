#!/usr/bin/env python
"""Build the field-level production CSVs for session 3 (surveillance, RAP vs Np).

Session 3 hands the student one clean CSV and asks a chatbot, in one line, which
fields need a look this month and why; then the same question on a dirty copy of
the same numbers; then a surveillance workbook. Ecuador and Colombia publish oil
only (checked 2026-09-28), so the water comes from Argentina's Capítulo IV.

Source: "Producción de Capítulo IV agrupada por yacimiento y formación productiva"
(Secretaría de Energía, datos.energia.gob.ar, CC BY 4.0), monthly since 2006-01.
The script downloads it once to scripts/_cache/ (124 MB, a few seconds).

Fields: seven mature waterfloods and one counter-example, none operated by a
company in the room (PCR, CGC, Tecpetrol, Andes). Rows whose tipo_de_recurso is
"SIN RESERVORIO" are dropped: for these fields they carry no volume.

    python scripts/build_csv_campos.py

Outputs (committed):
  public/descargas/campos_capiv_2006_2026.csv   clean: campo, cuenca, operadora,
      tipo_recurso, mes, petroleo_m3, agua_m3, iny_agua_m3 (one row per field,
      month and resource type; operadora = the operator with most oil that month)
  public/descargas/campos_capiv_sucio.csv       the same conventional + non-
      conventional volumes, summed and dirtied on purpose (see ensuciar())
  scripts/_cache/campos_anual.txt               yearly conventional table, pasted
      as text on the page for the Arena exercise
"""

from __future__ import annotations

import csv
import os
import random
import urllib.request
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '_cache')
OUT_DIR = os.path.join(HERE, '..', 'public', 'descargas')
SRC = os.path.join(CACHE, 'capiv_yacimiento_formacion.csv')
URL = (
    'http://datos.energia.gob.ar/dataset/c846e79c-026c-4040-897f-1ad3543b407c/resource/'
    '2f2834f4-1981-448f-9a3c-1e519d8c10cd/download/'
    'produccin-de-captulo-iv-agrupada-por-yacimiento-y-formacin-productiva.csv'
)

# Capítulo IV name -> display name. Order is the order of the CSV.
CAMPOS = {
    'EL CORCOBO NORTE': 'El Corcobo Norte',
    'CHIHUIDO DE LA SIERRA NEGRA': 'Chihuido de la Sierra Negra',
    'EL TRAPIAL': 'El Trapial',
    'PUESTO HERNANDEZ': 'Puesto Hernández',
    'LOS PERALES': 'Los Perales',
    'MANANTIALES BEHR': 'Manantiales Behr',
    'DIADEMA': 'Diadema',
}
CUENCA = {'NEUQUINA': 'Neuquina', 'GOLFO SAN JORGE': 'Golfo San Jorge'}
TIPO = {'CONVENCIONAL': 'convencional', 'NO CONVENCIONAL': 'no convencional'}
# Last month every field has reported in full (the file carries a partial 2026-08).
DESDE, HASTA = (2006, 1), (2026, 7)
EXCLUIDAS = ('PETROQUIMICA COMODORO', 'COMPAÑIA GENERAL DE COMBUSTIBLES', 'TECPETROL', 'ANDES')


def bajar() -> None:
    if not os.path.exists(SRC):
        os.makedirs(CACHE, exist_ok=True)
        urllib.request.urlretrieve(URL, SRC)


def leer():
    """(campo, mes, tipo) -> [pet, agua, iny]; (campo, mes) -> {empresa: pet}; campo -> cuenca."""
    vol = defaultdict(lambda: [0.0, 0.0, 0.0])
    oper = defaultdict(lambda: defaultdict(float))
    cuenca = {}
    with open(SRC, encoding='utf-8-sig', newline='') as f:
        for r in csv.DictReader(f):
            k = r['areayacimiento'].strip()
            if k not in CAMPOS or r['tipo_de_recurso'] not in TIPO:
                continue
            ym = (int(r['anio']), int(r['mes']))
            if not DESDE <= ym <= HASTA:
                continue
            empresa = r['empresa'].strip()
            assert not any(x in empresa.upper() for x in EXCLUIDAS), (k, empresa)
            v = vol[(k, ym, TIPO[r['tipo_de_recurso']])]
            pet = float(r['prod_pet'] or 0)
            v[0] += pet
            v[1] += float(r['prod_agua'] or 0)
            v[2] += float(r['iny_agua'] or 0)
            oper[(k, ym)][empresa] += pet
            cuenca[k] = CUENCA[r['cuenca'].strip()]
    return vol, oper, cuenca


def filas_limpias(vol, oper, cuenca):
    filas = []
    for k, nombre in CAMPOS.items():
        for (kk, ym, tipo), (pet, agua, iny) in sorted(vol.items(), key=lambda x: (x[0][1], x[0][2])):
            if kk != k:
                continue
            ops = oper[(k, ym)]
            operadora = max(ops, key=lambda e: (ops[e], e))
            filas.append({
                'campo': nombre,
                'cuenca': cuenca[k],
                'operadora': operadora,
                'tipo_recurso': tipo,
                'mes': f'{ym[0]}-{ym[1]:02d}',
                'petroleo_m3': round(pet, 1),
                'agua_m3': round(agua, 1),
                'iny_agua_m3': round(iny, 1),
            })
    return filas


def ensuciar(filas):
    """The same volumes as a careless export would hand them over.

    Deterministic (fixed seed), so the page can name every defect:
    - cryptic headers without units, semicolon separator, decimal comma;
    - conventional and non-conventional summed into one row (El Trapial and
      Chihuido quietly mix Vaca Muerta into the waterflood);
    - dates in two formats (YYYY-MM and MM/YYYY);
    - Los Perales water in barrels instead of m³, with nothing saying so;
    - eight months deleted and one month duplicated.
    """
    suma = defaultdict(lambda: [0.0, 0.0, 0.0])
    orden = []
    for f in filas:
        key = (f['campo'], f['mes'])
        if key not in suma:
            orden.append(key)
        s = suma[key]
        s[0] += f['petroleo_m3']
        s[1] += f['agua_m3']
        s[2] += f['iny_agua_m3']
    rnd = random.Random(2026)
    borrar = set(rnd.sample(orden, 8))
    duplicar = ('Diadema', '2020-03')
    out = []
    for i, key in enumerate(orden):
        if key in borrar:
            continue
        campo, mes = key
        pet, agua, iny = suma[key]
        if campo == 'Los Perales':
            agua *= 6.2898
        y, m = mes.split('-')
        per = f'{m}/{y}' if i % 5 == 0 else mes
        fila = [campo.upper(), per] + [f'{v:.1f}'.replace('.', ',') for v in (pet, agua, iny)]
        out.append(fila)
        if key == duplicar:
            out.append(fila)
    return ['yac', 'per', 'p', 'a', 'iny'], out, sorted(borrar)


def anual(filas):
    """Yearly conventional oil and water per field, for pasting into Arena."""
    acc = defaultdict(lambda: [0.0, 0.0, 0])
    for f in filas:
        if f['tipo_recurso'] != 'convencional' or f['mes'] < '2016':
            continue
        a = acc[(f['campo'], f['mes'][:4])]
        a[0] += f['petroleo_m3']
        a[1] += f['agua_m3']
        a[2] += 1
    lineas = ['campo | año | meses | petroleo_m3 | agua_m3']
    for (campo, y), (pet, agua, n) in sorted(acc.items(), key=lambda x: (list(CAMPOS.values()).index(x[0][0]), x[0][1])):
        lineas.append(f'{campo} | {y} | {n} | {pet:,.0f} | {agua:,.0f}')
    return '\n'.join(lineas) + '\n'


def main() -> None:
    bajar()
    vol, oper, cuenca = leer()
    filas = filas_limpias(vol, oper, cuenca)
    os.makedirs(OUT_DIR, exist_ok=True)
    limpio = os.path.join(OUT_DIR, 'campos_capiv_2006_2026.csv')
    with open(limpio, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(filas[0]))
        w.writeheader()
        w.writerows(filas)
    enc, sucias, borradas = ensuciar(filas)
    sucio = os.path.join(OUT_DIR, 'campos_capiv_sucio.csv')
    with open(sucio, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f, delimiter=';')
        w.writerow(enc)
        w.writerows(sucias)
    with open(os.path.join(CACHE, 'campos_anual.txt'), 'w', encoding='utf-8') as f:
        f.write(anual(filas))
    print(f'{limpio}: {len(filas)} filas, {os.path.getsize(limpio):,} bytes')
    print(f'{sucio}: {len(sucias)} filas, {os.path.getsize(sucio):,} bytes')
    print('meses borrados en el sucio:', ', '.join(f'{c} {m}' for c, m in borradas))


if __name__ == '__main__':
    main()
