import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  Terminal, 
  Layers, 
  Code,
  Globe 
} from 'lucide-react';
import { UserProfile } from '../types';

interface PremiumEffectsProps {
  profile: UserProfile;
}

export default function PremiumEffects({ profile }: PremiumEffectsProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const currentCoords = useRef({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  // Update window sizes safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Mouse move listener with low latency coordinates capture
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth mouse follow loop using requestAnimationFrame (extremely low lag!)
  useEffect(() => {
    const updateGlow = () => {
      if (glowRef.current) {
        // Linear interpolation for silky smooth lag/ease effect
        const ease = 0.08;
        currentCoords.current.x += (mouseCoords.current.x - currentCoords.current.x) * ease;
        currentCoords.current.y += (mouseCoords.current.y - currentCoords.current.y) * ease;

        glowRef.current.style.transform = `translate3d(${currentCoords.current.x - 175}px, ${currentCoords.current.y - 175}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(updateGlow);
    };

    requestRef.current = requestAnimationFrame(updateGlow);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Extract styles based on theme
  const getThemeGlow = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          glowBg: 'bg-radial from-purple-500/15 via-cyan-500/5 to-transparent',
          blob1: 'bg-gradient-to-tr from-purple-600/15 to-cyan-500/5',
          blob2: 'bg-gradient-to-br from-pink-500/10 to-fuchsia-600/15',
          lineGlow: 'bg-cyan-500/10',
          particleColor: 'bg-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.5)]',
          iconColor: 'text-purple-500/30'
        };
      case 'emerald':
        return {
          glowBg: 'bg-radial from-emerald-500/15 via-teal-500/5 to-transparent',
          blob1: 'bg-gradient-to-tr from-emerald-600/15 to-teal-500/10',
          blob2: 'bg-gradient-to-br from-green-500/10 to-emerald-600/15',
          lineGlow: 'bg-emerald-500/10',
          particleColor: 'bg-emerald-400/30 shadow-[0_0_8px_rgba(52,211,153,0.5)]',
          iconColor: 'text-emerald-500/30'
        };
      case 'crimson':
        return {
          glowBg: 'bg-radial from-rose-500/15 via-orange-500/5 to-transparent',
          blob1: 'bg-gradient-to-tr from-rose-600/15 to-red-500/10',
          blob2: 'bg-gradient-to-br from-orange-500/10 to-rose-600/15',
          lineGlow: 'bg-rose-500/10',
          particleColor: 'bg-rose-400/30 shadow-[0_0_8px_rgba(251,113,133,0.5)]',
          iconColor: 'text-rose-500/30'
        };
      case 'glass-dark':
      default:
        return {
          glowBg: 'bg-radial from-white/8 via-slate-500/3 to-transparent',
          blob1: 'bg-gradient-to-tr from-slate-200/5 to-slate-400/5',
          blob2: 'bg-gradient-to-br from-slate-400/5 to-slate-600/5',
          lineGlow: 'bg-white/5',
          particleColor: 'bg-slate-400/30 shadow-[0_0_8px_rgba(148,163,184,0.3)]',
          iconColor: 'text-slate-500/20'
        };
    }
  };

  const style = getThemeGlow();

  return (
    <>
      {/* 1. Silky Smooth Mouse Follower Glow (GPU Accelerated via translate3d) */}
      <div 
        ref={glowRef}
        className={`fixed top-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none z-40 blur-[80px] will-change-transform ${style.glowBg}`}
        style={{ transform: 'translate3d(-1000px, -1000px, 0)' }}
      />

      {/* 2. Interactive Background Drifting Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Blob Alpha */}
        <div 
          className={`absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full blur-[100px] animate-blob-morph ${style.blob1}`}
          style={{ animationDuration: '24s' }}
        />
        {/* Blob Beta */}
        <div 
          className={`absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] animate-blob-morph ${style.blob2}`}
          style={{ animationDuration: '28s', animationDelay: '-4s' }}
        />
      </div>

      {/* 3. Subtle Floating Ambient Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[
          { top: '15%', left: '8%', size: 'w-1 h-1', delay: '0s', dur: '12s' },
          { top: '45%', left: '85%', size: 'w-1.5 h-1.5', delay: '-3s', dur: '16s' },
          { top: '75%', left: '12%', size: 'w-1 h-1', delay: '-6s', dur: '14s' },
          { top: '82%', left: '78%', size: 'w-2 h-2', delay: '-2s', dur: '19s' },
          { top: '25%', left: '92%', size: 'w-1 h-1', delay: '-8s', dur: '15s' },
          { top: '60%', left: '4%', size: 'w-1.5 h-1.5', delay: '-4s', dur: '13s' },
        ].map((pt, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full ${pt.size} ${style.particleColor}`}
            style={{
              top: pt.top,
              left: pt.left,
              animation: `float-slow ${pt.dur} ease-in-out infinite`,
              animationDelay: pt.delay
            }}
          />
        ))}
      </div>

      {/* 4. Elegant Bobbing Tech Icons on Margin Edges */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10 hidden xl:block">
        {/* Top-Left Floating Item */}
        <div 
          className="absolute top-[20%] left-6 animate-float-slow"
          style={{ animationDuration: '9s' }}
        >
          <div className="flex flex-col items-center space-y-1 opacity-25 hover:opacity-50 transition-opacity">
            <Cpu size={20} className={style.iconColor} />
            <span className="text-[8px] font-mono text-slate-600">SYS_CORE</span>
          </div>
        </div>

        {/* Mid-Right Floating Item */}
        <div 
          className="absolute top-[40%] right-8 animate-float-medium"
          style={{ animationDuration: '11s' }}
        >
          <div className="flex flex-col items-center space-y-1 opacity-25 hover:opacity-50 transition-opacity">
            <Sparkles size={20} className={style.iconColor} />
            <span className="text-[8px] font-mono text-slate-600">AI_NODE</span>
          </div>
        </div>

        {/* Lower-Left Floating Item */}
        <div 
          className="absolute bottom-[25%] left-8 animate-float-medium"
          style={{ animationDuration: '13s' }}
        >
          <div className="flex flex-col items-center space-y-1 opacity-20 hover:opacity-50 transition-opacity">
            <Terminal size={18} className={style.iconColor} />
            <span className="text-[8px] font-mono text-slate-600">SHELL_EXEC</span>
          </div>
        </div>

        {/* Lower-Right Floating Item */}
        <div 
          className="absolute bottom-[15%] right-6 animate-float-slow"
          style={{ animationDuration: '10s' }}
        >
          <div className="flex flex-col items-center space-y-1 opacity-20 hover:opacity-50 transition-opacity">
            <Layers size={18} className={style.iconColor} />
            <span className="text-[8px] font-mono text-slate-600">MESH_X</span>
          </div>
        </div>
      </div>
    </>
  );
}
