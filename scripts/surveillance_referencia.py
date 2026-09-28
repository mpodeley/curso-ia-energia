#!/usr/bin/env python
"""Reference surveillance workbook for session 3, built from the committed CSV.

The session-3 page prints a prompt that asks a chatbot for a surveillance
workbook on public/descargas/campos_capiv_2006_2026.csv. This script implements
the same rules, so the prompt and this file are two copies of one contract:
change both or neither.

Rules (conventional rows only; last month = the last month in the file):
- rate = oil of the month / calendar days of the month (m³/d);
- recent = the last 3 months; base = the 12 months before them;
- oil change = recent rate / base rate - 1: red at -15% or worse, yellow at -5%;
- WOR (RAP) = water / oil over each window: red if it rises 15% or more, yellow at 5%;
- Np = cumulative conventional oil since 2006-01 (the series starts there);
- light = the worse of the two; data notes: missing months in the series and an
  operator change in the last 24 months.

    uv run --with openpyxl python scripts/surveillance_referencia.py

Outputs: public/descargas/surveillance_referencia.xlsx (committed, plan B for the
workshop) and scripts/_cache/surveillance_respuestas.json (the answer key).
"""

from __future__ import annotations

import calendar
import csv
import json
import os
from collections import defaultdict

from openpyxl import Workbook
from openpyxl.chart import Reference, ScatterChart, Series
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Font, PatternFill

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'public', 'descargas', 'campos_capiv_2006_2026.csv')
OUT = os.path.join(HERE, '..', 'public', 'descargas', 'surveillance_referencia.xlsx')
KEY = os.path.join(HERE, '_cache', 'surveillance_respuestas.json')

ROJO, AMARILLO = 0.15, 0.05


def dias(mes: str) -> int:
    y, m = map(int, mes.split('-'))
    return calendar.monthrange(y, m)[1]


def meses_entre(a: str, b: str) -> list[str]:
    y, m = map(int, a.split('-'))
    out = []
    while f'{y}-{m:02d}' <= b:
        out.append(f'{y}-{m:02d}')
        m += 1
        if m == 13:
            y, m = y + 1, 1
    return out


def leer():
    filas = list(csv.DictReader(open(SRC, encoding='utf-8')))
    serie = defaultdict(dict)  # campo -> mes -> (pet, agua, iny, operadora)
    for f in filas:
        if f['tipo_recurso'] != 'convencional':
            continue
        serie[f['campo']][f['mes']] = (
            float(f['petroleo_m3']), float(f['agua_m3']), float(f['iny_agua_m3']), f['operadora'])
    campos = list(dict.fromkeys(f['campo'] for f in filas))
    return filas, serie, campos


def evaluar(serie, campos):
    ultimo = max(m for c in serie.values() for m in c)
    todos = meses_entre('2006-01', ultimo)
    reciente, base = todos[-3:], todos[-15:-3]
    out = []
    for campo in campos:
        s = serie[campo]

        def ventana(ms):
            pet = sum(s[m][0] for m in ms if m in s)
            agua = sum(s[m][1] for m in ms if m in s)
            d = sum(dias(m) for m in ms if m in s)
            return pet / d, (agua / pet if pet else float('nan'))

        q_rec, rap_rec = ventana(reciente)
        q_base, rap_base = ventana(base)
        dq = q_rec / q_base - 1
        drap = rap_rec / rap_base - 1
        luz_q = 'rojo' if dq <= -ROJO else 'amarillo' if dq <= -AMARILLO else 'verde'
        luz_rap = 'rojo' if drap >= ROJO else 'amarillo' if drap >= AMARILLO else 'verde'
        orden = ['verde', 'amarillo', 'rojo']
        luz = max(luz_q, luz_rap, key=orden.index)
        faltan = [m for m in meses_entre(min(s), ultimo) if m not in s]
        ops = [s[m][3] for m in todos[-24:] if m in s]
        cambio = list(dict.fromkeys(ops)) if len(set(ops)) > 1 else []
        out.append({
            'campo': campo,
            'operadora': s[ultimo][3],
            'ultimo_mes': ultimo,
            'q_reciente_m3d': round(q_rec, 1),
            'q_base_m3d': round(q_base, 1),
            'cambio_petroleo_pct': round(100 * dq, 1),
            'rap_reciente': round(rap_rec, 2),
            'rap_base': round(rap_base, 2),
            'cambio_rap_pct': round(100 * drap, 1),
            'np_desde_2006_m3': round(sum(v[0] for v in s.values())),
            'semaforo': luz,
            'meses_faltantes': faltan,
            'cambio_operadora_24m': cambio,
        })
    return out, reciente, base


def libro(filas, serie, campos, res, reciente, base):
    wb = Workbook()
    ley = wb.active
    ley.title = 'Léeme'
    texto = [
        'Surveillance de campos maduros: planilla de referencia del curso (sesión 3).',
        'Fuente: Capítulo IV agrupado por yacimiento y formación, Secretaría de Energía (datos.energia.gob.ar, CC BY 4.0).',
        'Solo producción convencional. Np es la acumulada desde enero de 2006, cuando empieza la serie; los campos más viejos traen producción anterior.',
        f'Ventana reciente: {reciente[0]} a {reciente[-1]}. Base: {base[0]} a {base[-1]}.',
        'Caudal = petróleo del mes / días del mes. Caída de petróleo: rojo si es de 15% o más, amarillo desde 5%.',
        'RAP = agua / petróleo en cada ventana. Rojo si sube 15% o más, amarillo desde 5%. El semáforo es el peor de los dos.',
        'Para sumar un mes: pegá las filas nuevas al final de la hoja Datos y cambiá la celda B1 de la hoja Resumen.',
    ]
    for i, t in enumerate(texto, 1):
        ley.cell(row=i, column=1, value=t)
    ley.column_dimensions['A'].width = 140

    datos = wb.create_sheet('Datos')
    enc = list(filas[0])
    # dias and idx are formulas so a pasted month computes itself. idx = year*12 +
    # month - 1 keeps every SUMIFS criterion numeric: a text month like "2026-05"
    # inside a criterion gets parsed as a date by some Excel locales.
    datos.append(enc + ['dias', 'idx'])
    for i, f in enumerate(filas, 2):
        datos.append([f['campo'], f['cuenca'], f['operadora'], f['tipo_recurso'], f['mes'],
                      float(f['petroleo_m3']), float(f['agua_m3']), float(f['iny_agua_m3']),
                      f'=DAY(EOMONTH(DATE(VALUE(LEFT(E{i},4)),VALUE(RIGHT(E{i},2)),1),0))',
                      f'=VALUE(LEFT(E{i},4))*12+VALUE(RIGHT(E{i},2))-1'])
    n = len(filas) + 1
    rng = {c: f'Datos!${c}$2:${c}${n}' for c in 'ADFGIJ'}

    r = wb.create_sheet('Resumen', 1)
    mes = '=INT(({x})/12)&"-"&RIGHT("0"&(MOD({x},12)+1),2)'
    r['A1'], r['B1'] = 'Último mes (AAAA-MM)', res[0]['ultimo_mes']
    r['C1'], r['D1'] = 'índice', '=VALUE(LEFT(B1,4))*12+VALUE(RIGHT(B1,2))-1'
    r['A2'], r['B2'] = 'Ventana reciente', mes.format(x='$D$1-2')
    r['C2'], r['D2'] = 'a', '=B1'
    r['A3'], r['B3'] = 'Base', mes.format(x='$D$1-14')
    r['C3'], r['D3'] = 'a', mes.format(x='$D$1-3')
    cab = ['Campo', 'Operadora', 'Petróleo reciente (m³/d)', 'Petróleo base (m³/d)', 'Cambio petróleo',
           'RAP reciente', 'RAP base', 'Cambio RAP', 'Np desde 2006 (m³)', 'Semáforo', 'Revisar dato']
    r.append([])
    r.append(cab)
    for c in r[5]:
        c.font = Font(bold=True)
    fila0 = 6
    for j, x in enumerate(res):
        k = fila0 + j
        crit = f'{rng["A"]},$A{k},{rng["D"]},"convencional"'
        rec = f'{rng["J"]},">="&($D$1-2),{rng["J"]},"<="&$D$1'
        bas = f'{rng["J"]},">="&($D$1-14),{rng["J"]},"<="&($D$1-3)'
        nota = []
        if x['meses_faltantes']:
            nota.append('falta ' + ', '.join(x['meses_faltantes']))
        if x['cambio_operadora_24m']:
            nota.append('cambió de operadora: ' + ' → '.join(x['cambio_operadora_24m']))
        r.append([
            x['campo'], x['operadora'],
            f'=SUMIFS({rng["F"]},{crit},{rec})/SUMIFS({rng["I"]},{crit},{rec})',
            f'=SUMIFS({rng["F"]},{crit},{bas})/SUMIFS({rng["I"]},{crit},{bas})',
            f'=C{k}/D{k}-1',
            f'=SUMIFS({rng["G"]},{crit},{rec})/SUMIFS({rng["F"]},{crit},{rec})',
            f'=SUMIFS({rng["G"]},{crit},{bas})/SUMIFS({rng["F"]},{crit},{bas})',
            f'=F{k}/G{k}-1',
            f'=SUMIFS({rng["F"]},{crit},{rng["J"]},"<="&$D$1)',
            f'=IF(OR(E{k}<=-0.15,H{k}>=0.15),"rojo",IF(OR(E{k}<=-0.05,H{k}>=0.05),"amarillo","verde"))',
            '; '.join(nota),
        ])
        for col, fmt in (('C', '0.0'), ('D', '0.0'), ('E', '0.0%'), ('F', '0.00'), ('G', '0.00'),
                         ('H', '0.0%'), ('I', '#,##0')):
            r[f'{col}{k}'].number_format = fmt
    ult = fila0 + len(res) - 1
    for palabra, color in (('rojo', 'F4C7C3'), ('amarillo', 'FCE8B2'), ('verde', 'B7E1CD')):
        r.conditional_formatting.add(f'J{fila0}:J{ult}', CellIsRule(
            operator='equal', formula=[f'"{palabra}"'], fill=PatternFill('solid', fgColor=color)))
    for col, w in zip('ABCDEFGHIJK', (28, 34, 14, 14, 12, 11, 11, 11, 16, 10, 60)):
        r.column_dimensions[col].width = w

    g = wb.create_sheet('RAP vs Np')
    g.append(['Campo', 'Mes', 'Petróleo (m³)', 'Agua (m³)', 'Np desde 2006 (m³)', 'RAP'])
    fila = 2
    graf_fila = 1
    for campo in campos:
        s = serie[campo]
        ini = fila
        for mes in sorted(s):
            pet, agua = s[mes][0], s[mes][1]
            prev = f'E{fila - 1}+' if fila > ini else ''
            g.append([campo, mes, pet, agua, f'={prev}C{fila}', f'=IF(C{fila}>0,D{fila}/C{fila},NA())'])
            fila += 1
        ch = ScatterChart()
        ch.title = f'{campo}: RAP contra Np'
        ch.style = 13
        ch.x_axis.title = 'Np desde 2006 (m³)'
        ch.y_axis.title = 'RAP (agua / petróleo)'
        ch.y_axis.scaling.logBase = 10
        ch.legend = None
        ser = Series(Reference(g, min_col=6, min_row=ini, max_row=fila - 1),
                     Reference(g, min_col=5, min_row=ini, max_row=fila - 1), title=campo)
        ser.marker.symbol = 'circle'
        ser.marker.size = 3
        ser.graphicalProperties.line.noFill = True
        ch.series.append(ser)
        ch.height, ch.width = 7.5, 15
        g.add_chart(ch, f'H{graf_fila}')
        graf_fila += 16
    wb.save(OUT)


def main() -> None:
    filas, serie, campos = leer()
    res, reciente, base = evaluar(serie, campos)
    libro(filas, serie, campos, res, reciente, base)
    os.makedirs(os.path.dirname(KEY), exist_ok=True)
    json.dump({'reciente': reciente, 'base': base, 'campos': res}, open(KEY, 'w'), ensure_ascii=False, indent=1)
    print(f'{OUT}: {os.path.getsize(OUT):,} bytes')
    print(f'reciente {reciente[0]}..{reciente[-1]}, base {base[0]}..{base[-1]}')
    for x in res:
        print(f"{x['campo']:28} {x['semaforo']:8} petróleo {x['cambio_petroleo_pct']:+6.1f}% "
              f"({x['q_base_m3d']:.1f} → {x['q_reciente_m3d']:.1f} m³/d)  RAP {x['rap_base']:.2f} → "
              f"{x['rap_reciente']:.2f} ({x['cambio_rap_pct']:+.1f}%)  Np {x['np_desde_2006_m3']:,}  "
              f"{x['meses_faltantes'] or ''} {x['cambio_operadora_24m'] or ''}")


if __name__ == '__main__':
    main()
