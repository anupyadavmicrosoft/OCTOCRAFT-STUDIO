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
  ArrowUpRight,
  FileText,
  Heart,
  Activity,
  Target,
  Flame,
  CheckCircle2,
  Workflow,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeroPreviewProps {
  profile: UserProfile;
}

export default function HeroPreview({ profile }: HeroPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visitorCount, setVisitorCount] = useState(133742);
  const [activeBadgeTab, setActiveBadgeTab] = useState<'metrics' | 'status' | 'activity'>('metrics');

  const phrases = [
    `Designing premium developer experiences`,
    `Architecting full-stack cloud systems`,
    `Specializing in AI and Large Language Models`,
    `Crafting the future of open source software`
  ];

  // Typing effect loop
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      }, 25);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }, 50);
    }

    if (!isDeleting && typedText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  // Visitor ticking increment
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Neural Particle system reactive to resize & mouse interactions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

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
      cyber: ['#a855f7', '#06b6d4', '#f43f5e', '#3b82f6'],
      'glass-dark': ['#ffffff', '#cbd5e1', '#94a3b8', '#6366f1'],
      emerald: ['#10b981', '#14b8a6', '#059669', '#34d399'],
      crimson: ['#f43f5e', '#f97316', '#dc2626', '#e11d48']
    }[profile.theme] || ['#8b5cf6', '#06b6d4'];

    const createParticles = () => {
      particles.length = 0;
      const count = Math.min(Math.floor(width / 12), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.15
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

      // Render Matrix Grid overlay
      ctx.strokeStyle = profile.theme === 'cyber' ? 'rgba(168, 85, 247, 0.02)' : 
                        profile.theme === 'emerald' ? 'rgba(16, 185, 129, 0.02)' : 
                        profile.theme === 'crimson' ? 'rgba(244, 63, 94, 0.02)' : 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 35;
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

      // Draw nodes and connective logic lines
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw node lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.11;
            ctx.lineWidth = 0.6;
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

  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          bannerBg: 'bg-slate-950/80',
          accentColor: 'text-purple-400',
          accentBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
          gradientText: 'from-purple-400 via-fuchsia-400 to-cyan-400',
          cardBorder: 'border-purple-500/20 hover:border-cyan-500/40',
          badgeStyle: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
          buttonHover: 'hover:bg-cyan-500/20 hover:text-cyan-200',
          aurora1: 'rgba(168, 85, 247, 0.45)', // purple
          aurora2: 'rgba(6, 182, 212, 0.45)', // cyan
          aurora3: 'rgba(236, 72, 153, 0.3)', // pink
          glowShadow: 'shadow-[0_0_50px_rgba(168,85,247,0.15)]',
          avatarGlow: 'from-purple-500 via-pink-500 to-cyan-400',
          btnPrimary: 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]',
          btnSecondary: 'bg-slate-950 border border-purple-500/30 text-slate-200 hover:bg-purple-950/20 hover:text-white',
          tabActive: 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
        };
      case 'emerald':
        return {
          bannerBg: 'bg-slate-950/80',
          accentColor: 'text-emerald-400',
          accentBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
          gradientText: 'from-emerald-400 via-teal-400 to-green-500',
          cardBorder: 'border-emerald-500/20 hover:border-teal-500/40',
          badgeStyle: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
          buttonHover: 'hover:bg-emerald-500/20 hover:text-emerald-200',
          aurora1: 'rgba(16, 185, 129, 0.45)', // emerald
          aurora2: 'rgba(20, 184, 166, 0.45)', // teal
          aurora3: 'rgba(52, 211, 153, 0.25)', // mint
          glowShadow: 'shadow-[0_0_50px_rgba(16,185,129,0.15)]',
          avatarGlow: 'from-emerald-500 via-teal-500 to-green-400',
          btnPrimary: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]',
          btnSecondary: 'bg-slate-950 border border-emerald-500/30 text-slate-200 hover:bg-emerald-950/20 hover:text-white',
          tabActive: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
        };
      case 'crimson':
        return {
          bannerBg: 'bg-slate-950/80',
          accentColor: 'text-rose-400',
          accentBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
          gradientText: 'from-rose-400 via-orange-400 to-red-500',
          cardBorder: 'border-rose-500/20 hover:border-orange-500/40',
          badgeStyle: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
          buttonHover: 'hover:bg-rose-500/20 hover:text-rose-200',
          aurora1: 'rgba(244, 63, 94, 0.45)', // rose
          aurora2: 'rgba(249, 115, 22, 0.45)', // orange
          aurora3: 'rgba(220, 38, 38, 0.25)', // crimson
          glowShadow: 'shadow-[0_0_50px_rgba(244,63,94,0.15)]',
          avatarGlow: 'from-rose-500 via-orange-500 to-red-400',
          btnPrimary: 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]',
          btnSecondary: 'bg-slate-950 border border-rose-500/30 text-slate-200 hover:bg-rose-950/20 hover:text-white',
          tabActive: 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
        };
      case 'glass-dark':
      default:
        return {
          bannerBg: 'bg-slate-950/80',
          accentColor: 'text-slate-300',
          accentBg: 'bg-white/5 border-white/10 text-slate-200',
          gradientText: 'from-white via-slate-300 to-slate-400',
          cardBorder: 'border-white/10 hover:border-white/25',
          badgeStyle: 'bg-white/5 border-white/10 text-slate-300',
          buttonHover: 'hover:bg-white/10 hover:text-white',
          aurora1: 'rgba(99, 102, 241, 0.25)', // indigo
          aurora2: 'rgba(59, 130, 246, 0.25)', // blue
          aurora3: 'rgba(148, 163, 184, 0.15)', // slate
          glowShadow: 'shadow-[0_0_50px_rgba(255,255,255,0.05)]',
          avatarGlow: 'from-slate-500 via-slate-300 to-slate-400',
          btnPrimary: 'bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white border border-white/10 shadow-lg',
          btnSecondary: 'bg-slate-950 border border-white/10 text-slate-200 hover:bg-white/5 hover:text-white',
          tabActive: 'bg-white/10 text-white border border-white/20'
        };
    }
  };

  const style = getThemeStyles();

  return (
    <div id="hero-premium-landing-root" className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl space-y-0">
      
      {/* Dynamic Keyframes Animation Injection */}
      <style>{`
        @keyframes mesh-float-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes mesh-float-2 {
          0% { transform: translate(0px, 0px) scale(1.1); }
          50% { transform: translate(-60px, 50px) scale(1.25); }
          100% { transform: translate(0px, 0px) scale(1.1); }
        }
        @keyframes mesh-float-3 {
          0% { transform: translate(0px, 0px) scale(0.95); }
          33% { transform: translate(35px, 40px) scale(1.05); }
          66% { transform: translate(-45px, -25px) scale(0.85); }
          100% { transform: translate(0px, 0px) scale(0.95); }
        }
        @keyframes rotating-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes subtle-wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .aurora-blur-1 {
          animation: mesh-float-1 25s ease-in-out infinite alternate;
        }
        .aurora-blur-2 {
          animation: mesh-float-2 30s ease-in-out infinite alternate;
        }
        .aurora-blur-3 {
          animation: mesh-float-3 20s ease-in-out infinite alternate;
        }
        .avatar-glow-ring::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: linear-gradient(to right, var(--tw-gradient-stops));
          border-radius: 50%;
          z-index: -1;
          animation: rotating-border 8s linear infinite;
        }
        .floating-element {
          animation: mesh-float-1 8s ease-in-out infinite alternate;
        }
      `}</style>

      {/* ----------------------------------------------------
          1. WORLD-CLASS FULL-WIDTH ANIMATED SVG & AURORA BANNER
          ---------------------------------------------------- */}
      <div className={`relative w-full h-[410px] md:h-[460px] overflow-hidden ${style.bannerBg}`}>
        
        {/* Animated Aurora Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute -top-[10%] -left-[10%] w-[55%] h-[55%] rounded-full blur-[110px] opacity-[0.35] aurora-blur-1 transition-all duration-700" 
            style={{ backgroundColor: style.aurora1 }}
          />
          <div 
            className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-[0.35] aurora-blur-2 transition-all duration-700" 
            style={{ backgroundColor: style.aurora2 }}
          />
          <div 
            className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.25] aurora-blur-3 transition-all duration-700" 
            style={{ backgroundColor: style.aurora3 }}
          />
        </div>

        {/* Dynamic Connected Particle Mesh Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        {/* Floating Developer Utilities Info - Left & Right */}
        <div className="absolute top-5 left-6 flex items-center space-x-2.5 z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 animate-pulse [animation-delay:0.2s] shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 animate-pulse [animation-delay:0.4s] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="font-mono text-[10px] font-bold text-slate-500 tracking-widest ml-1 bg-slate-900/60 px-2.5 py-0.5 rounded-full border border-slate-800">
            SYSTEM: ONLINE
          </span>
        </div>

        <div className="absolute top-5 right-6 font-mono text-[9px] text-slate-500 text-right hidden sm:block z-20 space-y-0.5">
          <div className="bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
            LOC: <span className="text-slate-300 font-semibold">{profile.location.toUpperCase()}</span>
          </div>
        </div>

        {/* MAIN OVERLAY GRID & TYPOGRAPHY CONTAINER */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pt-16 pb-8 z-20">
          
          <div className="flex-1 text-center md:text-left space-y-4 max-w-xl">
            {/* Theme Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${style.accentBg}`}
            >
              <Sparkles size={11} className="animate-spin [animation-duration:5s]" />
              <span className="font-mono text-[10px] tracking-widest">WORLD-CLASS ENGINEER ARCHITECT</span>
            </motion.div>

            {/* Giant Title Name with dynamic gradient clipping */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans"
            >
              Hi, I'm{' '}
              <span className={`bg-gradient-to-r ${style.gradientText} bg-clip-text text-transparent`}>
                {profile.name}
              </span>
            </motion.h1>

            {/* Simulated Live Terminal typing prompt */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-md md:text-xl text-slate-300 font-mono flex items-center justify-center md:justify-start"
            >
              <Terminal size={18} className={`${style.accentColor} mr-2.5 shrink-0 animate-pulse`} />
              <span className="text-slate-200 font-semibold text-sm md:text-base">
                {typedText}
              </span>
              <span className={`w-1.5 h-5 ml-1 animate-pulse ${
                profile.theme === 'cyber' ? 'bg-purple-400' :
                profile.theme === 'emerald' ? 'bg-emerald-400' :
                profile.theme === 'crimson' ? 'bg-rose-400' : 'bg-slate-300'
              }`} />
            </motion.div>

            {/* Personal bio tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-xs md:text-sm text-slate-400 leading-relaxed font-sans max-w-lg"
            >
              {profile.bio}
            </motion.p>

            {/* Micro badges - Location & Available */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2"
            >
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase font-bold">
                <CheckCircle2 size={12} className="animate-pulse" />
                <span>Available for Opportunities</span>
              </div>
              
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono">
                <MapPin size={11} className="text-rose-400" />
                <span>{profile.location}</span>
              </div>
            </motion.div>
          </div>

          {/* ----------------- VISUAL FEATURE: FLUID FLOATING ISOMETRIC SCHEMATIC ----------------- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            className="hidden md:block w-[290px] h-[290px] relative z-10 floating-element"
          >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              {/* Backing Glow Ring */}
              <circle cx="100" cy="100" r="75" fill="url(#core-aurora)" />
              <defs>
                <radialGradient id="core-aurora" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={profile.theme === 'cyber' ? '#c084fc' : profile.theme === 'emerald' ? '#34d399' : profile.theme === 'crimson' ? '#fb7185' : '#ffffff'} stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid Matrix Mesh lines in SVG */}
              <g opacity="0.15">
                <path d="M10,100 L190,100 M100,10 L100,190" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="100" cy="100" r="45" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                <circle cx="100" cy="100" r="65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,5" />
              </g>

              {/* Holographic Vercel/Stripe Isometric Server Core */}
              <g transform="translate(10, 5)">
                {/* Server Platform Iso Base */}
                <path d="M 50 135 L 95 110 L 140 135 L 95 160 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <path d="M 50 135 L 50 143 L 95 168 L 95 160 Z" fill="#1e293b" />
                <path d="M 95 160 L 95 168 L 140 143 L 140 135 Z" fill="#020617" />

                {/* Middle Server Blade */}
                <path d="M 50 105 L 95 80 L 140 105 L 95 130 Z" fill="#1e293b" stroke={profile.theme === 'cyber' ? '#a855f7' : profile.theme === 'emerald' ? '#10b981' : profile.theme === 'crimson' ? '#f43f5e' : '#cbd5e1'} strokeWidth="1" />
                <path d="M 50 105 L 50 113 L 95 138 L 95 130 Z" fill="#0f172a" />
                <path d="M 95 130 L 95 138 L 140 113 L 140 105 Z" fill="#020617" />

                {/* Floating holographic cloud panel */}
                <path d="M 50 75 L 95 50 L 140 75 L 95 100 Z" fill="#020617" opacity="0.9" stroke="#475569" strokeWidth="1" />
                {/* glowing server indicators */}
                <circle cx="85" cy="115" r="2.5" fill="#22c55e" className="animate-pulse" />
                <circle cx="95" cy="110" r="2.5" fill="#3b82f6" className="animate-pulse [animation-delay:0.3s]" />
                <circle cx="105" cy="105" r="2.5" fill="#eab308" className="animate-pulse [animation-delay:0.6s]" />

                {/* Neon vertical connection beams */}
                <line x1="95" y1="50" x2="95" y2="160" stroke={profile.theme === 'cyber' ? '#06b6d4' : profile.theme === 'emerald' ? '#34d399' : profile.theme === 'crimson' ? '#f97316' : '#cbd5e1'} strokeWidth="1.5" strokeDasharray="3,3" />

                {/* Floating data packets */}
                <circle cx="95" cy="70" r="4" fill="#06b6d4" className="animate-bounce" />
                <circle cx="95" cy="125" r="3.5" fill="#a855f7" className="animate-ping" />
              </g>

              {/* Floating tech stack nodes with logos */}
              <text x="25" y="65" fill="#60a5fa" fontFamily="monospace" fontSize="13" fontWeight="bold">&lt;TS/&gt;</text>
              <text x="145" y="115" fill="#c084fc" fontFamily="monospace" fontSize="15" fontWeight="bold">&#123; Go &#125;</text>
              <text x="135" y="55" fill="#f472b6" fontFamily="monospace" fontSize="12" fontWeight="bold">Rust://</text>
            </svg>
          </motion.div>

        </div>

        {/* OVERLAPPING WAVE TRANSITION FOOTER (Sleek Apple layout) */}
        <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none z-20">
          <svg className="w-full h-full fill-slate-900" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32 C288,74.6 576,16 864,48 C1152,80 1296,10.6 1440,32 L1440,74 L0,74 Z" opacity="0.4" />
            <path d="M0,45 C320,80 640,30 960,60 C1280,90 1360,35 1440,45 L1440,74 L0,74 Z" />
          </svg>
        </div>

      </div>

      {/* ----------------------------------------------------
          2. THE PREMIUM GLASSMORPHIC CARD OVERLAY (Fluent UI)
          ---------------------------------------------------- */}
      <div className="relative bg-slate-900 px-6 py-8 md:p-10 border-t border-slate-900 grid grid-cols-1 lg:grid-cols-12 gap-8 z-30">
        
        {/* LEFT COLUMN: PRIMARY PROFILE CARD & CTAS (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header metadata layout (Profile pic, name, role details) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            
            {/* PROFILE PHOTO FRAME WITH ROTATING GLOW */}
            <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-950 flex items-center justify-center p-1.5 shrink-0 shadow-xl border border-slate-800`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-spin [animation-duration:12s] opacity-70 blur-[3px]" />
              <img 
                src={`https://github.com/${profile.username}.png`}
                alt={profile.name}
                onError={(e) => {
                  // Fallback to beautiful dynamic monogram if load fails
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=020617&color=38bdf8&bold=true&size=128`;
                }}
                className="w-full h-full rounded-full object-cover z-10 border border-slate-950 bg-slate-950"
              />
            </div>

            <div className="space-y-2 pb-1.5">
              <h2 className="text-2xl font-black text-white font-sans tracking-tight">
                {profile.name}
              </h2>
              <p className="text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                <Briefcase size={13} className="text-slate-400" />
                <span>{profile.role}</span>
                <span className="text-slate-600">•</span>
                <Building size={13} className="text-slate-400" />
                <span>{profile.company}</span>
              </p>
              
              <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-md leading-normal">
                {profile.mission}
              </p>
            </div>
          </div>

          {/* QUICK CHANNELS & PROFESSIONAL CONTACT BUTTONS (CTAs) */}
          <div className="space-y-3.5 border-t border-slate-800/80 pt-6">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">🎯 STRATEGIC DIRECTORY COMMANDS</span>
            
            <div className="flex flex-wrap gap-2.5">
              <a 
                href={profile.socials.website} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-[1.03] ${style.btnPrimary}`}
              >
                <Globe size={13} />
                <span>View Live Portfolio</span>
                <ArrowUpRight size={11} />
              </a>

              <a 
                href={`https://github.com/${profile.username}`} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-[1.03] ${style.btnSecondary}`}
              >
                <Github size={13} className="text-slate-400" />
                <span>GitHub Profile</span>
              </a>

              <a 
                href={profile.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-[1.03] ${style.btnSecondary}`}
              >
                <Linkedin size={13} className="text-slate-400" />
                <span>LinkedIn</span>
              </a>

              <a 
                href={`mailto:${profile.socials.email}`}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-[1.03] ${style.btnSecondary}`}
              >
                <Mail size={13} className="text-slate-400" />
                <span>Email Architect</span>
              </a>

              <a 
                href="#" 
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 hover:text-white transition-all duration-300"
              >
                <Heart size={13} fill="currentColor" className="text-rose-400 animate-pulse" />
                <span>Sponsor Maintainer</span>
              </a>
            </div>
          </div>

          {/* SPECIALIZATION FOCUSES */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">✨ CORE CORE CREDENTIALS</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3 p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <Award size={14} className={style.accentColor} />
                  </div>
                  <span className="text-xs text-slate-300 font-bold">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: HIGH-DENSITY GITHUB LIVE STATISTICS (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-5 relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              {/* Header Title with tabs */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Compass size={15} className={style.accentColor} />
                  <span className="font-mono text-xs font-black text-slate-200 uppercase tracking-wider">LIVE STATISTICS GRID</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider">SYNC ACTIVE</span>
                </div>
              </div>

              {/* BENTO STATS CARDS */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-center space-y-1">
                  <Users size={16} className="text-cyan-400 mx-auto" />
                  <div className="font-sans text-xl font-black text-white tracking-tight">{profile.stats.followers.toLocaleString()}</div>
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Followers</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-center space-y-1">
                  <Star size={16} className="text-yellow-400 mx-auto animate-pulse" />
                  <div className="font-sans text-xl font-black text-white tracking-tight">{profile.stats.stars.toLocaleString()}</div>
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Stars</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-center space-y-1 col-span-2 sm:col-span-1">
                  <GitFork size={16} className="text-purple-400 mx-auto" />
                  <div className="font-sans text-xl font-black text-white tracking-tight">{profile.stats.repos.toLocaleString()}</div>
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Repositories</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-850 text-center space-y-1 col-span-2 sm:col-span-1">
                  <Activity size={16} className="text-rose-400 mx-auto" />
                  <div className="font-sans text-xl font-black text-white tracking-tight">8+ Years</div>
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Dev Experience</div>
                </div>
              </div>

              {/* CURRENT ROADMAP HIGHLIGHT & ACTIVE PROJECT */}
              <div className="space-y-2.5 p-4 rounded-xl bg-slate-900 border border-slate-850">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                  <Flame size={12} className="text-orange-400 animate-pulse" />
                  <span>ACTIVE TARGET: {profile.projects[0]?.name || 'Next-Gen OSS'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  {profile.projects[0]?.desc || 'Researching high-concurrency cloud mesh runtimes.'}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {(profile.projects[0]?.tech || ['Rust', 'gRPC']).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* LIVE DIGITAL VISITOR COUNTER WIDGET */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 animate-pulse">
                  <Eye size={15} />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider leading-none">Global Profile Visitors</div>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">Incremental Pulse</span>
                </div>
              </div>

              <div className="flex space-x-0.5">
                {String(visitorCount).split('').map((char, index) => (
                  <motion.span 
                    key={index}
                    layoutId={`vis-${index}-${char}`}
                    className="w-5.5 h-7.5 bg-slate-950 border border-slate-800 rounded-md flex items-center justify-center font-mono text-xs font-black text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.15)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

          </div>

          {/* MULTI-THEME CAPSULE INDICATORS */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-900/80">
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">CORE STACK RADAR:</span>
            <div className="flex flex-wrap gap-1.5 max-w-[70%] justify-end">
              {profile.skills.slice(0, 5).map((skill, index) => (
                <span 
                  key={index}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono border ${style.badgeStyle}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
