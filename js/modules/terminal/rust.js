/**
 * Maclovia / Belleza Maldita — Rust Playground Client
 * Evaluación remota de snippets vía Rust Playground API.
 */

export async function executeRustCode(codeSnippet) {
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
