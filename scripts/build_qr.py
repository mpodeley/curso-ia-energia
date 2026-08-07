"""Regenerate the brochure QR from the course URL.

The QR used to be a one-off made by hand, which meant that moving the site
from one GitHub Pages account to another silently left a printed brochure
pointing at a dead address. It is thirty lines of code — it should be
reproducible. Requires: pip install segno

The colors mirror the LIGHT tokens of src/styles/tokens.css, same reason as
docs/brochure/brochure.html: print never resolves var().

Usage: python scripts/build_qr.py   (then npm run build to redo the PDF)
"""

import os

import segno

URL = 'https://podeley.github.io/curso-energia-ypfb/'
SALIDA = os.path.join(os.path.dirname(__file__), '..', 'docs', 'brochure', 'qr-curso.png')

OSCURO = '#16181d'  # --pd-near-black
CLARO = '#ffffff'
LADO = 420  # px; the brochure prints it at 26 mm, so this is ~410 dpi
BORDE = 2  # quiet zone, in modules


def main() -> None:
    # error='m' keeps the symbol small enough to stay legible from a seat in
    # the back while still surviving a fold across the printed page.
    qr = segno.make(URL, error='m')
    modulos = qr.symbol_size(border=BORDE)[0]
    escala = LADO // modulos

    qr.save(SALIDA, scale=escala, border=BORDE, dark=OSCURO, light=CLARO)
    lado = modulos * escala
    print(f'{os.path.normpath(SALIDA)}  {lado}x{lado} px  ->  {URL}')


if __name__ == '__main__':
    main()
