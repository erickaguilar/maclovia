/**
 * Maclovia / Belleza Maldita — Terminal Brand Assets (Data)
 * Banner ASCII oficial y catálogo de comandos disponibles.
 */

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
