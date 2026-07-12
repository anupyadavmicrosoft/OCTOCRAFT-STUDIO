import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  RefreshCw, 
  Laptop, 
  Wrench, 
  Boxes, 
  Brain, 
  ShieldCheck,
  Search,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Fingerprint
} from 'lucide-react';
import { UserProfile, TechStack } from '../types';

interface TechStackSectionProps {
  profile: UserProfile;
}

export default function TechStackSection({ profile }: TechStackSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

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
          glowStyle: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]',
          badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20',
          searchFocus: 'focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50'
        };
      case 'emerald':
        return {
          accentText: 'text-emerald-400',
          secondaryText: 'text-teal-400',
          gradientBorder: 'border-emerald-500/20 hover:border-teal-500/40',
          cardBg: 'bg-emerald-950/5 border-emerald-500/10 hover:border-emerald-500/30',
          iconBg: 'bg-emerald-500/10 text-emerald-400',
          accentGradient: 'from-emerald-500 via-teal-500 to-green-500',
          glowStyle: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
          badgeStyle: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20',
          searchFocus: 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50'
        };
      case 'crimson':
        return {
          accentText: 'text-rose-400',
          secondaryText: 'text-orange-400',
          gradientBorder: 'border-rose-500/20 hover:border-orange-500/40',
          cardBg: 'bg-rose-950/5 border-rose-500/10 hover:border-rose-500/30',
          iconBg: 'bg-rose-500/10 text-rose-400',
          accentGradient: 'from-rose-500 via-orange-500 to-red-500',
          glowStyle: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]',
          badgeStyle: 'bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500/20',
          searchFocus: 'focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50'
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
          glowStyle: 'hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]',
          badgeStyle: 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10',
          searchFocus: 'focus:border-white/30 focus:ring-1 focus:ring-white/20'
        };
    }
  };

  const style = getThemeStyles();

  // Categories definitions matching exact requirements
  const categoriesList = [
    { key: 'languages', label: 'Languages', icon: Code2, desc: 'Core instruction languages & script architectures' },
    { key: 'frontend', label: 'Frontend', icon: Layout, desc: 'Client-side renders, frameworks & presentation' },
    { key: 'backend', label: 'Backend', icon: Server, desc: 'Server environments, protocols & messaging' },
    { key: 'databases', label: 'Databases', icon: Database, desc: 'Relational query engines & key-value cache' },
    { key: 'cloud', label: 'Cloud', icon: Cloud, desc: 'Hyperscalers & edge delivery networks' },
    { key: 'devops', label: 'DevOps', icon: RefreshCw, desc: 'Orchestration engines, pipelines & IaC' },
    { key: 'operatingSystems', label: 'Operating Systems', icon: Laptop, desc: 'Core kernel engines & hosts' },
    { key: 'tools', label: 'Tools', icon: Wrench, desc: 'Workspaces, runtimes & build frameworks' },
    { key: 'frameworks', label: 'Frameworks', icon: Boxes, desc: 'Pre-assembled core skeleton utilities' },
    { key: 'ai', label: 'AI', icon: Brain, desc: 'Neural model structures & semantic APIs' },
    { key: 'cyberSecurity', label: 'Cyber Security', icon: ShieldCheck, desc: 'Access patterns, protocols & defenses' }
  ] as const;

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

  return (
    <div className="space-y-8" id="tech-stack-root">
      
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Cpu size={20} className={style.accentText} />
            <h3 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans">
              Technological Arsenal
            </h3>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
              MODULAR STACK
            </span>
          </div>
          <p className="text-xs text-slate-400">
            A comprehensive, categorized inventory of frameworks, core runtimes, and engineering primitives.
          </p>
        </div>

        {/* Live Search Filter */}
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search stack components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-slate-950/80 border border-slate-850 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${style.searchFocus}`}
          />
        </div>
      </div>

      {/* Responsive Bento Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoriesList.map((category) => {
          const rawItems = stack[category.key] || [];
          const items = rawItems.filter(item => 
            item.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Skip rendering category if a search query is active and doesn't match any items
          if (searchQuery && items.length === 0 && !category.label.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null;
          }

          const IconComponent = category.icon;

          return (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className={`p-5 rounded-2xl bg-slate-950/30 border transition-all duration-300 flex flex-col justify-between group ${style.cardBg} ${style.glowStyle}`}
            >
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                      <span>{category.label}</span>
                    </h4>
                    <p className="text-[10px] text-slate-500 font-sans leading-tight pr-4">
                      {category.desc}
                    </p>
                  </div>

                  {/* Icon with interactive spring animation on hover */}
                  <motion.div 
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.4, ease: "easeInOut" }
                    }}
                    className={`p-2.5 rounded-xl ${style.iconBg} cursor-pointer shadow-sm`}
                  >
                    <IconComponent size={18} className="transition-transform" />
                  </motion.div>
                </div>

                {/* Badges / Tech list with hover animations */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -2,
                          transition: { type: "spring", stiffness: 400, damping: 15 }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border font-medium transition-all cursor-default ${style.badgeStyle}`}
                      >
                        {item}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-600 font-mono italic">No items listed</span>
                  )}
                </div>
              </div>

              {/* Decorative Subtle bottom accent bar */}
              <div className="w-full h-1 bg-slate-900/60 rounded-full mt-5 overflow-hidden">
                <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${style.accentGradient} transition-all duration-500 ease-out`} />
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
