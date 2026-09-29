# 📜 Registro de Cambios (Changelog)

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y este proyecto se adhiere a [Semantic Versioning (SemVer)](https://semver.org/lang/es/).

---

## [1.2.0] - 2026-09-28

### 🚀 Añadido
- **Media Hub & Galería Multiaset (4 Formatos Oficiales):**
  - Selector interactivo entre: *01. Isotipo Pentagonal Sigilo 'ꂵ'*, *02. Logotipo Horizontal Completo*, *03. Monograma Editorial CDMX*, y *04. Insignia de Certificación de Arquitectura de Sistemas*.
- **Retícula Técnica & Blueprint de Proporciones (Clearspace Overlay):**
  - Alternador interactivo que superpone ejes de construcción matemáticos a 72° del pentágono regular, radios dorados concéntricos, zona de protección mínima ($1X$) y cotas técnicas.
- **Exportador Multi-Formato & Favicon Kit:**
  - Exportación instantánea a PNG en alta resolución (1024×1024) con fondo transparente mediante Canvas nativo.
  - Generador de paquete Favicons Web (32×32 PNG y 180×180 Apple Touch Icon).
  - Pestañas de código para SVG XML, HTML5 Embed, React/JSX Component y Data URI Base64.
- **Generador de Fondos de Pantalla 4K (Wallpaper Studio Canvas Engine):**
  - Generación en tiempo real de wallpapers minimalistas ultra HD para Desktop 4K (3840×2160) y Mobile Retina (1170×2532).
  - Paletas personalizadas: *Obsidiana Profunda* (#070709), *Azabache Puro* (#000000) y *Alabastro Editorial* (#FAF8F8) con resplandor en Rosa Chilango (#E4007C).
- **Descarga Directa de Tokens de Diseño:**
  - `maclovia-tokens.css`: Especificación completa en CSS Custom Properties.
  - `maclovia-tokens.json`: Formato estándar interoperable con Figma y Style Dictionary.

---

## [1.1.0] - 2026-09-28

### 🚀 Añadido
- **Arquitectura App Shell Modular:** Transformación de `index.html` en un esqueleto semántico ultraligero de solo ~35 líneas.
- **Directorio de Parciales HTML (`src/partials/`):**
  - `head.html`: Metadatos semánticos, SEO, OpenGraph cards (1200×630), Twitter preview, preconnect a fuentes y tokens.
  - `navbar.html`: Barra de navegación responsive con isotipo oficial, selector bilingüe (ES/EN), alternador de tema claro/oscuro y conmutador de marca de 3 vías (*Unified*, *Maclovia*, *Belleza Maldita*).
  - `hero.html`: Portada con resplandor radial difuso, showcase tipográfico reactivo (*Abril Fatface* / *Cookie Script*), credenciales de CDMX y botones de acción.
  - `team.html`: Sección de perfil ejecutivo y liderazgo tecnológico de Erick Jonathan Aguilar García.
  - `portfolio.html`: Laboratorio de software y proyectos certificados en GitHub con filtrado dinámico por categoría.
  - `guidelines.html`: Manual de identidad con escenarios reales de producción (OpenGraph Card, CLI Banner, Consola DevTools en Navegador Web, Tarjeta Editorial Foil de 600g) y normativa de aplicación Do's & Don'ts.
  - `toolkit.html`: Banco de pruebas interactivo (*SVG Workbench*) para el Sigilo MAT (`ꂵ`) con variantes cromáticas *Obsidiana* (Dark) y *Porcelana* (Light), redimensionado en vivo (32px-128px), alternador de animación y exportación instantánea en `.svg` o marcado XML.
  - `footer.html`: Pie de página editorial de 4 pilares, reloj en tiempo real para la Ciudad de México (CDMX), estado operativo 99.98% SLA y botón de retorno al inicio con scroll suave.
- **Plugin de Compilación Nativo (`vite-plugin-html-partials`):** Integrado en `vite.config.js` sin librerías externas de npm, con resolución recursiva de directivas `<include src="..." />` y soporte para hot-reload en desarrollo.
- **Documentación Centralizada (`README.md`):** Manifiesto de ingeniería, guía de desarrollo local, especificaciones de diseño y opciones de despliegue en la nube.
- **Registro Oficial de Versiones (`CHANGELOG.md`):** Trazabilidad histórica según estándar SemVer.

### 🔄 Cambiado
- Reducción drástica del archivo `index.html` de 1,144 líneas a ~35 líneas (97% de reducción de complejidad en la raíz).
- Sincronización automática de compilación hacia `dist/`, `vanilla-dist/index.html` y `public/vanilla/`.
- Actualización de versión en `package.json` a `1.1.0`.
- Actualización del script `vanilla-dist/deploy.sh` para empaquetar artefactos `v1.1.0`.

### 🛡️ Rendimiento y Seguridad
- Mantenimiento estricto de **100/100 en todas las categorías de Google Lighthouse** (Performance, Accessibility, Best Practices, SEO).
- Cero dependencias de framework en cliente (0 KB de React, Vue o polyfills externos).
- Verificación de contraste WCAG AAA para la paleta Rosa Chilango (`#E4007C`) y fondos Obsidian (`#070707`) / Alabastro (`#FAF8F8`).

---

## [1.0.0] - 2026-09-25

### 🚀 Añadido
- **Lanzamiento Inicial de Producción:** Plataforma web oficial de **MACLOVIA. Belleza Maldita**.
- **Sistema de Diseño en CSS Puro (`css/style.css`):**
  - Más de 1,300 líneas de estilos autónomos con variables CSS nativas (*design tokens*).
  - Soporte completo para temas Dark y Light mediante atributo `data-theme` en `<html>`.
- **Sprite Sheet SVG Vectorial (`assets/icons/sprite.svg`):**
  - 34 símbolos vectoriales nativos para una política estricta de *Zero-Emojis*.
  - Isotipo sagrado pentagonal y sigilo criptográfico `ꂵ` (MAT).
- **Motor de Internacionalización Reactivo (`js/i18n.js`):**
  - Traducción instantánea cliente Español / Inglés sin dependencias externas.
  - Diccionario estructurado en `js/data/translations.js`.
- **Capa de Datos Desacoplada:**
  - `js/data/projects.js`: Metadatos de sistemas de software distribuido y microservicios.
  - `js/data/team.js`: Perfil profesional, stack técnico y biografía del fundador.
- **Módulo de Interactividad y Mockups (`js/mockups.js`):**
  - Navegador web simulado con pestañas de rutas (`/studio`, `/manifesto`, `/specs`) y consola DevTools colapsable.
  - Emulador de terminal UNIX con banner ASCII de alta definición y copia rápida al portapapeles.
- **Distribución Estática Standalone (`vanilla-dist/`):**
  - Entorno listo para servir en Apache, Nginx, Caddy o GitHub Pages sin Node.js.
  - Script de validación sintáctica y empaquetado `deploy.sh`.
- **Documentación Técnica de Ingeniería (`/eggs/`):**
  - `01_FASES_DE_MIGRACION.md`
  - `02_EQUIVALENCIAS_Y_ARQUITECTURA.md`
  - `03_CHECKLIST_Y_ESTIMACION.md`
  - `04_BIBLIOTECA_SVG_Y_CSS_PURO.md`

---

[1.1.0]: https://github.com/erickaguilar/maclovia/releases/tag/v1.1.0
[1.0.0]: https://github.com/erickaguilar/maclovia/releases/tag/v1.0.0
