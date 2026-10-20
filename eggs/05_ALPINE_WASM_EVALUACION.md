# 🐧 Evaluación R&D: Alpine Linux en WebAssembly con la CLI como superficie de ejecución

> **Documento de investigación y desarrollo (R&D) — no vinculante para producción.**
> **Autor:** Erick Jonathan Aguilar García (Maclovia / Belleza Maldita)
> **Fecha:** 2026-10-15
> **Estado:** Evaluación técnica — *descubrimiento / viabilidad*
> **Alcance:** Determinar si es viable ejecutar un centro de cómputo Linux (Alpine) dentro de WASM en el navegador, accionado desde una línea de comandos, y cómo (o si) encaja en la arquitectura de Maclovia.

---

## 🎯 1. Objetivo y preguntas de investigación

Este documento responde a la siguiente pregunta: **¿podemos ofrecer una línea de comandos real —no simulada— que ejecute Linux/Alpine en WASM desde el navegador, y a qué coste?**

Preguntas concretas a resolver:

1. ¿Qué significa exactamente "Alpine en WASM" y qué variantes técnicas existen?
2. ¿Cuál es el coste real en peso, tiempo de arranque, fidelidad y licencia de cada variante?
3. ¿Es compatible con el manifiesto de Maclovia (**Zero-Runtime, FCP < 0.4s, Lighthouse 100/100, cero dependencias**)?
4. ¿Qué experimentos reproducibles confirman o descartan cada opción?
5. ¿Cuál es la recomendación para una eventual demo de marca o utilidad interna?

> ⚠️ **Este informe no propone cambios en el código de producción.** La terminal actual (`js/modules/terminal/`) permanece intacta. Las conclusiones alimentan una decisión posterior.

---

## 🧠 2. Hallazgo principal: "compilar Alpine a WASM" no es una opción real

Antes de comparar tecnologías hay que deshacer una confusión de categorías, porque condiciona toda la evaluación:

- Los paquetes de Alpine (`.apk`) son **binarios ELF nativos enlazados contra `musl`** para arquitecturas **x86_64 / aarch64 / riscv64**. **No** son módulos WebAssembly.
- WASM es **otra arquitectura destino**. Un `.apk` de Alpine no se puede "convertir" a WASM ni ejecutar directamente en un runtime WASI.
- Por lo tanto, **no existe un único "Alpine WASM"**. Solo hay tres formas reales de tener Alpine funcionando, y son cualitativamente distintas:

| Vía | ¿Qué corre? | ¿Hay kernel? | ¿Funciona `apk add`? |
| :--- | :--- | :---: | :---: |
| **A. VM x86 emulada dentro de WASM** | Kernel Linux real + userland Alpine | ✅ Sí | ✅ Sí |
| **B. JIT x86→WASM (CheerpX)** | Binarios x86 sin modificar | ✅ (emulado) | ✅ Sí |
| **C. Userland recompilado a WASI/WASIX** | Solo los binarios recompilados (p. ej. BusyBox) | ❌ No | ❌ No |

La conclusión práctica: **si necesitas un Alpine "de verdad" (con `apk`, `/proc`, syscalls reales), estás obligado a emular una CPU x86 dentro del WASM.** En caso contrario, lo máximo que obtienes es un shell tipo Alpine (BusyBox) recompilado a WASM.

---

## 🅰️ 3. Familia A — VM x86 emulada dentro de WASM (kernel real)

Se emula un PC x86 cuyo intérprete/JIT está compilado a WASM; dentro arranca un kernel Linux auténtico con userland Alpine. Es "Linux corriendo **sobre** WASM".

| Motor | Cómo funciona | Demo / referencia | Licencia |
| :--- | :--- | :--- | :--- |
| **v86** (`copy/v86`) | Emula CPU + hardware x86; el código máquina se traduce a módulos WASM en runtime. Arranca kernel + Alpine; consola por `serial0`. | `browser-agent-v86-poc`, LinuxOnTab | BSD-2 |
| **TinyEMU / JSLinux** (F. Bellard) | Emulador compacto y muy rápido (x86 y RISC-V). Imagen de disco propia. | `bellard.org/jslinux` | MIT-like |
| **QEMU-wasm** (`container2wasm --to-js`) | QEMU con TCG compilado a WASM (Emscripten). | `container2wasm-demo` | BSD/GPL |
| **Bochs** (`container2wasm` WASI) | `c2w alpine:3.20 out.wasm` → corre en `wasmtime` o navegador. Pre-arranque con `wizer`. | `container2wasm` | Experimental (Apache-2.0 del wrapper) |

**Ventajas**
- Kernel real, `apk add` real, `/proc`, `/sys`, señales, procesos.
- Sandbox fuerte: el aislamiento lo impone el propio navegador.
- Todo el cómputo es local (client-side), sin backend.

**Desventajas**
- **Peso:** engine WASM de **1–varios MB** + imagen de disco. Un `alpine-minirootfs` ronda **3–5 MB comprimido**; un ISO/virt de Alpine puede superar los **60 MB**.
- **Arranque:** de **varios segundos**, incompatible con FCP y con la sensación "instantánea" de la web.
- **CPU emulada ~10–100× más lenta** que nativo.
- **Red:** el navegador no hace TCP crudo; el egress requiere un proxy WebSocket (**WISP v1**).

---

## 🅱️ 4. Familia B — JIT x86→WASM de alto rendimiento (CheerpX / WebVM)

**CheerpX** (Leaning Technologies) es un motor de virtualización x86 de dos niveles, compilado a WASM, que **recompila x86 a WASM en caliente**, emula syscalls y expone un *block filesystem*. Corre Debian/Alpine **sin recompilar ni tocar los binarios**. WebVM es su producto bandera; existe incluso una variante **Alpine + Xorg + i3** (`webvm.io/alpine.html`).

**Ventajas**
- Rendimiento muy superior a la emulación pura.
- Distro completa: `apt`/`apk`, GCC, Python 3, binarios ELF precompilados sin cambios.
- Integración de red vía Tailscale (demo) o proxy.

**Desventajas**
- 🔴 **Licencia:** el repositorio WebVM es Apache-2.0, pero **el motor CheerpX requiere licencia comercial para uso organizacional**. Maclovia opera como *software studio* → **uso organizacional**.
- **Peso mucho mayor:** imagen de disco de decenas/cientos de MB.
- **Dependencia de un vendor** (riesgo estratégico para un sitio que presume de autonomía total).

---

## 🅲 5. Familia C — Userland WASI/WASIX (sin kernel)

Se compila el userland a WASM. El caso más maduro es **BusyBox compilado a WASIX**, que incluye un **shell `ash` real**:

- `busybox-wasix.wasm` ≈ **608 KB**.
- Corre en CLI con **Wasmer 7.0+** o en el navegador vía **`@wasmer/sdk`**.
- Front-end de terminal: **`xterm.js`** + addon **`wasm-webterm`** (WASI + Emscripten) o el tutorial oficial de Wasmer.
- Soporta variables, aritmética `$(( ))`, condicionales, bucles, funciones y `cd`.

**Ventajas**
- **Ligerísimo** y con arranque prácticamente instantáneo.
- **Offline** y sin kernel: superficie de ataque mínima.
- Ideal para *progressive enhancement* de una terminal ya existente.

**Desventajas**
- ❌ **No es Alpine**: no hay `apk` (los `.apk` son ELF nativo), no hay kernel, syscalls limitadas.
- Toolset **fijo** en el momento de compilación; no puedes instalar paquetes arbitrarios.
- Es "un shell UNIX convincente", no una distribución.

---

## 📊 6. Cuadro comparativo de decisión

| Criterio | A · v86 / TinyEMU | B · CheerpX / WebVM | C · BusyBox WASIX |
| :--- | :---: | :---: | :---: |
| Fidelidad | Kernel real | Distro completa | Shell + applets |
| `apk add` | ✅ | ✅ | ❌ |
| Peso inicial (aprox.) | 1–5 MB + imagen | MBs + imagen grande | ~0.6 MB |
| 1er arranque | Segundos | Segundos | ~0 ms |
| CPU | Emulada (lenta) | JIT (rápida) | Nativa WASM |
| Licencia | BSD / MIT | **Comercial (org.)** | MIT / Apache-2.0 |
| Funciona offline | ✅ (assets locales) | ✅ | ✅ |
| Red del guest | Proxy WISP | Tailscale / proxy | No aplica |
| Dependencia de vendor | Baja | **Alta** | Baja |
| Compatible FCP < 0.4s | Solo *lazy* | Solo *lazy* | *Lazy* trivial |

---

## 🧪 7. Experimentos reproducibles (prototipos mínimos)

Estos experimentos permiten validar cada familia en horas, sin comprometerse. Se ejecutan en un sandbox aparte, **nunca en el bundle de producción**.

### Experimento A1 — container2wasm + Alpine en CLI (sin navegador)
```bash
# Requiere Docker y el binario c2w
c2w alpine:3.20 /tmp/out.wasm
wasmtime /tmp/out.wasm uname -a
wasmtime /tmp/out.wasm cat /etc/alpine-release
```
**Mide:** peso del `.wasm`, latencia de arranque en `wasmtime`, fidelidad de `apk`.

### Experimento A2 — Alpine en navegador con v86
```bash
# Base de referencia: clonar un POC ya funcionando y medir
git clone https://github.com/Len4m/browser-agent-v86-poc
# Servir estático y observar: tiempo de boot, RAM, tamaño transferido,
# y comportamiento de la consola serial (serial0) en DevTools > Network/Performance.
```
**Mide:** peso total transferido, tiempo hasta primer prompt, uso de memoria, viabilidad offline.

### Experimento B1 — CheerpX (solo para medir, no para producción)
```bash
# Seguir el Quickstart oficial y medir sobre la imagen Debian de referencia
# https://cheerpx.io/docs/getting-started.html
```
**Mide:** rendimiento relativo frente a A, tamaño de imagen, headers requeridos (`COOP`/`COEP`, `application/wasm`). **Bloqueante:** licencia.

### Experimento C1 — BusyBox WASIX en navegador
```bash
npm install @wasmer/sdk xterm xterm-addon-fit
# Montar xterm.js + @wasmer/sdk, cargar busybox-wasix.wasm (~608 KB),
# arrancar `ash` y cablear stdin/stdout/stderr.
```
**Mide:** tiempo de arranque, peso total (wasm + JS), calidad del shell para el caso "demo".

### Criterios de aceptación R&D
Un prototipo se considera **viable** si cumple:
1. Carga **on-demand** sin afectar el bundle inicial ni el FCP < 0.4s.
2. Se sirve íntegramente como **estático** (sin backend obligatorio).
3. Funciona **offline** una vez cacheado.
4. Presupuesto de peso declarado y respetado (objetivo tentativo < 5 MB para C, < 40 MB para A).
5. Licencia **compatible con uso organizacional sin coste** (descarta B sin contrato).

---

## 🏗️ 8. Impacto en la arquitectura de Maclovia

Los invariantes del proyecto (README + `metadata.json`) son:

- **Zero-Runtime**: sin frameworks de cliente, sin hidratación.
- **FCP < 0.4s** y **Lighthouse 100/100**.
- **Cero dependencias** en runtime y distribución estática autónoma.
- Terminal actual: **emulador simulado en JS puro** (`js/modules/terminal.js`), parte del relato de marca (Rust, `cargo`, WASM).

**Diagnóstico:** cualquier VM de las familias A o B **viola** estos invariantes si entra por defecto en el bundle. C es compatible **solo** si se integra como mejora progresiva.

**Patrón de integración seguro (si algún día se decide implementar):**

1. La **terminal simulada se mantiene como default**: 0 KB extra, narrativa intacta, Lighthouse 100.
2. Botón opt-in tipo **"Boot Alpine real"** que dispara `import()` dinámico + `Worker` + descarga de assets desde `/wasm/…`.
3. Assets servidos **aparte** del bundle: `Content-Type: application/wasm`, `Cache-Control: immutable`. Añadir reglas en `vercel.json` y en cualquier servidor estático.
4. `COOP`/`COEP` **solo si** el motor elegido usa `SharedArrayBuffer` (evaluar caso por caso, ya que pueden romper el resto del sitio).
5. La CLI (xterm.js o el renderer propio) es la **superficie de ejecución**; la consola `serial0` del guest se cablea a stdin/stdout.
6. Presupuesto de rendimiento explícito y medible en CI (peso transferido en el arranque inicial = 0 KB adicionales).

---

## ⚠️ 9. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
| :--- | :---: | :--- |
| Inflación del bundle / caída de Lighthouse | Alto | Carga 100% *lazy*, jamás en el grafo inicial; presupuesto en CI |
| Licencia comercial (CheerpX) | Alto | Descartar B; preferir A (BSD/MIT) o C |
| Carga de mantenimiento (imágenes, binarios) | Medio | Congelar una imagen versionada; documentar procedencia y reproducibilidad |
| Expectativa del usuario ("es Linux pero lento") | Medio | Comunicar que es emulación; limitar a demos acotadas |
| Red del guest inestable (proxy WISP) | Medio | Marcar la red como opt-in y experimental |
| Almacenamiento persistente (IndexedDB) | Bajo | Snapshot efímero por sesión; limpiar al cerrar pestaña |
| Deriva del relato "Zero-Runtime" | Medio | Tratar la VM como *add-on* de marca, nunca como dependencia base |

---

## 🏁 10. Conclusión y recomendación (R&D)

1. **Concepto clave:** "Alpine en WASM" solo es literal si se emula una CPU x86 dentro del WASM. Sin kernel no hay Alpine ni `apk`; solo hay userland recompilado.
2. **Para una demo de marca** (mostrar Linux real en el navegador): la mejor relación impacto/peso es **C (BusyBox WASIX)** si se prioriza ligereza y arranque instantáneo, o **A (v86 + `alpine-minirootfs`)** si se necesitan `apk`, `wget`, `python3` **reales**.
3. **Descartar B (CheerpX/WebVM)** mientras Maclovia opere como organización, salvo que se contrate licencia.
4. **Nunca** introducir una VM en el bundle inicial: rompería FCP, Lighthouse y el diferencial "zero-runtime".
5. **Siguiente paso sugerido:** ejecutar los **Experimentos A1/A2/C1** en un sandbox y volcar métricas reales (peso, arranque, RAM, compatibilidad) en una segunda iteración de este documento antes de cualquier decisión de producto.

---

## 🧩 11. Cómo funcionaría v86 (guía técnica de la vía elegida)

Traducimos la **Familia A** a una implementación concreta sobre **v86** (`copy/v86`, BSD-2), que es la opción con kernel real sin ataduras de licencia.

> **Estado:** la **página limpia** ya está implementada en `public/wasm/v86/alpine.html` (servida como `/wasm/v86/alpine.html`) y se lanza desde la terminal de Maclovia con el botón **"Boot Alpine (WASM)"** (`src/partials/guidelines/panel-terminal.html`). El **motor de v86 y las BIOS ya están versionados** en `public/wasm/v86/` (con procedencia y SHA-256 en `THIRD-PARTY-NOTICES.md`); el **rootfs de Alpine se construye con Docker y no se versiona** (peso y licencias). Mientras falte, `alpine.html` detecta su ausencia y muestra las instrucciones (ver `public/wasm/v86/README.md`). Lo descrito abajo es la referencia técnica del modo embebido en la propia web, aún no implementado.

### 11.1 Qué es

Un **emulador de PC x86 completo** cuyo **JIT traduce x86 a WebAssembly en tiempo de ejecución**. El núcleo de CPU está **escrito en Rust** y compilado a `wasm32-unknown-unknown` → produce `v86.wasm`; el pegamento de hardware y la API pública viven en JavaScript (`libv86.js`). Para proyectos con bundler existe el paquete oficial **`v86`** en npm, publicado desde el propio repositorio con `provenance`.

### 11.2 Arquitectura interna y pipeline del JIT

1. **Modo interpretado primero.** La CPU interpreta instrucciones y **colecta puntos de entrada** (destinos de `call` y de saltos indirectos). Mide la **"calentura" (*hotness*) por página** de memoria.
2. **Compilación selectiva.** Cuando una página se considera caliente, v86 **genera código WASM para la página entera** y hasta `MAX_PAGES` páginas alcanzables desde ella.
3. **Control de flujo estructurado.** WASM no admite saltos arbitrarios. v86 genera **una única función con un gran `switch` (`brtable`)** que hace alcanzables todos los destinos, y aplica el algoritmo **"stackifier"** al resto del flujo. No hay *linking* entre módulos: se sale de uno y el bucle principal entra en el siguiente.
4. **Paginación emulada.** Sin `mmap`, v86 emula las *page tables* con una **caché de 4 MB que hace de TLB**: camino rápido inline (`tlb[addr>>12]`) y camino lento (`safe_read_jit_slow`) que recorre tablas, dispara *page faults* y valida MMIO o páginas de código.
5. **Micro-optimizaciones.** *Lazy flags* para la aritmética (las banderas se calculan solo cuando se necesitan) y `SoftFloat` de Berkeley para emular **flotantes de 80 bits** (preciso pero lento).
6. **Decoder autogenerado.** La decodificación de instrucciones se **genera desde una tabla** (`gen/x86_table.js`), que a su vez produce los tests.

### 11.3 Hardware emulado (lo relevante)

CPU ~**Pentium 4 con SSE3**, FPU, **VGA/SVGA (Bochs VBE)**, controladora **IDE + CD-ROM (ISO 9660)**, disquete 8272A, teclado PS/2 con ratón, **PIT/PIC/RTC**, tarjeta **NE2000** + **virtio-net**, SoundBlaster 16, módem Hayes y **filesystem virtio-9p** (la pieza que permite montar el rootfs de Alpine).

### 11.4 Arranque de Alpine (dos vías)

**Vía A — ISO de CD-ROM (simple, más pesada).** Se bootea por BIOS como una máquina real:
```js
new V86({ cdrom: { url: "alpine.iso" }, bios: { url: "seabios.bin" }, autostart: true });
```

**Vía B — rootfs 9p + virtio (la recomendada, la del ejemplo oficial `examples/alpine.html`).** Se construye la imagen del rootfs de Alpine como **9p** (`tools/docker/alpine/build.sh`) y se arranca el kernel indicando que la raíz llega por virtio-9p:

```js
var emulator = new V86({
  wasm_path: "v86.wasm",
  memory_size: 512 * 1024 * 1024,
  vga_memory_size: 8 * 1024 * 1024,
  bios:     { url: "seabios.bin" },
  vga_bios: { url: "vgabios.bin" },
  filesystem: {
    baseurl: "alpine-rootfs-flat",   // árbol de archivos del rootfs
    basefs:  "alpine-fs.json",       // índice del filesystem
  },
  bzimage_initrd_from_filesystem: true, // saca kernel+initrd del propio 9p
  cmdline: "rw root=host9p rootfstype=9p " +
           "rootflags=trans=virtio,cache=loose modules=virtio_pci tsc=reliable",
  // initial_state: { url: "alpine-state.bin.zst" }, // arranque instantáneo
  autostart: true,
});
```

**Truco de UX: instantánea pre-arrancada (`initial_state`).** Con `build-state.js` se guarda el estado del emulador ya arrancado (`.bin.zst`); al restaurarlo **se evita el arranque de segundos** y el visitante ve el prompt casi al instante. Es lo que hace viable la experiencia.

### 11.5 Conexión de la línea de comandos (el núcleo de la idea)

Todo se canaliza por **`serial0`**. Si Alpine arranca con `console=ttyS0`, su consola sale por el puerto serie emulado y se cablea a la terminal:

```js
// Salida del guest → terminal
emulator.add_listener("serial0-output-byte", (byte) =>
  term.write(String.fromCharCode(byte))
);

// Teclado de la terminal → guest
term.onData((str) => emulator.serial0_send(str));
```

Esto se enchufa directamente a **xterm.js** o al renderer DOM propio. Además, `screen_container` expone el framebuffer VGA (texto + `<canvas>`), útil para apps de pantalla completa (`vi`, `htop`).

### 11.6 Arquitectura de integración en Maclovia

**Assets estáticos (fuera del bundle inicial):**

```text
/public/wasm/v86/
├── v86.wasm                 # núcleo Rust→WASM (JIT x86→wasm)
├── libv86.js                # API + glue de hardware
├── seabios.bin              # BIOS
├── vgabios.bin              # VGA BIOS
├── alpine-rootfs-flat/      # rootfs de Alpine (9p)
├── alpine-fs.json           # índice del filesystem 9p
└── alpine-state.bin.zst     # instantánea pre-arrancada (opcional)
```

**Plan de integración:**

1. **Módulo nuevo** en `js/modules/terminal/` (p. ej. `wasm-vm.js`) que hace `import()` dinámico **solo al pulsar "Boot Alpine"**; el `panel-terminal.html` actual (`#cli-viewport`, `#cli-input`) permanece como terminal simulada por defecto.
2. **Montar xterm.js** y cablear `serial0` ↔ terminal como en §11.5.
3. **Arranque por snapshot** (`initial_state`) y persistencia del estado en **IndexedDB**.
4. **Servidor:** `.wasm` con `Content-Type: application/wasm`; assets con `Cache-Control: immutable`. Añadir reglas en `vercel.json` y en cada servidor estático.
5. **Web Worker opcional** para no bloquear el hilo principal. Si se usa memoria compartida, se necesitan cabeceras `COOP`/`COEP` (evaluar su impacto en el resto del sitio).
6. **Presupuesto de rendimiento:** nada de esto entra en el grafo inicial → **FCP y Lighthouse 100 se conservan**.

**Flujo del visitante:** terminal simulada (0 KB) → botón **"Boot Alpine real"** → `import()` diferido → carga `v86.wasm` + restaura snapshot → prompt de Alpine real → `apk add`, `wget`, `python3`… → al cerrar, la VM se descarta.

> **Página limpia (implementada):** en lugar de embeber la VM en la web, se ofrece un documento autónomo `public/wasm/v86/alpine.html` que Maclovia abre en **pestaña nueva** mediante un enlace (`target="_blank"`, sin JS). Al ser un documento distinto, sus megabytes **no cuentan** en el FCP/Lighthouse de Maclovia. La página usa `screen_container` (framebuffer **VGA**: texto + `<canvas>`) para **ver el sistema operativo** (boot, login, shell, TUIs) y degrada con elegancia mostrando instrucciones si faltan los binarios.

### 11.7 Límites reales a asumir

| Aspecto | Realidad con v86 |
| :--- | :--- |
| Rendimiento | Emulado; comparable a un PC de ~2000. Bien para shell, lento para compilar |
| Arquitectura | Solo **32 bits**, sin multicore |
| Peso | `v86.wasm` + BIOS + rootfs + snapshot (decenas de MB en total) |
| Arranque | Segundos… **salvo** con `initial_state` (casi instantáneo) |
| Red | NE2000/virtio-net → requiere **proxy WebSocket (WISP / `wsnic`)** para salida TCP |
| Licencia | **BSD-2** ✅ (sin negociación comercial) |

---

### 11.8 Estado de la implementación (v1.2)

Sobre el primer prototipo se han cerrado tres frentes:

1. **Rootfs servible en producción sin versionarlo.** `alpine.html` resuelve la base del rootfs en
   este orden: `?rootfs=<url>` → `DEFAULT_ROOTFS_BASE` (constante en la página) → local (`./`). El
   motor y las BIOS siguen siendo locales. Para traer el rootfs a local/CI:
   `npm run wasm:rootfs -- --base=<url>`, con verificación de integridad
   `sha256(contenido)[:10] == nombre` (el esquema de `copy-to-sha256.py` de v86). La base externa
   **debe permitir CORS** (jsDelivr y GitHub raw lo hacen). `node scripts/fetch-alpine-rootfs.mjs
   --check` valida lo local sin descargar.
2. **Memoria adaptativa + aviso de rendimiento.** Se detecta móvil/equipo limitado
   (`navigator.deviceMemory`, `hardwareConcurrency`, `pointer: coarse`) y se asigna **256 MB**
   (ligero) o **512 MB** (escritorio); con **i3** (`?gui=1`) sube a **1024 MB** (512 en equipos
   limitados). Se puede forzar con `?mem=<MiB>`. La página muestra un aviso visible de que se trata
   de emulación (más lenta que nativo) y de la RAM emulada, y advierte en móvil.
3. **Detección de assets endurecida.** Comprobación con `HEAD` y reserva `GET` con `Range`
   (servidores que no soportan `HEAD`), validación del índice `alpine-fs.json` (JSON real; descarta
   el SPA fallback que devuelve `text/html`) y sondeo de archivos del árbol `alpine-rootfs-flat/`.
   El enlace del lanzador usa `/wasm/v86/alpine` (sin `.html`, alineado con `cleanUrls`), con un
   plugin de Vite que replica `cleanUrls` para `public/` en desarrollo.

Queda pendiente (**fuera de este alcance**): **Web Worker** para no bloquear el hilo principal y
**snapshot** pre-arrancado (`alpine-state.bin.zst`) para arranque casi instantáneo. La consola serie
(`serial0`) **ya se usa** para detectar el prompt y el estado de i3 (ver §11.10).

### 11.9 Recorte del rootfs

El rootfs construido (Alpine 3.21 + X11/i3) pesa ~95 MB antes de recortar. El script
`scripts/trim-alpine-rootfs.mjs` elimina rutas por prefijo, **recalcula el `size`** del índice y
borra del árbol solo los archivos que quedan sin referencias (hay archivos compartidos entre varias
rutas, de ahí el conteo de referencias). Perfiles:

| Perfil | Quita | Árbol | Archivo mayor |
| :--- | :--- | ---: | ---: |
| `safe` | `/usr/bin/node`, mapas/config de kernel, `/var/cache` | ~98 MB | 7.3 MB (kernel) |
| `aggressive` | + `/usr/share` (⚠️ **rompe i3**: xkb y fuentes) | ~95 MB | 7.3 MB |
| `extreme` | + `/lib/modules` (⚠️ **rompe udev/libinput/modprobe**) | ~78 MB | 7.3 MB |

Con el escritorio i3 **`safe` es el único perfil recomendado**: `/usr/share` guarda el mapa de
teclado (`xkeyboard-config`) y las fuentes, y `/lib/modules` es imprescindible para udev/libinput
(ratón PS/2). Sin `node`, el mayor archivo es el kernel (7.3 MB), lo que hace viable servirlo por un
CDN con límite por archivo (jsDelivr). Es reversible reconstruyendo el rootfs con Docker. Detalle en
`public/wasm/v86/README.md`.

### 11.10 Escritorio i3 en el rootfs

Sobre la consola base se añadió un **escritorio X11/i3** horneado en la imagen (el invitado no tiene
red): `docker/alpine-i3/` deriva de `tools/docker/alpine` de v86 e instala
`xorg-server xf86-video-fbdev xf86-input-libinput eudev udev-init-scripts xinit i3wm i3status dmenu
xterm mc tmux font-misc-misc font-dejavu xkeyboard-config xrandr xsetroot`. Se construye con
`npm run wasm:rootfs:build` (build + export + `fs2json` + recorte).

El escritorio es mínimo pero usable: barra `i3status` (CPU, RAM, load, hora), **xterm** como consola
(`Mod4+Enter`), **mc** como explorador de archivos en terminal (`Mod4+Shift+f`) y **tmux**
(`Mod4+Shift+t`). Se evita deliberadamente GTK: un explorador GUI (`pcmanfm`) costaría +25 MB (GTK3,
dbus, avahi, at-spi) y sería lento sin GPU en v86.

Decisiones relevantes:

- **Framebuffer, no VESA.** v86 emula una VGA Bochs (PCI `1234:1111`). El kernel la engancha con el
  driver DRM `bochs` (`CONFIG_DRM_BOCHS=m`, cargado por udev) y expone `/dev/fb0`; Xorg usa el driver
  **fbdev** (como la imagen GUI oficial de v86). El driver `vesa` **no funciona**: su `int10`/x86emu
  responde *"VESA BIOS not detected"* y X aborta con *"no screens found"*.
- **Consola en framebuffer.** Al cargar `bochs-drm` (~30 s), la consola del guest pasa a un
  framebuffer 1024×768. La página detecta el prompt (`localhost:~#`) y el estado de i3 (`I3_READY`)
  por la **consola serie** (`ttyS0`) vía `serial0-output-byte`; mantiene la detección por pantalla de
  texto como respaldo. El rootfs deja autologin root en tty1 y ttyS0.
- **Sin Mesa/LLVM.** `xorg-server` arrastra Mesa (gallium + LLVM, ~285 MB) por libGL/EGL; el driver
  fbdev no lo usa. Se eliminan físicamente (`libLLVM*`, `libgallium*`, `libGL*`, `libEGL*`,
  `libgbm*`, `/usr/lib/dri`, `gallium-pipe`…) y se pone `Disable "glx"` en `xorg.conf`. Sin esto el
  rootfs pesaría ~385 MB.
- **APK por HTTP si falla TLS.** Docker Desktop/antivirus intercepta TLS dentro del contenedor
  (`certificate verify failed`); el script sondea HTTPS y cae a `http://` (los paquetes se siguen
  verificando con la firma RSA de Alpine). `--apk-scheme=` lo fuerza.
- **Autobloqueo del DRM descartado.** Se probó a bloquear `bochs` para conservar la consola de texto y
  usar `vesa`; X fallaba igual, así que se optó por fbdev (vía oficial de v86).

Verificación headless (Node + `libv86.js` como CJS): arranque → prompt serie a los ~46 s → `startx`
por teclado → `GUI_READY` e `I3_READY` a los ~72 s, con el framebuffer en 1024×768×32.

---

## 🔗 12. Referencias

- `copy/v86` — emulador x86 + JIT a WASM: https://github.com/copy/v86
- v86 · *How it works* (pipeline del JIT, paginación, lazy flags): https://github.com/copy/v86/blob/master/docs/how-it-works.md
- v86 · Alpine guest setup (rootfs 9p + virtio): https://github.com/copy/v86/tree/master/tools/docker/alpine
- v86 · ejemplos de API (`serial.html`, `alpine.html`): https://github.com/copy/v86/tree/master/examples
- v86 · paquete npm oficial (bundlers): https://www.npmjs.com/package/v86
- `browser-agent-v86-poc` — Alpine x86 en navegador (BSD-2): https://github.com/Len4m/browser-agent-v86-poc
- LinuxOnTab — Alpine sobre v86 + xterm.js: https://linuxontab.com/
- `container2wasm` — contenedor → WASM (Bochs / TinyEMU / QEMU): https://github.com/container2wasm/container2wasm
- CheerpX / WebVM — virtualización x86 en WASM: https://cheerpx.io/docs/overview.html · https://webvm.io/
- `busybox-wasm-wasi` — BusyBox + WASIX: https://github.com/MentalGear/busybox-wasm-wasi
- `@wasmer/sdk` + xterm.js (tutorial): https://docs.wasmer.io/sdk/wasmer-js/tutorials/xterm-js
- `wasm-webterm` — addon xterm.js para WASI/Emscripten: https://codeberg.org/cryptool-org/wasm-webterm
- xterm.js — terminal para la web: https://github.com/xtermjs/xterm.js
