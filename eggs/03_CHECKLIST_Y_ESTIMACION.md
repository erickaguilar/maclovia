# ⏱️ Checklist, Esfuerzo Estimado y Riesgos

Este documento resume la matriz de esfuerzo, riesgos identificados y la lista de control de calidad final (QA) para la migración.

---

## ⏱️ Estimación de Esfuerzo por Módulo

| Módulo / Tarea | Nivel de Esfuerzo | Tiempo Estimado | Detalle |
| :--- | :---: | :---: | :--- |
| **Configuración base & Tailwind CDN** | Muy Bajo | ~30 min | Estructura HTML5, carga de Tailwind y configuración de fuentes/colores. |
| **Header, Navegación y Hero** | Bajo | ~45 min | Menú fijo, botones de idioma/marca, hero con gradientes neón. |
| **Directrices & Mockup de Navegador** | Medio | ~1.5 h | Pestañas interactivas, barra de URL, comandos CLI y paleta de colores. |
| **Portafolio de Ingeniería** | Bajo | ~45 min | Grid de cards y filtros de categorías por atributos `data-category`. |
| **Directorio de Talento y Toolkit SVG** | Bajo | ~45 min | Cards de perfiles y botones de descarga de archivos SVG. |
| **Motor i18n (Traducciones ES/EN)** | Bajo-Medio | ~1 h | Marcado de textos con `data-i18n` y lógica de persistencia. |
| **QA, Pruebas Cross-Browser y Limpieza** | Bajo | ~45 min | Verificación en navegadores móviles y desktop, validación W3C. |
| **TOTAL ESTIMADO** | **Moderado** | **~5 - 6 horas de trabajo** | Un único desarrollador puede completarlo en una jornada. |

---

## 🔍 Checklist de Control de Calidad (QA)

Antes de dar por concluida la migración, verificar los siguientes puntos:

### 1. Interfaz y Estilos
- [x] La paleta cromática (`#E4007C` rosa mexicano neón, `#070707` negro profundo, bordes `neutral-800`) es 100% fiel al diseño original.
- [x] Los efectos de desenfoque (`backdrop-filter: blur(16px)`) funcionan correctamente en Safari, Chrome y Firefox.
- [x] La tipografía monoespaciada (código ASCII de Belleza Maldita y comandos CLI) mantiene alineación exacta.
- [x] El diseño es 100% responsive en pantallas móviles (<640px), tablets y escritorios.

### 2. Comportamiento Interactivo
- [x] El botón de `$ npx maclovia-bm init` copia el comando al portapapeles y muestra confirmación visual.
- [x] La navegación simulada del browser (`/`, `/manifesto`, `/specs`) cambia el contenido y la URL sin recargar la página.
- [x] Los filtros de categoría del portafolio ocultan y muestran las tarjetas adecuadas de inmediato.
- [x] Las muestras de color permiten copiar el código HEX/RGB al hacer clic.
- [x] El selector de idioma (ES / EN) traduce todos los textos y recuerda la preferencia en `localStorage`.

### 3. Rendimiento y Cero Dependencias
- [x] La página carga abriendo directamente el archivo `index.html` (doble clic) o mediante `python3 -m http.server`.
- [x] No existen llamadas a librerías externas innecesarias ni errores en la consola de JavaScript.
- [x] Arquitectura de CSS Puro y JavaScript nativo sin dependencias de runtime.

---

## ⚠️ Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
| :--- | :---: | :--- |
| **Archivo HTML muy extenso** | Mantenimiento más complejo que en componentes modulares. | Separar datos repetitivos (proyectos, perfiles de equipo) en archivos JS (`data/projects.js`, `data/team.js`) y renderizarlos con una función corta al iniciar, o mantener el HTML limpio con comentarios de sección claros. |
| **Carga de Lucide Icons en Vanilla** | Posible parpadeo si los iconos tardan en convertirse. | Usar el script diferido y ejecutar `lucide.createIcons()` en el evento `DOMContentLoaded`. Para iconos críticos del Hero, usar SVGs inline directos. |
| **Falta de soporte de Tailwind Play CDN en producción offline** | Si el cliente no tiene internet, CDN no carga. | Compilar un archivo `style.css` estático una única vez con el CLI de Tailwind y distribuirlo localmente. |
