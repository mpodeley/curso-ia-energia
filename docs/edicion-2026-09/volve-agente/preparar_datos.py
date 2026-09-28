"""Build the working folder for the live agent demo of session 6 (Volve).

Copies the agent's instructions (CLAUDE.md, PEDIDO.md, .claude/settings.json)
and the FULL Volve bundle (ten files, ~16 MB) from scripts/_cache/volve/completo/
into a folder OUTSIDE the repo, with an empty salida/ for the agent to write into.

Why outside the repo: Claude Code loads every CLAUDE.md from the working
directory up to the filesystem root. Run inside docs/edicion-2026-09/, the
agent would also read the repo's CLAUDE.md (the course site's instructions),
which has nothing to do with the dashboard.

Why a copy of the cache and not a download: the demo must not depend on
GitHub mirrors or on Sodir being up during class. The files are copied byte
for byte, so their hashes identify the exact cut the numbers in README.md and
scripts/_cache/volve_checks.json were computed on.

    python3 preparar_datos.py                        # -> ~/volve-agente-vivo
    python3 preparar_datos.py ~/volve-agente-ensayo
    python3 preparar_datos.py ~/volve-agente-vivo --limpiar   # wipe salida/ first

If the cache is missing: uv run --with openpyxl --with lasio python scripts/build_volve_bundle.py

Standard library only. scripts/volve_checks.py (the answer key) is never copied.
"""

from __future__ import annotations

import argparse
import hashlib
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
BUNDLE = REPO / "scripts" / "_cache" / "volve" / "completo"
AGENT_FILES = ("CLAUDE.md", "PEDIDO.md", ".claude/settings.json")
DEFAULT_DEST = Path.home() / "volve-agente-vivo"
EXPECTED_FILES = 10


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
        print("Elegí una carpeta afuera, por ejemplo ~/volve-agente-vivo.")
        return 1
    files = sorted(p for p in BUNDLE.rglob("*") if p.is_file()) if BUNDLE.exists() else []
    if len(files) != EXPECTED_FILES:
        print(f"En {BUNDLE} hay {len(files)} archivos y se esperan {EXPECTED_FILES}.")
        print("Se generan con: uv run --with openpyxl --with lasio python scripts/build_volve_bundle.py")
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
    datos = dest / "datos"
    if datos.exists():
        shutil.rmtree(datos)
    for src in files:
        target = datos / src.relative_to(BUNDLE)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, target)
    out.mkdir(exist_ok=True)

    print(f"Carpeta lista: {dest}")
    total = 0
    for rel in AGENT_FILES:
        p = dest / rel
        print(f"  {rel:<58} {p.stat().st_size / 1024:>8,.0f} KB")
    for src in files:
        p = datos / src.relative_to(BUNDLE)
        total += p.stat().st_size
        print(f"  {str(p.relative_to(dest)):<58} {p.stat().st_size / 1024:>8,.0f} KB  sha256 {sha256(p)[:12]}")
    print(f"  salida/ vacía")
    print(f"Datos: {len(files)} archivos, {total / 1e6:.1f} MB")
    print(f"Siguiente: cd {dest} && claude")
    return 0


if __name__ == "__main__":
    sys.exit(main())
