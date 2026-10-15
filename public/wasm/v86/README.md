# Alpine Linux en WebAssembly (v86) — assets

Esta carpeta aloja la **página limpia** que arranca **Alpine Linux real** dentro del navegador
mediante **v86** (emulador x86 con JIT x86→WASM). La página es `alpine.html` y se abre en pestaña
nueva desde la terminal de Maclovia (**"Boot Alpine (WASM)"** → `/wasm/v86/alpine.html`).

## Qué está incluido y qué falta

| Pieza | Estado |
| :--- | :--- |
| Motor de v86 (`libv86.js`, `v86.wasm`, `v86-fallback.wasm`) | ✅ **Incluido** y versionado |
| BIOS (`seabios.bin`, `vgabios.bin`) | ✅ **Incluido** y versionado |
| Rootfs de Alpine (`alpine-fs.json`, `alpine-rootfs-flat/`) | ⚠️ **Por construir** (Docker) |
| Instantánea `alpine-state.bin.zst` | ⭕ Opcional (arranque instantáneo) |

Mientras falte el rootfs, `alpine.html` no arranca: detecta la ausencia y muestra las
instrucciones en pantalla (con la lista de lo que falta).

## Motor + BIOS

Ya están en esta carpeta y **no** hace falta descargarlos. La procedencia, versiones y hashes
están en [`THIRD-PARTY-NOTICES.md`](./THIRD-PARTY-NOTICES.md) y las licencias en
[`LICENSES/`](./LICENSES/). Para regenerarlos desde las fuentes oficiales:

```bash
npm run wasm:assets      # node scripts/fetch-wasm-assets.mjs
```

## Rootfs de Alpine (requiere Docker)

El rootfs **no se descarga**: se construye desde el repo de v86 (vía `tools/docker/alpine`).
Necesita **Docker en marcha** (imagen `i386/alpine`) y los scripts `fs2json.py` /
`copy-to-sha256.py` del propio v86.

```bash
git clone --depth 1 https://github.com/copy/v86.git /tmp/v86
cd /tmp/v86/tools/docker/alpine
./build.sh          # -> ../../images/alpine-fs.json + .../alpine-rootfs-flat/
# ./build-state.js  # -> ../../images/alpine-state.bin.zst   (opcional: arranque instantáneo)

# Copiar el resultado aquí
cp    /tmp/v86/images/alpine-fs.json        <repo>/public/wasm/v86/
cp -r /tmp/v86/images/alpine-rootfs-flat    <repo>/public/wasm/v86/
# cp  /tmp/v86/images/alpine-state.bin.zst  <repo>/public/wasm/v86/   # opcional
```

> **No se versiona** (`ver .gitignore`): pesa decenas de MB y contiene paquetes de Alpine con
> licencias variadas. Para producción, sírvelo desde un CDN, un *release asset* de GitHub o Git
> LFS, y ajusta `baseurl`/`basefs` en `alpine.html` si cambias la ruta.

> **Sin `--zstd` también es válido.** v86 solo descomprime cuando el nombre del archivo termina en
> `.zst`; si construyes con `build.sh` tal cual, los archivos quedan como `*.bin` y se cargan en
> crudo (más transferencia, cero dependencias). El *snapshot* `alpine-state.bin.zst` es **opcional**
> y además exige compilar v86 desde fuente (`make all`, toolchain Rust/Emscripten), por lo que puede
> omitirse: Alpine arranca igual, solo tarda unos segundos más.

## Servidor (cabeceras)

- `.wasm` con `Content-Type: application/wasm`.
- Assets con caché moderada (`Cache-Control: public, max-age=86400`, ya aplicado a `/wasm/` en
  `vercel.json`). Si renombras los binarios con su hash de contenido, puedes subir a
  `immutable`.
- **No** se requieren `COOP`/`COEP` en este modo (no se usa Web Worker con memoria compartida).

En este repositorio el build de Vite copia `public/` a `dist/`, de modo que los assets aquí
quedan accesibles como `/wasm/v86/...`. Puedes añadir reglas específicas en `vercel.json`.

## Cómo funciona

- **Vía de arranque:** rootfs de Alpine por **9p + virtio** (equivalente al `examples/alpine.html`
  oficial), con `bzimage_initrd_from_filesystem: true` para sacar kernel e initrd del propio 9p.
- **Visualización:** `screen_container` → framebuffer **VGA** (texto + `<canvas>`), es decir "ver
  el sistema operativo": boot, login, shell y TUIs (`vi`, `htop`).
- **Audio:** desactivado (`disable_speaker: true`) para no disparar el aviso de `AudioContext`.
- **Arranque instantáneo:** si existe `alpine-state.bin.zst`, se restaura esa instantánea y se
  evita la espera del arranque desde cero.
- **Compatibilidad:** `libv86.js` deriva `v86-fallback.wasm` a partir de `wasm_path` para
  navegadores sin las extensiones WASM modernas; por eso se incluye también.

Referencia técnica completa: `eggs/05_ALPINE_WASM_EVALUACION.md` (§11).
