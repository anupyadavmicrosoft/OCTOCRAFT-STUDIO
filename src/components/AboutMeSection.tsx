import React from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  BookOpen, 
  GitBranch, 
  Flag, 
  Heart, 
  Terminal, 
  Calendar, 
  Cpu, 
  Briefcase, 
  Star, 
  Award, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { UserProfile } from '../types';

interface AboutMeSectionProps {
  profile: UserProfile;
}

export default function AboutMeSection({ profile }: AboutMeSectionProps) {
  
  // Theme styling helpers
  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          accentText: 'text-purple-400',
          secondaryText: 'text-cyan-400',
          gradientBorder: 'border-purple-500/20 hover:border-cyan-500/40',
          timelineDot: 'bg-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]',
          timelineLine: 'bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500',
          cardBg: 'bg-purple-950/10 border-purple-500/20',
          highlightText: 'text-purple-300',
          iconBg: 'bg-purple-500/10 text-purple-400',
          accentGradient: 'from-purple-500 to-cyan-500'
        };
      case 'emerald':
        return {
          accentText: 'text-emerald-400',
          secondaryText: 'text-teal-400',
          gradientBorder: 'border-emerald-500/20 hover:border-teal-500/40',
          timelineDot: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]',
          timelineLine: 'bg-gradient-to-b from-emerald-500 via-teal-500 to-green-600',
          cardBg: 'bg-emerald-950/10 border-emerald-500/20',
          highlightText: 'text-emerald-300',
          iconBg: 'bg-emerald-500/10 text-emerald-400',
          accentGradient: 'from-emerald-500 to-teal-500'
        };
      case 'crimson':
        return {
          accentText: 'text-rose-400',
          secondaryText: 'text-orange-400',
          gradientBorder: 'border-rose-500/20 hover:border-orange-500/40',
          timelineDot: 'bg-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]',
          timelineLine: 'bg-gradient-to-b from-rose-500 via-orange-500 to-red-600',
          cardBg: 'bg-rose-950/10 border-rose-500/20',
          highlightText: 'text-rose-300',
          iconBg: 'bg-rose-500/10 text-rose-400',
          accentGradient: 'from-rose-500 to-orange-500'
        };
      case 'glass-dark':
      default:
        return {
          accentText: 'text-slate-200',
          secondaryText: 'text-slate-300',
          gradientBorder: 'border-white/10 hover:border-white/25',
          timelineDot: 'bg-slate-400 shadow-[0_0_15px_rgba(255,255,255,0.3)]',
          timelineLine: 'bg-gradient-to-b from-slate-700 via-slate-600 to-slate-800',
          cardBg: 'bg-white/5 border-white/10',
          highlightText: 'text-slate-100',
          iconBg: 'bg-white/5 text-slate-300',
          accentGradient: 'from-white to-slate-400'
        };
    }
  };

  const style = getThemeStyles();

  return (
    <div className="space-y-12">
      
      {/* 1. MISSION STATEMENT */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 md:p-8 rounded-2xl glass-morphism border ${style.gradientBorder} relative overflow-hidden`}
      >
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-start space-x-4 relative z-10">
          <div className={`p-3 rounded-xl ${style.iconBg} shrink-0`}>
            <Rocket size={24} className="animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">PHILOSOPHY &amp; MISSION</span>
              <Sparkles size={12} className={style.secondaryText} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Engineering with Purpose</h3>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{profile.mission}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. DEVELOPER JOURNEY TIMELINE */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2.5">
          <Calendar size={18} className={style.accentText} />
          <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans">The Developer Journey</h3>
          <span className="text-[10px] font-mono text-slate-500">— TIMELINE</span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8">
          {/* Vertical Timeline Line */}
          <div className={`absolute top-1 bottom-1 left-[11px] w-0.5 ${style.timelineLine} rounded-full`} />

          {profile.timeline.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[20px] sm:-left-[24px] top-1.5 w-3.5 h-3.5 rounded-full ${style.timelineDot} border-2 border-slate-950 transition-transform group-hover:scale-125 z-10`} />

              {/* Event Card */}
              <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 hover:border-slate-800 transition-all hover:bg-slate-950/80 hover:translate-x-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <div>
                    <span className={`inline-block text-[10px] font-mono font-bold tracking-widest uppercase mb-1 ${style.secondaryText}`}>
                      {event.year}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{event.title}</h4>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-850 self-start sm:self-center">
                    {event.subtitle}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. CURRENT ENDEAVORS (Projects, Learning, Goals) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CURRENTLY LEARNING */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 space-y-4"
        >
          <div className="flex items-center space-x-2.5 border-b border-slate-850 pb-3">
            <BookOpen size={16} className="text-cyan-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Continuous Upskilling</h4>
          </div>
          <div className="space-y-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              Consistently pushing boundaries and exploring next-generation technologies to sharpen my mental architecture:
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.learning.map((topic, index) => (
                <div key={index} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FUTURE MILESTONES / GOALS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 space-y-4"
        >
          <div className="flex items-center space-x-2.5 border-b border-slate-850 pb-3">
            <Flag size={16} className="text-rose-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Future Milestones</h4>
          </div>
          <div className="space-y-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              Strategic developer targets and core roadmap pursuits set for the coming quarters:
            </p>
            <div className="space-y-2">
              {profile.goals.map((goal, index) => (
                <div key={index} className="flex items-start space-x-2.5">
                  <ChevronRight size={14} className="text-rose-400 mt-0.5 shrink-0" />
                  <span className="text-xs text-slate-300 leading-relaxed">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* 4. CURRENT ACTIVE PROJECTS */}
      <div className="space-y-5">
        <div className="flex items-center space-x-2.5">
          <GitBranch size={18} className={style.secondaryText} />
          <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans">Active Sandbox Ventures</h3>
          <span className="text-[10px] font-mono text-slate-500">— LIVE DEVELOPMENTS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 hover:border-slate-800 hover:bg-slate-950/80 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h4>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-900/60">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. INTERESTS & PERSONALITY CORNER */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="p-5 rounded-2xl bg-slate-950/20 border border-slate-850/60"
      >
        <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Heart size={16} className="text-pink-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Interests &amp; Leisure Pursuit</h4>
          </div>
          <span className="font-mono text-[9px] text-slate-500">OFF DUTY</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <span 
              key={index} 
              className="px-3.5 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              {interest}
            </span>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
