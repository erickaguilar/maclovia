# 🎨 Arquitectura de CSS Puro y Biblioteca de Iconos/Imágenes SVG (Zero-Emojis)

Este documento define la estrategia técnica para cumplir dos principios fundamentales solicitados para la versión Vanilla:
1. **Cero Emojis:** Prohibición absoluta de emojis Unicode en la interfaz, sustituyéndolos por iconografía vectorial SVG profesional, escalable y con estilos consistentes.
2. **CSS Puro Estático:** Cero compilación en tiempo de ejecución (sin Tailwind Play CDN), generando un único archivo CSS minificado y autónomo.
3. **Biblioteca SVG (Sprite Sheet & Assets):** Sistema modular de símbolos vectoriales reutilizables con `<svg><use ... /></svg>`.

---

## 🚫 1. Política de "Zero Emojis" y Sustitución Vectorial

Los emojis suelen verse inconsistentes entre sistemas operativos (Apple, Android, Windows, Linux) y restan seriedad a la estética técnica y cyberpunk-editorial de **Maclovia / Belleza Maldita**.

### Tabla de Sustituciones Vectoriales
| Elemento anterior | Problema del Emoji | Solución SVG en Vanilla |
| :--- | :--- | :--- |
| `🤗 Hugging Face` | Se renderiza diferente en cada OS | `<svg class="icon"><use href="#icon-cpu"></use></svg> Hugging Face` |
| `✨ ¡Listo!` | Apariencia informal o infantil | `<svg class="icon text-emerald-400"><use href="#icon-check"></use></svg>` |
| `⚡ Rendimiento` | Inconsistente en pantallas monocromáticas | `<svg class="icon text-[#E4007C]"><use href="#icon-zap"></use></svg>` |
| `🌐 Web` | Emoji desalineado con la tipografía | `<svg class="icon"><use href="#icon-globe"></use></svg>` |
| `📦 Monorepo` | Distorsión visual en zoom | `<svg class="icon"><use href="#icon-box"></use></svg>` |

---

## 📦 2. Sistema de Sprite SVG (Biblioteca Unificada de Iconos)

En lugar de incrustar manualmente 20 veces el mismo SVG o depender de librerías externas de JS, se implementa un **SVG Sprite Sheet** en `assets/icons/sprite.svg` o embebido al inicio del `index.html`.

### Estructura de `assets/icons/sprite.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <!-- Icono Terminal -->
  <symbol id="icon-terminal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </symbol>

  <!-- Icono Copiar -->
  <symbol id="icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
  </symbol>

  <!-- Icono Check / Éxito -->
  <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </symbol>

  <!-- Icono GitHub -->
  <symbol id="icon-github" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </symbol>

  <!-- Icono Capas / Arquitectura -->
  <symbol id="icon-layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </symbol>
</svg>
```

### Cómo se invoca en el HTML Vanilla:
```html
<!-- Reutilización ultra-limpia y ligera -->
<button class="btn-primary">
  <svg class="w-4 h-4 text-[#E4007C]"><use href="assets/icons/sprite.svg#icon-terminal"></use></svg>
  <span>$ npx maclovia-bm init</span>
</button>
```

### Ventajas del Sprite SVG:
1. **1 sola petición HTTP en caché:** El navegador descarga el archivo una vez y lo cachea.
2. **Control por CSS directo:** Se estiliza con `currentColor`, `fill`, `stroke`, `w-4`, `h-4`.
3. **Cero JavaScript necesario:** Funciona 100% de manera declarativa en HTML.

---

## ⚡ 3. Arquitectura de CSS Puro Estático

En lugar de inyectar scripts pesados en el cliente como Tailwind Play CDN:

### Paso 1: Configurar `src/input.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Reglas visuales específicas de Maclovia / Belleza Maldita */
:root {
  --color-rosa-chilango: #E4007C;
  --color-dark-bg: #0a0a0a;
  --color-dark-card: #121212;
}

.glow-neon {
  box-shadow: 0 0 25px rgba(228, 0, 124, 0.35);
}

.text-gradient-rosa {
  background: linear-gradient(135deg, #ffffff 30%, #E4007C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Paso 2: Generar el archivo final
Se ejecuta una sola vez:
```bash
npx @tailwindcss/cli -i ./src/input.css -o ./css/style.css --minify
```
O descargando el binario oficial de **Tailwind Standalone CLI** (que no necesita Node ni npm).

### Paso 3: Enlazar en `index.html`
```html
<link rel="stylesheet" href="css/style.css">
```
* **Tamaño final:** ~14 KB comprimido.
* **Tiempo de análisis del navegador:** Menos de 2 milisegundos.
* **Cero dependencias:** Funciona abriendo el archivo localmente en cualquier dispositivo.
