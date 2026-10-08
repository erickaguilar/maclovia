/**
 * Maclovia / Belleza Maldita — Terminal Commands: Studio Info
 * help · projects · ceo · theme · tokens · specs · bench · time.
 *
 * ctx: { log(html, cmd?), esc(str), raw }
 */

import { PROJECTS } from '../../data/projects.js';
import { CEO_PROFILE } from '../../data/team.js';
import { AVAILABLE_COMMANDS } from './banner.js';

export function handleHelp(args, { log, raw }) {
  const rows = AVAILABLE_COMMANDS.map(c =>
    `<tr><td>${c.name}</td><td>${c.desc}</td></tr>`
  ).join('');
  log(`
    <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">Comandos disponibles en Maclovia CLI:</div>
    <table class="cli-table">
      <tbody>${rows}</tbody>
    </table>
    <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.5rem;">
      Tip: Puedes usar <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">Tab</kbd> para autocompletar y las flechas <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">↑</kbd> <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">↓</kbd> para navegar en el historial.
    </div>
  `, raw);
}

export function handleProjects(args, { log, esc, raw }) {
  const list = PROJECTS.map((p, idx) => `
    <div style="margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; border-left: 2px solid var(--color-rosa-chilango);">
      <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem;">
        <strong style="color: #ffffff;">[${idx + 1}] ${esc(p.name)}</strong>
        <span class="text-rosa" style="font-size: 0.65rem;">${p.category.toUpperCase()}</span>
      </div>
      <div style="color: var(--text-muted); font-size: 0.7rem; margin: 0.25rem 0;">${esc(p.taglineEs)}</div>
      <div style="display: flex; gap: 0.75rem; font-size: 0.65rem; color: #60a5fa;">
        <span>Repo: <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">${p.repoName}</a></span>
        <span>Stack: ${p.techStack.slice(0, 3).join(', ')}</span>
      </div>
    </div>
  `).join('');
  log(`
    <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">Portafolio de Sistemas Certificados (${PROJECTS.length} módulos):</div>
    ${list}
  `, raw);
}

export function handleCeo(args, { log, esc, raw }) {
  log(`
    <div style="padding: 0.75rem; background: rgba(228, 0, 124, 0.05); border: 1px solid var(--color-rosa-border); border-radius: 6px;">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
        <span style="width: 10px; height: 10px; border-radius: 50%; background-color: var(--color-rosa-chilango); box-shadow: 0 0 10px var(--color-rosa-chilango);"></span>
        <strong style="color: #ffffff; font-size: 0.85rem;">${CEO_PROFILE.name}</strong>
        <span class="text-rosa" style="font-size: 0.65rem; border: 1px solid var(--color-rosa-border); padding: 0.1rem 0.35rem; border-radius: 3px;">CDMX</span>
      </div>
      <div style="color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.7rem;">
        ${esc(CEO_PROFILE.bioEs)}
      </div>
      <table class="cli-table" style="margin: 0;">
        <tr><td>Rol:</td><td style="color: #ffffff;">${CEO_PROFILE.roleEs}</td></tr>
        <tr><td>Sede:</td><td style="color: #ffffff;">${CEO_PROFILE.location}</td></tr>
        <tr><td>Email:</td><td><a href="mailto:${CEO_PROFILE.email}" style="color: var(--color-rosa-chilango); text-decoration: underline;">${CEO_PROFILE.email}</a></td></tr>
        <tr><td>GitHub:</td><td><a href="https://github.com/${CEO_PROFILE.githubHandle}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">@${CEO_PROFILE.githubHandle}</a></td></tr>
        <tr><td>Enfoque:</td><td>${CEO_PROFILE.specialties.join(' • ')}</td></tr>
      </table>
    </div>
  `, raw);
}

export function handleTheme(args, { log, raw }) {
  const targetTheme = args[0]?.toLowerCase();
  let newTheme = 'dark';
  if (targetTheme === 'light' || targetTheme === 'porcelana') {
    newTheme = 'light';
  } else if (targetTheme === 'dark' || targetTheme === 'obsidiana') {
    newTheme = 'dark';
  } else {
    // Toggle
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    newTheme = current === 'dark' ? 'light' : 'dark';
  }

  window.dispatchEvent(new CustomEvent('maclovia:set-theme', { detail: { theme: newTheme } }));

  log(`
    <div style="display: flex; align-items: center; gap: 0.5rem; color: #34d399;">
      <svg class="icon icon-stroke" style="width: 1rem; height: 1rem;"><use href="assets/icons/sprite.svg#icon-check"></use></svg>
      <span>Tema global del sistema actualizado a: <strong style="color: #ffffff;">${newTheme === 'dark' ? 'Obsidiana (Dark Mode)' : 'Porcelana (Light Mode)'}</strong></span>
    </div>
  `, raw);
}

export function handleTokens(args, { log, raw }) {
  log(`
    <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">Sistema Cromático y Design Tokens Oficiales:</div>
    <table class="cli-table">
      <tr>
        <td><span style="display: inline-block; width: 10px; height: 10px; background-color: #E4007C; border-radius: 2px; margin-right: 4px;"></span> Rosa Chilango</td>
        <td style="color: #ffffff;">#E4007C • RGB(228, 0, 124) • Pantone 806 C</td>
      </tr>
      <tr>
        <td><span style="display: inline-block; width: 10px; height: 10px; background-color: #070707; border: 1px solid #333; border-radius: 2px; margin-right: 4px;"></span> Azabache Void</td>
        <td style="color: #ffffff;">#070707 • RGB(7, 7, 7) • Fondo Monolito</td>
      </tr>
      <tr>
        <td><span style="display: inline-block; width: 10px; height: 10px; background-color: #FFF8E7; border-radius: 2px; margin-right: 4px;"></span> Cosmic Latte</td>
        <td style="color: #ffffff;">#FFF8E7 • RGB(255, 248, 231) • Tema Claro</td>
      </tr>
      <tr>
        <td><span style="display: inline-block; width: 10px; height: 10px; background-color: #27272A; border-radius: 2px; margin-right: 4px;"></span> Pizarra Grafito</td>
        <td style="color: #ffffff;">#27272A • RGB(39, 39, 42) • Líneas Mecánicas</td>
      </tr>
      <tr>
        <td>Tipografía Display</td>
        <td>Abril Fatface (Serif / Titulares)</td>
      </tr>
      <tr>
        <td>Tipografía Nivel 2</td>
        <td>Tipo Movin CDMX (Firma / Belleza Maldita • Lance Wyman / SEMOVI)</td>
      </tr>
      <tr>
        <td>Tipografía Código</td>
        <td>Fira Code (Monospace / Terminal & Datos)</td>
      </tr>
    </table>
  `, raw);
}

export function handleSpecs(args, { log, raw }) {
  log(`
    <div style="padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px;">
      <div style="color: #ffffff; font-weight: 600; margin-bottom: 0.35rem;">Especificaciones de Arquitectura Maclovia:</div>
      <table class="cli-table" style="margin: 0;">
        <tr><td>Runtime:</td><td style="color: #ffffff;">Node.js 22 LTS / Rust Sovereign Core</td></tr>
        <tr><td>Compresión:</td><td style="color: #ffffff;">Zero-copy mmap flat file (.gaje v2)</td></tr>
        <tr><td>Cliente:</td><td style="color: #ffffff;">0 KB Frameworks (Vanilla ES6+ Puro)</td></tr>
        <tr><td>Vectorial:</td><td style="color: #ffffff;">SVG Sprite Nativo (34 símbolos, Zero-Emojis)</td></tr>
        <tr><td>Lighthouse:</td><td style="color: #34d399;">100 / 100 (Perf, a11y, Best Practices, SEO)</td></tr>
        <tr><td>Latencia CDMX:</td><td style="color: #34d399;">&lt; 15ms Edge Routing</td></tr>
      </table>
    </div>
  `, raw);
}

export function handleBench(args, { log, esc, raw }) {
  const start = performance.now();
  let acc = 0;
  for (let i = 0; i < 1000000; i++) {
    acc += Math.sqrt(i) * Math.sin(i);
  }
  const duration = performance.now() - start;
  const cores = navigator.hardwareConcurrency || 'N/A';
  const platform = navigator.userAgentData?.platform || navigator.platform || 'N/A';

  log(`
    <div style="padding: 0.5rem 0.75rem; background: rgba(52, 211, 153, 0.05); border: 1px solid rgba(52, 211, 153, 0.2); border-radius: 4px;">
      <div style="color: #34d399; font-weight: 600; margin-bottom: 0.35rem;">Micro-Benchmark CPU del Cliente Completado:</div>
      <table class="cli-table" style="margin: 0;">
        <tr><td>Operación:</td><td style="color: #ffffff;">1,000,000 cálculos trigonométricos de coma flotante</td></tr>
        <tr><td>Latencia CPU:</td><td style="color: #34d399; font-weight: 700;">${duration.toFixed(2)} ms</td></tr>
        <tr><td>Núcleos:</td><td style="color: #ffffff;">${cores} cores detectados</td></tr>
        <tr><td>Plataforma:</td><td style="color: #ffffff;">${esc(platform)}</td></tr>
        <tr><td>Diagnóstico:</td><td style="color: #ffffff;">Dispositivo óptimo para ejecución WASM e inferencia cliente.</td></tr>
      </table>
    </div>
  `, raw);
}

export function handleTime(args, { log, raw }) {
  const now = new Date();
  const cdmxTime = now.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City', hour12: false });
  const cdmxDate = now.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'full' });
  log(`
    <div>
      <div>Hora oficial CDMX: <strong style="color: var(--color-rosa-chilango); font-size: 0.85rem;">${cdmxTime}</strong></div>
      <div style="color: var(--text-muted); font-size: 0.7rem;">${cdmxDate}</div>
      <div style="color: var(--text-muted); font-size: 0.65rem; margin-top: 0.25rem;">Coordenadas: 19.4326° N, 99.1332° W • Ciudad de México</div>
    </div>
  `, raw);
}
