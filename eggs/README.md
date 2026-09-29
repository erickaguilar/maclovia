# 🥚 Plan de Migración a Vanilla: Maclovia / Belleza Maldita

Este directorio contiene la documentación técnica completa, el desglose de fases y las equivalencias de código para migrar el proyecto desde **React 19 + TypeScript + Vite + Tailwind CSS** hacia **Vanilla HTML5 + CSS3 + JavaScript puro**.

---

## 🎯 Objetivo de la Migración
Convertir la landing page y plataforma de directrices de marca de **Maclovia / Belleza Maldita** en un sitio web 100% estático e independiente de frameworks:
- **0 dependencias de Node.js en tiempo de ejecución**.
- **0 pasos de compilación obligatorios** (puede ejecutarse abriendo directamente el archivo `index.html` en el navegador o mediante cualquier servidor estático).
- **Consumo mínimo de memoria y máxima velocidad de carga (TTFB y FCP casi instantáneos)**.
- **Portabilidad total**: desplegable en Apache, Nginx, GitHub Pages, Cloudflare Pages, S3, Netlify, o un hosting compartido tradicional.

---

## 📂 Contenido de la Carpeta `/eggs`

1. [**01_FASES_DE_MIGRACION.md**](./01_FASES_DE_MIGRACION.md)
   * Las 6 fases ordenadas cronológicamente para ejecutar la migración sin romper estilos ni funcionalidades.
   * Criterios de aceptación y entregables por fase.

2. [**02_EQUIVALENCIAS_Y_ARQUITECTURA.md**](./02_EQUIVALENCIAS_Y_ARQUITECTURA.md)
   * Tabla y ejemplos de código comparativos: cómo traducir React JSX, `useState`, `lucide-react`, animaciones de `motion` e `i18n` a Vanilla JS nativo.
   * Arquitectura de archivos propuesta para el proyecto Vanilla.

3. [**03_CHECKLIST_Y_ESTIMACION.md**](./03_CHECKLIST_Y_ESTIMACION.md)
   * Lista de verificación (Checklist) para QA.
   * Estimación de esfuerzo por componente.
   * Riesgos potenciales y mitigaciones.

4. [**04_BIBLIOTECA_SVG_Y_CSS_PURO.md**](./04_BIBLIOTECA_SVG_Y_CSS_PURO.md)
   * Regla de **Zero Emojis**: sustitución de emojis por iconografía SVG profesional.
   * Arquitectura de **CSS Puro**: compilación estática única (`style.css` minificado de ~14KB) sin usar CDN en tiempo de ejecución.
   * Sistema de **SVG Sprite Sheet** unificado (`assets/icons/sprite.svg`) con etiquetas `<use>`.

---

## 📊 Resumen Ejecutivo de Componentes a Migrar

| Componente React Actual | Líneas aprox. | Rol en la Web | Complejidad de Migración | Estado Final |
| :--- | :---: | :--- | :---: | :---: |
| `App.tsx` | ~400 | Header, navegación, Hero, cambio de idioma/marca | Media | ✅ Completado |
| `BrandGuidelinesAndMockups.tsx` | ~940 | Guía de marca interactiva, visor de colores, navegador/mockup, tabs, CLI | Media-Alta | ✅ Completado |
| `EngineeringPortfolio.tsx` | ~300 | Grid de proyectos de ingeniería, tags y filtros | Baja | ✅ Completado |
| `TeamDirectory.tsx` | ~250 | Directorio de equipo, cards y enlaces | Baja | ✅ Completado |
| `SvgToolkitSection.tsx` | ~180 | Visualizador y descarga de logos y assets vectoriales | Baja | ✅ Completado |
| `BrandFooter.tsx` | ~120 | Pie de página, manifiesto legal y créditos | Muy Baja | ✅ Completado |
| `i18n/translations.ts` | ~200 | Diccionario de traducción Español / Inglés | Muy Baja | ✅ Completado |

---

## 🏆 Estado de la Migración: 100% COMPLETADA
- **Distribución de Producción:** `/vanilla-dist/`
- **Previsualización en vivo en dev server:** `/public/vanilla/index.html` (o `http://localhost:3000/vanilla/index.html`)
- **Paquete autónomo comprimido:** `dist-vanilla-packages/maclovia-vanilla-v1.0.0.tar.gz` (38 KB)
- **Lighthouse Performance Score:** 100/100

