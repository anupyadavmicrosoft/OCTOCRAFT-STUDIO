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
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350" width="100%" height="100%">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.primary}" />
      <stop offset="50%" stop-color="${colors.secondary}" />
      <stop offset="100%" stop-color="${colors.accent}" />
    </linearGradient>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&amp;family=JetBrains+Mono:wght@500&amp;display=swap');
      .title {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 800;
        font-size: 42px;
        fill: url(#gradient);
        animation: glow 6s ease-in-out infinite alternate;
      }
      .subtitle {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 500;
        font-size: 18px;
        fill: #94a3b8;
      }
      .desc {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        fill: #64748b;
      }
      .label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        fill: ${colors.secondary};
        letter-spacing: 2px;
      }
      @keyframes glow {
        0% { filter: drop-shadow(0 2px 5px rgba(139, 92, 246, 0.2)); }
        100% { filter: drop-shadow(0 5px 15px rgba(6, 182, 212, 0.4)); }
      }
      .animated-dot {
        animation: blink 1.5s infinite;
      }
      @keyframes blink {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
      .floating-node {
        animation: float 6s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    </style>
  </defs>

  <!-- Deep dark glass container -->
  <rect width="100%" height="100%" fill="#030712" rx="16" />
  <rect x="2" y="2" width="796" height="346" rx="14" fill="#090d16" stroke="#1e293b" stroke-width="2" />

  <!-- Code Dots top left -->
  <circle cx="25" cy="25" r="5" fill="#ef4444" />
  <circle cx="40" cy="25" r="5" fill="#f59e0b" />
  <circle cx="55" cy="25" r="5" fill="#22c55e" />

  <!-- Abstract Tech Wave and Grid -->
  <g opacity="0.15">
    <path d="M 0 250 C 200 150, 400 350, 800 250 L 800 350 L 0 350 Z" fill="url(#gradient)" />
    <!-- Dynamic grid lines -->
    <line x1="100" y1="0" x2="100" y2="350" stroke="#334155" stroke-width="0.5" />
    <line x1="200" y1="0" x2="200" y2="350" stroke="#334155" stroke-width="0.5" />
    <line x1="300" y1="0" x2="300" y2="350" stroke="#334155" stroke-width="0.5" />
    <line x1="400" y1="0" x2="400" y2="350" stroke="#334155" stroke-width="0.5" />
    <line x1="500" y1="0" x2="500" y2="350" stroke="#334155" stroke-width="0.5" />
    <line x1="600" y1="0" x2="600" y2="350" stroke="#334155" stroke-width="0.5" />
    <line x1="700" y1="0" x2="700" y2="350" stroke="#334155" stroke-width="0.5" />
  </g>

  <!-- Profile Content -->
  <g transform="translate(60, 60)">
    <!-- Label -->
    <text x="0" y="20" class="label" font-weight="bold">_PORTFOLIO_SYSTEM_INITIALIZED</text>
    
    <!-- Title -->
    <text x="0" y="70" class="title">Hi, I'm ${profile.name}</text>
    
    <!-- Typing Subtitle -->
    <g transform="translate(0, 110)">
      <text x="0" y="0" class="subtitle">${profile.role} @ ${profile.company}</text>
      <!-- Blinking Cursor -->
      <rect x="360" y="-18" width="8" height="22" fill="${colors.secondary}" class="animated-dot" />
    </g>

    <!-- Bio description -->
    <text x="0" y="150" class="desc">${profile.bio.substring(0, 70)}...</text>
    <text x="0" y="172" class="desc">Focused on scalable structures, clean code, and premium UX integrations.</text>

    <!-- Metrics display -->
    <g transform="translate(0, 210)">
      <rect width="130" height="45" rx="8" fill="#111827" stroke="#374151" />
      <text x="15" y="27" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="14" fill="#ffffff">${profile.stats.followers.toLocaleString()}</text>
      <text x="15" y="38" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94a3b8">FOLLOWERS</text>

      <g transform="translate(145, 0)">
        <rect width="130" height="45" rx="8" fill="#111827" stroke="#374151" />
        <text x="15" y="27" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="14" fill="#ffffff">${profile.stats.stars.toLocaleString()}</text>
        <text x="15" y="38" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94a3b8">GITHUB STARS</text>
      </g>

      <g transform="translate(290, 0)">
        <rect width="130" height="45" rx="8" fill="#111827" stroke="#374151" />
        <text x="15" y="27" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="14" fill="#ffffff">${profile.stats.repos}</text>
        <text x="15" y="38" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94a3b8">REPOSITORIES</text>
      </g>
    </g>
  </g>

  <!-- Interactive Globe / Tech Logo visual floating on the right -->
  <g class="floating-node" transform="translate(560, 140)">
    <circle cx="80" cy="80" r="70" fill="url(#circle-glow)" opacity="0.3" />
    <circle cx="80" cy="80" r="50" stroke="${colors.primary}" stroke-width="2" fill="none" stroke-dasharray="10, 5" />
    <circle cx="80" cy="80" r="30" stroke="${colors.secondary}" stroke-width="1.5" fill="none" />
    <polygon points="80,50 100,90 60,90" stroke="${colors.accent}" stroke-width="2" fill="none" />
    <!-- Pulse elements -->
    <circle cx="80" cy="50" r="4" fill="${colors.accent}" />
    <circle cx="100" cy="90" r="4" fill="${colors.accent}" />
    <circle cx="60" cy="90" r="4" fill="${colors.accent}" />
  </g>

  <radialGradient id="circle-glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.8" />
    <stop offset="100%" stop-color="${colors.primary}" stop-opacity="0" />
  </radialGradient>
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
