export const companyInfo = {
  name: 'Ireri Developers',
  founder: 'Brian Macharia Ireri',
  tagline: 'High-Impact Full-Stack Web Platforms & Software Engineering',
  email: 'ekusafamily014@gmail.com',
  github: 'https://github.com/ekusafamily',
  location: 'Nairobi / Nyeri, Kenya'
};

export const projects = [
  {
    id: 'kabila-la-vijana',
    title: 'Kabila La Vijana Platform',
    tagline: 'Empowering the Youth for a Better Tomorrow across all 47 Kenyan Counties',
    category: 'web',
    image: '/assets/kabila-vijana.png',
    featured: true,
    liveUrl: 'https://kabilalavijana.org',
    githubUrl: 'https://github.com/ekusafamily',
    badge: 'Live Platform',
    stats: '3,000+ Members · 47 Counties · 100+ Programs',
    description: 'Official digital mobilization and community platform for Kabila La Vijana. Unites Kenyan youth aged 18–35 through leadership development, civic engagement, and community action programs across all 47 counties to build a united, prosperous nation.',
    techStack: ['Next.js', 'React', 'Node.js', 'SSR / ISR', 'Tailwind / Modern CSS', 'REST APIs'],
    highlights: [
      'Engineered responsive membership portal reaching over 3,000+ active youth members across Kenya.',
      'Built interactive programs directory and event management system supporting 100+ youth empowerment programs.',
      'Optimized Core Web Vitals to deliver sub-second response times on mobile devices across 3G cellular connections in all 47 counties.',
      'Designed high-contrast, accessible UI tailored for youth community engagement and digital outreach.'
    ],
    architecture: 'Next.js App Router (SSR/ISR) <-> Express.js Backend Services <-> Cloud Storage & Media Delivery'
  },
  {
    id: 'dekutso-awards',
    title: 'DeKUTSO Comrade Choice Award',
    tagline: 'The Premier Student Recognition & Voting Platform at Dedan Kimathi University of Technology',
    category: 'web',
    image: '/assets/dekutso-awards.png',
    featured: true,
    liveUrl: 'https://dekutsochoiceawards.site',
    githubUrl: 'https://github.com/ekusafamily/choiceawards',
    badge: 'Live Production',
    stats: '26 Categories · Real-time Leaderboards · Live Voting',
    description: 'The official campus-wide awards and student recognition platform for Dedan Kimathi University of Technology (DeKUT). Empowers thousands of students to explore nominees, submit nominations, cast authenticated votes, and track real-time tier standings.',
    techStack: ['Next.js / React', 'Node.js', 'Express', 'Supabase PostgreSQL', 'Row Level Security', 'Payment APIs'],
    highlights: [
      'Engineered high-concurrency voting engine handling peak campus traffic with zero database contention.',
      'Designed dynamic category leaderboards with live standings and student nominee profile showcases.',
      'Configured secure nomination uploads to Supabase Storage with strict 500KB client-side compression and RLS policies.',
      'Integrated payment and automated transaction verification workflow for point-based voting.'
    ],
    architecture: 'Next.js Frontend <-> Node.js Express API <-> Supabase PostgreSQL with RLS <-> Verification Webhook'
  },
  {
    id: 'offline-spotify',
    title: 'Offline Spotify (Kirikusa)',
    tagline: 'High-fidelity offline music streaming engine with dynamic visualizers & AI DJ',
    category: 'realtime',
    image: '/assets/offline-spotify.jpg',
    featured: true,
    liveUrl: '#',
    githubUrl: 'https://github.com/ekusafamily/spotify',
    badge: 'Local-First Engine',
    stats: 'Zero-Lag Audio · QR Remote Control · Ollama AI',
    description: 'A local-first, premium music player reimagining local audio playback. Features real-time mobile remote control via terminal QR scan, canvas-based sinusoidal/radial audio visualizers, dynamic UI color extraction matching album vibes, and AI track recommendations.',
    techStack: ['Node.js', 'WebSockets', 'HTML5 Web Audio API', 'Ollama Local LLM', 'Canvas 2D'],
    highlights: [
      'Built bi-directional WebSocket state sync between host machine and phone via instant QR code link.',
      'Engineered real-time FFT audio visualizer supporting Wave, Pulse (circular), and Spectrum Bar modes.',
      'Integrated Ollama local language model for contextual AI DJ recommendations based on listening history.',
      'Created dynamic palette extraction algorithm that smoothly shifts ambient gradients to match currently playing cover art.'
    ],
    architecture: 'Node.js Audio Daemon <-> WebSocket Remote Bridge <-> Web Audio AnalyserNode <-> Local Ollama Inference'
  },
  {
    id: 'snippai',
    title: 'SnippAI Developer Code Hub',
    tagline: 'Intelligent code snippets manager and AI-driven syntax refactoring suite',
    category: 'tools',
    image: '/assets/snippai.jpg',
    featured: false,
    liveUrl: '#',
    githubUrl: 'https://github.com/ekusafamily',
    badge: 'Dev Utility',
    stats: 'Multi-Language · Instant Search · AI Assist',
    description: 'A lightweight developer utility built for managing, filtering, and organizing personal code snippets with intelligent syntax tagging and prompt-driven code transformations.',
    techStack: ['Node.js', 'Express', 'REST APIs', 'PrismJS', 'JSON DB'],
    highlights: [
      'Clean interface for saving code blocks across JavaScript, TypeScript, Python, and SQL.',
      'Integrated AI prompts for instant refactoring (ES6 modernization, async/await fixes, error handling additions).',
      'Instant full-text and tag-based search with zero external database dependencies.'
    ],
    architecture: 'Express REST Server <-> File System Persistence <-> AI Generation Client'
  },
  {
    id: 'strikemarkets',
    title: 'StrikeMarkets (5050Markets)',
    tagline: 'Real-time financial analytics dashboard and market trend tracking engine',
    category: 'web',
    image: '/assets/fintech-mpesa.jpg',
    featured: false,
    liveUrl: '#',
    githubUrl: 'https://github.com/ekusafamily/strikemarkets',
    badge: 'Market Analytics',
    stats: 'Live Price Feeds · Technical Indicators',
    description: 'High-speed market data aggregator and technical indicator dashboard providing traders with real-time volatility signals and asset momentum tracking.',
    techStack: ['Next.js', 'Node.js', 'Chart.js', 'WebSockets', 'REST APIs'],
    highlights: [
      'Live streaming tick data visualization with customizable technical overlays.',
      'Optimized rendering engine using canvas elements for smooth 60fps graph updates.',
      'Configurable alert thresholds dispatching instant browser notifications.'
    ],
    architecture: 'Next.js Frontend <-> WebSocket Price Streamer <-> Calculation Engine'
  }
];

export const capabilities = [
  {
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    title: 'Next.js & Full-Stack Web Apps',
    description: 'Architecting fast, responsive web applications with Next.js (App & Pages router), SSR/ISR, and modern component systems for production scale.'
  },
  {
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    title: 'High-Concurrency Portals & Voting Systems',
    description: 'Custom platforms engineered to handle thousands of concurrent users, democratic voting workflows, nominations, and real-time leaderboards.'
  },
  {
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    title: 'Node.js Backends & Distributed APIs',
    description: 'Scalable RESTful microservices, WebSockets, background job queues, and robust database design with PostgreSQL, Supabase RLS, and Redis.'
  },
  {
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    title: 'Payment & API Integrations',
    description: 'Seamless integration of payment gateways (including M-Pesa STK Push / Daraja 2.0, PayHero Kenya, Stripe), cryptographic webhooks, and third-party APIs.'
  }
];

export const skillsData = {
  frontend: [
    { name: 'Next.js (App & Pages Router)', level: '96%', tag: 'Core Stack' },
    { name: 'React 19 / Modern Hooks', level: '94%', tag: 'Expert' },
    { name: 'JavaScript (ESNext) & TypeScript', level: '93%', tag: 'Expert' },
    { name: 'Modern CSS3 / Glassmorphism / Animation', level: '92%', tag: 'Expert' },
    { name: 'Responsive & Mobile-First Architecture', level: '95%', tag: 'Core' },
    { name: 'HTML5 Semantic / Web Audio API', level: '88%', tag: 'Advanced' }
  ],
  backend: [
    { name: 'Node.js Runtime & Event Loop', level: '96%', tag: 'Core Stack' },
    { name: 'Express.js & Microservices', level: '94%', tag: 'Expert' },
    { name: 'RESTful API Engineering & Standards', level: '95%', tag: 'Expert' },
    { name: 'WebSockets & Real-Time Sync', level: '90%', tag: 'Advanced' },
    { name: 'Authentication (JWT, Sessions, OAuth)', level: '91%', tag: 'Security' },
    { name: 'Background Workers & Task Schedulers', level: '88%', tag: 'Backend' }
  ],
  databases: [
    { name: 'PostgreSQL & Supabase Architecture', level: '93%', tag: 'Database' },
    { name: 'Supabase Row Level Security (RLS)', level: '92%', tag: 'Security' },
    { name: 'Redis In-Memory Caching & Queues', level: '86%', tag: 'Performance' },
    { name: 'Linux Server Admin (VPS, Nginx, Caddy)', level: '89%', tag: 'DevOps' },
    { name: 'Git & GitHub Version Control', level: '95%', tag: 'Workflow' },
    { name: 'Database Schema Design & Indexes', level: '91%', tag: 'Core' }
  ],
  integrations: [
    { name: 'Payment Gateways (M-Pesa STK, PayHero, Stripe)', level: '95%', tag: 'Skill' },
    { name: 'HMAC SHA256 Webhook Verification', level: '93%', tag: 'Security' },
    { name: 'Automated Transaction Reconciliation', level: '92%', tag: 'Skill' },
    { name: 'Third-Party REST & GraphQL APIs', level: '94%', tag: 'Integration' },
    { name: 'Cloud Storage & Image Compression', level: '91%', tag: 'Media' },
    { name: 'SMS & Email Notification Gateways', level: '88%', tag: 'Services' }
  ]
};

export const experienceTimeline = [
  {
    period: '2025 - Present · Active Studio',
    role: 'Founder & Lead Software Engineer',
    company: 'Ireri Developers',
    location: 'Kenya',
    description: 'Leading client platform development, high-performance web systems, and custom digital software solutions. Architecting production web portals, voting infrastructures, and scalable APIs.',
    tags: ['Ireri Developers', 'Next.js', 'Node.js', 'Express', 'Supabase']
  },
  {
    period: '2025 - Present · Production Platform',
    role: 'Lead Full-Stack Engineer',
    company: 'DeKUTSO Comrade Choice Award',
    location: 'Dedan Kimathi University of Technology (DeKUT)',
    description: 'Architected the official student recognition and voting platform for DeKUT across 26 categories. Delivered real-time leaderboards, automated candidate nomination portal with Supabase RLS, and secure point-based voting integration.',
    tags: ['Next.js', 'Node.js', 'Supabase RLS', 'Real-time Leaderboard']
  },
  {
    period: '2024 - 2025 · Community Platform',
    role: 'Lead Web Systems Architect',
    company: 'Kabila La Vijana Platform',
    location: 'Kenya (All 47 Counties)',
    description: 'Directed the web infrastructure for Kabila La Vijana, uniting 3,000+ young Kenyan leaders through digital mentorship, program registration, and civic initiatives across all 47 counties. Optimized for ultra-fast mobile performance.',
    tags: ['Next.js', 'React', 'SSR', 'Community Infrastructure']
  },
  {
    period: '2023 - 2024 · Real-Time Systems',
    role: 'Software Systems Engineer',
    company: 'Kirikusa & Dev Tools',
    location: 'Kenya',
    description: 'Engineered high-fidelity real-time audio systems including Offline Spotify with QR-based phone remote synchronization, canvas audio visualizers, and local LLM AI integrations via Ollama.',
    tags: ['Node.js', 'WebSockets', 'Web Audio API', 'Ollama AI']
  },
  {
    period: 'Academic Foundation',
    role: 'Software Engineering & Technology',
    company: 'Dedan Kimathi University of Technology (DeKUT)',
    location: 'Nyeri, Kenya',
    description: 'Computer systems, data structures, algorithms, distributed systems, database architectures, and tech community leadership.',
    tags: ['Software Engineering', 'Algorithms', 'Databases', 'Campus Leadership']
  }
];
