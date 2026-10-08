/**
 * Maclovia / Belleza Maldita — Terminal Commands: Rust Toolchain
 * cargo · rustc · rustup · gaje-server.
 *
 * ctx: { log(html, cmd?), esc(str), runRust(code), raw }
 */

export async function handleCargo(args, { log, esc, runRust, raw }) {
  const sub = (args[0] || '').toLowerCase();
  const subArgs = args.slice(1);

  if (!sub || sub === 'help' || sub === '--help' || sub === '-h') {
    log(`
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
    `, raw);
    return;
  }

  if (sub === 'run') {
    const userCode = subArgs.join(' ').trim();
    const targetCode = userCode || `println!("✦ Motor Soberano Maclovia (Rust 2021) ✦");\n    println!(">> Memoria zero-copy mmap: 2.24 GB cargados en 1.1 ms");\n    println!(">> Tensor Desquantizer (SIMD AVX-512): Activo");\n    println!(">> Latencia TTFT (Time to First Token): 13.8 ms");\n    println!(">> Rendimiento de inferencia: 192 tokens/segundo");`;

    log(`
      <div style="color: var(--text-muted); font-size: 0.72rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="text-rosa">✦</span> Compilando y ejecutando en runtime nativo de Rust...
      </div>
    `, raw);

    const playgroundRes = await runRust(targetCode);

    if (playgroundRes && playgroundRes.success) {
      log(`
        <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45;">
          <div><span style="color: #22c55e; font-weight: 700;">   Compiling</span> playground v0.0.1 (Rust 2021 / x86_64)</div>
          <div><span style="color: #22c55e; font-weight: 700;">    Finished</span> \`release\` profile [optimized] target(s) in 0.48s</div>
          <div><span style="color: #22c55e; font-weight: 700;">     Running</span> \`target/release/playground\`</div>
          <pre style="margin-top: 0.4rem; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.5); border-left: 2px solid #22c55e; color: #f8fafc; font-family: var(--font-mono); white-space: pre-wrap; border-radius: 4px;">${esc(playgroundRes.stdout || '(Ejecución completada con éxito)')}</pre>
          <div style="font-size: 0.65rem; color: #34d399; margin-top: 0.25rem;">
            [OK] Código Rust compilado y ejecutado exitosamente con cero dependencias de intérprete.
          </div>
        </div>
      `);
    } else if (playgroundRes && !playgroundRes.success) {
      log(`
        <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45;">
          <div style="color: #f87171; font-weight: 700; margin-bottom: 0.25rem;">Error del compilador rustc:</div>
          <pre style="color: #fca5a5; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); padding: 0.5rem 0.75rem; border-radius: 4px; white-space: pre-wrap; font-family: var(--font-mono); font-size: 0.68rem;">${esc(playgroundRes.stderr || 'Error de compilación')}</pre>
        </div>
      `);
    } else {
      // Local fallback simulation
      log(`
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
    return;
  }

  if (sub === 'build') {
    const isRelease = subArgs.includes('--release') || subArgs.includes('-r');
    log(`
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
    `, raw);
    return;
  }

  if (sub === 'test') {
    log(`
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
    `, raw);
    return;
  }

  if (sub === 'clippy') {
    log(`
      <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45; color: #cbd5e1;">
        <div><span style="color: #22c55e; font-weight: 700;">    Checking</span> maclovia v1.2.0 (/root/projects/maclovia)</div>
        <div><span style="color: #22c55e; font-weight: 700;">    Finished</span> \`dev\` profile [unoptimized + debuginfo] target(s) in 0.28s</div>
        <div style="margin-top: 0.4rem; padding: 0.35rem 0.6rem; background: rgba(52, 211, 153, 0.08); border-left: 2px solid #34d399; border-radius: 3px;">
          <span style="color: #34d399; font-weight: 700;">✦ 0 warnings, 0 errors.</span> Todo el código Rust cumple con las directrices estrictas de memoria segura y estilo idiomático.
        </div>
      </div>
    `, raw);
    return;
  }

  if (sub === 'check') {
    log(`
      <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45; color: #cbd5e1;">
        <div><span style="color: #22c55e; font-weight: 700;">    Checking</span> gaje-core v2.1.0</div>
        <div><span style="color: #22c55e; font-weight: 700;">    Checking</span> maclovia-runtime v1.2.0</div>
        <div><span style="color: #22c55e; font-weight: 700;">    Finished</span> \`dev\` profile target(s) in 0.14s</div>
      </div>
    `, raw);
    return;
  }

  if (sub === 'new' || sub === 'init') {
    const pkgName = subArgs[0] || 'maclovia-crate';
    log(`
      <div style="font-family: var(--font-mono); font-size: 0.72rem; line-height: 1.45;">
        <div><span style="color: #22c55e; font-weight: 700;">     Created</span> binary (application) \`<strong style="color: #ffffff;">${esc(pkgName)}</strong>\` package</div>
        <pre style="margin-top: 0.35rem; padding: 0.4rem 0.6rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 4px; color: #94a3b8; font-size: 0.68rem;">${esc(pkgName)}/
├── Cargo.toml    # Metadatos del crate y dependencias
└── src/
    └── main.rs   # Entry point fn main()</pre>
        <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.25rem;">
          Ejecuta: <code style="color: #fb923c;">cd ${esc(pkgName)} && cargo run</code>
        </div>
      </div>
    `, raw);
    return;
  }

  if (sub === 'tree') {
    log(`
      <pre style="font-family: var(--font-mono); font-size: 0.68rem; line-height: 1.35; color: #cbd5e1; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 4px; overflow-x: auto;">maclovia v1.2.0 (/root/projects/maclovia)
├── gaje-core v2.1.0
│   ├── memmap2 v0.9.4
│   └── rayon v1.10.0
├── actix-web v4.9.0
│   ├── actix-rt v2.10.0
│   └── tokio v1.38.0
└── serde v1.0.203 (features: ["derive"])</pre>
    `, raw);
    return;
  }

  log(`
    <div style="color: #f43f5e;">
      cargo: subcomando no reconocido: <strong>${esc(sub)}</strong>.
      <div style="color: var(--text-muted); font-size: 0.7rem; margin-top: 0.25rem;">
        Escribe <span style="color: #fb923c; font-weight: 600;">cargo --help</span> para consultar los subcomandos disponibles.
      </div>
    </div>
  `, raw);
}

export async function handleRustc(args, { log, esc, runRust, raw }) {
  const sub = (args[0] || '').toLowerCase();
  if (sub === '--version' || sub === '-v' || sub === '-V' || !sub) {
    log(`
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fb923c; font-weight: 600;">
        rustc 1.85.0 (4d91de4e4 2025-02-17) (x86_64-unknown-linux-gnu)
      </div>
      <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.25rem;">
        Compilador oficial de Rust. Compatible con ediciones 2015, 2018, 2021 y 2024.
      </div>
    `, raw);
    return;
  }

  if (sub === '-e') {
    const rawCode = args.slice(1).join(' ').trim();
    log(`
      <div style="color: var(--text-muted); font-size: 0.72rem;">Compilando expresión en rustc...</div>
    `, raw);
    const res = await runRust(rawCode);
    if (res && res.success) {
      log(`
        <pre style="margin-top: 0.35rem; padding: 0.4rem 0.6rem; background: rgba(0,0,0,0.5); border-left: 2px solid #22c55e; color: #ffffff; font-family: var(--font-mono); font-size: 0.72rem;">${esc(res.stdout || '(Sin salida)')}</pre>
      `);
    } else if (res && !res.success) {
      log(`
        <pre style="color: #f87171; font-family: var(--font-mono); font-size: 0.68rem;">${esc(res.stderr)}</pre>
      `);
    } else {
      log(`
        <div style="color: #22c55e; font-family: var(--font-mono); font-size: 0.72rem;">[OK] Expresión evaluada con éxito en rustc 1.85.0.</div>
      `);
    }
    return;
  }

  log(`
    <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #cbd5e1;">
      <div>rustc: compilando <code style="color: #ffffff;">${esc(args.join(' '))}</code>...</div>
      <div style="color: #22c55e; margin-top: 0.25rem;">[OK] Binario nativo generado en <code style="color: #ffffff;">./${esc(args[0].replace(/\.rs$/, ''))}</code></div>
    </div>
  `, raw);
}

export function handleRustup(args, { log, raw }) {
  log(`
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
  `, raw);
}

export function handleGaje(args, { log, raw }) {
  log(`
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
  `, raw);
}
