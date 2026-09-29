/**
 * Maclovia / Belleza Maldita — Engineering Portfolio Data
 * Repositorios oficiales certificados del CEO Erick Jonathan Aguilar García.
 */

export const PROJECTS = [
  {
    id: 'gaje-semantic-compression',
    name: 'Protocolo GAJE: Compresión Genómica & Inferencia LLM',
    repoName: 'erickaguilar/gaje-semantic-compression',
    category: 'maclovia',
    badgeCategoryEs: 'MACLOVIA CORE · SISTEMAS',
    badgeCategoryEn: 'MACLOVIA CORE · SYSTEMS',
    taglineEs: 'Motor de inferencia nativa en Rust y compresión de alta densidad (Q4_0) para Modelos de Lenguaje Masivos con acceso zero-copy.',
    taglineEn: 'Native Rust inference engine and high-density Q4_0 compression for Large Language Models with zero-copy mmap access.',
    descriptionEs: 'Implementación pura en Rust que comprime el cuerpo del transformer a 4-bits por peso (Q4_0 con 16 centroides optimizados) manteniendo embeddings en FP32 en formato plano unificado .gaje v2. Incluye gaje-server soberano HTTP (Zero-Python Runtime) y soporte WebAssembly in-browser.',
    descriptionEn: 'Pure Rust implementation compressing transformer bodies to 4-bits per weight (Q4_0, 16 optimized centroids) while keeping embeddings in FP32 inside the unified .gaje v2 format. Includes sovereign HTTP gaje-server (Zero-Python) and in-browser WebAssembly.',
    primaryLanguage: 'Rust',
    techStack: ['Rust', 'PyO3', 'WebAssembly', 'Zero-Copy mmap', 'SSE Streaming', 'Q4_0 Quant'],
    githubUrl: 'https://github.com/erickaguilar/gaje-semantic-compression',
    huggingFaceUrl: 'https://huggingface.co/eaguilar/gaje-models',
    cloneCmd: 'git clone https://github.com/erickaguilar/gaje-semantic-compression.git',
    architectureDetails: {
      runtime: 'Pure Rust Engine (Zero-Python Runtime)',
      throughput: 'Token-to-token streaming < 18ms TTFT',
      quantizationOrType: 'Q4_0 (16 centroids) + FP32 Embeddings',
      cliExample: './target/release/gaje-server --model models/gaje_prime_3b.gaje --port 8080',
      highlightsEs: [
        'Formato plano unificado .gaje v2 con acceso zero-copy por mapeo en memoria (mmap).',
        'Servidor HTTP de producción soberano (gaje-server) con streaming SSE token a token.',
        'Soporte WebAssembly in-browser sin necesidad de backend o servidor externo.',
        'Modelos oficiales certificados en Hugging Face: Nano 1.5B (1.23 GB), Prime 3B (2.24 GB) y Ultra 7B (4.88 GB).'
      ],
      highlightsEn: [
        'Unified flat file .gaje v2 format with zero-copy memory-mapped access (mmap).',
        'Sovereign HTTP production server (gaje-server) with token-by-token SSE streaming.',
        'In-browser WebAssembly engine running entirely client-side with zero server dependencies.',
        'Certified models on Hugging Face: Nano 1.5B (1.23 GB), Prime 3B (2.24 GB), and Ultra 7B (4.88 GB).'
      ],
      benchmarks: [
        { label: 'Formato .gaje v2', value: '1.23 GB', subtext: 'gaje_nano_1.5b en WASM' },
        { label: 'Latencia TTFT', value: '< 18ms', subtext: 'Inferencia local zero-copy' },
        { label: 'Cuantización', value: '4-bits / W', subtext: '16 centroides optimizados' },
        { label: 'Servidor HTTP', value: '0 ms Python', subtext: 'Soberano en Rust puro' }
      ]
    }
  },
  {
    id: 'runa-y-piedra',
    name: 'Runa y Piedra: Mazmorra Vóxel Cooperativa P2P',
    repoName: 'erickaguilar/runa-y-piedra',
    category: 'belleza',
    badgeCategoryEs: 'BELLEZA MALDITA · WEBGL & P2P 3D',
    badgeCategoryEn: 'BELLEZA MALDITA · WEBGL & P2P 3D',
    taglineEs: 'Mazmorra vóxel cooperativa multijugador 3D en tiempo real con WebRTC dual-channel y motor WebGL a 60 FPS.',
    taglineEn: 'Real-time multiplayer 3D voxel cooperative dungeon powered by dual-channel WebRTC and 60 FPS WebGL engine.',
    descriptionEs: 'Experiencia multijugador 3D cooperativa en tiempo real para smartphones y escritorio con arquitectura listen-server P2P sobre WebRTC. Toda la mazmorra se renderiza en un único THREE.InstancedMesh (< 25 draw calls) con audio procedural sintetizado por Web Audio API, predicción de clientes y sincronización sin servidores centrales.',
    descriptionEn: 'Real-time cooperative 3D multiplayer dungeon for smartphones and desktop with P2P listen-server architecture over WebRTC. The entire dungeon renders inside a single THREE.InstancedMesh (< 25 draw calls) featuring synthesized procedural audio via Web Audio API, client reconciliation, and zero server infrastructure cost.',
    primaryLanguage: 'JavaScript / WebGL',
    techStack: ['WebGL 2.0', 'Three.js', 'WebRTC P2P', 'Listen-Server', 'InstancedMesh', 'Web Audio API'],
    githubUrl: 'https://github.com/erickaguilar/runa-y-piedra',
    demoUrl: 'https://runa-y-piedra.vercel.app/',
    cloneCmd: 'git clone https://github.com/erickaguilar/runa-y-piedra.git',
    architectureDetails: {
      runtime: 'WebGL 2.0 + WebRTC Peer-to-Peer Browser Engine',
      throughput: '60 FPS Móvil · Latencia P2P LAN < 5ms',
      quantizationOrType: 'Instanced Voxel Meshing + Dual DataChannels',
      cliExample: 'git clone https://github.com/erickaguilar/runa-y-piedra.git && npm install && npm run dev',
      highlightsEs: [
        'Arquitectura Listen-Server P2P: un navegador asume el rol de host autoritativo con $0 en costos de servidor.',
        'Canales duales WebRTC: canal confiable para eventos y canal de alta frecuencia a 30 Hz para inputs sin head-of-line blocking.',
        'Presupuesto de rendimiento móvil: menos de 25 draw calls en total renderizando el calabozo en un solo InstancedMesh.',
        'Audio procedural sintetizado en tiempo real con Web Audio API sin descargas de activos pesados.',
        'Conexión instantánea entre jugadores vía Web Share API (WhatsApp/Telegram), código QR dinámico y PIN de 4 dígitos.'
      ],
      highlightsEn: [
        'P2P Listen-Server Architecture: one client browser acts as authoritative host with zero cloud server expenses.',
        'Dual WebRTC DataChannels: guaranteed delivery for events and high-frequency 30 Hz hot channel for inputs without head-of-line blocking.',
        'Strict mobile performance budget: under 25 total draw calls by rendering the dungeon in a single InstancedMesh.',
        'Real-time procedural audio synthesis via Web Audio API without downloading heavy sound assets.',
        'Instant player pairing using Web Share API (WhatsApp/Telegram), dynamic QR codes, and 4-digit room PINs.'
      ],
      benchmarks: [
        { label: 'Rendimiento', value: '60 FPS', subtext: 'GPUs móviles estándar' },
        { label: 'Draw Calls', value: '< 25', subtext: 'THREE.InstancedMesh' },
        { label: 'Red P2P', value: '< 5ms', subtext: 'WebRTC directo sin server' },
        { label: 'Costo Servidor', value: '$0 / mes', subtext: 'Host descentralizado' }
      ]
    }
  },
  {
    id: 'valenquest',
    name: 'ValenQuest: Local-First Educational PWA',
    repoName: 'erickaguilar/ValenQuest',
    category: 'belleza',
    badgeCategoryEs: 'BELLEZA MALDITA · CRAFT INTERACTIVO',
    badgeCategoryEn: 'BELLEZA MALDITA · INTERACTIVE CRAFT',
    taglineEs: 'Videojuego educativo y simulación reactiva local-first compilada a WebAssembly con estética visual lúdica.',
    taglineEn: 'Local-first educational simulation and interactive game compiled to WebAssembly with playful visual aesthetics.',
    descriptionEs: 'Aplicación web progresiva (PWA) de arquitectura offline y local-first construida con módulos de cómputo en Rust compilados a WebAssembly integrados con JavaScript puro para garantizar máxima fluidez a 60 FPS.',
    descriptionEn: 'Progressive Web App (PWA) built on local-first offline architecture featuring high-speed Rust computation compiled to WebAssembly paired with vanilla JavaScript for silky 60 FPS performance.',
    primaryLanguage: 'Rust + WASM',
    techStack: ['Rust', 'WebAssembly', 'Vanilla JS', 'Local-First', 'PWA Offline', 'HTML5 Canvas'],
    githubUrl: 'https://github.com/erickaguilar/ValenQuest',
    demoUrl: 'https://valen-quest.vercel.app',
    cloneCmd: 'git clone https://github.com/erickaguilar/ValenQuest.git',
    architectureDetails: {
      runtime: 'Rust + WebAssembly in Client Browser',
      throughput: '60 FPS Solid · Cero Latencia de Red',
      quantizationOrType: 'Local-First State Architecture',
      cliExample: 'npm run build:wasm && vercel dev',
      highlightsEs: [
        'Arquitectura 100% cliente local-first: opera sin conexión a internet permanente.',
        'Módulo compilado en Rust con WebAssembly para lógica matemática y física del juego.',
        'Diseño interactivo de autor con identidad artística vibrante y lúdica.',
        'Desplegado en producción en Vercel con soporte multiplataforma (móvil y escritorio).'
      ],
      highlightsEn: [
        '100% local-first client architecture: runs seamlessly without permanent internet connectivity.',
        'Compiled Rust WebAssembly module driving game physics and mathematical state logic.',
        'Authorial interactive interface with vibrant visual craftsmanship.',
        'Production deployment on Vercel with desktop and mobile responsiveness.'
      ],
      benchmarks: [
        { label: 'Framerate', value: '60 FPS', subtext: 'Animación y física continua' },
        { label: 'Persistencia', value: 'Local-First', subtext: 'Sin dependencias de nube' },
        { label: 'Cómputo Wasm', value: 'Nativo', subtext: 'Compilado desde Rust' }
      ]
    }
  },
  {
    id: 'gaje-web-ui',
    name: 'GAJE Web UI / Local LLM Studio',
    repoName: 'erickaguilar/gaje-web-ui',
    category: 'belleza',
    badgeCategoryEs: 'IDENTIDAD UNIFICADA · INTERFAZ IA',
    badgeCategoryEn: 'UNIFIED IDENTITY · AI INTERFACE',
    taglineEs: 'Consola de control web para interactuar con modelos locales mediante streaming de tokens en tiempo real.',
    taglineEn: 'Web service frontend and control studio for local LLM inference with real-time token streaming.',
    descriptionEs: 'Frontend reactivo conectado al servidor gaje-server que permite probar la compresión de modelos, ajustar hiperparámetros de muestreo y observar el rendimiento de generación con telemetría en vivo.',
    descriptionEn: 'Reactive frontend connected to gaje-server enabling model compression evaluation, sampling hyperparameter adjustments, and real-time token generation telemetry.',
    primaryLanguage: 'JavaScript',
    techStack: ['JavaScript', 'Streaming SSE', 'Tailwind CSS', 'Vercel Edge', 'Local LLM UI'],
    githubUrl: 'https://github.com/erickaguilar/gaje-web-ui',
    demoUrl: 'https://gaje-web-ui.vercel.app',
    cloneCmd: 'git clone https://github.com/erickaguilar/gaje-web-ui.git',
    architectureDetails: {
      runtime: 'Modern Reactive Web Service',
      throughput: 'EventSource / Server-Sent Events (SSE)',
      quantizationOrType: 'Client Stream Inspector',
      cliExample: 'git clone https://github.com/erickaguilar/gaje-web-ui.git && npm install && npm run dev',
      highlightsEs: [
        'Conexión directa vía SSE (Server-Sent Events) con gaje-server en tiempo real.',
        'Telemetría de generación: cálculo de tokens por segundo y consumo de memoria.',
        'Diseño minimalista oscuro optimizado para sesiones prolongadas de investigación.'
      ],
      highlightsEn: [
        'Direct Server-Sent Events (SSE) pipe connected to sovereign gaje-server.',
        'Live generation telemetry: tokens per second tracking and memory footprint monitor.',
        'Minimalist dark theme engineered for prolonged research sessions.'
      ]
    }
  },
  {
    id: 'rubik-graph-visualizer',
    name: 'Rubik Graph Visualizer & State Space Topology',
    repoName: 'erickaguilar/rubik-graph-visualizer',
    category: 'maclovia',
    badgeCategoryEs: 'MACLOVIA CORE · MATEMÁTICAS',
    badgeCategoryEn: 'MACLOVIA CORE · MATHEMATICS',
    taglineEs: 'Visualizador topológico y análisis de grafos del espacio de estados y subgrupos del Cubo de Rubik.',
    taglineEn: 'Topological visualizer and state space graph analysis of Rubik\'s Cube permutation subgroups.',
    descriptionEs: 'Herramienta de análisis algorítmico y teoría de grupos para modelar las transiciones de estados del cubo de Rubik como grafos de Cayley, facilitando el estudio de caminos óptimos y propiedades algebraicas.',
    descriptionEn: 'Algorithmic tool and group theory visualizer modeling Rubik\'s Cube state transitions as Cayley graphs, enabling study of optimal pathing and algebraic structures.',
    primaryLanguage: 'Python',
    techStack: ['Python', 'Network Analysis', 'Graph Theory', 'Cayley Graphs', 'Combinatorics'],
    githubUrl: 'https://github.com/erickaguilar/rubik-graph-visualizer',
    cloneCmd: 'git clone https://github.com/erickaguilar/rubik-graph-visualizer.git',
    architectureDetails: {
      runtime: 'Python Scientific & Graph Computing',
      throughput: 'State Graph Expansion',
      quantizationOrType: 'Discrete Algebra & Permutations',
      cliExample: 'python -m rubik_visualizer --depth 6 --layout topological',
      highlightsEs: [
        'Modelado de permutaciones mediante teoría de grupos y representaciones algebraicas.',
        'Visualización de subgrafos de Cayley y distancias de Hamming entre estados.',
        'Orientado a investigación en heurísticas de resolución y búsqueda en espacios discretos.'
      ],
      highlightsEn: [
        'Permutation modeling via algebraic group theory representations.',
        'Visualization of Cayley subgraphs and Hamming distance state transitions.',
        'Engineered for research in discrete search heuristics and combinatorial spaces.'
      ]
    }
  }
];
