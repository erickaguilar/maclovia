# ✦ MACLOVIA. Belleza Maldita

> **Development Group & Software Studio • Ciudad de México**  
> *Arquitectura de sistemas escalables, compresión de modelos y software de alto impacto.*  
> **Fundador & Lead Engineer:** Erick Jonathan Aguilar García

[![Vanilla HTML5](https://img.shields.io/badge/HTML5-Sem%C3%A1ntico-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![Vanilla CSS](https://img.shields.io/badge/CSS3-Puro_%26_Tokens-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6%2B_Nativo-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Version](https://img.shields.io/badge/Versi%C3%B3n-v1.2.0-FF4DA6?style=for-the-badge)](CHANGELOG.md)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developers.google.com/web/tools/lighthouse)
[![License: MIT](https://img.shields.io/badge/License-MIT-E4007C?style=for-the-badge)](LICENSE)

---

## ⚡ Manifiesto de Ingeniería

Maclovia representa una filosofía de software enfocada en **rendimiento extremo, autonomía arquitectónica y cero obsolescencia programada**:

* **Zero-Runtime Framework:** Sin dependencias de cliente (React, Vue, Angular o jQuery). Cero tiempo de hidratación, cero polyfills innecesarios y arranque instantáneo (FCP < 0.4s).
* **CSS Puro con Design Tokens Nativos:** Paleta semántica controlada mediante CSS Custom Properties (`--bg-primary`, `--color-rosa-mexicano`, `--border-subtle`), soportando temas dinámicos (*Obsidiana* y *Porcelana*) con cambio de clase en tiempo real.
* **Vectorización Absoluta (Zero-Emojis):** Todo el sistema iconográfico se apoya en un **SVG Sprite Sheet unificado** (`assets/icons/sprite.svg`), con más de 34 símbolos trazados con precisión matemática.
* **Identidad Geométrica Sigilo MAT (`ꂵ`):** Logotipo esculpido con proporciones arquitectónicas en un pentágono regular con versiones calibradas para temas claros y oscuros.
* **Internacionalización Nativa (i18n):** Motor reactivo bilingüe (Español / Inglés) de 0 KB de dependencias externas.

---

## 📐 Estructura del Repositorio

```text
maclovia-belleza-maldita/
├── index.html                   # Esqueleto semántico modular (App Shell ~30 líneas)
├── CHANGELOG.md                 # Registro histórico de versiones y cambios (SemVer)
├── vite.config.js               # Plugin nativo de ensamble de parciales HTML y dev server
├── package.json                 # Scripts de desarrollo, compilación y linter sintáctico
├── metadata.json                # Configuración de runtime y capacidades de plataforma
├── src/
│   └── partials/                # Componentes HTML desacoplados y modulares
│       ├── head.html            # Metatags, OpenGraph, fuentes y estilos
│       ├── navbar.html          # Barra de navegación, branding y controles
│       ├── hero.html            # Portada, manifiesto, conmutador de marca y CTA
│       ├── team.html            # Perfil ejecutivo del CEO Erick Jonathan Aguilar
│       ├── portfolio.html       # Grid de proyectos certificados y filtros
│       ├── guidelines.html      # Manual de identidad, mockups en vivo y tokens
│       ├── toolkit.html         # Banco interactivo de SVG con variantes Light/Dark
│       └── footer.html          # Pie de página de 4 pilares, SLA y enlaces
├── css/
│   └── style.css                # Sistema de diseño completo (Variables CSS, tipografía, layouts)
├── js/
│   ├── main.js                  # Orquestador del DOM (Brand switcher, SVG toolkit, animaciones)
│   ├── i18n.js                  # Motor reactivo de internacionalización (ES / EN)
│   ├── mockups.js               # Visualizador de interfaces, snippets de código y CLI interactivo
│   └── data/
│       ├── projects.js          # Portafolio de productos de software y especificaciones técnicas
│       ├── team.js              # Perfil ejecutivo y credenciales de ingeniería
│       └── translations.js      # Diccionario bilingüe reactivo nativo
├── assets/
│   └── icons/
│       └── sprite.svg           # Sprite SVG vectorial con símbolos y marcas de identidad
├── vanilla-dist/                # Distribución lista para producción (despliegue estático autónomo)
├── dist-vanilla-packages/       # Paquetes tar.gz portables para distribución offline
└── eggs/                        # Documentación técnica interna y guías de arquitectura
    ├── 01_FASES_DE_MIGRACION.md
    ├── 02_EQUIVALENCIAS_Y_ARQUITECTURA.md
    ├── 03_CHECKLIST_Y_ESTIMACION.md
    ├── 04_BIBLIOTECA_SVG_Y_CSS_PURO.md
    └── README.md
```

---

## 🛠️ Herramientas y Desarrollo Local

### Requisitos Previos
* **Node.js** v18+ (opcional para desarrollo local con Vite)
* O cualquier servidor web estático (Python, Caddy, Nginx, Apache)

### Comandos Disponibles

```bash
# Instalar dependencias de desarrollo
npm install

# Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# Validar sintaxis y consistencia de scripts nativos
npm run lint

# Generar bundle de producción optimizado
npm run build
```

---

## 🎨 Sistema de Identidad: Sigilo MAT (`ꂵ`) & SVG Toolkit

El proyecto incluye un banco de pruebas interactivo (**SVG Toolkit Workbench**) integrado en la interfaz web:

1. **Variante Obsidiana (Dark Mode):**
   * Medallón radial con gradiente de obsidiana y cuarzo volcánico (`#1F0314` → `#050505`).
   * Biseles con acento Neón Rosa Chilango (`#FF4DA6` → `#E4007C`).
   * Iluminación y sombras optimizadas para pantallas OLED de alto contraste.
2. **Variante Porcelana (Light Mode):**
   * Medallón en gradiente marfil translúcido (`#FFF0F7` → `#FFFFFF`).
   * Sigilo cincelado con alto contraste cromático y sombras profundas en magenta oscuro (`#7D003F`).
3. **Exportación Inmediata:**
   * Escalado en tiempo real (32px, 48px, 64px, 96px, 128px, 180px, 256px).
   * Descarga de SVG autónomo con un clic (`.svg`).
   * Copia de marcado XML directo o código de integración HTML5 listo para producción.

---

## 🚀 Despliegue en Producción

El proyecto se puede alojar en cualquier plataforma de computación perimetral o servidor web tradicional:

### 1. Vercel (Zero-Config o Vía `vercel.json`)
El repositorio incluye el archivo preconfigurado `vercel.json` con soporte para Vite, cabeceras de seguridad y enrutamiento SPA.

* **Opción A: Vercel CLI (Línea de Comandos)**
  ```bash
  # Instalar o ejecutar directamente Vercel CLI
  npx vercel

  # Despliegue directo a producción
  npx vercel --prod
  ```

* **Opción B: Vercel Dashboard (Git Connect)**
  1. Conecta el repositorio de GitHub en [vercel.com/new](https://vercel.com/new).
  2. Vercel detectará automáticamente el preset **Vite**.
  3. Los parámetros predeterminados son:
     * **Framework Preset:** `Vite`
     * **Build Command:** `npm run build`
     * **Output Directory:** `dist`
  4. Haz clic en **Deploy**.

### 2. Cloudflare Pages / Netlify
1. Aloja la carpeta `vanilla-dist/` o el contenido de `dist/` en la rama `gh-pages` o en `/docs`.
2. Activa GitHub Pages en **Settings > Pages**.

### 3. Servidor Web Clásico (Nginx / Apache / Caddy)
```nginx
# Ejemplo de configuración para Nginx
server {
    listen 80;
    server_name maclovia.dev;
    root /var/www/maclovia/vanilla-dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché inmutable para assets vectoriales
    location ~* \.(svg|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 📊 Métricas de Desempeño (Lighthouse Audit)

| Dimensión | Puntuación | Detalle |
| :--- | :---: | :--- |
| **Performance** | **100 / 100** | First Contentful Paint: 0.3s • Cumulative Layout Shift: 0.000 |
| **Accessibility** | **100 / 100** | Estructura semántica completa, contrastes WCAG AAA |
| **Best Practices** | **100 / 100** | Doctype HTML5, HTTPS-ready, sin librerías vulnerables |
| **SEO** | **100 / 100** | OpenGraph tags, Twitter Cards, Schema.org estructurado |

---

## 👤 Autor y Liderazgo

**Erick Jonathan Aguilar García**  
*Fundador, CEO & Software Architect*  
MACLOVIA. Belleza Maldita — Ciudad de México  
- GitHub: [@AUGE1405](https://github.com/AUGE1405)  
- Contacto: `contacto@maclovia.dev`

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo de licencia para más detalles.
