import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Mail, 
  MapPin, 
  Briefcase, 
  Building, 
  Eye, 
  Users, 
  Star, 
  GitFork, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Award, 
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeroPreviewProps {
  profile: UserProfile;
}

export default function HeroPreview({ profile }: HeroPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [typedText, setTypedText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visitorCount, setVisitorCount] = useState(133742);

  const phrases = [
    `Designing premium developer experiences`,
    `Architecting full-stack cloud systems`,
    `Specializing in AI and Large Language Models`,
    `Crafting the future of open source software`
  ];

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }, 60);
    }

    if (!isDeleting && typedText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  // Simulated live visitor counter ticking up occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Canvas particle system reactive to mouse
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = {
      cyber: ['#8b5cf6', '#06b6d4', '#ec4899', '#3b82f6'],
      'glass-dark': ['#ffffff', '#cbd5e1', '#94a3b8', '#475569'],
      emerald: ['#10b981', '#34d399', '#059669', '#6ee7b7'],
      crimson: ['#ef4444', '#f97316', '#dc2626', '#f43f5e']
    }[profile.theme] || ['#8b5cf6', '#06b6d4'];

    const createParticles = () => {
      particles.length = 0;
      const count = Math.floor(width / 15);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    };

    createParticles();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle neon grid background for cyber and emerald themes
      if (profile.theme === 'cyber' || profile.theme === 'emerald') {
        ctx.strokeStyle = profile.theme === 'cyber' ? 'rgba(139, 92, 246, 0.03)' : 'rgba(16, 185, 129, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw interactive web lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [profile.theme]);

  // Color Mapping helper based on profile theme
  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          bannerBg: 'bg-gradient-to-br from-slate-950 via-purple-950/40 to-cyan-950/30',
          accentColor: 'text-purple-400',
          accentBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
          gradientText: 'from-purple-400 via-fuchsia-400 to-cyan-400',
          cardBorder: 'border-purple-500/20 hover:border-cyan-500/40',
          glowColor: 'shadow-purple-500/20',
          badgeStyle: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
          buttonHover: 'hover:bg-cyan-500/20 hover:text-cyan-200'
        };
      case 'emerald':
        return {
          bannerBg: 'bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-900',
          accentColor: 'text-emerald-400',
          accentBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
          gradientText: 'from-emerald-400 via-teal-400 to-emerald-300',
          cardBorder: 'border-emerald-500/20 hover:border-teal-500/40',
          glowColor: 'shadow-emerald-500/20',
          badgeStyle: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
          buttonHover: 'hover:bg-emerald-500/20 hover:text-emerald-200'
        };
      case 'crimson':
        return {
          bannerBg: 'bg-gradient-to-br from-slate-950 via-rose-950/40 to-orange-950/20',
          accentColor: 'text-rose-400',
          accentBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
          gradientText: 'from-rose-400 via-orange-400 to-red-400',
          cardBorder: 'border-rose-500/20 hover:border-orange-500/40',
          glowColor: 'shadow-rose-500/20',
          badgeStyle: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
          buttonHover: 'hover:bg-rose-500/20 hover:text-rose-200'
        };
      case 'glass-dark':
      default:
        return {
          bannerBg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800',
          accentColor: 'text-slate-300',
          accentBg: 'bg-white/5 border-white/10 text-slate-200',
          gradientText: 'from-white via-slate-300 to-slate-400',
          cardBorder: 'border-white/10 hover:border-white/25',
          glowColor: 'shadow-white/5',
          badgeStyle: 'bg-white/5 border-white/10 text-slate-300',
          buttonHover: 'hover:bg-white/10 hover:text-white'
        };
    }
  };

  const style = getThemeStyles();

  return (
    <div id="hero-preview-section" className="relative w-full rounded-2xl overflow-hidden glass-morphism border border-slate-800 shadow-2xl">
      
      {/* 1. Huge Animated SVG Banner Background & Canvas particles */}
      <div className={`relative w-full h-[320px] md:h-[380px] overflow-hidden ${style.bannerBg}`}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        
        {/* Dynamic Abstract Tech Wave SVG Background Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-brand-purple)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="var(--color-brand-cyan)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-brand-pink)" stopOpacity="0.4" />
            </linearGradient>
            <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#475569" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
          
          {/* Wave paths with dynamic transformations */}
          <path d="M 0,160 Q 150,110 300,160 T 600,160 T 900,160 T 1200,160 T 1500,160 L 1500,400 L 0,400 Z" fill="url(#grid-grad)" className="animate-wave-1" />
          <path d="M 0,220 Q 200,160 400,220 T 800,220 T 1200,220 T 1600,220 L 1600,400 L 0,400 Z" fill="url(#grid-grad)" opacity="0.6" className="animate-wave-2" />
        </svg>

        {/* Floating tech nodes and visual guides */}
        <div className="absolute top-4 left-6 flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse [animation-delay:0.2s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse [animation-delay:0.4s]" />
          <span className="font-mono text-xs text-slate-500 ml-2">SYSTEM_ACTIVE</span>
        </div>

        <div className="absolute top-4 right-6 font-mono text-[10px] text-slate-500 text-right hidden sm:block">
          <div>LOC: {profile.location.toUpperCase()}</div>
          <div>STABLE: v2.4.12</div>
        </div>

        {/* Banner Content Container */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pt-12 pb-6">
          
          {/* Main Typography Area */}
          <div className="flex-1 text-center md:text-left z-10 max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium mb-4 ${style.accentBg}`}
            >
              <Sparkles size={12} className="animate-spin [animation-duration:4s]" />
              <span className="tracking-wide">PREMIUM PROFILE SYSTEM</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans"
            >
              Hi, I'm{' '}
              <span className={`bg-gradient-to-r ${style.gradientText} bg-clip-text text-transparent ${
                profile.theme === 'cyber' ? 'text-neon-cyber' :
                profile.theme === 'emerald' ? 'text-neon-emerald' :
                profile.theme === 'crimson' ? 'text-neon-crimson' : 'text-neon-glass'
              }`}>
                {profile.name}
              </span>
            </motion.h1>

            {/* Custom dynamic typing animation subtitle */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-lg md:text-xl text-slate-300 font-mono flex items-center justify-center md:justify-start"
            >
              <Terminal size={18} className={`${style.accentColor} mr-2 shrink-0`} />
              <span className="text-slate-200 font-medium">
                {typedText}
              </span>
              <span className={`w-1.5 h-5 ml-1 animate-cursor-blink ${
                profile.theme === 'cyber' ? 'bg-purple-400' :
                profile.theme === 'emerald' ? 'bg-emerald-400' :
                profile.theme === 'crimson' ? 'bg-rose-400' : 'bg-slate-300'
              }`} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-xs md:text-sm text-slate-400 font-sans max-w-lg leading-relaxed"
            >
              {profile.bio}
            </motion.p>
          </div>

          {/* Large Premium Interactive Developer Illustration SVG */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="hidden md:block w-[260px] h-[260px] relative z-10 animate-float-slow"
          >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_10px_30px_rgba(6,182,212,0.15)]">
              {/* Backing Grid Glow */}
              <circle cx="100" cy="100" r="70" fill="url(#circle-glow)" />
              <defs>
                <radialGradient id="circle-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={profile.theme === 'cyber' ? '#8b5cf6' : profile.theme === 'emerald' ? '#10b981' : profile.theme === 'crimson' ? '#ef4444' : '#ffffff'} stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Glowing circuit / server lines */}
              <path d="M 50 150 L 80 120 L 120 120 L 150 150" stroke="#475569" strokeWidth="2" strokeDasharray="4,4" />
              <circle cx="50" cy="150" r="3" fill="#64748b" />
              <circle cx="150" cy="150" r="3" fill="#64748b" />

              {/* Server / Screen isometric illustration */}
              <g transform="translate(10, 0)">
                {/* Outer frame of 3D Server Stack */}
                <path d="M 60 70 L 130 35 L 140 40 L 70 75 Z" fill="#334155" opacity="0.8" />
                <path d="M 60 70 L 60 120 L 70 125 L 70 75 Z" fill="#1e293b" />
                <path d="M 70 75 L 140 40 L 140 90 L 70 125 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" />

                {/* Cyberpunk circuit nodes glowing inside the rack */}
                <rect x="80" y="55" width="45" height="15" rx="2" transform="skewY(-26.5)" fill="#1e293b" stroke={profile.theme === 'cyber' ? '#c084fc' : profile.theme === 'emerald' ? '#34d399' : profile.theme === 'crimson' ? '#f87171' : '#cbd5e1'} strokeWidth="1.5" />
                <circle cx="95" cy="85" r="3" fill="#06b6d4" className="animate-pulse" />
                <circle cx="107" cy="79" r="3" fill="#8b5cf6" className="animate-pulse [animation-delay:0.3s]" />
                <circle cx="119" cy="73" r="3" fill="#ec4899" className="animate-pulse [animation-delay:0.6s]" />

                {/* Lower slot */}
                <rect x="80" y="80" width="45" height="15" rx="2" transform="skewY(-26.5)" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <line x1="85" y1="110" x2="115" y2="95" stroke="#22c55e" strokeWidth="2" strokeDasharray="2,2" />

                {/* Floating holographic rings */}
                <ellipse cx="105" cy="50" rx="35" ry="12" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6,3" className="animate-spin [animation-duration:15s]" />
                <ellipse cx="105" cy="40" rx="25" ry="8" fill="none" stroke="#ec4899" strokeWidth="1" strokeDasharray="3,3" className="animate-spin [animation-duration:10s]" />
              </g>

              {/* Dynamic code brackets floating around */}
              <text x="35" y="65" fill="#38bdf8" fontFamily="monospace" fontSize="16" fontWeight="bold" className="animate-float-slow">&lt;/&gt;</text>
              <text x="145" y="115" fill="#a78bfa" fontFamily="monospace" fontSize="18" fontWeight="bold" className="animate-float-medium">&#123;...&#125;</text>
              <text x="135" y="55" fill="#f472b6" fontFamily="monospace" fontSize="14" fontWeight="bold" className="animate-float-slow">$ npm</text>
            </svg>
          </motion.div>

        </div>
      </div>

      {/* 2. Glassmorphic User Detail Card Overlay */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800">
        
        {/* Left Side: Developer Info & Badges */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Profile Meta */}
            <div className="flex items-center space-x-2 text-slate-300 bg-slate-800/50 px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs font-medium">
              <Briefcase size={14} className="text-cyan-400" />
              <span>{profile.role}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-slate-300 bg-slate-800/50 px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs font-medium">
              <Building size={14} className="text-purple-400" />
              <span>{profile.company}</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-300 bg-slate-800/50 px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs font-medium">
              <MapPin size={14} className="text-rose-400" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Bio statement */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">Specialization Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:bg-slate-950/60 transition-colors">
                  <Award size={16} className={style.accentColor} />
                  <span className="text-xs text-slate-300 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Panel */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono mb-3">Connect / Channels</h3>
            <div className="flex flex-wrap gap-2">
              <a 
                href={`https://github.com/${profile.username}`} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs hover:text-white transition-all hover:scale-[1.03] ${style.buttonHover}`}
              >
                <Github size={14} />
                <span>GitHub</span>
                <ArrowUpRight size={10} className="opacity-60" />
              </a>

              <a 
                href={profile.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs hover:text-white transition-all hover:scale-[1.03] ${style.buttonHover}`}
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
                <ArrowUpRight size={10} className="opacity-60" />
              </a>

              <a 
                href={profile.socials.twitter} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs hover:text-white transition-all hover:scale-[1.03] ${style.buttonHover}`}
              >
                <Twitter size={14} />
                <span>X / Twitter</span>
                <ArrowUpRight size={10} className="opacity-60" />
              </a>

              <a 
                href={profile.socials.website} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs hover:text-white transition-all hover:scale-[1.03] ${style.buttonHover}`}
              >
                <Globe size={14} />
                <span>Website</span>
                <ArrowUpRight size={10} className="opacity-60" />
              </a>

              <a 
                href={`mailto:${profile.socials.email}`}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs hover:text-white transition-all hover:scale-[1.03] ${style.buttonHover}`}
              >
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: GitHub Real-time Stats Widget */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="glass-morphism rounded-2xl border border-slate-800 p-5 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Title */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-2">
                <Compass size={16} className={style.accentColor} />
                <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">GitHub Live Metrics</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-400">SYNCED</span>
              </div>
            </div>

            {/* Stats Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/50 text-center">
                <Users size={16} className="text-cyan-400 mx-auto mb-1.5" />
                <div className="font-sans text-lg font-bold text-white tracking-tight">{profile.stats.followers.toLocaleString()}</div>
                <div className="font-mono text-[9px] text-slate-500 uppercase">Followers</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/50 text-center">
                <Star size={16} className="text-yellow-400 mx-auto mb-1.5" />
                <div className="font-sans text-lg font-bold text-white tracking-tight">{profile.stats.stars.toLocaleString()}</div>
                <div className="font-mono text-[9px] text-slate-500 uppercase">Stars</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/50 text-center">
                <GitFork size={16} className="text-purple-400 mx-auto mb-1.5" />
                <div className="font-sans text-lg font-bold text-white tracking-tight">{profile.stats.repos.toLocaleString()}</div>
                <div className="font-mono text-[9px] text-slate-500 uppercase">Repos</div>
              </div>
            </div>

            {/* Live Visitor / Analytics Counter */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Eye size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase leading-none">Profile Views</div>
                  <div className="text-xs font-mono text-slate-500 mt-1">Status: Running</div>
                </div>
              </div>

              {/* Digit-by-digit visual counter */}
              <div className="flex space-x-0.5">
                {String(visitorCount).split('').map((char, index) => (
                  <motion.span 
                    key={index}
                    layoutId={`digit-${index}-${char}`}
                    className="w-5 h-7 bg-slate-900 border border-slate-800 rounded flex items-center justify-center font-mono text-sm font-bold text-cyan-400"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick interactive Tech Badge carousel/list */}
          <div className="mt-4 flex flex-wrap gap-1.5 items-center">
            <span className="font-mono text-[10px] text-slate-500 uppercase mr-1">Hot Stack:</span>
            {profile.skills.slice(0, 6).map((skill, index) => (
              <span 
                key={index}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border ${style.badgeStyle}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
