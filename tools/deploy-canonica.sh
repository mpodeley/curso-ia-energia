#!/usr/bin/env bash
# Publica dist/ en la canónica (mpodeley.github.io/curso-ia-energia).
#
# El CI de este repo solo publica el respaldo de la org (su token no escribe en
# la cuenta personal); la canónica se publica con este script, decisión del
# 10-ago-2026: a mano por ahora. Si algún día se quiere automatizar, el paso ya
# existe en deploy.yml y se activa creando el secret ACTIONS_DEPLOY_KEY.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
[ -f "$ROOT/dist/index.html" ] || { echo "No hay dist/: corré npm run build primero." >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp -r "$ROOT/dist/." "$TMP"
cd "$TMP"
git init -q -b gh-pages
git add -A
git commit -q -m "Publicar sitio (fuente $(git -C "$ROOT" rev-parse --short HEAD))"
git push -q --force https://github.com/mpodeley/curso-ia-energia.git gh-pages
echo "OK: https://mpodeley.github.io/curso-ia-energia/"
