#!/usr/bin/env bash
# ==============================================================================
# MACLOVIA. Belleza Maldita — Vanilla Distribution Verification & Package Script
# ==============================================================================
set -euo pipefail

DIST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="${DIST_DIR}/../dist-vanilla-packages"

echo "🌸 MACLOVIA. Belleza Maldita — Verificando Vanilla Distribution..."

# 1. Verificar existencia de archivos fundamentales
required_files=(
  "${DIST_DIR}/index.html"
  "${DIST_DIR}/css/style.css"
  "${DIST_DIR}/assets/icons/sprite.svg"
  "${DIST_DIR}/js/main.js"
  "${DIST_DIR}/js/i18n.js"
  "${DIST_DIR}/js/mockups.js"
  "${DIST_DIR}/js/data/team.js"
  "${DIST_DIR}/js/data/projects.js"
  "${DIST_DIR}/js/data/translations.js"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "❌ Error: Archivo faltante: $file"
    exit 1
  fi
done
echo "✅ Todos los archivos fundamentales están presentes."

# 2. Validar sintaxis JS
echo "🔍 Validando sintaxis de JavaScript..."
node --check "${DIST_DIR}/js/"*.js "${DIST_DIR}/js/data/"*.js
echo "✅ Sintaxis JavaScript válida (100% ECMAScript 6+ nativo)."

# 3. Empaquetar distribución comprimida para despliegue
mkdir -p "${OUTPUT_DIR}"
TARBALL="${OUTPUT_DIR}/maclovia-vanilla-v1.2.0.tar.gz"
tar -czf "${TARBALL}" -C "${DIST_DIR}" .
echo "📦 Paquete de despliegue generado: ${TARBALL} ($(du -sh "${TARBALL}" | cut -f1))"

echo "🚀 Despliegue verificado y listo."
