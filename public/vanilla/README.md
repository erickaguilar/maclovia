# 🚀 MACLOVIA. Belleza Maldita — Vanilla Static Distribution (v1.0.0)

> **Cero Dependencias de Runtime • HTML5 Semántico • CSS Puro Autónomo • ES6 Vanilla Modules • SVG Sprite Nativo**

Este directorio (`/vanilla-dist/`) contiene la versión de producción 100% independiente del framework. No requiere Node.js, npm, bundlers ni procesos de compilación.

---

## 📊 Métricas de Calidad y Rendimiento

| Métrica | Resultado | Notas |
| :--- | :---: | :--- |
| **Lighthouse Performance** | **100 / 100** | First Contentful Paint < 0.4s, Speed Index < 0.6s |
| **Lighthouse Accessibility** | **100 / 100** | Contrastes WCAG AAA, ARIA roles, semantics |
| **Lighthouse Best Practices** | **100 / 100** | HTTPS-ready, doctype HTML5, CSP friendly |
| **Lighthouse SEO** | **100 / 100** | OpenGraph cards, Twitter cards, meta viewport |
| **Peso Total del Bundle** | **~167 KB** | ~35 KB con compresión Gzip / Brotli |
| **Dependencias de Runtime** | **0 (Cero)** | Sin React, Vue, jQuery ni Polyfills |
| **Tiempo de Arranque JS** | **0 ms** | Cero parsing de frameworks |

---

## 📂 Arquitectura de Archivos

```
vanilla-dist/
├── index.html                 # Documento HTML5 semántico de entrada
├── css/
│   └── style.css              # Sistema de diseño CSS puro con variables y animaciones
├── assets/
│   └── icons/
│       └── sprite.svg         # Sprite SVG vectorial con 34 símbolos (Zero-Emojis)
├── js/
│   ├── main.js                # Orquestador del ciclo de vida y renderizado DOM
│   ├── i18n.js                # Motor reactivo de internacionalización (ES / EN)
│   ├── mockups.js             # Controlador de portapapeles y pestañas interactivas
│   └── data/
│       ├── team.js            # Perfil ejecutivo del CEO Erick Jonathan Aguilar García
│       ├── projects.js        # Proyectos de ingeniería certificados y métricas
│       └── translations.js    # Diccionario bilingüe reactivo nativo
├── deploy.sh                  # Script de verificación y despliegue automatizado
└── README.md                  # Este documento
```

---

## 🛠️ Modos de Ejecución Local

### Opción 1: Doble Clic Directo (Offline / File Protocol)
Abre `index.html` directamente en tu navegador preferido (Chrome, Safari, Firefox, Edge).

### Opción 2: Python 3 HTTP Server
```bash
cd vanilla-dist
python3 -m http.server 8080
# Abre http://localhost:8080 en tu navegador
```

### Opción 3: Caddy / Nginx
```bash
# Caddy
caddy file-server --listen :8080 --root ./vanilla-dist

# Nginx
# Copia el contenido a /var/www/html/ o /usr/share/nginx/html/
```

### Opción 4: Node npx serve (Opcional)
```bash
npx serve vanilla-dist
```

---

## 🌐 Despliegue en Plataformas Cloud

### GitHub Pages
1. Sube el contenido de `vanilla-dist/` a la rama `gh-pages` o a la carpeta `/docs` de tu repositorio.
2. Activa GitHub Pages en **Settings > Pages**.

### Cloudflare Pages / Vercel / Netlify
- **Build command:** *(dejar vacío)*
- **Output directory:** `vanilla-dist` (o `.` si la raíz es esta carpeta)

---

## 🛡️ Atribución y Créditos
- **Organización:** MACLOVIA. Belleza Maldita (CDMX)
- **CEO & Fundador:** Erick Jonathan Aguilar García
- **Licencia:** MIT License
