/**
 * Maclovia / Belleza Maldita — Rust Playground Client
 * Evaluación remota de snippets vía Rust Playground API.
 * Contrato de retorno:
 *   { ok: true, success: true, stdout }     -> compiló y ejecutó
 *   { ok: true, success: false, stderr }    -> error del compilador
 *   { ok: false, stage: 'transport', reason: 'timeout' | 'offline' }
 *   { ok: false, stage: 'http', status }    -> respuesta no-OK del servicio
 *   { ok: false, stage: 'parse' }           -> cuerpo de respuesta inválido
 */

export async function executeRustCode(codeSnippet) {
  let source = codeSnippet.trim();
  if ((source.startsWith('"') && source.endsWith('"')) || (source.startsWith("'") && source.endsWith("'"))) {
    source = source.slice(1, -1);
  }
  if (!source.includes('fn main')) {
    source = `fn main() {\n    ${source}\n}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6500);

  try {
    const response = await fetch('https://play.rust-lang.org/execute', {
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

    if (!response.ok) {
      return { ok: false, stage: 'http', status: response.status };
    }

    try {
      const data = await response.json();
      return {
        ok: true,
        success: !!data.success,
        stderr: data.stderr || '',
        stdout: data.stdout || '',
      };
    } catch {
      return { ok: false, stage: 'parse' };
    }
  } catch (err) {
    return {
      ok: false,
      stage: 'transport',
      reason: err?.name === 'AbortError' ? 'timeout' : 'offline',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}