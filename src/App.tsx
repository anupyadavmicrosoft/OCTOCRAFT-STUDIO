import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Terminal, 
  Eye, 
  Code, 
  ExternalLink, 
  Github, 
  Layers, 
  Cpu, 
  Workflow, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from './types';
import HeroPreview from './components/HeroPreview';
import AboutMeSection from './components/AboutMeSection';
import TechStackSection from './components/TechStackSection';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import GithubAnalyticsSection from './components/GithubAnalyticsSection';
import Controls from './components/Controls';
import MarkdownView from './components/MarkdownView';
import PremiumEffects from './components/PremiumEffects';
import Footer from './components/Footer';
import DeveloperCorner from './components/DeveloperCorner';
import GithubActionsHub from './components/GithubActionsHub';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Anup Yadav',
  username: 'anupyadav',
  role: 'Staff Software Engineer',
  company: 'Google',
  location: 'San Francisco, CA',
  bio: 'Pioneering the intersection of distributed cloud systems and modern AI architectures. Passionate about builder experiences, premium developer interfaces, and high-performance open-source foundations.',
  theme: 'cyber',
  socials: {
    github: 'https://github.com/anupyadav',
    linkedin: 'https://linkedin.com/in/anupyadav',
    twitter: 'https://twitter.com/anupyadav',
    website: 'https://anupyadav.dev',
    email: 'anupyadavgzp0890@gmail.com'
  },
  stats: {
    followers: 2482,
    stars: 12402,
    repos: 142,
    views: 133742
  },
  skills: [
    'TypeScript', 'React', 'Node.js', 'Go', 'Rust', 'Kubernetes', 'Docker', 'AWS', 'Gemini SDK', 'Terraform', 'Next.js', 'PostgreSQL'
  ],
  highlights: [
    'Google Staff Engineer',
    'Core OSS Contributor',
    'Distributed Systems Expert',
    'AI Solutions Architect'
  ],
  mission: 'To build high-concurrency, self-healing software primitives and beautiful human-centric interfaces that make advanced computing accessible, safe, and lightning fast.',
  timeline: [
    { year: '2024 - PRESENT', title: 'Staff Software Engineer', subtitle: 'Google Cloud Team', desc: 'Directing development of global Kubernetes orchestration meshes and high-throughput networking pipelines for Gemini model serving.' },
    { year: '2021 - 2024', title: 'Senior Software Engineer', subtitle: 'Microsoft Azure', desc: 'Led engineering efforts on Core Azure App Services, improving cold-start container latency by 35% through custom caching heuristics.' },
    { year: '2019 - 2021', title: 'Software Engineer II', subtitle: 'Netflix Core API', desc: 'Optimized real-time personalization algorithms and microservice graph APIs, scaling to support 200M+ global stream subscribers.' },
    { year: '2017 - 2019', title: 'Founding Engineer', subtitle: 'SaaS Alpha Startup', desc: 'Architected and shipped a secure real-time collaboration canvas using Canvas2D and custom WebSockets clusters from zero to acquisition.' }
  ],
  projects: [
    { name: 'KubeMesh-X', desc: 'A zero-config, low-overhead distributed cluster mesh built in Rust to securely proxy cloud microservices.', tech: ['Rust', 'gRPC', 'eBPF', 'K8s'], link: 'https://github.com/anupyadav' },
    { name: 'HydraStore', desc: 'An ultra-fast ACID-compliant key-value cache with native active-active geographic replication pools.', tech: ['Go', 'Raft Consensus', 'Redis'], link: 'https://github.com/anupyadav' },
    { name: 'Gemini-Link', desc: 'A lightweight React SDK and middleware layer to streamline secure multi-modal model interactions with active streaming.', tech: ['TypeScript', 'Gemini SDK', 'SSE'], link: 'https://github.com/anupyadav' },
    { name: 'Tailwind-Dynamic-Themes', desc: 'A compiler plugin to automatically generate responsive fluid UI design system variables.', tech: ['PostCSS', 'TypeScript'], link: 'https://github.com/anupyadav' }
  ],
  learning: [
    'Advanced WebAssembly (Wasm) runtime compilers',
    'Self-healing decentralized storage protocols',
    'Reinforcement learning with LLM token structures'
  ],
  goals: [
    'Publish a comprehensive performance framework on WebAssembly runtime metrics',
    'Contribute 2 major optimizations directly to the Go runtime scheduler core',
    'Keynote at a global software architecture conference'
  ],
  interests: [
    'Astro-photography',
    'High-end mechanical keyboard design',
    'Hiking & Alpine mountaineering',
    'Retro 8-bit sound synthesis'
  ],
  techStack: {
    languages: ['TypeScript', 'Go', 'Rust', 'Python', 'C++', 'Shell'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'WebAssembly', 'HTML5/CSS3'],
    backend: ['Node.js', 'Express', 'gRPC', 'GraphQL', 'FastAPI'],
    databases: ['PostgreSQL', 'Redis', 'MongoDB', 'Firebase', 'DynamoDB'],
    cloud: ['Google Cloud', 'AWS', 'Azure', 'Cloudflare'],
    devops: ['Kubernetes', 'Docker', 'GitHub Actions', 'Terraform', 'Helm'],
    operatingSystems: ['Linux (Ubuntu/Debian)', 'macOS', 'Windows Server'],
    tools: ['Git', 'VS Code', 'Vite', 'ESBuild', 'Neovim', 'Postman'],
    frameworks: ['NestJS', 'Astro', 'Electron', 'SvelteKit'],
    ai: ['Gemini API', 'OpenAI SDK', 'LangChain', 'PyTorch', 'Hugging Face'],
    cyberSecurity: ['OAuth 2.0', 'JWT', 'SSL/TLS', 'eBPF', 'OWASP Top 10']
  },
  featuredProjects: [
    {
      title: 'NovaMesh Proxy',
      description: 'A lightning-fast service mesh sidecar proxy built in Rust and WebAssembly, optimized for cloud-native orchestration with sub-millisecond route resolution layers and eBPF kernel telemetry integration.',
      tech: ['Rust', 'WebAssembly', 'eBPF', 'gRPC', 'Kubernetes'],
      stars: 4820,
      forks: 512,
      demoUrl: 'https://anupyadav.dev/novamesh',
      repoUrl: 'https://github.com/anupyadav/novamesh',
      imageTheme: 'mesh'
    },
    {
      title: 'Aether-AI Orchestrator',
      description: 'An enterprise-tier orchestration backend utilizing Google Gemini and streaming agent architectures. Implements dynamic semantic routing pools, function calling arrays, and vector memories.',
      tech: ['TypeScript', 'Gemini SDK', 'Node.js', 'Redis', 'Docker'],
      stars: 3150,
      forks: 284,
      demoUrl: 'https://anupyadav.dev/aether',
      repoUrl: 'https://github.com/anupyadav/aether-ai',
      imageTheme: 'neural'
    },
    {
      title: 'Chronos Distributed KV',
      description: 'A geo-replicated distributed key-value store featuring active-active Raft consensus consistency. Shards automatically with multi-region database boundaries and lightning local index caching.',
      tech: ['Go', 'Raft Consensus', 'RocksDB', 'gRPC', 'Terraform'],
      stars: 2890,
      forks: 310,
      demoUrl: 'https://anupyadav.dev/chronos',
      repoUrl: 'https://github.com/anupyadav/chronos-kv',
      imageTheme: 'storage'
    }
  ],
  githubAnalytics: {
    username: 'anupyadav',
    totalCommits: 14205,
    totalPRs: 348,
    totalIssues: 112,
    totalContribs: 3204,
    currentStreak: 18,
    longestStreak: 45,
    activeDays: 312,
    topLanguages: [
      { name: 'TypeScript', percentage: 48.5, color: '#3178c6' },
      { name: 'Go', percentage: 22.4, color: '#00add8' },
      { name: 'Rust', percentage: 14.8, color: '#dea584' },
      { name: 'Python', percentage: 9.3, color: '#3572a5' },
      { name: 'C++', percentage: 5.0, color: '#f34b7d' }
    ],
    trophies: [
      { title: 'Multi-lingual master', rank: 'SSS', desc: 'Expert in 5+ programming languages', type: 'code' },
      { title: 'Commits Overlord', rank: 'SS', desc: 'Over 10,000 global commits', type: 'commit' },
      { title: 'PR Champion', rank: 'S', desc: 'Merged 300+ pull requests', type: 'pr' },
      { title: 'Stargazer Magnet', rank: 'A', desc: 'Collected 8,000+ total repository stars', type: 'star' }
    ],
    pinnedRepos: [
      { name: 'novamesh-proxy', desc: 'High-performance cloud-native WebAssembly proxy engine in Rust.', language: 'Rust', stars: 4820, forks: 512 },
      { name: 'aether-ai-orchestrator', desc: 'Enterprise agent orchestrator powered by Gemini models and Redis caches.', language: 'TypeScript', stars: 3150, forks: 284 },
      { name: 'chronos-kv', desc: 'Geo-replicated distributed key-value consensus store with Raft clustering.', language: 'Go', stars: 2890, forks: 310 }
    ]
  }
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState<'profile' | 'exporter' | 'automations'>('profile');

  // Change handlers
  const handleProfileChange = (updated: UserProfile) => {
    setProfile(updated);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/35 selection:text-white pb-16">
      
      {/* Premium Ambient Background Effects, Mouse Follower, and Particles */}
      <PremiumEffects profile={profile} />

      {/* Animated Header Bar */}
      <motion.header 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 border-b border-slate-900 bg-slate-950/60 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-cyan-500 to-pink-500 shadow-md">
              <Cpu size={18} className="text-white animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur animate-ping [animation-duration:3s]" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white uppercase font-sans flex items-center space-x-1">
                <span>OctoCraft</span>
                <span className="text-cyan-400 font-mono text-[10px] bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded ml-1">ENGINE</span>
              </span>
              <p className="text-[9px] font-mono text-slate-500 leading-none mt-0.5">PREMIUM PROFILE STUDIO</p>
            </div>
          </div>

          {/* Quick links & Platform details */}
          <div className="flex items-center space-x-4">
            <a 
              href={`https://github.com/${profile.username}`}
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-all font-mono"
            >
              <Github size={13} />
              <span>@ {profile.username}</span>
              <ExternalLink size={10} className="opacity-60" />
            </a>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-300 uppercase">Production Ready</span>
            </div>
          </div>

        </div>
      </motion.header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Real-time Interactive Configuration controls */}
        <div className="lg:col-span-5 space-y-6">
          <Controls 
            profile={profile} 
            onChange={handleProfileChange} 
          />
        </div>

        {/* Right Side: Showcase Panel & Dynamic Exporter */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Navigation Tab selection */}
          <div className="flex border-b border-slate-800 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap shrink-0 ${activeTab === 'profile' ? 'border-cyan-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Eye size={16} />
              <span>Interactive Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('exporter')}
              className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap shrink-0 ${activeTab === 'exporter' ? 'border-purple-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Code size={16} />
              <span>GitHub Exporter & Markdown</span>
            </button>
            <button
              onClick={() => setActiveTab('automations')}
              className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap shrink-0 ${activeTab === 'automations' ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
            >
              <Workflow size={16} className={activeTab === 'automations' ? 'text-emerald-400' : 'text-slate-400'} />
              <span>GitHub Automations (CI/CD)</span>
            </button>
          </div>

          {/* Render Area */}
          <AnimatePresence mode="wait">
            {activeTab === 'profile' ? (
              <motion.div
                key="profile-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Visual guidelines tip */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 flex items-start space-x-3.5">
                  <Info size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This is your <strong>Premium Portfolio Interactive Preview</strong>. Select different themes in the configuration bar on the left to immediately swap the visual grid, accent gradients, particles, and branding across the entire display.
                  </p>
                </div>

                <HeroPreview profile={profile} />
                <AboutMeSection profile={profile} />
                <DeveloperCorner profile={profile} />
                <FeaturedProjectsSection profile={profile} />
                <GithubAnalyticsSection profile={profile} />
                <TechStackSection profile={profile} />
              </motion.div>
            ) : activeTab === 'exporter' ? (
              <motion.div
                key="exporter-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <MarkdownView profile={profile} />
              </motion.div>
            ) : (
              <motion.div
                key="automations-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <GithubActionsHub profile={profile} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* Animated & Theme-Aware Footer */}
      <Footer profile={profile} />

    </div>
  );
}
