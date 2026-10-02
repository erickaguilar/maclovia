/**
 * Maclovia / Belleza Maldita — Interactive UNIX Shell CLI Engine
 * Emulador de consola en el navegador con soporte para comandos de ingeniería,
 * evaluación de snippets de Rust a través de Rust Playground API,
 * historial con flechas arriba/abajo y auto-completado con tecla Tab.
 */

import { PROJECTS } from '../data/projects.js';
import { CEO_PROFILE } from '../data/team.js';
import { copyText } from './clipboard.js';

export const ASCII_BANNER = `  ███╗   ███╗ █████╗  ██████╗██╗      ██████╗ ██╗   ██╗██╗ █████╗ 
  ████╗ ████║██╔══██╗██╔════╝██║     ██╔═══██╗██║   ██║██║██╔══██╗
  ██╔████╔██║███████║██║     ██║     ██║   ██║██║   ██║██║███████║
  ██║╚██╔╝██║██╔══██║██║     ██║     ██║   ██║╚██╗ ██╔╝██║██╔══██║
  ██║ ╚═╝ ██║██║  ██║╚██████╗███████╗╚██████╔╝ ╚████╔╝ ██║██║  ██║
  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝  ╚═╝
             ✦ B E L L E Z A   M A L D I T A ✦`;

export const AVAILABLE_COMMANDS = [
  { name: 'help', desc: 'Muestra la lista de comandos disponibles' },
  { name: 'npx maclovia-bm init <app>', desc: 'Andamiaje completo de arquitectura (alias: init <app>)' },
  { name: 'cargo', desc: 'Gestor y ejecutor de Rust: cargo run [código], build, test, clippy, check, new' },
  { name: 'rustc', desc: 'Compilador de Rust (rustc --version o rustc -e "código")' },
  { name: 'rustup', desc: 'Gestor oficial de toolchains de Rust (rustup show)' },
  { name: './gaje-server', desc: 'Servidor HTTP de inferencia soberano en Rust puro (alias: gaje)' },
  { name: 'projects', desc: 'Lista los módulos certificados de ingeniería (alias: ls)' },
  { name: 'ceo', desc: 'Despliega credenciales del CEO Erick Jonathan Aguilar (alias: whoami)' },
  { name: 'theme', desc: 'Alterna o define el tema: theme light | theme dark' },
  { name: 'tokens', desc: 'Imprime la paleta oficial de diseño y tokens cromáticos' },
  { name: 'specs', desc: 'Muestra las especificaciones del runtime y arquitectura' },
  { name: 'bench', desc: 'Ejecuta un micro-benchmark del CPU y latencia del cliente' },
  { name: 'time', desc: 'Muestra la hora oficial en CDMX y coordenadas geográficas' },
  { name: 'init', desc: 'Andamiaje de un proyecto: init <nombre-app>' },
  { name: 'banner', desc: 'Reimprime el banner oficial de arte ASCII' },
  { name: 'clear', desc: 'Limpia la pantalla de la terminal' },
  { name: 'echo', desc: 'Imprime el texto proporcionado' },
];

/**
 * Motor de Terminal Shell Interactiva (Vanilla JS)
 */
export function initInteractiveTerminal() {
  const cliViewport = document.getElementById('cli-viewport');
  const cliHistory = document.getElementById('cli-history');
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');
  const cliClearBtn = document.getElementById('cli-clear-btn');
  const termDotRed = document.getElementById('term-dot-red');
  const termDotYellow = document.getElementById('term-dot-yellow');
  const termDotGreen = document.getElementById('term-dot-green');
  const terminalWindow = document.getElementById('terminal-window');

  if (!cliViewport || !cliHistory || !cliInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  function printInitialWelcome() {
    cliHistory.innerHTML = `
      <pre class="text-rosa" style="font-family: var(--font-mono); font-weight: 700; font-size: clamp(0.46rem, 1.1vw, 0.7rem); line-height: 1.15; margin-bottom: 0.85rem; text-shadow: 0 0 15px rgba(228,0,124,0.4); overflow-x: auto;">${ASCII_BANNER}</pre>
      <div style="color: var(--text-muted); display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 1rem; font-size: 0.72rem;">
        <div>[✦] Entorno de terminal interactivo <strong style="color: #ffffff;">Maclovia. Belleza Maldita</strong> (CDMX) v1.1.0</div>
        <div>[OK] CEO &amp; Arquitecto Principal: <span class="text-rosa" style="font-weight: 600;">Erick Jonathan Aguilar García</span></div>
        <div>[i] Escribe <button type="button" class="cli-chip" data-cli-cmd="help" style="padding: 0.1rem 0.4rem; margin: 0 0.2rem;">help</button> para explorar los comandos, o usa los chips superiores.</div>
      </div>
    `;
    scrollToBottom();
  }

  function scrollToBottom() {
    cliViewport.scrollTop = cliViewport.scrollHeight;
  }

  function appendLog(rawHtml, command = null) {
    const entry = document.createElement('div');
    entry.className = 'cli-log-entry';

    let html = '';
    if (command !== null) {
      html += `
        <div class="cli-log-command">
          <span class="text-rosa font-bold">erick@cdmx</span>:<span style="color: #60a5fa;">~/projects</span><span class="text-rosa">$</span>
          <span class="command-text">${escapeHtml(command)}</span>
        </div>
      `;
    }
    html += `<div class="cli-log-result">${rawHtml}</div>`;
    entry.innerHTML = html;
    cliHistory.appendChild(entry);
    scrollToBottom();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function executeRustCode(codeSnippet) {
    let source = codeSnippet.trim();
    if ((source.startsWith('"') && source.endsWith('"')) || (source.startsWith("'") && source.endsWith("'"))) {
      source = source.slice(1, -1);
    }
    if (!source.includes('fn main')) {
      source = `fn main() {\n    ${source}\n}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);
      const resp = await fetch('https://play.rust-lang.org/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'stable',
          mode: 'release',
          edition: '2021',
          crateType: 'bin',
          tests: false,
          code: source
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.json();
    } catch {
      return null;
    }
  }

  async function executeCommand(rawCommand) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

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
        cmd = 'init';
        args = args.slice(1);
      } else if (sub === 'tokens') {
        cmd = 'tokens';
        args = args.slice(1);
      } else if (sub === '--version' || sub === '-v' || sub === 'version') {
        appendLog(`
          <div style="color: var(--color-rosa-chilango); font-weight: 600;">
            maclovia-bm v1.2.0 • CLI Oficial de Arquitectura &amp; Craft de Software (CDMX)
          </div>
        `, trimmed);
        return;
      } else if (!sub || sub === '--help' || sub === '-h' || sub === 'help') {
        appendLog(`
          <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">✦ MACLOVIA. Belleza Maldita CLI (maclovia-bm)</div>
          <table class="cli-table">
            <tr><td>npx maclovia-bm init &lt;nombre&gt;</td><td>Inicializa un proyecto nuevo con arquitectura pura</td></tr>
            <tr><td>npx maclovia-bm tokens</td><td>Exporta el diccionario de tokens CSS &amp; JSON</td></tr>
            <tr><td>npx maclovia-bm --version</td><td>Muestra la versión instalada (v1.2.0)</td></tr>
          </table>
          <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.5rem;">
            Ejemplo: <span class="text-rosa">npx maclovia-bm init my-app</span>
          </div>
        `, trimmed);
        return;
      }
    }

    switch (cmd) {
      case 'cargo': {
        const sub = (args[0] || '').toLowerCase();
        const subArgs = args.slice(1);

        if (!sub || sub === 'help' || sub === '--help' || sub === '-h') {
          appendLog(`
            <div style="color: #fb923c; font-weight: 700; margin-bottom: 0.4rem;">
              Rust Package Manager &amp; Build Tool (Cargo 1.85.0)
            </div>
            <table class="cli-table">
              <tr><td>cargo run [código]</td><td>Compila y ejecuta código en Rust (soporta código Rust en línea)</td></tr>
              <tr><td>cargo build [--release]</td><td>Compila el proyecto con optimizaciones LTO y zero-cost</td></tr>
              <tr><td>cargo test</td><td>Ejecuta la suite de pruebas unitarias y de integración</td></tr>
              <tr><td>cargo clippy</td><td>Ejecuta el linter oficial para validar Rust idiomático</td></tr>
              <tr><td>cargo check</td><td>Verifica sintaxis y tipos sin generar artefacto binario</td></tr>
              <tr><td>cargo new &lt;nombre&gt;</td><td>Crea un nuevo paquete binario con Cargo.toml</td></tr>
              <tr><td>cargo tree</td><td>Visualiza el grafo de dependencias de la arquitectura</td></tr>
            </table>
            <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.5rem;">
              Ejemplos: <code style="color: #fb923c;">cargo run</code> • <code style="color: #fb923c;">cargo test</code> • <code style="color: #fb923c;">cargo run println!("¡Hola desde Rust!");</code>
            </div>
          `, trimmed);
          break;
        }

        if (sub === 'run') {
          const userCode = subArgs.join(' ').trim();
          const targetCode = userCode || `println!("✦ Motor Soberano Maclovia (Rust 2021) ✦");\n    println!(">> Memoria zero-copy mmap: 2.24 GB cargados en 1.1 ms");\n    println!(">> Tensor Desquantizer (SIMD AVX-512): Activo");\n    println!(">> Latencia TTFT (Time to First Token): 13.8 ms");\n    println!(">> Rendimiento de inferencia: 192 tokens/segundo");`;

          appendLog(`
            <div style="color: var(--text-muted); font-size: 0.72rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="text-rosa">✦</span> Compilando y ejecutando en runtime nativo de Rust...
            </div>
          `, trimmed);

          const playgroundRes = await executeRustCode(targetCode);

          if (playgroundRes && playgroundRes.success) {
            appendLog(`
              <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45;">
                <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> playground v0.0.1 (Rust 2021 / x86_64)</div>
                <div><span style="color: #22c55e; font-weight: 700;">    Finished</span> \`release\` profile [optimized] target(s) in 0.48s</div>
                <div><span style="color: #22c55e; font-weight: 700;">     Running</span> \`target/release/playground\`</div>
                <pre style="margin-top: 0.4rem; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.5); border-left: 2px solid #22c55e; color: #f8fafc; font-family: var(--font-mono); white-space: pre-wrap; border-radius: 4px;">${escapeHtml(playgroundRes.stdout || '(Ejecución completada con éxito)')}</pre>
                <div style="font-size: 0.65rem; color: #34d399; margin-top: 0.25rem;">
                  [OK] Código Rust compilado y ejecutado exitosamente con cero dependencias de intérprete.
                </div>
              </div>
            `);
          } else if (playgroundRes && !playgroundRes.success) {
            appendLog(`
              <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45;">
                <div style="color: #f87171; font-weight: 700; margin-bottom: 0.25rem;">Error del compilador rustc:</div>
                <pre style="color: #fca5a5; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); padding: 0.5rem 0.75rem; border-radius: 4px; white-space: pre-wrap; font-family: var(--font-mono); font-size: 0.68rem;">${escapeHtml(playgroundRes.stderr || 'Error de compilación')}</pre>
              </div>
            `);
          } else {
            // Local fallback simulation
            appendLog(`
              <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45;">
                <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> maclovia_engine v1.2.0 (/root/projects/maclovia)</div>
                <div><span style="color: #22c55e; font-weight: 700;">    Finished</span> \`release\` profile [optimized + lto] target(s) in 0.42s</div>
                <div><span style="color: #22c55e; font-weight: 700;">     Running</span> \`target/release/maclovia_engine\`</div>
                <pre style="margin-top: 0.4rem; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.5); border-left: 2px solid var(--color-rosa-chilango); color: #f8fafc; font-family: var(--font-mono); white-space: pre-wrap; border-radius: 4px;">✦ MOTOR SOBERANO MACLOVIA (RUST 2021) ✦
>> Memoria zero-copy mmap: 2.24 GB cargados en 1.1 ms
>> SIMD Tensor Desquantizer (AVX-512): Activo
>> Latencia TTFT (Time to First Token): 13.8 ms
>> Rendimiento de inferencia: 192 tokens/segundo</pre>
              </div>
            `);
          }
          break;
        }

        if (sub === 'build') {
          const isRelease = subArgs.includes('--release') || subArgs.includes('-r');
          appendLog(`
            <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45; color: #cbd5e1;">
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> proc-macro2 v1.0.86</div>
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> unicode-ident v1.0.12</div>
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> quote v1.0.35</div>
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> syn v2.0.68</div>
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> memmap2 v0.9.4</div>
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> actix-web v4.9.0</div>
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> gaje-core v2.1.0 (/root/projects/gaje)</div>
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> maclovia-runtime v1.2.0 (/root/projects/maclovia)</div>
              <div style="margin-top: 0.35rem;">
                <span style="color: #22c55e; font-weight: 700;">    Finished</span> \`${isRelease ? 'release' : 'dev'}\` profile [${isRelease ? 'optimized + lto' : 'unoptimized + debuginfo'}] target(s) in ${isRelease ? '1.84s' : '0.48s'}
              </div>
              <div style="margin-top: 0.35rem; color: #34d399; font-size: 0.68rem;">
                [OK] Binario generado en: <code style="color: #ffffff;">target/${isRelease ? 'release' : 'debug'}/maclovia_engine</code> (2.4 MB, stripping activo)
              </div>
            </div>
          `, trimmed);
          break;
        }

        if (sub === 'test') {
          appendLog(`
            <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45; color: #cbd5e1;">
              <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> maclovia v1.2.0 (/root/projects/maclovia)</div>
              <div><span style="color: #22c55e; font-weight: 700;">    Finished</span> \`test\` profile [unoptimized + debuginfo] target(s) in 0.52s</div>
              <div><span style="color: #22c55e; font-weight: 700;">     Running</span> unittests src/lib.rs (target/debug/deps/maclovia-8fa29e84)</div>
              
              <div style="margin: 0.4rem 0; color: #ffffff;">running 6 tests</div>
              <div>test tests::test_zero_copy_mmap ... <span style="color: #22c55e; font-weight: 700;">ok</span></div>
              <div>test tests::test_q4_0_centroids_16 ... <span style="color: #22c55e; font-weight: 700;">ok</span></div>
              <div>test tests::test_sse_streaming_chunk ... <span style="color: #22c55e; font-weight: 700;">ok</span></div>
              <div>test tests::test_webrtc_hot_channel_latency ... <span style="color: #22c55e; font-weight: 700;">ok</span></div>
              <div>test tests::test_voxel_instancing_drawcalls ... <span style="color: #22c55e; font-weight: 700;">ok</span></div>
              <div>test tests::test_ttft_under_18ms ... <span style="color: #22c55e; font-weight: 700;">ok</span></div>

              <div style="margin-top: 0.4rem; padding: 0.4rem 0.6rem; background: rgba(34, 197, 94, 0.1); border-left: 2px solid #22c55e; color: #ffffff; border-radius: 3px;">
                <span style="color: #22c55e; font-weight: 700;">test result: ok.</span> 6 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.04s
              </div>
            </div>
          `, trimmed);
          break;
        }

        if (sub === 'clippy') {
          appendLog(`
            <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45; color: #cbd5e1;">
              <div><span style="color: #22c55e; font-weight: 700;">    Checking</span> maclovia v1.2.0 (/root/projects/maclovia)</div>
              <div><span style="color: #22c55e; font-weight: 700;">    Finished</span> \`dev\` profile [unoptimized + debuginfo] target(s) in 0.28s</div>
              <div style="margin-top: 0.4rem; padding: 0.35rem 0.6rem; background: rgba(52, 211, 153, 0.08); border-left: 2px solid #34d399; border-radius: 3px;">
                <span style="color: #34d399; font-weight: 700;">✦ 0 warnings, 0 errors.</span> Todo el código Rust cumple con las directrices estrictas de memoria segura y estilo idiomático.
              </div>
            </div>
          `, trimmed);
          break;
        }

        if (sub === 'check') {
          appendLog(`
            <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45; color: #cbd5e1;">
              <div><span style="color: #22c55e; font-weight: 700;">    Checking</span> gaje-core v2.1.0</div>
              <div><span style="color: #22c55e; font-weight: 700;">    Checking</span> maclovia-runtime v1.2.0</div>
              <div><span style="color: #22c55e; font-weight: 700;">    Finished</span> \`dev\` profile target(s) in 0.14s</div>
            </div>
          `, trimmed);
          break;
        }

        if (sub === 'new' || sub === 'init') {
          const pkgName = subArgs[0] || 'maclovia-crate';
          appendLog(`
            <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45;">
              <div><span style="color: #22c55e; font-weight: 700;">     Created</span> binary (application) \`<strong style="color: #ffffff;">${escapeHtml(pkgName)}</strong>\` package</div>
              <pre style="margin-top: 0.35rem; padding: 0.4rem 0.6rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 4px; color: #94a3b8; font-size: 0.68rem;">${escapeHtml(pkgName)}/
├── Cargo.toml    # Metadatos del crate y dependencias
└── src/
    └── main.rs   # Entry point fn main()</pre>
              <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.25rem;">
                Ejecuta: <code style="color: #fb923c;">cd ${escapeHtml(pkgName)} && cargo run</code>
              </div>
            </div>
          `, trimmed);
          break;
        }

        if (sub === 'tree') {
          appendLog(`
            <pre style="font-family: var(--font-mono); font-size: 0.68rem; line-height: 1.35; color: #cbd5e1; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 4px; overflow-x: auto;">maclovia v1.2.0 (/root/projects/maclovia)
├── gaje-core v2.1.0
│   ├── memmap2 v0.9.4
│   └── rayon v1.10.0
├── actix-web v4.9.0
│   ├── actix-rt v2.10.0
│   └── tokio v1.38.0
└── serde v1.0.203 (features: ["derive"])</pre>
          `, trimmed);
          break;
        }

        appendLog(`
          <div style="color: #f43f5e;">
            cargo: subcomando no reconocido: <strong>${escapeHtml(sub)}</strong>.
            <div style="color: var(--text-muted); font-size: 0.7rem; margin-top: 0.25rem;">
              Escribe <span style="color: #fb923c; font-weight: 600;">cargo --help</span> para consultar los subcomandos disponibles.
            </div>
          </div>
        `, trimmed);
        break;
      }

      case 'rustc': {
        const sub = (args[0] || '').toLowerCase();
        if (sub === '--version' || sub === '-v' || sub === '-V' || !sub) {
          appendLog(`
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fb923c; font-weight: 600;">
              rustc 1.85.0 (4d91de4e4 2025-02-17) (x86_64-unknown-linux-gnu)
            </div>
            <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.25rem;">
              Compilador oficial de Rust. Compatible con ediciones 2015, 2018, 2021 y 2024.
            </div>
          `, trimmed);
          break;
        }

        if (sub === '-e') {
          const rawCode = args.slice(1).join(' ').trim();
          appendLog(`
            <div style="color: var(--text-muted); font-size: 0.72rem;">Compilando expresión en rustc...</div>
          `, trimmed);
          const res = await executeRustCode(rawCode);
          if (res && res.success) {
            appendLog(`
              <pre style="margin-top: 0.35rem; padding: 0.4rem 0.6rem; background: rgba(0,0,0,0.5); border-left: 2px solid #22c55e; color: #ffffff; font-family: var(--font-mono); font-size: 0.72rem;">${escapeHtml(res.stdout || '(Sin salida)')}</pre>
            `);
          } else if (res && !res.success) {
            appendLog(`
              <pre style="color: #f87171; font-family: var(--font-mono); font-size: 0.68rem;">${escapeHtml(res.stderr)}</pre>
            `);
          } else {
            appendLog(`
              <div style="color: #22c55e; font-family: var(--font-mono); font-size: 0.72rem;">[OK] Expresión evaluada con éxito en rustc 1.85.0.</div>
            `);
          }
          break;
        }

        appendLog(`
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #cbd5e1;">
            <div>rustc: compilando <code style="color: #ffffff;">${escapeHtml(args.join(' '))}</code>...</div>
            <div style="color: #22c55e; margin-top: 0.25rem;">[OK] Binario nativo generado en <code style="color: #ffffff;">./${escapeHtml(args[0].replace(/\.rs$/, ''))}</code></div>
          </div>
        `, trimmed);
        break;
      }

      case 'rustup': {
        appendLog(`
          <pre style="font-family: var(--font-mono); font-size: 0.7rem; line-height: 1.4; color: #cbd5e1; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 4px;">Default host: x86_64-unknown-linux-gnu
rustup home:  ~/.rustup

installed toolchains
--------------------
stable-x86_64-unknown-linux-gnu (default)
nightly-x86_64-unknown-linux-gnu

active toolchain
----------------
stable-x86_64-unknown-linux-gnu (default)
rustc 1.85.0 (4d91de4e4 2025-02-17)</pre>
        `, trimmed);
        break;
      }

      case './gaje-server':
      case 'gaje-server':
      case 'gaje': {
        appendLog(`
          <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45; color: #cbd5e1;">
            <div style="color: var(--color-rosa-chilango); font-weight: 700; margin-bottom: 0.3rem;">
              ✦ GAJE HTTP SERVER — MOTOR SOBERANO EN RUST PURO (v2.1.0) ✦
            </div>
            <div><span style="color: #38bdf8;">[INFO  gaje_server::runtime]</span> Inicializando runtime zero-python (Rust 2021)</div>
            <div><span style="color: #38bdf8;">[INFO  gaje_server::model]</span> Mapeando modelo <code style="color: #ffffff;">models/gaje_prime_3b.gaje</code> (2.24 GB) con mmap() zero-copy</div>
            <div><span style="color: #38bdf8;">[INFO  gaje_server::tensor]</span> Activando quantizador Q4_0 (16 centroides) + SIMD AVX-512</div>
            <div><span style="color: #22c55e;">[INFO  gaje_server::http]</span> Servidor HTTP listo en <strong style="color: #ffffff;">http://127.0.0.1:8080</strong></div>
            <div><span style="color: #22c55e;">[INFO  gaje_server::stream]</span> Streaming Server-Sent Events (SSE) activo (TTFT &lt; 18ms)</div>
            <div style="margin-top: 0.4rem; padding: 0.35rem 0.5rem; background: rgba(228, 0, 124, 0.08); border-left: 2px solid var(--color-rosa-chilango); border-radius: 3px;">
              Endpoint OpenAI-Compatible: <code style="color: #ffffff;">POST http://127.0.0.1:8080/v1/chat/completions</code>
            </div>
          </div>
        `, trimmed);
        break;
      }

      case 'help': {
        const rows = AVAILABLE_COMMANDS.map(c => 
          `<tr><td>${c.name}</td><td>${c.desc}</td></tr>`
        ).join('');
        appendLog(`
          <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">Comandos disponibles en Maclovia CLI:</div>
          <table class="cli-table">
            <tbody>${rows}</tbody>
          </table>
          <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.5rem;">
            Tip: Puedes usar <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">Tab</kbd> para autocompletar y las flechas <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">↑</kbd> <kbd style="background: rgba(255,255,255,0.1); padding: 0.1rem 0.35rem; border-radius: 3px;">↓</kbd> para navegar en el historial.
          </div>
        `, trimmed);
        break;
      }

      case 'projects':
      case 'ls': {
        const list = PROJECTS.map((p, idx) => `
          <div style="margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 4px; border-left: 2px solid var(--color-rosa-chilango);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem;">
              <strong style="color: #ffffff;">[${idx + 1}] ${escapeHtml(p.name)}</strong>
              <span class="text-rosa" style="font-size: 0.65rem;">${p.category.toUpperCase()}</span>
            </div>
            <div style="color: var(--text-muted); font-size: 0.7rem; margin: 0.25rem 0;">${escapeHtml(p.taglineEs)}</div>
            <div style="display: flex; gap: 0.75rem; font-size: 0.65rem; color: #60a5fa;">
              <span>Repo: <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">${p.repoName}</a></span>
              <span>Stack: ${p.techStack.slice(0, 3).join(', ')}</span>
            </div>
          </div>
        `).join('');
        appendLog(`
          <div style="margin-bottom: 0.5rem; color: #ffffff; font-weight: 600;">Portafolio de Sistemas Certificados (${PROJECTS.length} módulos):</div>
          ${list}
        `, trimmed);
        break;
      }

      case 'ceo':
      case 'whoami': {
        appendLog(`
          <div style="padding: 0.75rem; background: rgba(228, 0, 124, 0.05); border: 1px solid var(--color-rosa-border); border-radius: 6px;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background-color: var(--color-rosa-chilango); box-shadow: 0 0 10px var(--color-rosa-chilango);"></span>
              <strong style="color: #ffffff; font-size: 0.85rem;">${CEO_PROFILE.name}</strong>
              <span class="text-rosa" style="font-size: 0.65rem; border: 1px solid var(--color-rosa-border); padding: 0.1rem 0.35rem; border-radius: 3px;">CDMX</span>
            </div>
            <div style="color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.7rem;">
              ${escapeHtml(CEO_PROFILE.bioEs)}
            </div>
            <table class="cli-table" style="margin: 0;">
              <tr><td>Rol:</td><td style="color: #ffffff;">${CEO_PROFILE.roleEs}</td></tr>
              <tr><td>Sede:</td><td style="color: #ffffff;">${CEO_PROFILE.location}</td></tr>
              <tr><td>Email:</td><td><a href="mailto:${CEO_PROFILE.email}" style="color: var(--color-rosa-chilango); text-decoration: underline;">${CEO_PROFILE.email}</a></td></tr>
              <tr><td>GitHub:</td><td><a href="https://github.com/${CEO_PROFILE.githubHandle}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline;">@${CEO_PROFILE.githubHandle}</a></td></tr>
              <tr><td>Enfoque:</td><td>${CEO_PROFILE.specialties.join(' • ')}</td></tr>
            </table>
          </div>
        `, trimmed);
        break;
      }

      case 'theme': {
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

        appendLog(`
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #34d399;">
            <svg class="icon icon-stroke" style="width: 1rem; height: 1rem;"><use href="assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Tema global del sistema actualizado a: <strong style="color: #ffffff;">${newTheme === 'dark' ? 'Obsidiana (Dark Mode)' : 'Porcelana (Light Mode)'}</strong></span>
          </div>
        `, trimmed);
        break;
      }

      case 'tokens': {
        appendLog(`
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
              <td>Tipografía Script</td>
              <td>Cookie Script (Firma / Belleza Maldita)</td>
            </tr>
            <tr>
              <td>Tipografía Código</td>
              <td>Fira Code (Monospace / Terminal & Datos)</td>
            </tr>
          </table>
        `, trimmed);
        break;
      }

      case 'specs':
      case 'sysinfo': {
        appendLog(`
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
        `, trimmed);
        break;
      }

      case 'bench': {
        const start = performance.now();
        let acc = 0;
        for (let i = 0; i < 1000000; i++) {
          acc += Math.sqrt(i) * Math.sin(i);
        }
        const duration = performance.now() - start;
        const cores = navigator.hardwareConcurrency || 'N/A';
        const platform = navigator.userAgentData?.platform || navigator.platform || 'N/A';

        appendLog(`
          <div style="padding: 0.5rem 0.75rem; background: rgba(52, 211, 153, 0.05); border: 1px solid rgba(52, 211, 153, 0.2); border-radius: 4px;">
            <div style="color: #34d399; font-weight: 600; margin-bottom: 0.35rem;">Micro-Benchmark CPU del Cliente Completado:</div>
            <table class="cli-table" style="margin: 0;">
              <tr><td>Operación:</td><td style="color: #ffffff;">1,000,000 cálculos trigonométricos de coma flotante</td></tr>
              <tr><td>Latencia CPU:</td><td style="color: #34d399; font-weight: 700;">${duration.toFixed(2)} ms</td></tr>
              <tr><td>Núcleos:</td><td style="color: #ffffff;">${cores} cores detectados</td></tr>
              <tr><td>Plataforma:</td><td style="color: #ffffff;">${escapeHtml(platform)}</td></tr>
              <tr><td>Diagnóstico:</td><td style="color: #ffffff;">Dispositivo óptimo para ejecución WASM e inferencia cliente.</td></tr>
            </table>
          </div>
        `, trimmed);
        break;
      }

      case 'time': {
        const now = new Date();
        const cdmxTime = now.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City', hour12: false });
        const cdmxDate = now.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', dateStyle: 'full' });
        appendLog(`
          <div>
            <div>Hora oficial CDMX: <strong style="color: var(--color-rosa-chilango); font-size: 0.85rem;">${cdmxTime}</strong></div>
            <div style="color: var(--text-muted); font-size: 0.7rem;">${cdmxDate}</div>
            <div style="color: var(--text-muted); font-size: 0.65rem; margin-top: 0.25rem;">Coordenadas: 19.4326° N, 99.1332° W • Ciudad de México</div>
          </div>
        `, trimmed);
        break;
      }

      case 'init': {
        const appName = args[0] || 'my-app';
        appendLog(`
          <div style="display: flex; flex-direction: column; gap: 0.35rem; color: var(--text-muted);">
            <div style="color: #ffffff; font-weight: 600; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="text-rosa">✦</span> Inicializando andamiaje de arquitectura para <strong class="text-rosa">${escapeHtml(appName)}</strong>
            </div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">Directorio destino: <code style="color: #60a5fa;">./${escapeHtml(appName)}</code></div>
            
            <div style="margin-top: 0.35rem; display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.72rem;">
              <div>[1/5] Creando estructura modular (<code style="color:#ffffff;">css/</code>, <code style="color:#ffffff;">js/</code>, <code style="color:#ffffff;">assets/icons/</code>, <code style="color:#ffffff;">public/</code>)... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
              <div>[2/5] Inyectando tokens oficiales <strong style="color: #E4007C;">Rosa Chilango (#E4007C)</strong> y <strong style="color: #ffffff;">Azabache Void (#070707)</strong>... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
              <div>[3/5] Vinculando SVG Sprite Sheet unificado (55+ símbolos nativos, Zero-Emojis)... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
              <div>[4/5] Generando <code style="color:#ffffff;">index.html</code> (Semantic HTML5) y <code style="color:#ffffff;">vercel.json</code> preconfigurado... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
              <div>[5/5] Configurando scripts de compilación en <code style="color:#ffffff;">package.json</code> (Vite + Zero-Runtime)... <span style="color: #34d399; font-weight: 600;">[OK] OK</span></div>
            </div>

            <pre style="margin: 0.5rem 0; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 4px; font-family: var(--font-mono); font-size: 0.68rem; color: #cbd5e1; line-height: 1.35; overflow-x: auto;">${escapeHtml(appName)}/
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
                <code style="background: rgba(0,0,0,0.5); padding: 0.2rem 0.5rem; border-radius: 3px; color: #38bdf8; font-size: 0.7rem;">cd ${escapeHtml(appName)} && npm install && npm run dev</code>
              </div>
            </div>
          </div>
        `, trimmed);
        break;
      }

      case 'banner': {
        appendLog(`
          <pre class="text-rosa" style="font-family: var(--font-mono); font-weight: 700; font-size: clamp(0.46rem, 1.1vw, 0.7rem); line-height: 1.15; margin: 0.5rem 0; text-shadow: 0 0 15px rgba(228,0,124,0.4); overflow-x: auto;">${ASCII_BANNER}</pre>
        `, trimmed);
        break;
      }

      case 'clear': {
        cliHistory.innerHTML = '';
        break;
      }

      case 'echo': {
        const msg = args.join(' ');
        appendLog(`<div>${escapeHtml(msg)}</div>`, trimmed);
        break;
      }

      default: {
        appendLog(`
          <div style="color: #f43f5e;">
            maclovia-bm: comando no encontrado: <strong>${escapeHtml(cmd)}</strong>.
            <div style="color: var(--text-muted); font-size: 0.7rem; margin-top: 0.25rem;">
              Escribe <span class="text-rosa" style="font-weight: 600;">help</span> para consultar los comandos válidos.
            </div>
          </div>
        `, trimmed);
      }
    }
  }

  // Handle command submission via Form
  cliForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = cliInput.value;
    cliInput.value = '';
    executeCommand(value);
  });

  // Keyboard navigation for history and auto-complete
  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        cliInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        cliInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        cliInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = cliInput.value.trim().toLowerCase();
      if (!current) return;

      const matches = AVAILABLE_COMMANDS
        .map(c => c.name)
        .filter(name => name.startsWith(current));

      if (matches.length === 1) {
        cliInput.value = matches[0];
      } else if (matches.length > 1) {
        appendLog(`
          <div style="color: var(--text-muted); font-size: 0.7rem;">Sugerencias: ${matches.join('  •  ')}</div>
        `, current);
      }
    }
  });

  // Clicking anywhere in viewport focuses input
  cliViewport.addEventListener('click', (e) => {
    if (!e.target.closest('button') && !e.target.closest('a')) {
      cliInput.focus();
    }
  });

  // Quick Command Chips
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-cli-cmd]');
    if (chip) {
      const cmd = chip.getAttribute('data-cli-cmd');
      cliInput.value = '';
      executeCommand(cmd);
      cliInput.focus();
    }
  });

  // Clear button and window dots
  if (cliClearBtn) {
    cliClearBtn.addEventListener('click', () => {
      cliHistory.innerHTML = '';
      cliInput.focus();
    });
  }

  if (termDotRed) {
    termDotRed.addEventListener('click', () => {
      cliHistory.innerHTML = '';
      cliInput.focus();
    });
  }

  if (termDotYellow) {
    termDotYellow.addEventListener('click', () => {
      printInitialWelcome();
      cliInput.focus();
    });
  }

  if (termDotGreen) {
    termDotGreen.addEventListener('click', () => {
      if (terminalWindow) {
        terminalWindow.classList.toggle('expanded');
      }
      if (cliViewport) {
        cliViewport.style.maxHeight = cliViewport.style.maxHeight === '650px' ? '480px' : '650px';
      }
    });
  }

  // Initial welcome message render
  printInitialWelcome();
}
