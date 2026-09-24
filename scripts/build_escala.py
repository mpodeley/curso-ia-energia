"""Build public/data/escala.json: training compute of notable AI models over time.

Source: Epoch AI, "Notable AI Models" (CC BY), the public CSV behind
https://epoch.ai/data/ai-models. The CSV is cached in scripts/_cache/ on the first
run; delete it to refresh. Only models with a training-compute estimate ship, in
the domains the session-2 chart talks about.

Usage: python scripts/build_escala.py
"""

import csv
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from _meta import write_json

ROOT = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
CACHE = os.path.join(os.path.dirname(__file__), '_cache', 'epoch_notable_ai_models.csv')
URL = 'https://epoch.ai/data/notable_ai_models.csv'

# Epoch's first-listed domain → the label the chart shows. Biology, robotics,
# earth science and the rest stay out: the session is about language and vision.
DOMINIOS = {
    'Language': 'Lenguaje',
    'Vision': 'Visión',
    'Multimodal': 'Multimodal',
    'Games': 'Juegos',
    'Speech': 'Habla',
    'Image generation': 'Generación de imágenes',
}

CONFIANZA = {
    'Confident': 'confiable',
    'Likely': 'probable',
    'Speculative': 'especulativa',
}

# Models labeled on the chart: the thread of sessions 1 and 2. Keys are Epoch's
# model names, values the short label. "Zip CNN" is LeCun's 1989 Bell Labs network,
# the one the course calls LeNet 1989. The last three are the most recent frontier
# models whose estimate Epoch rates at least "Likely" and links to a public source.
DESTACADOS = {
    'Zip CNN': 'LeNet, 1989',
    'AlexNet': 'AlexNet',
    'Transformer': 'Transformer',
    'GPT-1': 'GPT-1',
    'BERT-Large': 'BERT',
    'GPT-2 (1.5B)': 'GPT-2',
    'GPT-3 175B (davinci)': 'GPT-3',
    'GPT-4 (Mar 2023)': 'GPT-4',
    'Llama 3.1-405B': 'Llama 3.1',
    'Claude 3.7 Sonnet': 'Claude 3.7 Sonnet',
    'GPT-4.5': 'GPT-4.5',
}


def descargar():
    if os.path.exists(CACHE):
        return
    os.makedirs(os.path.dirname(CACHE), exist_ok=True)
    req = urllib.request.Request(URL, headers={'User-Agent': 'curso-ia-energia/build_escala'})
    with urllib.request.urlopen(req, timeout=60) as r, open(CACHE, 'wb') as f:
        f.write(r.read())


def numero(s):
    s = (s or '').strip()
    return float(s) if s else None


def main():
    descargar()
    with open(CACHE, encoding='utf-8') as f:
        filas = list(csv.DictReader(f))

    data = []
    faltan = set(DESTACADOS)
    for x in filas:
        flop = numero(x['Training compute (FLOP)'])
        dominio = DOMINIOS.get(x['Domain'].split(',')[0].strip())
        if flop is None or dominio is None:
            continue
        fila = {
            'modelo': x['Model'].strip(),
            'organizacion': x['Organization'].strip(),
            'fecha': x['Publication date'].strip()[:10],
            'flop': flop,
            'parametros': numero(x['Parameters']),
            'dominio': dominio,
            'confianza': CONFIANZA.get(x['Confidence'].strip(), 'sin dato'),
        }
        if fila['modelo'] in DESTACADOS:
            fila['destacado'] = True
            fila['etiqueta'] = DESTACADOS[fila['modelo']]
            faltan.discard(fila['modelo'])
        data.append(fila)

    if faltan:
        sys.exit(f'Faltan destacados en el CSV de Epoch: {sorted(faltan)}')

    data.sort(key=lambda d: (d['fecha'], d['modelo']))
    write_json(
        os.path.join(ROOT, 'escala.json'),
        data,
        source='Epoch AI, "Notable AI Models" (licencia CC BY), https://epoch.ai/data/ai-models. '
        'El cómputo de entrenamiento es una estimación de Epoch; cada modelo lleva su nivel de '
        'confianza.',
        source_date=max(d['fecha'] for d in data)[:7],
    )
    print(f'escala.json: {len(data)} modelos, {data[0]["fecha"]} a {data[-1]["fecha"]}')


if __name__ == '__main__':
    main()
