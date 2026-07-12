import React, { useState } from 'react';
import { Clipboard, Check, Terminal, Eye, FileText, Download, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface MarkdownViewProps {
  profile: UserProfile;
}

export default function MarkdownView({ profile }: MarkdownViewProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  // Generate the high-fidelity inline SVGs and markdown matching the selected theme
  const getThemeColors = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          primary: '#8b5cf6',
          secondary: '#06b6d4',
          accent: '#ec4899',
          bg: '#0b0f19',
          text: '#ffffff',
          badges: 'purple'
        };
      case 'emerald':
        return {
          primary: '#10b981',
          secondary: '#34d399',
          accent: '#059669',
          bg: '#022c22',
          text: '#f0fdf4',
          badges: 'green'
        };
      case 'crimson':
        return {
          primary: '#ef4444',
          secondary: '#f97316',
          accent: '#dc2626',
          bg: '#180202',
          text: '#fef2f2',
          badges: 'red'
        };
      case 'glass-dark':
      default:
        return {
          primary: '#cbd5e1',
          secondary: '#94a3b8',
          accent: '#ffffff',
          bg: '#0f172a',
          text: '#ffffff',
          badges: 'black'
        };
    }
  };

  const colors = getThemeColors();

  const renderMarkdownTechStack = () => {
    const stack = profile.techStack || {
      languages: [],
      frontend: [],
      backend: [],
      databases: [],
      cloud: [],
      devops: [],
      operatingSystems: [],
      tools: [],
      frameworks: [],
      ai: [],
      cyberSecurity: []
    };

    const categories = [
      { key: 'languages', label: 'Languages' },
      { key: 'frontend', label: 'Frontend' },
      { key: 'backend', label: 'Backend' },
      { key: 'databases', label: 'Databases' },
      { key: 'cloud', label: 'Cloud' },
      { key: 'devops', label: 'DevOps' },
      { key: 'operatingSystems', label: 'Operating Systems' },
      { key: 'tools', label: 'Tools' },
      { key: 'frameworks', label: 'Frameworks' },
      { key: 'ai', label: 'AI' },
      { key: 'cyberSecurity', label: 'Cyber Security' }
    ] as const;

    return categories
      .map(cat => {
        const items = stack[cat.key] || [];
        if (items.length === 0) return '';
        return `**${cat.label}:**<br/>\n${items.map(item => `<code>${item}</code>`).join(' ')}\n<br/><br/>`;
      })
      .filter(Boolean)
      .join('\n');
  };

  const renderMarkdownFeaturedProjects = () => {
    const projects = profile.featuredProjects || [];
    if (projects.length === 0) return '';
    
    return projects.map(proj => {
      return `### 🌟 [**${proj.title}**](${proj.demoUrl || proj.repoUrl}) \`★ ${(proj.stars / 1000).toFixed(1)}k\` \`⑂ ${proj.forks}\`
> ${proj.description}
> 
> **Technologies:** ${proj.tech.map(t => `<code>${t}</code>`).join(' ')}
>
> 🚀 [Live Sandbox Demo](${proj.demoUrl}) &nbsp;|&nbsp; 💻 [GitHub Repository](${proj.repoUrl})`;
    }).join('\n\n---\n\n');
  };

  // Create an animated SVG banner that can be directly pasted / embedded in GitHub!
  const generateSVGBanner = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 380" width="100%" height="100%">
  <defs>
    <!-- Soft Aurora Blurs and Linear Gradients -->
    <filter id="aurora-blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="40" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.primary}" />
      <stop offset="50%" stop-color="${colors.secondary}" />
      <stop offset="100%" stop-color="${colors.accent}" />
    </linearGradient>

    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#111827" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#030712" stop-opacity="0.95" />
    </linearGradient>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&amp;family=JetBrains+Mono:wght@500;700&amp;display=swap');
      
      .title {
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        font-weight: 800;
        font-size: 38px;
        fill: #ffffff;
        letter-spacing: -1px;
      }
      .gradient-text {
        fill: url(#primary-grad);
        font-weight: 900;
      }
      .subtitle {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        font-size: 16px;
        fill: #cbd5e1;
      }
      .desc {
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        font-size: 13.5px;
        fill: #94a3b8;
        line-height: 1.6;
      }
      .system-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 10px;
        font-weight: 700;
        fill: ${colors.secondary};
        letter-spacing: 2px;
      }
      
      /* CSS Keyframes for High-Fidelity SVG Animations */
      @keyframes floating-mesh-1 {
        0% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(30px, -20px) scale(1.1); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      @keyframes floating-mesh-2 {
        0% { transform: translate(0px, 0px) scale(1.05); }
        50% { transform: translate(-40px, 30px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1.05); }
      }
      @keyframes signal-pulse {
        0%, 100% { opacity: 0.3; r: 3px; }
        50% { opacity: 0.9; r: 5px; }
      }
      @keyframes rotating-structure {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes typing-underline {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
      @keyframes wave-sway {
        0% { transform: translateY(0) scaleY(1); }
        50% { transform: translateY(-5px) scaleY(1.03); }
        100% { transform: translateY(0) scaleY(1); }
      }

      .mesh-1 {
        animation: floating-mesh-1 18s ease-in-out infinite alternate;
      }
      .mesh-2 {
        animation: floating-mesh-2 22s ease-in-out infinite alternate;
      }
      .signal-dot {
        animation: signal-pulse 2s infinite;
      }
      .rotating-hologram {
        animation: rotating-structure 20s linear infinite;
        transform-origin: 740px 170px;
      }
      .cursor-blink {
        animation: typing-underline 1.2s infinite;
      }
      .interactive-wave {
        animation: wave-sway 8s ease-in-out infinite alternate;
      }
    </style>
  </defs>

  <!-- Deep dark obsidian container -->
  <rect width="100%" height="100%" fill="#030712" rx="20" />
  <rect x="2" y="2" width="916" height="376" rx="18" fill="#070a13" stroke="#111827" stroke-width="1.5" />

  <!-- Aurora Mesh Gradient Backdrops (Accelerated SVG blurs) -->
  <g filter="url(#aurora-blur)" opacity="0.35">
    <!-- Aurora 1 -->
    <circle class="mesh-1" cx="150" cy="80" r="130" fill="${colors.primary}" />
    <!-- Aurora 2 -->
    <circle class="mesh-2" cx="750" cy="280" r="140" fill="${colors.secondary}" />
    <!-- Aurora 3 -->
    <circle class="mesh-1" cx="450" cy="180" r="110" fill="${colors.accent}" />
  </g>

  <!-- Premium Digital Matrix Grid overlay -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </g>

  <!-- Top bar controls (Mac Style Windows UI) -->
  <g transform="translate(30, 25)" opacity="0.8">
    <circle cx="0" cy="0" r="5" fill="#ef4444" />
    <circle cx="15" cy="0" r="5" fill="#eab308" />
    <circle cx="30" cy="0" r="5" fill="#22c55e" />
    <text x="50" y="4" font-family="'JetBrains Mono', monospace" font-size="9" fill="#475569" font-weight="700">CORE_MESH_V1.9_STABLE</text>
  </g>

  <!-- Header Location Coordinates -->
  <g transform="translate(890, 30)" text-anchor="end" opacity="0.6">
    <text font-family="'JetBrains Mono', monospace" font-size="9" fill="#64748b" font-weight="700">LOC: ${profile.location.toUpperCase()}</text>
  </g>

  <!-- ----------------------------------------------------
      MAIN CONTENT REPRESENTATION
      ---------------------------------------------------- -->
  <g transform="translate(60, 75)">
    
    <!-- System Status Badge -->
    <g transform="translate(0, 10)">
      <rect width="215" height="24" rx="12" fill="#111827" stroke="#1f2937" stroke-width="1" />
      <circle class="signal-dot" cx="15" cy="12" r="3.5" fill="#22c55e" />
      <text x="28" y="15" class="system-badge">_ENGINE_STATUS: ACTIVE</text>
    </g>

    <!-- Developer Title -->
    <text x="0" y="65" class="title">
      Hi, I'm <tspan class="gradient-text">${profile.name}</tspan>
    </text>

    <!-- Subtitle (Role and Affiliation) -->
    <g transform="translate(0, 100)">
      <text x="0" y="0" class="subtitle">&gt; ${profile.role} @ ${profile.company}</text>
      <rect class="cursor-blink" x="420" y="-14" width="8" height="18" fill="${colors.secondary}" />
    </g>

    <!-- Bio Summary Block -->
    <g transform="translate(0, 135)">
      <text x="0" y="0" class="desc">${profile.bio.substring(0, 78)}...</text>
      <text x="0" y="18" class="desc">Engineering fluid digital constructs with meticulous micro-interactions.</text>
    </g>

    <!-- Live Performance Indicators Metrics Cards -->
    <g transform="translate(0, 195)">
      
      <!-- Card 1: Followers -->
      <g transform="translate(0, 0)">
        <rect width="135" height="48" rx="10" fill="url(#card-grad)" stroke="#1f2937" stroke-width="1" />
        <!-- Vector Icon -->
        <circle cx="24" cy="24" r="5" fill="${colors.primary}" opacity="0.8" />
        <path d="M 18,32 C 18,28 20,27 24,27 C 28,27 30,28 30,32" stroke="${colors.primary}" stroke-width="1.5" fill="none" />
        <text x="44" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="14" fill="#ffffff">${profile.stats.followers.toLocaleString()}</text>
        <text x="44" y="34" font-family="'JetBrains Mono', monospace" font-size="8" fill="#64748b" font-weight="700">FOLLOWERS</text>
      </g>

      <!-- Card 2: Stars -->
      <g transform="translate(150, 0)">
        <rect width="135" height="48" rx="10" fill="url(#card-grad)" stroke="#1f2937" stroke-width="1" />
        <!-- Star Vector -->
        <polygon points="24,14 27,20 34,21 29,26 30,32 24,29 18,32 19,26 14,21 21,20" fill="#eab308" opacity="0.8" />
        <text x="44" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="14" fill="#ffffff">${profile.stats.stars.toLocaleString()}</text>
        <text x="44" y="34" font-family="'JetBrains Mono', monospace" font-size="8" fill="#64748b" font-weight="700">STARS</text>
      </g>

      <!-- Card 3: Repos -->
      <g transform="translate(300, 0)">
        <rect width="135" height="48" rx="10" fill="url(#card-grad)" stroke="#1f2937" stroke-width="1" />
        <!-- Repo fork icon vector -->
        <circle cx="22" cy="18" r="3" fill="none" stroke="${colors.accent}" stroke-width="1.5" />
        <circle cx="18" cy="30" r="3" fill="none" stroke="${colors.accent}" stroke-width="1.5" />
        <circle cx="28" cy="30" r="3" fill="none" stroke="${colors.accent}" stroke-width="1.5" />
        <path d="M 22,21 L 22,24 L 18,27 M 22,24 L 28,27" stroke="${colors.accent}" stroke-width="1.5" fill="none" />
        <text x="44" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="14" fill="#ffffff">${profile.stats.repos}</text>
        <text x="44" y="34" font-family="'JetBrains Mono', monospace" font-size="8" fill="#64748b" font-weight="700">REPOSITORIES</text>
      </g>

    </g>

  </g>

  <!-- ----------------------------------------------------
      RIGHT PORTAL: PREMIUM HOLOGRAM VISUAL (Stripe/Linear Theme)
      ---------------------------------------------------- -->
  <g class="rotating-hologram" transform="translate(0, 0)">
    <!-- Main Outer Halo -->
    <ellipse cx="740" cy="170" rx="75" ry="75" fill="none" stroke="url(#primary-grad)" stroke-width="1" stroke-dasharray="8,6" opacity="0.3" />
    <ellipse cx="740" cy="170" rx="55" ry="55" fill="none" stroke="${colors.secondary}" stroke-width="1.5" stroke-dasharray="14,8" opacity="0.5" />
    
    <!-- Concentric Inner Rings -->
    <circle cx="740" cy="170" r="35" fill="none" stroke="${colors.accent}" stroke-width="1" opacity="0.4" />
    <circle cx="740" cy="170" r="18" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.2" />

    <!-- Core Floating Star/Emitter -->
    <g transform="translate(740, 170)">
      <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#ffffff" opacity="0.9" />
      <circle cx="0" cy="0" r="3" fill="${colors.secondary}" />
    </g>
    
    <!-- Orbiting Nodes -->
    <circle cx="685" cy="170" r="4" fill="${colors.primary}" />
    <circle cx="795" cy="170" r="4" fill="${colors.secondary}" />
    <circle cx="740" cy="115" r="3" fill="${colors.accent}" />
    <circle cx="740" cy="225" r="5" fill="#ffffff" />
  </g>

  <!-- Overlapping Wave Footer (Vercel-style transition) -->
  <path class="interactive-wave" d="M 0,355 C 180,340 360,370 540,355 C 720,340 900,365 1080,355 L 1080,380 L 0,380 Z" fill="#070a13" opacity="0.8" />
  <path class="interactive-wave" d="M 0,362 C 220,350 440,372 660,360 C 880,348 1100,368 1320,360 L 1320,380 L 0,380 Z" fill="#090d16" />

</svg>`;
  };

  const markdownString = `<div align="center">

<!-- PREMIUM SVG HEADER BANNER -->
<img src="https://raw.githubusercontent.com/${profile.username}/${profile.username}/main/assets/banner.svg" alt="Premium Developer Banner" width="100%" />

<br/>

<!-- ANIMATED VISITOR AND BADGE SYSTEM -->
[![Profile Views](https://komarev.com/normal-gradient.svg?username=${profile.username}&color=${colors.badges}&style=for-the-badge&label=VIEWS)](https://github.com/${profile.username})
[![Stars](https://img.shields.io/github/stars/${profile.username}?style=for-the-badge&color=gold)](https://github.com/${profile.username})
[![Followers](https://img.shields.io/github/followers/${profile.username}?style=for-the-badge&color=blue)](https://github.com/${profile.username})

<br/>

# 🪐 Welcome to My Universe

### ${profile.role} | ${profile.company} | ${profile.location}

---

</div>

## 🧬 Executive Summary
${profile.bio}

---

## 🚀 Strategic Mission
> *"${profile.mission}"*

---

## 🛠️ Technological Arsenal
<div align="left">

${renderMarkdownTechStack()}

**Connect Channels & Networks:**
- **LinkedIn:** [${profile.name}](${profile.socials.linkedin})
- **Twitter:** [@${profile.username}](${profile.socials.twitter})
- **Personal Website:** [${profile.socials.website}](${profile.socials.website})
- **Professional Mail:** [${profile.socials.email}](mailto:${profile.socials.email})

</div>

---

## 🧭 Developer Journey Timeline
${profile.timeline.map(event => `
### 📅 **${event.year}** — **${event.title}**
> **${event.subtitle}**
> *${event.desc}*
`).join('\n')}

---

## 🌟 Featured Productions & Open Source Architectures
<div align="left">

${renderMarkdownFeaturedProjects()}

</div>

---

## 🧬 Active Sandboxes & Ventures
<div align="left">

${profile.projects.map(project => `
### 🛠️ [**${project.name}**](${project.link})
> ${project.desc}
> \`Tech stack:\` ${project.tech.map(t => `<code>${t}</code>`).join(' ')}
`).join('\n')}

</div>

---

## 💡 Learning & Roadmap Targets
<div align="left">

**Currently Upskilling:**
${profile.learning.map(topic => `- 🧠 ${topic}`).join('\n')}

<br/>

**Future Strategic Milestones:**
${profile.goals.map(goal => `- 🎯 ${goal}`).join('\n')}

<br/>

**Leisure & Interests:**
${profile.interests.map(interest => `<code>${interest}</code>`).join(' ')}

</div>

---

## 📊 Live GitHub Statistics

<div align="center">
  <table border="0">
    <tr>
      <td width="50%">
        <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=${profile.theme === 'cyber' ? 'radical' : profile.theme === 'emerald' ? 'tokyonight' : profile.theme === 'crimson' ? 'rose' : 'dark'}&border_radius=10&hide_border=false" alt="Overall Stats" width="100%" />
      </td>
      <td width="50%">
        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=${profile.theme === 'cyber' ? 'radical' : profile.theme === 'emerald' ? 'tokyonight' : profile.theme === 'crimson' ? 'rose' : 'dark'}&border_radius=10&hide_border=false" alt="Top Languages" width="100%" />
      </td>
    </tr>
    <tr>
      <td colspan="2" align="center" width="100%">
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.username}&theme=${profile.theme === 'cyber' ? 'radical' : profile.theme === 'emerald' ? 'tokyonight' : profile.theme === 'crimson' ? 'rose' : 'dark'}&border_radius=10&hide_border=false" alt="GitHub Streak Stats" width="100%" />
      </td>
    </tr>
  </table>
</div>

---

<div align="center">
  <sub>Generated with ❤️ using <b><a href="${profile.socials.website}">Anup's Premium Profile Engine</a></b>. All rights reserved.</sub>
</div>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadBanner = () => {
    const element = document.createElement("a");
    const file = new Blob([generateSVGBanner()], { type: 'image/svg+xml' });
    element.href = URL.createObjectURL(file);
    element.download = "banner.svg";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="readme-markdown-generator-section" className="space-y-6">
      
      {/* Title & Operations bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Sparkles className="text-purple-400 shrink-0" size={20} />
            <span>GitHub Profile README Exporter</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Deploy this ultra-premium layout onto your personal repository in under 2 minutes.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Active Mode selector */}
          <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'preview' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Eye size={13} />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'code' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <FileText size={13} />
              <span>Raw Code</span>
            </button>
          </div>

          <button
            onClick={downloadBanner}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl transition-all hover:scale-[1.02]"
          >
            <Download size={13} />
            <span>Download SVG Banner</span>
          </button>

          <button
            onClick={copyToClipboard}
            className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all hover:scale-[1.02] ${copied ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
          >
            {copied ? <Check size={13} /> : <Clipboard size={13} />}
            <span>{copied ? 'Copied Markdown!' : 'Copy README.md'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'preview' ? (
        /* SIMULATED GITHUB README PREVIEW */
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <Terminal size={14} className="text-slate-400" />
              <span className="font-mono text-xs font-semibold text-slate-300">{profile.username} / README.md</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">GITHUB RENDER ENGINE</span>
          </div>

          <div className="p-6 md:p-10 space-y-8 max-w-4xl mx-auto overflow-x-auto text-slate-300 prose prose-invert">
            
            {/* SVG Banner Rendering */}
            <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-[#090d16] filter drop-shadow-lg">
              <div dangerouslySetInnerHTML={{ __html: generateSVGBanner() }} />
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold bg-${colors.primary}/10 border border-${colors.primary}/20 text-${colors.secondary}`}>
                VIEWS: 133,742
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                STARS: {profile.stats.stars.toLocaleString()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                FOLLOWERS: {profile.stats.followers.toLocaleString()}
              </span>
            </div>

            <div className="text-center space-y-2 pt-4">
              <h1 className="text-3xl font-extrabold text-white font-sans">{profile.name}</h1>
              <p className="text-sm font-mono text-slate-400">{profile.role} @ {profile.company} | {profile.location}</p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 mx-auto rounded-full mt-4" />
            </div>

            {/* Executive Bio */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2 flex items-center space-x-2">
                <span>🧬 Executive Summary</span>
              </h2>
              <p className="text-sm leading-relaxed text-slate-400">{profile.bio}</p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2 flex items-center space-x-2">
                <span>🛠️ Technological Arsenal</span>
              </h2>
              <div className="space-y-4 pt-2">
                {([
                  { key: 'languages', label: 'Languages' },
                  { key: 'frontend', label: 'Frontend' },
                  { key: 'backend', label: 'Backend' },
                  { key: 'databases', label: 'Databases' },
                  { key: 'cloud', label: 'Cloud' },
                  { key: 'devops', label: 'DevOps' },
                  { key: 'operatingSystems', label: 'Operating Systems' },
                  { key: 'tools', label: 'Tools' },
                  { key: 'frameworks', label: 'Frameworks' },
                  { key: 'ai', label: 'AI' },
                  { key: 'cyberSecurity', label: 'Cyber Security' }
                ] as const).map(cat => {
                  const items = (profile.techStack?.[cat.key] || []);
                  if (items.length === 0) return null;
                  return (
                    <div key={cat.key} className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-400 font-mono">{cat.label}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item, idx) => (
                          <code key={idx} className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">
                            {item}
                          </code>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulated Timeline */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2 flex items-center space-x-2">
                <span>🧭 Developer Journey Timeline</span>
              </h2>
              <div className="space-y-4 pl-4 border-l border-slate-800">
                {profile.timeline.map((event, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-mono">
                      <span className="text-purple-400 font-bold">📅 {event.year}</span>
                      <span className="text-slate-500">—</span>
                      <span className="text-white font-bold">{event.title}</span>
                      <span className="text-slate-400 text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{event.subtitle}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed italic pl-4">
                      {event.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Featured Productions */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2 flex items-center space-x-2">
                <span>🌟 Featured Productions &amp; Open Source Architectures</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(profile.featuredProjects || []).map((project, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-800 bg-slate-900/10 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-bold text-white">🌟 {project.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          ★ {(project.stars / 1000).toFixed(1)}k
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-slate-900">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-950 text-cyan-400 border border-slate-850">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2 pt-1 text-[10px] font-mono">
                        <span className="text-slate-500">Theme: {project.imageTheme}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Active Sandboxes */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2 flex items-center space-x-2">
                <span>🧬 Active Sandboxes &amp; Ventures</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.projects.map((project, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-800 bg-slate-900/20 space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center justify-between">
                      <span>🛠️ {project.name}</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-850">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Learning, Goals, Interests */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2 flex items-center space-x-2">
                <span>💡 Learning &amp; Roadmap Targets</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-200">Currently Upskilling:</h4>
                  <ul className="space-y-1 text-slate-400 list-disc list-inside">
                    {profile.learning.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-200">Future Strategic Milestones:</h4>
                  <ul className="space-y-1 text-slate-400 list-disc list-inside">
                    {profile.goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-900">
                <span className="text-xs font-bold text-slate-300">Leisure &amp; Interests: </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {profile.interests.map((interest, index) => (
                    <code key={index} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">{interest}</code>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Statistics */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2">
                <span>📊 GitHub Statistics (Simulated embeds)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-800 p-5 bg-slate-900/40 relative overflow-hidden">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">Core Performance</h3>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-400">Stars Earned</span><span className="text-white font-bold">{profile.stats.stars}</span></div>
                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-400">Commits (2026)</span><span className="text-white font-bold">1,842</span></div>
                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-400">Total PRs</span><span className="text-white font-bold">124</span></div>
                    <div className="flex justify-between text-xs font-mono"><span className="text-slate-400">Total Issues Closed</span><span className="text-white font-bold">96</span></div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 p-5 bg-slate-900/40">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">Top Language Profile</h3>
                  <div className="space-y-3 pt-1">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1"><span className="text-slate-300">TypeScript</span><span className="text-slate-500">62%</span></div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full"><div className="h-full bg-cyan-400 rounded-full" style={{ width: '62%' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1"><span className="text-slate-300">React/JSX</span><span className="text-slate-500">22%</span></div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full"><div className="h-full bg-purple-500 rounded-full" style={{ width: '22%' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1"><span className="text-slate-300">Go / Rust</span><span className="text-slate-500">16%</span></div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '16%' }} /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated Streak Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="rounded-xl border border-slate-800 p-4 bg-slate-900/40 text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Current Streak</span>
                  <span className="block text-2xl font-black text-orange-400 font-mono mt-1">18 Days</span>
                </div>
                <div className="rounded-xl border border-slate-800 p-4 bg-slate-900/40 text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Longest Streak</span>
                  <span className="block text-2xl font-black text-rose-500 font-mono mt-1">45 Days</span>
                </div>
                <div className="rounded-xl border border-slate-800 p-4 bg-slate-900/40 text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Active Availability</span>
                  <span className="block text-2xl font-black text-emerald-400 font-mono mt-1">92% Ratio</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* CODE TAB WITH HIGHLIGHTED MARKDOWN AND INLINE SVGS */
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800/80">
            <span className="font-mono text-xs font-semibold text-slate-400">Copy this code into your README.md</span>
            <button
              onClick={copyToClipboard}
              className="text-xs text-purple-400 hover:text-purple-300 font-mono font-semibold"
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          <div className="p-5 font-mono text-xs text-slate-300 overflow-x-auto max-h-[600px] bg-slate-950 leading-relaxed select-all">
            <pre className="whitespace-pre">{markdownString}</pre>
          </div>
        </div>
      )}

      {/* QUICK DEPLOYMENT DECK */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Terminal size={15} className="text-cyan-400" />
          <span>Quick 30-Second Deployment Guide</span>
        </h3>
        <ol className="list-decimal list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
          <li>Create a new public repository named matching your GitHub username (e.g. <code className="text-cyan-300">github.com/{profile.username}/{profile.username}</code>).</li>
          <li>Click <strong className="text-slate-200">Download SVG Banner</strong> above and save it inside your repository in a folder named <code className="text-cyan-300">assets/</code> as <code className="text-cyan-300">banner.svg</code>.</li>
          <li>Copy the Markdown code above and replace the contents of your <code className="text-cyan-300">README.md</code> in that repository.</li>
          <li>Commit the changes, push, and admire your spectacular, ultra-premium new profile homepage!</li>
        </ol>
      </div>

    </div>
  );
}
