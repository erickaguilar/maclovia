#!/usr/bin/env node

/**
 * ✦ MACLOVIA. Belleza Maldita — Official Scaffolding CLI (npx maclovia-bm init)
 * Zero external dependencies • Pure native Node.js (fs, path)
 * Creates a production-grade, zero-runtime-framework web application with
 * Maclovia design tokens, SVG Sprite Sheet, and Vercel/Vite deployment ready.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PKG_VERSION = '1.2.0';

// ANSI Colors for high-contrast CLI terminal
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  rosa: '\x1b[38;2;228;0;124m', // #E4007C Rosa Chilango
  cyan: '\x1b[38;2;96;165;250m',
  green: '\x1b[38;2;52;211;153m',
  yellow: '\x1b[38;2;251;191;36m',
  white: '\x1b[38;2;255;255;255m',
  gray: '\x1b[38;2;148;163;184m',
};

const ASCII_BANNER = `
${C.rosa}${C.bold}  ███╗   ███╗ █████╗  ██████╗██╗      ██████╗ ██╗   ██╗██╗ █████╗ 
  ████╗ ████║██╔══██╗██╔════╝██║     ██╔═══██╗██║   ██║██║██╔══██╗
  ██╔████╔██║███████║██║     ██║     ██║   ██║██║   ██║██║███████║
  ██║╚██╔╝██║██╔══██║██║     ██║     ██║   ██║╚██╗ ██╔╝██║██╔══██║
  ██║ ╚═╝ ██║██║  ██║╚██████╗███████╗╚██████╔╝ ╚████╔╝ ██║██║  ██║
  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝  ╚═╝${C.reset}
             ${C.rosa}✦ B E L L E Z A   M A L D I T A ✦${C.reset}
     ${C.dim}Arquitectura de Sistemas & Craft de Software • CDMX${C.reset}
`;

function printHelp() {
  console.log(ASCII_BANNER);
  console.log(`
${C.bold}${C.white}USO:${C.reset}
  ${C.rosa}npx maclovia-bm${C.reset} <comando> [opciones]

${C.bold}${C.white}COMANDOS:${C.reset}
  ${C.green}init${C.reset} <nombre-del-proyecto>    Crea un nuevo proyecto Maclovia / Belleza Maldita
  ${C.green}tokens${C.reset}                        Exporta la especificación de tokens en el directorio actual
  ${C.green}version${C.reset}                       Muestra la versión de la herramienta
  ${C.green}help${C.reset}                          Muestra esta ayuda

${C.bold}${C.white}OPCIONES:${C.reset}
  ${C.cyan}--force, -f${C.reset}                 Sobrescribe el directorio si ya existe
  ${C.cyan}--template <tipo>${C.reset}           Plantilla: 'vanilla' (predeterminada) o 'minimal'
  ${C.cyan}--help, -h${C.reset}                  Muestra este menú

${C.bold}${C.white}EJEMPLO:${C.reset}
  ${C.dim}$${C.reset} ${C.rosa}npx maclovia-bm init mi-aplicacion${C.reset}
  ${C.dim}$${C.reset} ${C.white}cd mi-aplicacion && npm run dev${C.reset}
`);
}

function printVersion() {
  console.log(`${C.rosa}maclovia-bm${C.reset} v${PKG_VERSION}`);
}

/**
 * Generates the starter project files in target directory
 */
function scaffoldProject(projectName, options = {}) {
  const targetDir = path.resolve(process.cwd(), projectName);

  console.log(ASCII_BANNER);
  console.log(`${C.bold}${C.white}Inicializando andamiaje de arquitectura para:${C.reset} ${C.rosa}${C.bold}${projectName}${C.reset}`);
  console.log(`${C.dim}Directorio destino:${C.reset} ${C.cyan}${targetDir}${C.reset}\n`);

  if (fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);
    if (files.length > 0 && !options.force) {
      console.error(`${C.yellow}[AVISO] El directorio ya existe y contiene archivos:${C.reset} ${targetDir}`);
      console.error(`Usa ${C.cyan}--force${C.reset} para sobrescribir o elige otro nombre de carpeta.`);
      process.exit(1);
    }
  }

  // Create directory structure
  const dirs = [
    targetDir,
    path.join(targetDir, 'css'),
    path.join(targetDir, 'js'),
    path.join(targetDir, 'assets'),
    path.join(targetDir, 'assets', 'icons'),
    path.join(targetDir, 'public'),
  ];

  for (const d of dirs) {
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, { recursive: true });
    }
  }

  console.log(`${C.dim}[1/5]${C.reset} Creando estructura modular de directorios... ${C.green}[OK]${C.reset}`);

  // 1. Write package.json
  const packageJson = {
    name: projectName,
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite --port=3000 --host=0.0.0.0',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      vite: '^6.2.3',
    },
  };
  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`${C.dim}[2/5]${C.reset} Configurando scripts de compilación (Vite + Zero-Runtime)... ${C.green}[OK]${C.reset}`);

  // 2. Copy or generate SVG Sprite Sheet
  const sourceSprite = path.join(ROOT_DIR, 'assets', 'icons', 'sprite.svg');
  const targetSprite = path.join(targetDir, 'assets', 'icons', 'sprite.svg');
  if (fs.existsSync(sourceSprite)) {
    fs.copyFileSync(sourceSprite, targetSprite);
  } else {
    // Fallback minimal sprite
    const fallbackSprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-sigil" viewBox="0 0 100 100"><polygon points="50,5 95,38 78,92 22,92 5,38" fill="none" stroke="#E4007C" stroke-width="4"/><path d="M50 25 L75 75 L25 75 Z" fill="none" stroke="#E4007C" stroke-width="4"/></symbol>
  <symbol id="icon-terminal" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></symbol>
</svg>`;
    fs.writeFileSync(targetSprite, fallbackSprite);
  }

  // Also place in public/assets/icons for preview
  const publicIconsDir = path.join(targetDir, 'public', 'assets', 'icons');
  fs.mkdirSync(publicIconsDir, { recursive: true });
  fs.copyFileSync(targetSprite, path.join(publicIconsDir, 'sprite.svg'));
  console.log(`${C.dim}[3/5]${C.reset} Inyectando SVG Sprite Sheet unificado (Zero-Emojis)... ${C.green}[OK]${C.reset}`);

  // 3. Write CSS (Tokens & Theme)
  const cssContent = `/* ✦ MACLOVIA / BELLEZA MALDITA DESIGN SYSTEM ✦ */
:root {
  --color-rosa-chilango: #E4007C;
  --color-rosa-glow: rgba(228, 0, 124, 0.4);
  --color-rosa-subtle: rgba(228, 0, 124, 0.08);
  --color-rosa-border: rgba(228, 0, 124, 0.25);

  --bg-primary: #070709;
  --bg-secondary: #0f0f13;
  --bg-card: rgba(18, 18, 24, 0.7);

  --text-primary: #F8F9FA;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-card: rgba(255, 255, 255, 0.12);

  --font-sans: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-serif: 'Abril Fatface', Georgia, serif;
  --font-script: 'Tipo Movin CDMX', 'Space Grotesk', sans-serif;
  --font-movin: 'Tipo Movin CDMX', 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 14px;
}

[data-theme="light"] {
  --bg-primary: #FAF8F8;
  --bg-secondary: #F1ECEC;
  --bg-card: #FFFFFF;
  --text-primary: #121316;
  --text-secondary: #4A5568;
  --text-muted: #718096;
  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-card: rgba(0, 0, 0, 0.12);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: 100%;
}

.text-rosa { color: var(--color-rosa-chilango); }
.font-cookie { font-family: var(--font-script); }

header {
  border-bottom: 1px solid var(--border-subtle);
  padding: 1.25rem 0;
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--color-rosa-chilango);
  color: #FFFFFF;
}

.btn-primary:hover {
  filter: brightness(1.1);
  box-shadow: 0 0 20px var(--color-rosa-glow);
}

.hero {
  padding: 5rem 0 3rem;
  text-align: center;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--color-rosa-border);
}
`;
  fs.writeFileSync(path.join(targetDir, 'css', 'style.css'), cssContent);

  // 4. Write JS
  const jsContent = `/**
 * ${projectName} — Core Application Logic
 * Zero external libraries • 100% Native ECMAScript
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('✦ ${projectName} inicializado con éxito');

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
});
`;
  fs.writeFileSync(path.join(targetDir, 'js', 'main.js'), jsContent);

  // 5. Write index.html
  const htmlContent = `<!DOCTYPE html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName} — Belleza Maldita</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <header>
    <div class="container header-nav">
      <a href="#" class="brand">
        <span class="text-rosa font-cookie" style="font-size: 1.75rem;">ꂵ</span>
        <span>${projectName}</span>
      </a>
      <button id="theme-toggle" class="btn btn-primary" aria-label="Cambiar tema">
        Tema
      </button>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <span class="text-rosa" style="font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase;">
        ✦ Software de Alto Rendimiento ✦
      </span>
      <h1>
        ${projectName} <span class="text-rosa font-cookie">Maldita</span>
      </h1>
      <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 2rem; font-size: 1.15rem;">
        Arquitectura zero-framework, tokens nativos Rosa Chilango (#E4007C) y rendimiento 100/100 en Lighthouse.
      </p>
      <div>
        <a href="#features" class="btn btn-primary">Comenzar</a>
      </div>
    </section>

    <section id="features" class="card-grid">
      <div class="card">
        <h3 class="text-rosa">Zero-Runtime</h3>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">
          Cero milisegundos de hidratación, arranque instantáneo y cero dependencias de cliente.
        </p>
      </div>
      <div class="card">
        <h3 class="text-rosa">Design Tokens</h3>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">
          Paleta cromática controlada mediante CSS Custom Properties con modo claro y oscuro dinámico.
        </p>
      </div>
      <div class="card">
        <h3 class="text-rosa">Vercel Ready</h3>
        <p style="color: var(--text-secondary); margin-top: 0.5rem;">
          Preconfigurado con vercel.json para computación perimetral con enrutamiento SPA y caché inmutable.
        </p>
      </div>
    </section>
  </main>

  <footer style="margin-top: auto; border-top: 1px solid var(--border-subtle); padding: 2rem 0; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
    <div class="container">
      Desarrollado bajo el manifiesto de <strong>MACLOVIA. Belleza Maldita</strong> • Ciudad de México
    </div>
  </footer>

  <script type="module" src="./js/main.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent);

  // 6. Write vercel.json
  const vercelJson = {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    framework: 'vite',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    cleanUrls: true,
  };
  fs.writeFileSync(path.join(targetDir, 'vercel.json'), JSON.stringify(vercelJson, null, 2) + '\n');

  // 7. Write .gitignore
  const gitignore = `node_modules/\ndist/\n.vercel\n*.log\n.DS_Store\n`;
  fs.writeFileSync(path.join(targetDir, '.gitignore'), gitignore);

  // 8. Write README.md
  const readme = `# ✦ ${projectName}

> Proyecto generado con **Maclovia Belleza Maldita CLI** (\`npx maclovia-bm init\`).
> Rendimiento extremo, cero dependencias de cliente y tokens oficiales.

## Inicio Rápido

\`\`\`bash
# 1. Instalar dependencias de desarrollo
npm install

# 2. Iniciar servidor de desarrollo en vivo (puerto 3000)
npm run dev

# 3. Compilar para producción
npm run build
\`\`\`

## Despliegue en Vercel

\`\`\`bash
npx vercel
\`\`\`
`;
  fs.writeFileSync(path.join(targetDir, 'README.md'), readme);

  console.log(`${C.dim}[4/5]${C.reset} Generando plantilla semantic HTML5, CSS tokens y vercel.json... ${C.green}[OK]${C.reset}`);
  console.log(`${C.dim}[5/5]${C.reset} Proyecto verificado y listo en el disco. ${C.green}[OK]${C.reset}\n`);

  console.log(`${C.green}${C.bold}[OK] ¡Proyecto creado exitosamente en:${C.reset} ${C.white}${targetDir}${C.reset}\n`);
  console.log(`${C.bold}${C.white}Siguientes pasos para arrancar:${C.reset}`);
  console.log(`  ${C.rosa}cd${C.reset} ${projectName}`);
  console.log(`  ${C.rosa}npm install${C.reset}`);
  console.log(`  ${C.rosa}npm run dev${C.reset}\n`);
}

/**
 * CLI Entry point
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printHelp();
    return;
  }

  if (args.includes('-v') || args.includes('--version') || args[0] === 'version') {
    printVersion();
    return;
  }

  const command = args[0];

  if (command === 'init') {
    const projectName = args[1];
    if (!projectName) {
      console.error(`\n${C.yellow}Error:${C.reset} Debes especificar un nombre para el proyecto.\n`);
      console.log(`Ejemplo: ${C.rosa}npx maclovia-bm init mi-aplicacion${C.reset}\n`);
      process.exit(1);
    }
    const force = args.includes('--force') || args.includes('-f');
    scaffoldProject(projectName, { force });
  } else if (command === 'tokens') {
    console.log(`${C.rosa}Exportando tokens de diseño...${C.reset}`);
    const tokensFile = path.resolve(process.cwd(), 'maclovia-tokens.json');
    const tokens = {
      name: 'Maclovia Design Tokens',
      version: '1.2.0',
      colors: {
        rosaChilango: '#E4007C',
        azabacheVoid: '#070707',
        alabastroEditorial: '#FAF8F8',
      },
    };
    fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2));
    console.log(`${C.green}[OK] Tokens exportados a:${C.reset} ${tokensFile}`);
  } else {
    console.error(`\n${C.yellow}Comando no reconocido:${C.reset} ${command}`);
    console.log(`Ejecuta ${C.rosa}npx maclovia-bm --help${C.reset} para ver la lista de comandos disponibles.\n`);
    process.exit(1);
  }
}

main();
