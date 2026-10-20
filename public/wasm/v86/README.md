# Alpine Linux en WebAssembly (v86) — assets

Esta carpeta aloja la **página limpia** que arranca **Alpine Linux real** dentro del navegador
mediante **v86** (emulador x86 con JIT x86→WASM). La página es `alpine.html` y se abre en pestaña
nueva desde la terminal de Maclovia (**"Boot Alpine (WASM)"** → `/wasm/v86/alpine`).

El rootfs arranca en **consola** y trae un **escritorio i3wm** listo para abrirse a demanda con
`startx` (botón **i3** de la página, o `?gui=1` para 1024 MB y autoarranque). El escritorio está
*horneado* en la imagen (el invitado no tiene red) y solo se descarga por 9p cuando se lanza.

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

## Rootfs de Alpine + i3 (requiere Docker)

El rootfs **no se descarga**: se construye desde `docker/alpine-i3/` (derivado de
`tools/docker/alpine` de v86) con un único comando. Necesita **Docker en marcha**; el script clona
v86 en `.cache/v86` (si falta) para usar `fs2json.py` y `copy-to-sha256.py`.

```bash
npm run wasm:rootfs:build                  # -> public/wasm/v86/  (X11 + i3, sin node)
npm run wasm:rootfs:build -- --with-node   # añade node al invitado (+~46 MB)
npm run wasm:rootfs:build -- --no-trim     # conserva System.map, /boot/config, /var/cache
npm run wasm:rootfs:build -- --zstd        # comprime los .bin (requiere zstandard)
npm run wasm:rootfs:build -- --v86=<ruta>  # reutiliza un checkout de v86
```

Qué hace el script: construye la imagen (`linux/386`), la exporta con `docker export`, genera el
índice 9p (`fs2json.py`) y el árbol *content-addressed* (`copy-to-sha256.py`, nombres
`sha256(contenido)[:10]`), y por último recorta con el perfil `safe` (elimina `/usr/bin/node`,
`/boot/System.map`, `/boot/config`, `/var/cache` y `/.dockerenv`).

Stack horneado: `xorg-server xf86-video-fbdev xf86-input-libinput eudev udev-init-scripts
xinit i3wm i3status dmenu xterm mc tmux font-misc-misc font-dejavu xkeyboard-config xrandr xsetroot`.

Escritorio mínimo pero usable: **i3wm** (con barra `i3status`: CPU, RAM, load, hora), **xterm** como
consola (`Mod4+Enter`), **mc** (Midnight Commander) como explorador de archivos en terminal
(`Mod4+Shift+f`) y **tmux** para multiplexar la consola (`Mod4+Shift+t`). Todo dentro de la xterm:
sin GTK ni GPU (`pcmanfm`, el explorador GUI, costaría +25 MB en GTK3).

> **Framebuffer, no VESA.** v86 emula una VGA Bochs (PCI `1234:1111`); el kernel la engancha con el
> driver DRM `bochs` y expone `/dev/fb0`, así que Xorg usa el driver **fbdev** (igual que la imagen
> GUI oficial de v86). El driver `vesa` **no funciona** aquí: su `int10`/x86emu responde
> *"VESA BIOS not detected"*. Mesa/LLVM (~285 MB, arrastrado por `xorg-server` vía libGL/EGL) se
> elimina físicamente y GLX se desactiva en `xorg.conf`.

> **Consola en framebuffer.** Al cargar `bochs-drm`, la consola del guest pasa a un framebuffer
> 1024×768 (~30 s tras arrancar). Por eso el prompt (`localhost:~#`) y el estado de i3 (`I3_READY`)
> se detectan por la **consola serie** (`ttyS0`), que la página lee con `serial0-output-byte`; el
> rootfs deja un shell root en serie y en tty1.

> **No se versiona** (`ver .gitignore`): pesa decenas de MB y contiene paquetes de Alpine con
> licencias variadas. Para producción, sírvelo desde un CDN, un *release asset* de GitHub o Git
> LFS, y ajusta `baseurl`/`basefs` en `alpine.html` si cambias la ruta.

> **Sin `--zstd` también es válido.** v86 solo descomprime cuando el nombre del archivo termina en
> `.zst`; si construyes con `build.sh` tal cual, los archivos quedan como `*.bin` y se cargan en
> crudo (más transferencia, cero dependencias). El *snapshot* `alpine-state.bin.zst` es **opcional**
> y además exige compilar v86 desde fuente (`make all`, toolchain Rust/Emscripten), por lo que puede
> omitirse: Alpine arranca igual, solo tarda unos segundos más.

## Recorte del rootfs (opcional)

`node scripts/trim-alpine-rootfs.mjs` reduce el rootfs **ya construido**, sin volver a Docker:
elimina rutas por prefijo, recalcula el campo `size` de `alpine-fs.json` y borra del árbol solo
los archivos que quedan **sin referencias** (los nombres son `sha256(contenido)[:10]` y un mismo
archivo puede compartirse entre rutas, así que se cuentan referencias antes de borrar).

```bash
npm run wasm:rootfs:trim -- --dry          # ver qué haría, sin tocar nada
npm run wasm:rootfs:trim -- --set=safe     # recorte recomendado
npm run wasm:rootfs:trim -- --remove=/lib/modules,/usr/share   # a medida
```

| Perfil | Quita | Árbol resultante | Archivo mayor |
| :--- | :--- | ---: | ---: |
| `safe` (por defecto) | `/usr/bin/node`, `/boot/System.map`, `/boot/config`, `/var/cache` | ~98 MB | 7.3 MB |
| `aggressive` | + `/usr/share` (⚠️ **rompe i3**: xkb y fuentes) | ~95 MB | 7.3 MB |
| `extreme` | + `/lib/modules` (⚠️ **rompe udev/libinput/modprobe**) | ~78 MB | 7.3 MB |

Con el escritorio i3 **no uses `aggressive` ni `extreme`**: `/usr/share` contiene el mapa de
teclado (`xkeyboard-config`) y las fuentes, y `/lib/modules` hace falta para udev/libinput
(ratón PS/2). `safe` es el recorte recomendado: quita `node` (si no se pidió `--with-node`),
`System.map`, `config` y `/var/cache`, y deja el resto intacto. Es reversible: reconstruye el
rootfs con Docker.

Sin `node`, el archivo mayor es el kernel (7.3 MB), lo que **habilita CDNs con límite por archivo**
como jsDelivr.

## Producción (rootfs sin versionarlo)

El árbol pesa ~98 MB y no se versiona. Para que la página funcione en el dominio, sírvelo
desde un CDN o un release y apunta la base desde la propia página:

1. Publica `alpine-fs.json` y `alpine-rootfs-flat/` en un CDN o release accesible por HTTP. La vía
   más simple: un repo dedicado (p. ej. `maclovia-rootfs`) servido por **jsDelivr**, que entrega
   cada archivo desde GitHub con caché y CORS:
   `https://cdn.jsdelivr.net/gh/<usuario>/maclovia-rootfs@<ref>/`
2. Define la base en `public/wasm/v86/alpine.html`:
   ```js
   var DEFAULT_ROOTFS_BASE = 'https://cdn.jsdelivr.net/gh/usuario/maclovia-rootfs@v1/';
   ```
   (o pásala en la URL: `/wasm/v86/alpine?rootfs=https://…/`).
3. El CDN **debe permitir CORS** (`Access-Control-Allow-Origin`): el navegador descarga el índice y
   los archivos del árbol con `fetch` desde otro origen. jsDelivr y GitHub raw lo permiten.

Para traer el rootfs a local/CI desde esa base (verifica que `sha256(contenido)[:10]` coincida con
el nombre del archivo, el esquema de `copy-to-sha256.py` de v86):

```bash
npm run wasm:rootfs -- --base=https://cdn.jsdelivr.net/gh/usuario/maclovia-rootfs@v1/
node scripts/fetch-alpine-rootfs.mjs --check   # solo verifica lo local, sin descargar
```

## Servidor (cabeceras)

- `.wasm` con `Content-Type: application/wasm` (regla explícita en `vercel.json`).
- Assets con caché moderada (`Cache-Control: public, max-age=86400` en `/wasm/`). Si renombras los
  binarios con su hash de contenido, puedes subir a `immutable`.
- **No** se requieren `COOP`/`COEP` en este modo (no se usa Web Worker con memoria compartida).

En este repositorio el build de Vite copia `public/` a `dist/`, de modo que los assets aquí quedan
accesibles como `/wasm/v86/...`. El enlace del lanzador usa `/wasm/v86/alpine` (sin `.html`); el
plugin `cleanUrlsPublicPlugin` de `vite.config.js` replica el `cleanUrls` de Vercel en desarrollo.

## Cómo funciona

- **Vía de arranque:** rootfs de Alpine por **9p + virtio** (equivalente al `examples/alpine.html`
  oficial), con `bzimage_initrd_from_filesystem: true` para sacar kernel e initrd del propio 9p.
- **Visualización:** `screen_container` → framebuffer **VGA** (texto + `<canvas>`). El guest arranca
  en consola y, al cargar `bochs-drm`, la consola pasa a un framebuffer 1024×768: se ve el boot, el
  login, la shell y, con `startx`, el escritorio **i3**.
- **Escritorio a demanda:** botón **i3** (o `?gui=1`) → envía `startx` por teclado en cuanto el prompt
  está listo. El estado de i3 se confirma por la marca `I3_READY` que i3 escribe en `ttyS0`.
- **Memoria adaptativa:** la RAM del guest se elige según el dispositivo (512 MB en escritorio,
  256 MB en móvil o equipos con pocos recursos). Con `?gui=1` (i3) se sube a 1024 MB (512 en
  equipos limitados); se puede forzar con `?mem=512`.
- **Aviso de rendimiento:** la página muestra que se trata de emulación (más lenta que nativo),
  cuánta RAM emulada usa y advierte en móvil.
- **Detección robusta de assets:** comprobación con `HEAD` y reserva `GET` con `Range` (servidores
  que no soportan `HEAD`), validación del índice 9p (descarta el SPA fallback que devuelve
  `text/html`) y sondeo de archivos del árbol del rootfs.
- **Audio:** desactivado (`disable_speaker: true`) para no disparar el aviso de `AudioContext`.
- **Arranque instantáneo:** si existe `alpine-state.bin.zst` en la base del rootfs, se restaura esa
  instantánea y se evita la espera del arranque desde cero.
- **Compatibilidad:** `libv86.js` deriva `v86-fallback.wasm` a partir de `wasm_path` para
  navegadores sin las extensiones WASM modernas; por eso se incluye también.

Referencia técnica completa: `eggs/05_ALPINE_WASM_EVALUACION.md` (§11).
