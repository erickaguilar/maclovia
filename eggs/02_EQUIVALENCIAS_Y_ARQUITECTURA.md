# 🔄 Equivalencias Técnicas: De React a Vanilla JS

Esta guía describe exactamente cómo reemplazar los patrones actuales de React con código estándar de la Web Platform (HTML5, CSS3, ES6+).

---

## 1. Iconos (`lucide-react` ➔ Lucide Vanilla)

### En React:
```tsx
import { Terminal, Copy, Check, ExternalLink } from 'lucide-react';

<button className="flex items-center gap-2">
  <Terminal size={14} />
  <span>$ npx maclovia-bm init</span>
</button>
```

### En Vanilla:
```html
<!-- En el <head> -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- En el HTML -->
<button class="flex items-center gap-2">
  <i data-lucide="terminal" class="w-3.5 h-3.5"></i>
  <span>$ npx maclovia-bm init</span>
</button>

<!-- Al final del body o en main.js -->
<script>
  lucide.createIcons();
</script>
```

---

## 2. Estado de Pestañas y Rutas (`useState` ➔ DOM Classes)

### En React:
```tsx
const [browserRoute, setBrowserRoute] = useState('/');

{browserRoute === '/' && <HomeContent />}
{browserRoute === '/manifesto' && <ManifestoContent />}
```

### En Vanilla:
```html
<!-- Botones -->
<button onclick="switchRoute('/')">Home</button>
<button onclick="switchRoute('/manifesto')">Manifiesto</button>

<!-- Vistas -->
<div id="route-home" class="route-view">...</div>
<div id="route-manifesto" class="route-view hidden">...</div>

<script>
function switchRoute(route) {
  document.querySelectorAll('.route-view').forEach(el => el.classList.add('hidden'));
  if (route === '/') document.getElementById('route-home').classList.remove('hidden');
  if (route === '/manifesto') document.getElementById('route-manifesto').classList.remove('hidden');
  document.getElementById('browser-url-input').value = 'https://bellezamaldita.mx' + route;
}
</script>
```

---

## 3. Copiado al Portapapeles (`copyToClipboard`)

### En React:
```tsx
const [copiedKey, setCopiedKey] = useState<string | null>(null);

const copyToClipboard = (text: string, key: string) => {
  navigator.clipboard.writeText(text);
  setCopiedKey(key);
  setTimeout(() => setCopiedKey(null), 2000);
};
```

### En Vanilla:
```javascript
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = buttonElement.innerHTML;
    buttonElement.classList.add('bg-green-600');
    buttonElement.innerText = '¡Copiado!';
    
    setTimeout(() => {
      buttonElement.classList.remove('bg-green-600');
      buttonElement.innerHTML = originalHtml;
      lucide.createIcons(); // Vuelve a inicializar iconos si los hay
    }, 2000);
  });
}
```

---

## 4. Filtrado de Proyectos del Portafolio

### En React:
```tsx
const [activeCategory, setActiveCategory] = useState('all');
const filteredProjects = activeCategory === 'all' 
  ? projects 
  : projects.filter(p => p.category === activeCategory);

return filteredProjects.map(p => <ProjectCard key={p.id} project={p} />);
```

### En Vanilla:
```javascript
function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  // Actualizar estilo activo de botones
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-filter') === category;
    btn.classList.toggle('bg-[#E4007C]', isActive);
    btn.classList.toggle('text-white', isActive);
  });
}
```

---

## 5. Sistema de Internacionalización (ES / EN)

### En Vanilla:
```javascript
// translations.js
const translations = {
  es: {
    heroTitle: "Ingeniería de Software & Arquitectura de Marca",
    manifestoBtn: "Ver Manifiesto CDMX →",
    contactUs: "Contacto"
  },
  en: {
    heroTitle: "Software Engineering & Brand Architecture",
    manifestoBtn: "View CDMX Manifesto →",
    contactUs: "Contact Us"
  }
};

let currentLang = localStorage.getItem('maclovia_lang') || 'es';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('maclovia_lang', lang);
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.getElementById('lang-label').textContent = lang.toUpperCase();
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
```

---

## 6. Animaciones: Reemplazando `motion` (Framer Motion)

En lugar de cargar la librería `motion` (~40KB), se aplican clases CSS nativas:

```css
/* Transiciones suaves en hover y apariciones */
.fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
Cualquier contenedor que cambie de pestaña sólo necesita agregar la clase `.fade-in` para lograr la misma estética fluida.
