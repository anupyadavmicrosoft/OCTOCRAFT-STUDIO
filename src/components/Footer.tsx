import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Cpu, 
  Send, 
  Check, 
  Heart, 
  ShieldAlert 
} from 'lucide-react';
import { UserProfile } from '../types';

interface FooterProps {
  profile: UserProfile;
}

export default function Footer({ profile }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          textColor: 'text-purple-400',
          accentBorder: 'border-purple-500/10 focus:border-purple-500/40',
          focusRing: 'focus:ring-purple-500/20',
          btnBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]',
          badgeStyle: 'bg-purple-950/40 text-cyan-400 border-purple-800/30',
          waveFill1: 'rgba(139, 92, 246, 0.05)',
          waveFill2: 'rgba(6, 182, 212, 0.03)'
        };
      case 'emerald':
        return {
          textColor: 'text-emerald-400',
          accentBorder: 'border-emerald-500/10 focus:border-emerald-500/40',
          focusRing: 'focus:ring-emerald-500/20',
          btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]',
          badgeStyle: 'bg-emerald-950/40 text-teal-400 border-emerald-800/30',
          waveFill1: 'rgba(16, 185, 129, 0.05)',
          waveFill2: 'rgba(45, 212, 191, 0.03)'
        };
      case 'crimson':
        return {
          textColor: 'text-rose-400',
          accentBorder: 'border-rose-500/10 focus:border-rose-500/40',
          focusRing: 'focus:ring-rose-500/20',
          btnBg: 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]',
          badgeStyle: 'bg-rose-950/40 text-orange-400 border-rose-800/30',
          waveFill1: 'rgba(244, 63, 94, 0.05)',
          waveFill2: 'rgba(249, 115, 22, 0.03)'
        };
      case 'glass-dark':
      default:
        return {
          textColor: 'text-slate-300',
          accentBorder: 'border-white/10 focus:border-white/35',
          focusRing: 'focus:ring-white/10',
          btnBg: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
          badgeStyle: 'bg-white/5 text-slate-300 border-white/10',
          waveFill1: 'rgba(255, 255, 255, 0.03)',
          waveFill2: 'rgba(148, 163, 184, 0.01)'
        };
    }
  };

  const style = getThemeStyles();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-900 bg-slate-950/40 backdrop-blur-xl mt-20 pt-16 pb-8 z-20">
      
      {/* 1. Interactive Fluid Wave SVG Divider */}
      <div className="absolute inset-x-0 top-0 h-16 overflow-hidden pointer-events-none">
        <svg className="absolute w-[200%] h-full opacity-60" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1350,30 1500,60 L1500,120 L0,120 Z" fill={style.waveFill1} className="animate-wave-1" />
          <path d="M0,80 C200,40 400,100 600,60 C800,20 1000,100 1200,60 C1400,20 1600,100 1800,60 L1800,120 L0,120 Z" fill={style.waveFill2} className="animate-wave-2" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900/60">
          
          {/* Column 1: Info & Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-cyan-500 to-pink-500 shadow-md">
                <Cpu size={15} className="text-white animate-pulse" />
              </div>
              <span className="font-extrabold text-sm tracking-wider text-white uppercase font-sans">
                OCTOCRAFT STUDIO
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premium code playground for crafting modern web application mockups, elegant portfolios, and developer readme setups with pristine visual layouts.
            </p>

            {/* Live Stats Row */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${style.badgeStyle}`}>
                PING: 24MS
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border bg-slate-900/60 text-slate-400 border-slate-800">
                STABLE_NODE: v2.4.12
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border bg-emerald-950/20 text-emerald-400 border-emerald-900/40">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Map */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Quick Portals
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero-preview-section" className="text-slate-400 hover:text-cyan-400 transition-colors font-sans flex items-center space-x-1">
                  <span>• Hero Banner Showcase</span>
                </a>
              </li>
              <li>
                <a href="#about-me-root" className="text-slate-400 hover:text-cyan-400 transition-colors font-sans flex items-center space-x-1">
                  <span>• Professional Timeline</span>
                </a>
              </li>
              <li>
                <a href="#featured-projects-root" className="text-slate-400 hover:text-cyan-400 transition-colors font-sans flex items-center space-x-1">
                  <span>• Pinned Productions</span>
                </a>
              </li>
              <li>
                <a href="#github-analytics-root" className="text-slate-400 hover:text-cyan-400 transition-colors font-sans flex items-center space-x-1">
                  <span>• Metrics &amp; Telemetry</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter form */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Join Developer Feed
            </h5>
            <p className="text-[11px] text-slate-400 leading-normal">
              Subscribe to recieve notifications on new open-source templates, WebAssembly compilers, and proxy mesh guides.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1.5">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribed || isSubmitting}
                  placeholder="name@domain.com"
                  className={`w-full bg-slate-950/80 border rounded-xl px-3.5 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 ${style.accentBorder} ${style.focusRing} transition-all duration-300 disabled:opacity-50`}
                />
                
                <button
                  type="submit"
                  disabled={isSubscribed || isSubmitting}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center shrink-0 disabled:opacity-50 ${isSubscribed ? 'bg-emerald-600 text-white' : style.btnBg}`}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : isSubscribed ? (
                    <Check size={14} />
                  ) : (
                    <Send size={13} />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {isSubscribed && (
                  <motion.p 
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1"
                  >
                    <Check size={10} />
                    <span>Telemetric subscription verified successfully.</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Lower row: Copyright and visual credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          
          {/* Centered Credits */}
          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} {profile.name}. Handcrafted with</span>
            <Heart size={10} className="text-rose-500 fill-rose-500 animate-pulse mx-0.5" />
            <span>&amp; React 18.</span>
          </div>

          {/* Social icons row */}
          <div className="flex items-center space-x-3.5">
            {[
              { icon: Github, link: profile.socials.github, label: 'GitHub' },
              { icon: Linkedin, link: profile.socials.linkedin, label: 'LinkedIn' },
              { icon: Twitter, link: profile.socials.twitter, label: 'Twitter' },
              { icon: Mail, link: `mailto:${profile.socials.email}`, label: 'Email' },
            ].map((soc, idx) => {
              const SocIcon = soc.icon;
              return (
                <motion.a
                  key={idx}
                  href={soc.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.15 }}
                  className="text-slate-500 hover:text-white transition-colors"
                  aria-label={soc.label}
                >
                  <SocIcon size={14} />
                </motion.a>
              );
            })}
          </div>

        </div>

      </div>
    </footer>
  );
}
