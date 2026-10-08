/**
 * Maclovia / Belleza Maldita — Terminal Commands: CLI Scaffold & Shell
 * Resolución de alias npx/npm/maclovia-bm · init · banner · echo · clear.
 *
 * ctx: { log(html, cmd?), esc(str), clear(), raw }
 */

import { ASCII_BANNER } from './banner.js';

/**
 * Normaliza alias de invocación del CLI.
 * Devuelve { cmd, args } o { cmd: null } si ya produjo salida.
 */
export function resolveCliAlias(trimmed, { log, raw }) {
  const parts = trimmed.split(/\s+/);
  let cmd = parts[0].toLowerCase();
  let args = parts.slice(1);

  // Support: `npx maclovia-bm init <app>`, `npx maclovia-bm`, `maclovia-bm init <app>`
  if (cmd === 'npx') {
    const tool = (args[0] || '').toLowerCase();
    if (tool === 'maclovia-bm' || tool === 'maclovia' || tool === 'maclovia-belleza-maldita') {
      cmd = 'maclovia-bm';
      args = args.slice(1);
    } else if (!tool) {
      cmd = 'help';
    }
  }

  if (cmd === 'npm' && (args[0] || '').toLowerCase() === 'create' && (args[1] || '').toLowerCase().includes('maclovia')) {
    cmd = 'maclovia-bm';
    args = ['init', ...args.slice(2)];
  }

  if (cmd === 'maclovia-bm') {
    const sub = (args[0] || '').toLowerCase();
    if (sub === 'init') {
      return { cmd: 'init', args: args.slice(1) };
    }
    if (sub === 'tokens') {
      return { cmd: 'tokens', args: args.slice(1) };
    }
    if (sub === '--version' || sub === '-v' || sub === 'version') {
      log(`
        <div style="color: var(--color-rosa-chilango); font-weight: 600;">
          maclovia-bm v1.2.0 • CLI Oficial de Arquitectura &amp; Craft de Software (CDMX)
        </div>
      `, raw);
      return { cmd: null, args: [] };
    }
    if (!sub || sub === '--help' || sub === '-h' || sub === 'help') {
      log(`
        <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">✦ MACLOVIA. Belleza Maldita CLI (maclovia-bm)</div>
        <table class="cli-table">
          <tr><td>npx maclovia-bm init &lt;nombre&gt;</td><td>Inicializa un proyecto nuevo con arquitectura pura</td></tr>
          <tr><td>npx maclovia-bm tokens</td><td>Exporta el diccionario de tokens CSS &amp; JSON</td></tr>
          <tr><td>npx maclovia-bm --version</td><td>Muestra la versión instalada (v1.2.0)</td></tr>
        </table>
        <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.5rem;">
          Ejemplo: <span class="text-rosa">npx maclovia-bm init my-app</span>
        </div>
      `, raw);
      return { cmd: null, args: [] };
    }
  }

  return { cmd, args };
}

export function handleInit(args, { log, esc, raw }) {
  const appName = args[0] || 'my-app';
  log(`
    <div style="display: flex; flex-direction: column; gap: 0.35rem; color: var(--text-muted);">
      <div style="color: #ffffff; font-weight: 600; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="text-rosa">✦</span> Inicializando andamiaje de arquitectura para <strong class="text-rosa">${esc(appName)}</strong>
      </div>
      <div style="font-size: 0.7rem; color: var(--text-muted);">Directorio destino: <code style="color: #60a5fa;">./${esc(appName)}</code></div>
      
      <div style="margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.72rem;">
        <div>[1/5] Creando estructura modular (<code style="color:#ffffff;">css/</code>, <code style="color:#ffffff;">js/</code>, <code style="color:#ffffff;">assets/icons/</code>, <code style="color:#ffffff;">public/</code>)... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
        <div>[2/5] Inyectando tokens oficiales <strong style="color: #E4007C;">Rosa Chilango (#E4007C)</strong> y <strong style="color: #ffffff;">Azabache Void (#070707)</strong>... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
        <div>[3/5] Vinculando SVG Sprite Sheet unificado (55+ símbolos nativos, Zero-Emojis)... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
        <div>[4/5] Generando <code style="color:#ffffff;">index.html</code> (Semantic HTML5) y <code style="color:#ffffff;">vercel.json</code> preconfigurado... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
        <div>[5/5] Configurando scripts de compilación en <code style="color:#ffffff;">package.json</code> (Vite + Zero-Runtime)... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
      </div>

      <pre style="margin: 0.5rem 0; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 4px; font-family: var(--font-mono); font-size: 0.68rem; color: #cbd5e1; line-height: 1.35; overflow-x: auto;">${esc(appName)}/
├── index.html            <span style="color: #64748b;"># App Shell semántico &amp; fuentes oficiales</span>
├── vercel.json           <span style="color: #64748b;"># Despliegue perimetral con caché SPA</span>
├── package.json          <span style="color: #64748b;"># Scripts Vite (dev, build, preview)</span>
├── .gitignore            <span style="color: #64748b;"># Reglas git para node_modules y .vercel</span>
├── README.md             <span style="color: #64748b;"># Guía de arquitectura de autor</span>
├── css/
│   └── style.css         <span style="color: #64748b;"># Tokens CSS puros &amp; modo claro/oscuro</span>
├── js/
│   └── main.js           <span style="color: #64748b;"># ECMAScript nativo (Zero-Dependencies)</span>
└── assets/icons/
    └── sprite.svg        <span style="color: #64748b;"># Sprite vectorial maestro de 34 glifos</span></pre>

      <div style="padding: 0.5rem 0.75rem; background: rgba(52, 211, 153, 0.08); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 4px;">
        <div style="color: #34d399; font-weight: 700; margin-bottom: 0.3rem;">[OK] ¡Andamiaje completado exitosamente!</div>
        <div style="font-size: 0.7rem; color: #ffffff;">Para ejecutar en tu máquina local:</div>
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 0.25rem; flex-wrap: wrap;">
          <code style="background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 3px; color: #38bdf8; font-size: 0.7rem;">cd ${esc(appName)} && npm install && npm run dev</code>
        </div>
      </div>
    </div>
  `, raw);
}

export function handleBanner(args, { log, raw }) {
  log(`
    <pre class="text-rosa" style="font-family: var(--font-mono); font-weight: 700; font-size: clamp(0.46rem, 1.1vw, 0.7rem); line-height: 1.15; margin: 0.5rem 0; text-shadow: 0 0 15px rgba(228,0,124,0.4); overflow-x: auto;">${ASCII_BANNER}</pre>
  `, raw);
}

export function handleEcho(args, { log, esc, raw }) {
  const msg = args.join(' ');
  log(`<div>${esc(msg)}</div>`, raw);
}

export function handleUnknown(cmd, args, { log, esc, raw }) {
  log(`
    <div style="color: #f43f5e;">
      maclovia-bm: comando no encontrado: <strong>${esc(cmd)}</strong>.
      <div style="color: var(--text-muted); font-size: 0.7rem; margin-top: 0.25rem;">
        Escribe <span class="text-rosa" style="font-weight: 600;">help</span> para consultar los comandos válidos.
      </div>
    </div>
  `, raw);
}
