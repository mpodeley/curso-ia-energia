#!/usr/bin/env python
"""Build the Volve bundles for session 6 (an agent builds a dataset dashboard).

Session 6 has two halves that use the same public dataset, Equinor's Volve
field (North Sea, produced 2008-2016): the instructor runs a terminal agent on
the FULL bundle (ten files, ~16 MB), and the students run a free agent
(Claude free tier, Arena agent mode) on a LITE bundle (~2 MB) downloaded from
the site.

Why mirrors and not the official release: since 2025 the official Volve
access goes through Databricks Marketplace, which puts an account wall in
front of a six-person cohort. The Equinor Open Data Licence allows exactly this
shortcut: use, adapt and share, crediting Equinor and the former Volve licence
partners with a link to the terms, and never selling the material. Every URL
below is pinned to a commit, and every file to its sha256, so a mirror that
changes or disappears is caught here and not in class.

Sodir (the Norwegian Offshore Directorate) is the independent source the
dashboard reconciles against. Its FactPages tables are downloaded in full
(~6 MB, live, NLOD licence) and filtered to the VOLVE field.

    uv run --with openpyxl --with lasio python scripts/build_volve_bundle.py
    ... --refrescar      # download again even if the cache has the files

Outputs:
  scripts/_cache/volve/completo/     the FULL bundle, as the agent sees it
      (gitignored; docs/edicion-2026-09/volve-agente/preparar_datos.py copies it)
  scripts/_cache/volve/_sodir_raw/   the two unfiltered Sodir tables
  public/descargas/volve/            the LITE bundle (committed) + README.md
  public/descargas/volve/volve_liviano.zip   the same files, one click
  public/descargas/volve/*_las.txt   the cut LAS again under a .txt name (Arena), not zipped

lasio is optional: when it imports, the cut LAS is read back as a check.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import os
import sys
import urllib.request
import zipfile
from collections import defaultdict
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
CACHE = os.path.join(HERE, '_cache', 'volve')
FULL = os.path.join(CACHE, 'completo')
SODIR_RAW = os.path.join(CACHE, '_sodir_raw')
LITE = os.path.join(REPO, 'public', 'descargas', 'volve')

AWGEO = 'https://raw.githubusercontent.com/awgeo/Volve_field_data/7cdecf1f1d24811d21bb2e2f379ff048404f4ce7'
PICKS = 'https://raw.githubusercontent.com/andymcdgeo/spwla_volve/c293edf37c1b567b8dc9c81ea88f2cf288eab423'
HUGIN = 'https://raw.githubusercontent.com/maribickpostanes/Interactive-Horizon-Surfaces-Plot/af617d2a25a90c02d45485127e82274ac9bad051'
PETRO = ('https://raw.githubusercontent.com/Joell2001/Petrofisica/e2d64f279d6fda8d34d1fc37f02a8d0803c3b512'
         '/Data/VOLVE-PETROPHYSICAL_INTERPRETATION')

# (path inside completo/, pinned URL, sha256 of the file as downloaded on 2026-09-28)
MIRRORED = [
    ('produccion/Volve production data.xlsx',
     f'{AWGEO}/input_data/Volve%20production%20data.xlsx',
     '514d4e38763e09be7fbad12313429909b9799b1a6ec999bf5f36e0df1b6c9cae'),
    ('topes/Well_picks_Volve_v1.dat',
     f'{PICKS}/Well_picks_Volve_v1.dat',
     '1c132bba09555915b62e23dc4475f790a304856d369d9d26cc76466cf7b77d3a'),
    ('mapas/Hugin_Fm_Top.csv',
     f'{HUGIN}/Hugin_Fm_Top.csv',
     '6bb2f7902f80beb9fd28ce177dc3a2aa3916d3dd4f4b33da9a72ee42f23bbd0b'),
    ('trayectorias/F-12_ACTUAL',
     f'{AWGEO}/input_data/wellpaths/F-12_ACTUAL',
     '34a1a6f6e1d73060e30af00114401392826e3870274e9d1e7314eba724c64477'),
    ('perfiles/15_9-F-12/WLC_PETRO_COMPUTED_INPUT_1.LAS',
     f'{PETRO}/15_9-F-12/WLC_PETRO_COMPUTED_INPUT_1.LAS',
     '8d1a22ebed03f160d49fdfba72264868686e5c97c862faccc82cb6068dc52e30'),
    ('perfiles/15_9-F-12/WLC_PETRO_COMPUTED_OUTPUT_1.LAS',
     f'{PETRO}/15_9-F-12/WLC_PETRO_COMPUTED_OUTPUT_1.LAS',
     '545ff15bc7fca12ff9660c07981be84c74e4c908206165718947457e9f1fc8bf'),
    ('perfiles/15_9-F-11 B/WLC_PETRO_COMPUTED_OUTPUT_1.LAS',
     f'{PETRO}/15_9-F-11%20B/WLC_PETRO_COMPUTED_OUTPUT_1.LAS',
     'e3fd166e295d4350d9a51bd338cb02a0ca3e72da9a5cb831641c999b6b015cec'),
    ('perfiles/15_9-F-14/NO_15_9-F-14_KLOGH_NEW.las',
     f'{PETRO}/15_9-F-14/geomod09/NO_15_9-F-14_KLOGH_NEW.las',
     '06edfb89996834e0bfc67ccf45c52fbd57a37bba25edea43edd718c45d9fbe8d'),
]

SODIR_URL = ('https://factpages.sodir.no/public?/Factpages/external/tableview/{table}'
             '&rs:Command=Render&rc:Toolbar=false&rc:Parameters=f&IpAddress=not_used'
             '&CultureCode=en&rs:Format=CSV&Top100=false')
# (raw table, filter column, filtered file name)
SODIR = [
    ('wellbore_development_all', 'wlbField', 'sodir_volve_pozos.csv'),
    ('field_production_monthly', 'prfInformationCarrier', 'sodir_volve_produccion_campo_mensual.csv'),
]
FIELD = 'VOLVE'

# The lite LAS: F-12 from the top of the Ekofisk Formation (2,690.3 m MD) to 80 m
# past the official total depth (3,520 m, Sodir), so the padded gamma ray shows.
LAS_CUT = (2680.0, 3600.0)
LAS_DROP = {'CARB_FLAG', 'COAL_FLAG', 'SAND_FLAG'}  # interpretation flags, near-empty
LAS_LITE = '15_9-F-12_perfiles_2680-3600m.las'
# The same LAS with a .txt name, outside the zip: Arena's agent mode accepts .txt and .csv
# uploads but not .las (help.arena.ai, checked 2026-09-28).
LAS_TXT = '15_9-F-12_perfiles_2680-3600m_las.txt'
GRID_STEP = 3  # keep every 3rd inline and crossline (1/9 of the points, 37.5 m spacing)


def sha256(path: str) -> str:
    h = hashlib.sha256()
    with open(path, 'rb') as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b''):
            h.update(chunk)
    return h.hexdigest()


def download(url: str, dest: str) -> None:
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'curso-ia-energia/1.0'})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest + '.part', 'wb') as f:
        while chunk := r.read(1 << 20):
            f.write(chunk)
    os.replace(dest + '.part', dest)


def fetch_all(refresh: bool) -> None:
    for rel, url, expected in MIRRORED:
        dest = os.path.join(FULL, rel)
        if refresh or not os.path.exists(dest):
            print(f'  bajando {rel}')
            download(url, dest)
        got = sha256(dest)
        if got != expected:
            raise SystemExit(f'sha256 distinto en {rel}: {got[:12]} (esperado {expected[:12]}). '
                             'El espejo cambió: revisar antes de usar.')
    for table, col, name in SODIR:
        raw = os.path.join(SODIR_RAW, f'{table}.csv')
        if refresh or not os.path.exists(raw):
            print(f'  bajando Sodir {table}')
            download(SODIR_URL.format(table=table), raw)
        with open(raw, encoding='utf-8-sig', newline='') as f:
            reader = csv.DictReader(f)
            header = reader.fieldnames
            rows = [r for r in reader if r[col] == FIELD]
        if not rows:
            raise SystemExit(f'Sodir {table}: ninguna fila con {col} == {FIELD}')
        out = os.path.join(FULL, 'sodir', name)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, 'w', encoding='utf-8', newline='') as f:
            w = csv.DictWriter(f, fieldnames=header, lineterminator='\n')
            w.writeheader()
            w.writerows(rows)


# ---------------------------------------------------------------- lite bundle

def lite_production() -> tuple[str, int]:
    """Monthly sheet of the xlsx -> one tidy CSV, units in the column names."""
    import openpyxl
    wb = openpyxl.load_workbook(os.path.join(FULL, MIRRORED[0][0]), read_only=True)
    rows = list(wb['Monthly Production Data'].iter_rows(values_only=True))
    header, units, data = rows[0], rows[1], rows[2:]
    assert header[:4] == ('Wellbore name', 'NPDCode', 'Year', 'Month'), header
    assert units[4:] == ('hrs', 'Sm3', 'Sm3', 'Sm3', 'Sm3', 'Sm3'), units

    def num(v):
        if v in (None, '', 'NULL'):
            return ''
        return f'{float(v):.2f}'.rstrip('0').rstrip('.') if isinstance(v, float) else str(v)

    out = io.StringIO()
    w = csv.writer(out, lineterminator='\n')
    w.writerow(['pozo', 'codigo_npd', 'anio', 'mes', 'periodo', 'horas_en_linea_h',
                'petroleo_sm3', 'gas_sm3', 'agua_sm3', 'gas_inyectado_sm3', 'agua_inyectada_sm3'])
    n = 0
    for r in sorted((r for r in data if r[0]), key=lambda r: (r[0], r[2], r[3])):
        w.writerow([r[0], r[1], r[2], r[3], f'{r[2]}-{r[3]:02d}',
                    *(num(v) for v in r[4:10])])
        n += 1
    return out.getvalue(), n


def parse_picks(path: str) -> list[dict]:
    """Fixed-width Petrel well-tops export: columns located from each dash rule."""
    import re
    lines = open(path, encoding='latin-1').read().splitlines()
    rows, spans, names = [], None, None
    for i, line in enumerate(lines):
        if line.strip().startswith('Well name'):
            spans = [(m.start(), m.end()) for m in re.finditer(r'-+', lines[i + 1])]
            names = [line[a:b + 1].strip() for a, b in spans]
            continue
        if spans and line.startswith('  NO '):
            vals = []
            for k, (a, _) in enumerate(spans):
                end = spans[k + 1][0] if k + 1 < len(spans) else len(line)
                vals.append(line[a:end].strip())
            rows.append(dict(zip(names, vals)))
    return rows


def lite_tops() -> tuple[str, int]:
    rows = parse_picks(os.path.join(FULL, 'topes', 'Well_picks_Volve_v1.dat'))
    cols = [('Well name', 'pozo'), ('Surface name', 'superficie'), ('Obs#', 'observacion'),
            ('Qlf', 'calificador'), ('MD', 'md_m'), ('TVD', 'tvd_m'), ('TVDSS', 'tvdss_m'),
            ('TWT', 'twt_ms'), ('Dip', 'buzamiento_grados'), ('Azi', 'azimut_grados'),
            ('Easting', 'este_m'), ('Northing', 'norte_m'), ('Intrp', 'interpretacion')]
    out = io.StringIO()
    w = csv.writer(out, lineterminator='\n')
    w.writerow([c for _, c in cols])
    for r in rows:
        w.writerow([r[k] for k, _ in cols])
    return out.getvalue(), len(rows)


def lite_grid() -> tuple[str, int, int]:
    out = io.StringIO()
    w = csv.writer(out, lineterminator='\n')
    w.writerow(['inline', 'crossline', 'este_m', 'norte_m', 'tope_hugin_tvdss_m'])
    total = kept = 0
    with open(os.path.join(FULL, 'mapas', 'Hugin_Fm_Top.csv'), newline='') as f:
        for r in csv.DictReader(f):
            total += 1
            il, xl = int(r['IL']), int(r['XL'])
            if il % GRID_STEP or xl % GRID_STEP:
                continue
            w.writerow([il, xl, f"{float(r['X']):.1f}", f"{float(r['Y']):.1f}", f"{float(r['Z']):.1f}"])
            kept += 1
    return out.getvalue(), total, kept


def lite_las() -> tuple[str, int]:
    """Cut the F-12 input LAS to LAS_CUT, drop the flags, keep LAS 2.0 valid."""
    src = open(os.path.join(FULL, 'perfiles', '15_9-F-12', 'WLC_PETRO_COMPUTED_INPUT_1.LAS')).read()
    lines = src.splitlines()
    a = next(i for i, l in enumerate(lines) if l.startswith('~A'))
    c = next(i for i, l in enumerate(lines) if l.startswith('~Curve'))
    curve_lines = [l for l in lines[c + 1:a] if l.strip() and not l.startswith('#')]
    mnems = [l.split('.')[0].strip() for l in curve_lines]
    keep = [i for i, m in enumerate(mnems) if m not in LAS_DROP]
    data = []
    for l in lines[a + 1:]:
        if not l.strip():
            continue
        v = l.split()
        if LAS_CUT[0] <= float(v[0]) <= LAS_CUT[1]:
            data.append([v[i] for i in keep])
    strt, stop = data[0][0], data[-1][0]

    head = []
    for l in lines[:c]:
        key = l.split('.')[0].strip()
        if key == 'STRT':
            l = f'STRT        .M             {float(strt):<28.4f}:START'
        elif key == 'STOP':
            l = f'STOP        .M             {float(stop):<28.4f}:STOP'
        head.append(l)
    curves = [lines[c], *[l for l in lines[c + 1:a] if l.startswith('#') and 'LOG MNEMONICS' not in l
                          and not l.startswith('#Depth') and not l.startswith('#M ')]]
    curves += [curve_lines[i] for i in keep]
    other = [
        '~Other Information',
        'Recorte del archivo WLC_PETRO_COMPUTED_INPUT_1.LAS de 15/9-F-12 (Volve, Equinor):',
        f'profundidades medidas de {LAS_CUT[0]:.0f} a {LAS_CUT[1]:.0f} m, sin las columnas '
        + ', '.join(sorted(LAS_DROP)) + '.',
        'Datos de Equinor y los ex socios de la licencia Volve (ExxonMobil Exploration & Production',
        'Norway AS, Bayerngas Norge AS), bajo la Equinor Open Data Licence:',
        'https://cdn.equinor.com/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf',
    ]
    widths = 11
    body = [''.join(f'{x:>{widths}}' for x in row) for row in data]
    text = '\n'.join([*head, *curves, *other, '~A  ' + ' '.join(mnems[i] for i in keep), *body]) + '\n'
    return text, len(data)


README = """# Volve, paquete liviano

Datos del campo Volve (mar del Norte noruego, en producción de 2008 a 2016), recortados para la
sesión 6 del curso de IA generativa para petróleo y gas. Alcanzan para pedirle a un agente
gratuito la ficha del pozo 15/9-F-12, un visor de sus perfiles y dos chequeos.

## Crédito y licencia

Datos de Equinor y los ex socios de la licencia Volve (ExxonMobil Exploration & Production
Norway AS, Bayerngas Norge AS), compartidos bajo la
[Equinor Open Data Licence](https://cdn.equinor.com/files/h61q9gi9/global/de6532f6134b9a953f6c41bac47a0c055a3712d3.pdf):
está permitido usarlos, adaptarlos y compartirlos con este crédito y el link a los términos, y
está prohibido venderlos. Estos archivos son una adaptación: se cambió el formato, se tradujeron
los nombres de columna y se recortaron o ralearon los datos, como se detalla abajo. Ni Equinor ni
sus socios participan del curso ni lo respaldan. Página oficial del conjunto de datos:
[Volve data sharing](https://www.equinor.com/energy/volve-data-sharing).

Los dos archivos `sodir_*` contienen datos bajo la Norwegian Licence for Open Government Data
([NLOD 2.0](https://data.norge.no/nlod/en/2.0)) distribuidos por la Norwegian Offshore Directorate
(Sokkeldirektoratet, Sodir), el registro oficial noruego. Se tomaron de sus
[FactPages](https://factpages.sodir.no/) el {sodir_date} y se filtraron al campo VOLVE, sin otro
cambio.

## Qué hay

| Archivo | Qué trae | Filas |
| --- | --- | --- |
| `produccion_mensual_por_pozo.csv` | Producción e inyección mensual de los 7 pozos que figuran en el archivo de producción del operador, de {prod_desde} a {prod_hasta} | {prod_n} |
| `topes_formacion.csv` | Topes de formación de 35 pozos: profundidad medida, vertical y bajo el nivel del mar, y coordenadas | {tops_n} |
| `{las}` | Perfiles de pozo de 15/9-F-12 en formato LAS 2.0, de {las_desde} a {las_hasta} m de profundidad medida | {las_n} |
| `{las_txt}` | El mismo archivo con extensión `.txt`, para las herramientas que no aceptan `.las`. No va en el zip | {las_n} |
| `grilla_tope_hugin_raleada.csv` | Profundidad del tope de la Formación Hugin, el reservorio, en una grilla: uno de cada tres puntos en cada dirección | {grid_n} |
| `sodir_volve_produccion_campo_mensual.csv` | Producción mensual del campo según Sodir, la fuente oficial noruega | {sodir_prod_n} |
| `sodir_volve_pozos.csv` | Los pozos de desarrollo del campo según Sodir: estado, propósito, fechas, profundidad final y coordenadas | {sodir_wells_n} |

## Diccionario de datos

**Siglas.** MD: profundidad medida a lo largo del pozo (measured depth), desde la mesa rotaria,
unos 55 m sobre el nivel del mar. TVD: profundidad vertical verdadera (true
vertical depth), desde la misma referencia. TVDSS: profundidad vertical bajo el nivel del mar
(true vertical depth subsea). Sm³: metro cúbico en condiciones estándar. LAS: Log ASCII Standard,
el formato de texto de los perfiles de pozo. UTM: proyección Universal Transversal de Mercator.
ED50 y WGS84: dos datums geodésicos, European Datum 1950 y World Geodetic System 1984.

### produccion_mensual_por_pozo.csv

Hoja "Monthly Production Data" del archivo `Volve production data.xlsx` del operador, en formato
largo.

| Columna | Qué es |
| --- | --- |
| `pozo` | Nombre del pozo tal como lo escribe el operador, por ejemplo `15/9-F-12` |
| `codigo_npd` | Código del pozo en el registro noruego |
| `anio`, `mes`, `periodo` | Año, mes y los dos juntos (`AAAA-MM`) |
| `horas_en_linea_h` | Horas en producción o inyección en el mes |
| `petroleo_sm3`, `gas_sm3`, `agua_sm3` | Volúmenes producidos en el mes |
| `gas_inyectado_sm3`, `agua_inyectada_sm3` | Volúmenes inyectados en el mes |

Una celda vacía es un `NULL` del original, un dato faltante: al sumar o promediar, se saltea.

### topes_formacion.csv

Archivo `Well_picks_Volve_v1.dat`, exportado de un proyecto de interpretación y pasado a CSV. Una
fila por tope y por observación: un pozo horizontal puede cruzar el mismo tope varias veces.

| Columna | Qué es |
| --- | --- |
| `pozo` | Nombre del pozo con el prefijo del país, por ejemplo `NO 15/9-F-12` |
| `superficie` | El tope, por ejemplo `Hugin Fm. VOLVE Top` |
| `observacion` | Número de cruce del tope en ese pozo (1, 2, …) |
| `calificador` | Vacío si el tope es normal. `ER` erosionado, `FP` tope por falla, `FO` cortado por falla, `NL` no perfilado, `NR` no alcanzado |
| `md_m`, `tvd_m` | Profundidad medida y vertical, en metros desde la mesa rotaria |
| `tvdss_m` | Profundidad vertical bajo el nivel del mar, en metros, **con signo negativo** |
| `twt_ms` | Tiempo doble de viaje sísmico, en milisegundos |
| `buzamiento_grados`, `azimut_grados` | Inclinación y dirección de la capa, cuando se midieron |
| `este_m`, `norte_m` | Coordenadas del tope en el pozo, en metros (UTM zona 31 norte, datum ED50) |
| `interpretacion` | Quién lo interpretó (todas `STAT`) |

### {las}

Archivo `WLC_PETRO_COMPUTED_INPUT_1.LAS` de 15/9-F-12, recortado de {las_desde} a {las_hasta} m de
profundidad medida (el original va de 239.9 a 4,186.7 m) y sin tres columnas de banderas de
interpretación. Muestra cada 0.1524 m (medio pie). Valor nulo: `-999.25`.

| Curva | Qué mide | Unidad |
| --- | --- | --- |
| `DEPTH` | Profundidad medida | m |
| `GR` | Rayos gamma (gamma ray): separa arcillas (alto) de arenas (bajo) | unidades API (American Petroleum Institute) |
| `RHOB` | Densidad de la roca | g/cm³ |
| `NPHI` | Porosidad neutrónica | fracción |
| `RT`, `RD`, `RS` | Resistividad verdadera, profunda y somera | ohm·m en `RT`; `RD` y `RS` sin unidad declarada |
| `DT` | Tiempo de tránsito sónico | µs/pie |
| `ROP5_RM` | Velocidad de perforación | sin unidad declarada |

### grilla_tope_hugin_raleada.csv

Archivo `Hugin_Fm_Top.csv` ({grid_total} puntos, uno cada 12.5 m), raleado a uno de cada tres en
inline y en crossline.

| Columna | Qué es |
| --- | --- |
| `inline`, `crossline` | Posición en la grilla sísmica |
| `este_m`, `norte_m` | Coordenadas (UTM zona 31 norte, datum ED50) |
| `tope_hugin_tvdss_m` | Profundidad del tope de Hugin bajo el nivel del mar, en metros, **positiva hacia abajo** |

### sodir_volve_*.csv

Las columnas conservan los nombres de Sodir. Las más usadas:

- Pozos: `wlbWellboreName` (nombre), `wlbStatus`, `wlbPurpose` (PRODUCTION, INJECTION,
  OBSERVATION), `wlbContent`, `wlbEntryDate` y `wlbCompletionDate` (`DD.MM.AAAA`),
  `wlbTotalDepth` (profundidad final medida, m), `wlbGeodeticDatum` (ED50), `wlbNsDecDeg` y
  `wlbEwDecDeg` (latitud y longitud de la boca de pozo), `wlbNsUtm` y `wlbEwUtm` (UTM).
- Producción: `prfYear`, `prfMonth`, `prfPrdOilNetMillSm3` (petróleo, millones de Sm³),
  `prfPrdGasNetBillSm3` (gas neto, miles de millones de Sm³),
  `prfPrdProducedWaterInFieldMillSm3` (agua producida, millones de Sm³).

## Antes de usarlos

- El mismo pozo se escribe distinto en cada archivo: `15/9-F-12`, `NO 15/9-F-12`, `15_9-F-12`.
  Las letras `A`, `B` o `T2` después del número nombran otra rama, con otros datos.
- Las coordenadas están en ED50. Un mapa web usa WGS84: sin convertirlas, los puntos quedan
  corridos más de cien metros.
- El paquete liviano recorta el perfil y ralea la grilla. Un chequeo que da bien acá vale para
  lo que quedó adentro: de F-12, solo el tramo de 2,680 a 3,600 m, y del resto de los pozos,
  ningún perfil.
- El paquete completo del curso suma la producción diaria, la grilla entera, la trayectoria de
  F-12 y otros tres perfiles. El conjunto original de Equinor tiene unos 40,000 archivos.
"""


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument('--refrescar', action='store_true', help='bajar todo de nuevo')
    args = ap.parse_args()

    print('Paquete completo:', FULL)
    fetch_all(args.refrescar)

    os.makedirs(LITE, exist_ok=True)
    prod_csv, prod_n = lite_production()
    tops_csv, tops_n = lite_tops()
    grid_csv, grid_total, grid_n = lite_grid()
    las_txt, las_n = lite_las()

    files = {
        'produccion_mensual_por_pozo.csv': prod_csv,
        'topes_formacion.csv': tops_csv,
        LAS_LITE: las_txt,
        'grilla_tope_hugin_raleada.csv': grid_csv,
    }
    for name in ('sodir_volve_produccion_campo_mensual.csv', 'sodir_volve_pozos.csv'):
        files[name] = open(os.path.join(FULL, 'sodir', name), encoding='utf-8').read()

    periods = sorted({l.split(',')[4] for l in prod_csv.splitlines()[1:]})
    las_rows = [l.split() for l in las_txt.splitlines() if l[:1] == ' ' and l.split()[0][0].isdigit()]
    sodir_raw = os.path.join(SODIR_RAW, 'field_production_monthly.csv')
    sodir_date = datetime.fromtimestamp(os.path.getmtime(sodir_raw), timezone.utc).date().isoformat()
    files['README.md'] = README.format(
        sodir_date=sodir_date, prod_desde=periods[0], prod_hasta=periods[-1], prod_n=f'{prod_n:,}',
        tops_n=f'{tops_n:,}', las=LAS_LITE, las_txt=LAS_TXT, las_desde=f'{float(las_rows[0][0]):,.1f}',
        las_hasta=f'{float(las_rows[-1][0]):,.1f}', las_n=f'{las_n:,}', grid_n=f'{grid_n:,}',
        grid_total=f'{grid_total:,}',
        sodir_prod_n=f"{files['sodir_volve_produccion_campo_mensual.csv'].count(chr(10)) - 1:,}",
        sodir_wells_n=f"{files['sodir_volve_pozos.csv'].count(chr(10)) - 1:,}",
    )

    for name, text in [*files.items(), (LAS_TXT, las_txt)]:
        with open(os.path.join(LITE, name), 'w', encoding='utf-8', newline='\n') as f:
            f.write(text)

    zpath = os.path.join(LITE, 'volve_liviano.zip')
    with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for name in files:
            info = zipfile.ZipInfo(f'volve_liviano/{name}', date_time=(2026, 9, 28, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            z.writestr(info, files[name].encode('utf-8'))

    try:
        import lasio
        las = lasio.read(os.path.join(LITE, LAS_LITE))
        print(f'  lasio lee el recorte: {len(las.curves)} curvas, {len(las.index):,} muestras, '
              f'{las.index[0]:.1f} a {las.index[-1]:.1f} m')
    except ImportError:
        print('  (lasio no está: no se releyó el LAS)')

    print('Paquete completo (10 archivos):')
    total = 0
    for rel, _, _ in MIRRORED:
        p = os.path.join(FULL, rel)
        total += os.path.getsize(p)
        print(f'  {rel:<55} {os.path.getsize(p) / 1024:>9,.0f} KB')
    for _, _, name in SODIR:
        p = os.path.join(FULL, 'sodir', name)
        total += os.path.getsize(p)
        print(f'  sodir/{name:<49} {os.path.getsize(p) / 1024:>9,.0f} KB  sha256 {sha256(p)[:12]}')
    print(f'  total {total / 1e6:.1f} MB')
    print(f'Paquete liviano: {LITE}')
    total = 0
    for name in [*files, LAS_TXT, 'volve_liviano.zip']:
        p = os.path.join(LITE, name)
        total += os.path.getsize(p)
        print(f'  {name:<45} {os.path.getsize(p) / 1024:>7,.0f} KB')
    print(f'  total {total / 1e6:.2f} MB (producción {prod_n} filas, topes {tops_n}, '
          f'LAS {las_n} muestras, grilla {grid_n:,} de {grid_total:,})')
    return 0


if __name__ == '__main__':
    sys.exit(main())
