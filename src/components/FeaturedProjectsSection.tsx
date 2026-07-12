import React from 'react';
import { motion } from 'motion/react';
import { 
  GitFork, 
  Star, 
  ExternalLink, 
  Github, 
  Layers, 
  Cpu, 
  Workflow, 
  ShieldCheck,
  Code,
  Sparkles,
  Play
} from 'lucide-react';
import { UserProfile, FeaturedProject } from '../types';

interface FeaturedProjectsSectionProps {
  profile: UserProfile;
}

export default function FeaturedProjectsSection({ profile }: FeaturedProjectsSectionProps) {
  
  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          accentText: 'text-purple-400',
          secondaryText: 'text-cyan-400',
          gradientBorder: 'border-purple-500/20 hover:border-cyan-500/40',
          cardBg: 'bg-purple-950/5 border-purple-500/10 hover:border-purple-500/30',
          iconBg: 'bg-purple-500/10 text-purple-400',
          accentGradient: 'from-purple-500 via-fuchsia-500 to-cyan-500',
          glowStyle: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]',
          badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
          btnPrimary: 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]'
        };
      case 'emerald':
        return {
          accentText: 'text-emerald-400',
          secondaryText: 'text-teal-400',
          gradientBorder: 'border-emerald-500/20 hover:border-teal-500/40',
          cardBg: 'bg-emerald-950/5 border-emerald-500/10 hover:border-emerald-500/30',
          iconBg: 'bg-emerald-500/10 text-emerald-400',
          accentGradient: 'from-emerald-500 via-teal-500 to-green-500',
          glowStyle: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]',
          badgeStyle: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          btnPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]'
        };
      case 'crimson':
        return {
          accentText: 'text-rose-400',
          secondaryText: 'text-orange-400',
          gradientBorder: 'border-rose-500/20 hover:border-orange-500/40',
          cardBg: 'bg-rose-950/5 border-rose-500/10 hover:border-rose-500/30',
          iconBg: 'bg-rose-500/10 text-rose-400',
          accentGradient: 'from-rose-500 via-orange-500 to-red-500',
          glowStyle: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]',
          badgeStyle: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
          btnPrimary: 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)]'
        };
      case 'glass-dark':
      default:
        return {
          accentText: 'text-slate-200',
          secondaryText: 'text-slate-300',
          gradientBorder: 'border-white/10 hover:border-white/25',
          cardBg: 'bg-white/5 border-white/10 hover:border-white/20',
          iconBg: 'bg-white/5 text-slate-300',
          accentGradient: 'from-white to-slate-400',
          glowStyle: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]',
          badgeStyle: 'bg-white/5 text-slate-200 border-white/10',
          btnPrimary: 'bg-white hover:bg-slate-100 text-slate-950 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
        };
    }
  };

  const style = getThemeStyles();

  // Premium Custom Mock Illustrations ("Screenshots" representations)
  const renderScreenshotIllustration = (theme: FeaturedProject['imageTheme']) => {
    switch (theme) {
      case 'mesh':
        return (
          <div className="absolute inset-0 bg-slate-950/90 overflow-hidden flex items-center justify-center border-b border-slate-900 group-hover:bg-slate-950/80 transition-all duration-300">
            {/* Animated cluster pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg className="w-full h-full max-h-[140px] p-4 text-cyan-500/40" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="1">
              <motion.circle cx="40" cy="30" r="4" fill="currentColor" animate={{ r: [4, 6, 4] }} transition={{ repeat: Infinity, duration: 2 }} />
              <motion.circle cx="160" cy="70" r="4" fill="currentColor" />
              <motion.circle cx="100" cy="50" r="5" fill="currentColor" className="text-purple-500/60" />
              <motion.circle cx="130" cy="25" r="4" fill="currentColor" />
              <motion.circle cx="70" cy="75" r="4" fill="currentColor" />
              
              <line x1="40" y1="30" x2="100" y2="50" />
              <line x1="100" y1="50" x2="160" y2="70" />
              <line x1="130" y1="25" x2="100" y2="50" />
              <line x1="70" y1="75" x2="100" y2="50" />
              <line x1="40" y1="30" x2="70" y2="75" />
              <line x1="130" y1="25" x2="160" y2="70" />

              {/* Streaming pulse data */}
              <motion.circle cx="40" cy="30" r="2.5" fill="#38bdf8"
                animate={{ cx: [40, 100], cy: [30, 50] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
              <motion.circle cx="100" cy="50" r="2.5" fill="#a855f7"
                animate={{ cx: [100, 160], cy: [50, 70] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear", delay: 0.5 }}
              />
            </svg>
            <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between">
              <span className="font-mono text-[9px] text-slate-500 tracking-wider">CLUSTER RESOLUTION MESH</span>
              <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/40">● ONLINE</span>
            </div>
          </div>
        );
      case 'neural':
        return (
          <div className="absolute inset-0 bg-slate-950/90 overflow-hidden flex items-center justify-center border-b border-slate-900 group-hover:bg-slate-950/80 transition-all duration-300">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:20px_20px]" />
            <svg className="w-full h-full max-h-[140px] p-4 text-purple-500/40" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="1">
              <motion.path 
                d="M20 50 Q 60 20, 100 50 T 180 50" 
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [-20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
              <motion.path 
                d="M20 50 Q 60 80, 100 50 T 180 50" 
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, 20] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              <rect x="80" y="35" width="40" height="30" rx="4" fill="#090d16" stroke="currentColor" strokeWidth="1.5" />
              <text x="100" y="53" textAnchor="middle" fill="#c084fc" className="font-mono text-[10px] font-bold">LLM</text>
            </svg>
            <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between">
              <span className="font-mono text-[9px] text-slate-500 tracking-wider">AGENT PIPELINE ARRAYS</span>
              <span className="font-mono text-[9px] text-purple-400 bg-purple-950/50 px-1.5 py-0.5 rounded border border-purple-800/40">ACTIVE STREAM</span>
            </div>
          </div>
        );
      case 'storage':
        return (
          <div className="absolute inset-0 bg-slate-950/90 overflow-hidden flex items-center justify-center border-b border-slate-900 group-hover:bg-slate-950/80 transition-all duration-300">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="grid grid-cols-4 gap-2 p-4 text-emerald-500/30 w-full max-w-[160px] h-full max-h-[100px] items-center">
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  className="h-6 rounded bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center font-mono text-[8px] text-emerald-400/60"
                >
                  D{i}
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between">
              <span className="font-mono text-[9px] text-slate-500 tracking-wider">RAFT CONSENSUS INDEX</span>
              <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/40">SYNCED</span>
            </div>
          </div>
        );
      case 'compiler':
      default:
        return (
          <div className="absolute inset-0 bg-slate-950/90 overflow-hidden flex items-center justify-center border-b border-slate-900 group-hover:bg-slate-950/80 transition-all duration-300">
            <div className="w-full h-full p-4 flex flex-col justify-between">
              <div className="space-y-1 font-mono text-[8px] text-slate-500 text-left overflow-hidden">
                <p className="text-pink-500/70">fn main() &#123;</p>
                <p className="pl-2 text-cyan-400/80">let mut mesh = KubeMesh::new();</p>
                <p className="pl-2 text-yellow-400/80">mesh.initialize_ebpf_telemetry();</p>
                <p className="pl-2 text-purple-400/80">mesh.proxy_routes().unwrap();</p>
                <p className="text-pink-500/70">&#125;</p>
              </div>
            </div>
            <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between">
              <span className="font-mono text-[9px] text-slate-500 tracking-wider">COMPILER TARGET ASM</span>
              <span className="font-mono text-[9px] text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/40">COMPILED</span>
            </div>
          </div>
        );
    }
  };

  const projects = profile.featuredProjects || [];

  return (
    <div className="space-y-8" id="featured-projects-root">
      
      {/* Section Title */}
      <div className="space-y-1.5 border-b border-slate-900 pb-5">
        <div className="flex items-center space-x-2.5">
          <Workflow size={20} className={style.accentText} />
          <h3 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans">
            Featured Productions
          </h3>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
            PREMIUM VENTURES
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Top-tier open source architectures, production modules, and systems frameworks with live stats and active mock sandboxes.
        </p>
      </div>

      {/* Grid Layout of Featured Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-2xl bg-slate-950/30 border overflow-hidden flex flex-col justify-between group transition-all duration-300 ${style.cardBg} ${style.glowStyle} relative`}
          >
            {/* Top Visual Interactive Screenshot Simulator */}
            <div className="relative w-full h-[140px] overflow-hidden bg-slate-900/40">
              {renderScreenshotIllustration(project.imageTheme)}
            </div>

            {/* Core Details Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                
                {/* Title and Repo Stats */}
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                    {project.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded-lg border border-slate-850">
                    <div className="flex items-center space-x-0.5">
                      <Star size={11} className="text-yellow-500" />
                      <span>{(project.stars / 1000).toFixed(1)}k</span>
                    </div>
                    <span className="text-slate-600">|</span>
                    <div className="flex items-center space-x-0.5">
                      <GitFork size={11} className="text-cyan-400" />
                      <span>{project.forks}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed min-h-[64px]">
                  {project.description}
                </p>
              </div>

              {/* Technologies list with premium animation badge effects */}
              <div className="space-y-3.5">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${style.badgeStyle}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Double CTA Buttons: GitHub and Live Preview Demo */}
                <div className="flex items-center space-x-2.5 pt-3.5 border-t border-slate-900">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-950 transition-all ${style.btnPrimary}`}
                    >
                      <Play size={12} fill="currentColor" />
                      <span>Launch Sandbox</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
                    >
                      <Github size={13} />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
