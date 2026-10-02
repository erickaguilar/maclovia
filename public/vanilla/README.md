# MACLOVIA. Belleza Maldita

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

## Manifiesto de Ingeniería

Maclovia representa una filosofía de software enfocada en **rendimiento extremo, autonomía arquitectónica y cero obsolescencia programada**:

* **Zero-Runtime Framework:** Sin dependencias de cliente (React, Vue, Angular o jQuery). Cero tiempo de hidratación, cero polyfills innecesarios y arranque instantáneo (FCP < 0.4s).
* **CSS Puro con Design Tokens Nativos:** Paleta semántica controlada mediante CSS Custom Properties (`--bg-primary`, `--color-rosa-mexicano`, `--border-subtle`), soportando temas dinámicos (*Obsidiana* y *Porcelana*) con cambio de clase en tiempo real.
* **Vectorización Absoluta (Zero-Emojis):** Todo el sistema iconográfico se apoya en un **SVG Sprite Sheet unificado** (`assets/icons/sprite.svg`), con más de 55 símbolos trazados con precisión matemática y cero dependencia de fuentes emoji del sistema operativo.
* **Identidad Geométrica Glifo Mexica Tepētl ('M'):** Logotipo esculpido con proporciones arquitectónicas en un pentágono regular con versiones calibradas para temas claros y oscuros, inspirado en los códices de la Gran Tenochtitlan.
* **Internacionalización Nativa (i18n):** Motor reactivo bilingüe (Español / Inglés / Chino) de 0 KB de dependencias externas.

---

## Estructura del Repositorio

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
│   ├── i18n.js                  # Motor reactivo de internacionalización (ES / EN / ZH)
│   ├── mockups.js               # Fachada pública de mockups y emulación interactiva
│   ├── modules/                 # Arquitectura desacoplada en 11 módulos especializados
│   │   ├── clipboard.js         # Gestor nativo de portapapeles y retroalimentación SVG
│   │   ├── terminal.js          # Consola UNIX Shell interactiva y ejecutor de Rust
│   │   ├── browser-mockup.js    # Emulador de navegador web y rutas activas
│   │   ├── guidelines.js        # Orquestador de vistas (Manual vs Mockups)
│   │   ├── navigation.js        # Menú móvil, conmutador de marcas y sticky nav
│   │   ├── portfolio.js         # Filtrado reactivo de proyectos y métricas
│   │   ├── team.js              # Perfil ejecutivo y credenciales de autor
│   │   ├── telemetry.js         # Telemetría de GitHub en vivo y caché local
│   │   ├── theme.js             # Gestor de temas Obsidiana / Porcelana
│   │   ├── toolkit.js           # Workbench de activos SVG y generador de wallpapers
│   │   └── utils.js             # Reloj de zona horaria CDMX y botón back-to-top
│   └── data/
│       ├── projects.js          # Portafolio de productos de software y especificaciones técnicas
│       ├── team.js              # Perfil ejecutivo y credenciales de ingeniería
│       └── translations.js      # Diccionario bilingüe reactivo nativo
├── assets/
│   └── icons/
│       └── sprite.svg           # Sprite SVG vectorial con símbolos y marcas de identidad
├── vanilla-dist/                # Distribución lista para producción (despliegue estático autónomo)
├── dist-vanilla-packages/       # Paquetes tar.gz portables para distribución offline
└── bin/                         # CLI de andamiaje oficial (maclovia-bm)
```

---

## Herramientas y Desarrollo Local

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

## CLI de Andamiaje Oficial: `npx maclovia-bm init`

Puedes crear una nueva aplicación web monolítica con la arquitectura de diseño de **Maclovia. Belleza Maldita** en segundos mediante el comando interactivo:

```bash
# Inicializar un nuevo proyecto
npx maclovia-bm init mi-aplicacion

# O de forma local en este repositorio
npm run cli -- init mi-aplicacion
```

### ¿Qué genera el andamiaje?
* **Arquitectura Zero-Runtime:** HTML5 semántico puro sin dependencias pesadas de cliente.
* **Sistema de Tokens CSS Nativo:** Variables CSS para modo *Obsidiana* (Dark) y *Porcelana* (Light), acentuadas con **Rosa Chilango** (`#E4007C`).
* **Sprite Sheet SVG Unificado:** Más de 55 símbolos vectoriales trazados con precisión geométrica (Zero-Emojis).
* **Vercel & Vite Ready:** Configuración lista con `vercel.json` y scripts de servidor de desarrollo en puerto 3000.

---

## Sistema de Identidad: Glifo Mexica Tepētl ('M') & SVG Toolkit

### Herencia Iconográfica & Arqueológica: Códices de la Gran Tenochtitlan
El isotipo oficial de **Maclovia / Belleza Maldita** utiliza el glifo mexica **Tepētl** (Cerro Sagrado / Montaña de la Civilización):
* **Sistema Iconográfico:** Códices Pictográficos Mexicas / Náhuatl (Códice Mendoza y Matrícula de Tributos).
* **Civilización & Era:** Mexica / Tenochca (Postclásico Tardío, Cuenca del Anáhuac).
* **Origen Geográfico:** Ciudad de México (19.4326° N, 99.1332° W • Tenochtitlan).
* **Morfología Arquitectónica:** Doble cresta volcánica que evoca al Popocatépetl e Iztaccíhuatl, formando de manera natural la **letra 'M'** monumental de Maclovia y México, con el portal primordial *Ōztōtl* en su base y el disco solar *Chalchihuite* (Tonatiuh) en su vértice central.

El proyecto incluye un banco de pruebas interactivo (**SVG Toolkit Workbench**) integrado en la interfaz web:

1. **Variante Obsidiana (Dark Mode):**
   * Medallón radial con gradiente de obsidiana y cuarzo volcánico (`#1F0314` → `#050505`).
   * Biseles con acento Neón Rosa Chilango (`#FF4DA6` → `#E4007C`).
   * Iluminación y sombras optimizadas para pantallas OLED de alto contraste.
2. **Variante Porcelana (Light Mode):**
   * Medallón en gradiente marfil translúcido (`#FFF0F7` → `#FFFFFF`).
   * Glifo cincelado con alto contraste cromático y sombras profundas en magenta oscuro (`#7D003F`).
3. **Exportación Inmediata:**
   * Escalado en tiempo real (32px, 48px, 64px, 96px, 128px, 180px, 256px).
   * Descarga de SVG autónomo con un clic (`.svg`).
   * Copia de marcado XML directo o código de integración HTML5 listo para producción.

---

## Despliegue en Producción

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

## Métricas de Desempeño (Lighthouse Audit)

| Dimensión | Puntuación | Detalle |
| :--- | :---: | :--- |
| **Performance** | **100 / 100** | First Contentful Paint: 0.3s • Cumulative Layout Shift: 0.000 |
| **Accessibility** | **100 / 100** | Estructura semántica completa, contrastes WCAG AAA |
| **Best Practices** | **100 / 100** | Doctype HTML5, HTTPS-ready, sin librerías vulnerables |
| **SEO** | **100 / 100** | OpenGraph tags, Twitter Cards, Schema.org estructurado |

---

## Autor y Liderazgo

**Erick Jonathan Aguilar García**  
*Fundador, CEO & Software Architect*  
MACLOVIA. Belleza Maldita — Ciudad de México  
- GitHub: [@AUGE1405](https://github.com/AUGE1405)  
- Contacto: `contacto@maclovia.dev`

---

## Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo de licencia para más detalles.
