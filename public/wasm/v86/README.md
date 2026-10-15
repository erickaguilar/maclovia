# Alpine Linux en WebAssembly (v86) — assets

Esta carpeta aloja la **página limpia** que arranca **Alpine Linux real** dentro del navegador
mediante **v86** (emulador x86 con JIT x86→WASM). La página es `alpine.html` y se abre en pestaña
nueva desde la terminal de Maclovia (**"Boot Alpine (WASM)"** → `/wasm/v86/alpine.html`).

> Por su peso, los **binarios no se versionan** en este repositorio. `alpine.html` detecta su
> ausencia y muestra las instrucciones en pantalla. Colócalos aquí para activarlo.

## Contrato de assets

| Archivo | Rol | Origen |
| :--- | :--- | :--- |
| `libv86.js` | API + glue de hardware | Releases de `copy/v86` (o `make all`) |
| `v86.wasm` | Núcleo Rust→WASM (JIT) | Releases de `copy/v86` |
| `seabios.bin` | BIOS | Repositorio `copy/v86` (`bios/`) |
| `vgabios.bin` | VGA BIOS | Repositorio `copy/v86` (`bios/`) |
| `alpine-fs.json` | Índice del rootfs 9p | `tools/docker/alpine/` (`build.sh`) |
| `alpine-rootfs-flat/` | Árbol del rootfs de Alpine | `tools/docker/alpine/` (`build.sh`) |
| `alpine-state.bin.zst` | *Opcional*: instantánea pre-arrancada | `tools/docker/alpine/build-state.js` |

## Pasos

```bash
# 1) Motor v86
#    Descarga libv86.js y v86.wasm de https://github.com/copy/v86/releases
#    (alternativa: clonar el repo y `make all`)

# 2) BIOS
#    Copia bios/seabios.bin y bios/vgabios.bin aquí

# 3) Rootfs de Alpine (9p) — requiere Docker
#    Sigue tools/docker/alpine/ del repo de v86:
#      ./build.sh        -> alpine-fs.json + alpine-rootfs-flat/
#      ./build-state.js  -> alpine-state.bin.zst   (opcional: arranque instantáneo)
```

## Servidor (cabeceras)

- `.wasm` con `Content-Type: application/wasm`.
- Assets con `Cache-Control: public, max-age=31536000, immutable`.
- **No** se requieren `COOP`/`COEP` en este modo (no se usa Web Worker con memoria compartida).

En este repositorio el build de Vite copia `public/` a `dist/`, de modo que los assets aquí
quedan accesibles como `/wasm/v86/...`. Puedes añadir reglas específicas en `vercel.json`.

## Cómo funciona

- **Vía de arranque:** rootfs de Alpine por **9p + virtio** (equivalente al `examples/alpine.html`
  oficial), con `bzimage_initrd_from_filesystem: true` para sacar kernel e initrd del propio 9p.
- **Visualización:** `screen_container` → framebuffer **VGA** (texto + `<canvas>`), es decir "ver
  el sistema operativo": boot, login, shell y TUIs (`vi`, `htop`).
- **Arranque instantáneo:** si existe `alpine-state.bin.zst`, se restaura esa instantánea y se
  evita la espera del arranque desde cero.

Referencia técnica completa: `eggs/05_ALPINE_WASM_EVALUACION.md` (§11).
