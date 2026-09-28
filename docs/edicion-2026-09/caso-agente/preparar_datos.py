"""Build the working folder for the live agent demo of session 6.

Copies the agent's instructions (CLAUDE.md, PEDIDO.md, .claude/settings.json)
and the two Capítulo IV Noroeste cache files into a folder OUTSIDE the repo,
with an empty salida/ for the agent to write into.

Why outside the repo: Claude Code loads every CLAUDE.md from the working
directory up to the filesystem root. Run inside docs/edicion-2026-09/, the
agent would also read the repo's CLAUDE.md (the course site's instructions),
which has nothing to do with the screening.

Why a copy of the cache and not a download: the demo must not depend on the
Secretaría de Energía's site being up during class. The files are copied
byte for byte, so their hashes identify the exact cut the numbers in
README.md were computed on.

    python3 preparar_datos.py                     # -> ~/caso-agente-vivo
    python3 preparar_datos.py ~/caso-agente-ensayo
    python3 preparar_datos.py ~/caso-agente-vivo --limpiar   # wipe salida/ first

Standard library only. referencia.py (the answer key) is never copied.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
CACHE = REPO / "scripts" / "_cache"
DATA_FILES = ("capiv_noroeste_oil_monthly.csv", "capiv_noroeste_oil_wells.json")
AGENT_FILES = ("CLAUDE.md", "PEDIDO.md", ".claude/settings.json")
DEFAULT_DEST = Path.home() / "caso-agente-vivo"


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("destino", nargs="?", type=Path, default=DEFAULT_DEST)
    ap.add_argument("--limpiar", action="store_true",
                    help="borrar salida/ si ya tiene archivos (para repetir un ensayo)")
    args = ap.parse_args()
    dest: Path = args.destino.expanduser().resolve()

    if dest == REPO or REPO in dest.parents:
        print(f"El destino {dest} está dentro del repo: el agente leería el CLAUDE.md del sitio.")
        print("Elegí una carpeta afuera, por ejemplo ~/caso-agente-vivo.")
        return 1
    missing = [f for f in DATA_FILES if not (CACHE / f).exists()]
    if missing:
        print(f"Faltan en {CACHE}: {', '.join(missing)}")
        print("Se generan con: python scripts/fetch_capiv_noroeste.py (baja unos 2.5 GB).")
        return 1

    out = dest / "salida"
    if out.exists() and any(out.iterdir()):
        if not args.limpiar:
            print(f"{out} ya tiene archivos (¿un ensayo anterior?). Usá --limpiar o otro destino.")
            return 1
        shutil.rmtree(out)

    for rel in AGENT_FILES:
        target = dest / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(HERE / rel, target)
    (dest / "datos").mkdir(parents=True, exist_ok=True)
    for name in DATA_FILES:
        shutil.copyfile(CACHE / name, dest / "datos" / name)
    out.mkdir(exist_ok=True)

    monthly = dest / "datos" / DATA_FILES[0]
    with monthly.open(encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))
    wells = json.loads((dest / "datos" / DATA_FILES[1]).read_text(encoding="utf-8"))
    months = sorted({r["ym"] for r in rows})

    print(f"Carpeta lista: {dest}")
    for rel in (*AGENT_FILES, *(f"datos/{n}" for n in DATA_FILES)):
        p = dest / rel
        print(f"  {rel:<42} {p.stat().st_size / 1024:>8,.0f} KB  sha256 {sha256(p)[:12]}")
    print(f"  salida/ vacía")
    print(f"Datos: {len(wells):,} pozos en el padrón, {len(rows):,} filas mensuales, "
          f"{months[0]} a {months[-1]}")
    print(f"Siguiente: cd {dest} && claude")
    return 0


if __name__ == "__main__":
    sys.exit(main())
