# Avisos de terceros — `public/wasm/v86/`

Esta carpeta contiene binarios de **terceros** para arrancar Alpine Linux en el navegador
mediante **v86**. **No son código de Maclovia.** Se redistribuyen sin modificación bajo sus
propias licencias, que se reproducen en `LICENSES/`.

## Procedencia (fijada)

| Dato | Valor |
| :--- | :--- |
| Proyecto | [copy/v86](https://github.com/copy/v86) |
| Commit de referencia | `94faf3d6b19ecabc53a4010aaa24252fa6a162e2` (2026-10-09) |
| Release del motor | tag `latest` (publicado 2026-10-09; coincide con el commit anterior) |
| Versión npm equivalente | `v86@0.5.471` |
| Fecha de obtención | 2026-10-15 |

## Archivos incluidos

| Archivo | Tamaño (bytes) | SHA-256 | Licencia | Origen |
| :--- | ---: | :--- | :--- | :--- |
| `libv86.js` | 359 839 | `1b41074f7a5604f528dac6842baf7afccd79d7370b97ea3241944c275b67bec1` | BSD-2-Clause | Release `latest` |
| `v86.wasm` | 2 007 347 | `2fc5609ae837fcbc77147155de6f1014677ecab5369f5584ebc670e9d56e6510` | BSD-2-Clause | Release `latest` |
| `v86-fallback.wasm` | 2 040 034 | `b51525d7d4d5f23cdc065e7a25cc34d4dab5f44efd15d05893ef974c57f525c7` | BSD-2-Clause | Release `latest` |
| `seabios.bin` | 131 072 | `73e3f359102e3a9982c35fce98eb7cd08f18303ac7f1ba6ebfbe6cdc1c244d98` | LGPL-3.0 | `copy/v86` → `bios/` |
| `vgabios.bin` | 36 352 | `a4bc0d80cc3ca028c73dafa8fee396b8d054ce87ebd8abfbd31b06b437607880` | LGPL-3.0 | `copy/v86` → `bios/` |

Reproducible con `node scripts/fetch-wasm-assets.mjs`.

## Resumen de licencias

### v86 — BSD 2-Clause

`libv86.js`, `v86.wasm` y `v86-fallback.wasm` son obra de **The v86 contributors**
(Copyright © 2012). Texto completo en `LICENSES/v86-BSD-2-Clause.txt`.

Permite redistribución y uso en forma binaria **siempre que** se conserve el aviso de copyright
y la licencia (este archivo y `LICENSES/`). No se usa el nombre de los autores para promocionar
derivados.

### SeaBIOS y SeaVGABIOS — LGPL 3.0

`seabios.bin` (firmware del sistema) y `vgabios.bin` (firmware VGA) son obra de **Kevin O'Connor
y colaboradores** (proyecto SeaBIOS). Texto completo en `LICENSES/LGPL-3.0.txt`.

Se distribuyen **sin modificación**. En cumplimiento de la LGPL, el código fuente correspondiente
está disponible públicamente en la misma procedencia indicada arriba
(`https://github.com/copy/v86`, carpeta `bios/`) y en el proyecto original
`https://github.com/coreboot/seabios`.

## Nota sobre el rootfs de Alpine

**No se incluye** `alpine-fs.json`, `alpine-rootfs-flat/` ni `alpine-state.bin.zst` en el
repositorio: son artefactos **construidos** (no descargables) que pesan decenas de MB y cuyo
contenido son paquetes de Alpine Linux con licencias variadas (mayoritariamente GPL y
permisivas). Se generan localmente con Docker siguiendo `README.md`; ver también
`eggs/05_ALPINE_WASM_EVALUACION.md` §11.
