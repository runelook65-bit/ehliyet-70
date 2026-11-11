#!/usr/bin/env bash
set -uo pipefail
echo "REA / Ghidra yerel hazırlık denetimi (salt okunur)"
echo "OS: $(uname -s 2>/dev/null || echo unknown)"
if command -v node >/dev/null 2>&1; then
  echo "Node: $(node --version)"
else echo "Node yok"; fi
if command -v npm >/dev/null 2>&1; then
  echo "npm: $(npm --version)"
else echo "npm yok"; fi
if command -v java >/dev/null 2>&1; then
  java -version 2>&1 | head -n 1
else echo "Java yok"; fi
if [ -n "${GHIDRA_INSTALL_DIR:-}" ]; then
  if [ -d "$GHIDRA_INSTALL_DIR" ]; then
    echo "Ghidra klasörü bulundu: $GHIDRA_INSTALL_DIR"
  else echo "GHIDRA_INSTALL_DIR bir klasöre işaret etmiyor"; fi
else echo "GHIDRA_INSTALL_DIR ayarlanmamış"; fi
if command -v rea >/dev/null 2>&1; then
  echo "REA yüklü; doctor salt okunur çalıştırılıyor"
  rea doctor --json || echo "REA doctor sağlıklı sonuç vermedi; çıktıyı inceleyin"
else
  echo "REA CLI PATH üzerinde yok. Resmî kurulum yönergesi: https://reverseengineeranything.co/"
fi
echo "Bitti. Bu betik indirme, analiz veya kullanıcı yapılandırması yapmaz."
