#!/usr/bin/env python
"""Check every external link the site shows, and that the metadata we claim
about each YouTube video matches reality.

A course that spends a session on verifying sources cannot ship a dead link or
an invented duration. Run this before publishing, and whenever the VERIFICADO
date in src/content/recursos.ts gets stale:

    python scripts/check_links.py

Exits non-zero if anything is broken or drifted.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'src')

UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36'

# Sites that answer 403 to any non-browser client. Their liveness cannot be
# checked from here; they are listed so the report says so out loud instead of
# quietly passing them.
ANTIBOT = ('chatgpt.com', 'claude.ai', 'platform.openai.com')


def curl(url: str, head: bool = False) -> tuple[int, str]:
    cmd = ['curl', '-sL', '-A', UA, '--max-time', '30']
    if head:
        cmd += ['-o', '/dev/null', '-w', '%{http_code}']
    r = subprocess.run(cmd + [url], capture_output=True, text=True)
    return (int(r.stdout.strip() or 0), '') if head else (0, r.stdout)


def video_id(url: str) -> str | None:
    m = re.search(r'[?&]v=([A-Za-z0-9_-]{11})', url)
    return m.group(1) if m else None


def datos_video(vid: str) -> dict | None:
    """Real title, channel and duration straight from the watch page."""
    _, html = curl(f'https://www.youtube.com/watch?v={vid}')
    m = re.search(r'ytInitialPlayerResponse\s*=\s*(\{.*?\});', html, re.S)
    if not m:
        return None
    try:
        d = json.loads(m.group(1)).get('videoDetails', {})
    except json.JSONDecodeError:
        return None
    if not d.get('title'):
        return None
    seg = int(d.get('lengthSeconds') or 0)
    return {
        'titulo': d['title'],
        'canal': d.get('author', ''),
        'duracion': f'{seg // 60}:{seg % 60:02d}',
    }


def recursos_declarados() -> list[dict]:
    """Parse the entries out of recursos.ts without needing a TS runtime."""
    texto = open(os.path.join(SRC, 'content', 'recursos.ts'), encoding='utf-8').read()
    entradas = []
    # Entries live at two indentation levels: inside RECURSOS[n] and at the top
    # level of INTERPRETABILIDAD. Match both, or half of them go unchecked.
    for bloque in re.findall(r'\{\s*tipo:.*?\n\s{2,6}\}', texto, re.S):
        campo = lambda k: (  # noqa: E731
            m.group(1) if (m := re.search(rf"{k}:\s*'((?:[^'\\]|\\.)*)'", bloque, re.S)) else None
        )
        entradas.append({
            'titulo': (campo('titulo') or '').replace("\\'", "'"),
            'url': campo('url'),
            'fuente': campo('fuente'),
            'duracion': campo('duracion'),
        })
    return [e for e in entradas if e['url']]


def otros_links() -> list[tuple[str, str]]:
    """Plain hrefs from the resources page and the session prose."""
    fuera = []
    objetivos = [os.path.join(SRC, 'pages', 'RecursosPage.tsx')]
    contenido = os.path.join(SRC, 'content')
    objetivos += [
        os.path.join(contenido, f) for f in os.listdir(contenido) if f.endswith('.mdx')
    ]
    for ruta in objetivos:
        texto = open(ruta, encoding='utf-8').read()
        for url in re.findall(r'https?://[^\s"\')\]]+', texto):
            fuera.append((os.path.basename(ruta), url.rstrip('.,')))
    return fuera


def main() -> int:
    problemas = 0
    declarados = recursos_declarados()
    print(f'recursos declarados en recursos.ts: {len(declarados)}\n')

    for r in declarados:
        vid = video_id(r['url'])
        if vid:
            real = datos_video(vid)
            if not real:
                print(f'  ROTO      {r["url"]}\n            no se pudo leer el video')
                problemas += 1
                continue
            avisos = []
            if r['duracion'] and r['duracion'] != real['duracion']:
                avisos.append(f'duración declarada {r["duracion"]} vs real {real["duracion"]}')
            # The title we show is edited for the site; check it is not a
            # different video by comparing the channel, which we never edit.
            if r['fuente'] and real['canal'] and real['canal'].lower() not in r['fuente'].lower():
                avisos.append(f'canal declarado "{r["fuente"]}" vs real "{real["canal"]}"')
            if avisos:
                print(f'  DIFIERE   {real["titulo"][:60]}')
                for a in avisos:
                    print(f'            {a}')
                problemas += 1
            else:
                print(f'  ok        [{real["duracion"]:>5}] {real["canal"][:22]:24s} {real["titulo"][:48]}')
        else:
            host = urllib.parse.urlparse(r['url']).netloc
            if any(h in host for h in ANTIBOT):
                print(f'  sin chequear (anti-bot)  {r["url"]}')
                continue
            code, _ = curl(r['url'], head=True)
            if code >= 400 or code == 0:
                print(f'  ROTO      {code}  {r["url"]}')
                problemas += 1
            else:
                print(f'  ok        {code}  {r["url"]}')

    print('\nlinks sueltos en páginas y prosa:')
    vistos = set()
    for archivo, url in otros_links():
        if url in vistos:
            continue
        vistos.add(url)
        host = urllib.parse.urlparse(url).netloc
        if any(h in host for h in ANTIBOT):
            print(f'  sin chequear (anti-bot)  {url}')
            continue
        code, _ = curl(url, head=True)
        if code >= 400 or code == 0:
            print(f'  ROTO      {code}  {url}  ({archivo})')
            problemas += 1
        else:
            print(f'  ok        {code}  {url}')

    print()
    if problemas:
        print(f'{problemas} link(s) con problemas.')
    else:
        print('Todo en pie. Actualizá VERIFICADO en src/content/recursos.ts.')
    return 1 if problemas else 0


if __name__ == '__main__':
    sys.exit(main())
