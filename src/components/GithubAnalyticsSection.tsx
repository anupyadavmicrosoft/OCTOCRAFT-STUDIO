import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Star, 
  GitFork, 
  Flame, 
  Award, 
  GitPullRequest, 
  AlertCircle, 
  Calendar, 
  Code, 
  Terminal, 
  GitCommit, 
  BookOpen, 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip 
} from 'recharts';
import { UserProfile, GithubAnalytics } from '../types';

interface GithubAnalyticsSectionProps {
  profile: UserProfile;
}

// Generate realistic commit counts for a grid
const generateCommitData = () => {
  const weeks = 24; // ~6 months
  const days = 7;
  const data = [];
  const startDay = new Date();
  startDay.setDate(startDay.getDate() - weeks * days);

  for (let w = 0; w < weeks; w++) {
    const weekData = [];
    for (let d = 0; d < days; d++) {
      const date = new Date(startDay);
      date.setDate(date.getDate() + (w * days + d));
      // Higher commits during weekdays
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const baseCommits = isWeekend ? 1 : 4;
      const randomNoise = Math.floor(Math.random() * 8);
      const commits = Math.max(0, baseCommits + randomNoise - (Math.random() > 0.8 ? 5 : 0));
      weekData.push({
        date: date.toISOString().split('T')[0],
        commits
      });
    }
    data.push(weekData);
  }
  return data;
};

// Generate trend data for Recharts
const generateTrendData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, idx) => ({
    name: month,
    commits: Math.floor(150 + Math.sin(idx * 0.8) * 80 + Math.random() * 50),
    prs: Math.floor(10 + Math.cos(idx * 0.8) * 5 + Math.random() * 4),
  }));
};

export default function GithubAnalyticsSection({ profile }: GithubAnalyticsSectionProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');
  const [selectedCell, setSelectedCell] = useState<{ date: string; commits: number } | null>(null);

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
          gridColors: ['bg-slate-900', 'bg-purple-900/40', 'bg-purple-800/60', 'bg-purple-600/80', 'bg-cyan-400'],
          chartColor: '#c084fc',
          chartFill: 'rgba(168, 85, 247, 0.1)',
          trophyHeader: 'bg-gradient-to-r from-purple-900/20 to-cyan-900/10 border-purple-500/25',
          trophyGlow: 'hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]'
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
          gridColors: ['bg-slate-900', 'bg-emerald-900/40', 'bg-emerald-800/60', 'bg-emerald-600/80', 'bg-teal-400'],
          chartColor: '#34d399',
          chartFill: 'rgba(52, 211, 153, 0.1)',
          trophyHeader: 'bg-gradient-to-r from-emerald-900/20 to-teal-900/10 border-emerald-500/25',
          trophyGlow: 'hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.25)]'
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
          gridColors: ['bg-slate-900', 'bg-rose-900/40', 'bg-rose-800/60', 'bg-rose-600/80', 'bg-orange-400'],
          chartColor: '#fb7185',
          chartFill: 'rgba(244, 63, 94, 0.1)',
          trophyHeader: 'bg-gradient-to-r from-rose-900/20 to-orange-900/10 border-rose-500/25',
          trophyGlow: 'hover:border-rose-400 hover:shadow-[0_0_15px_rgba(244,63,94,0.25)]'
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
          gridColors: ['bg-slate-900', 'bg-slate-800', 'bg-slate-700', 'bg-slate-500', 'bg-white'],
          chartColor: '#e2e8f0',
          chartFill: 'rgba(255, 255, 255, 0.05)',
          trophyHeader: 'bg-white/5 border-white/20',
          trophyGlow: 'hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
        };
    }
  };

  const style = getThemeStyles();
  const analytics = profile.githubAnalytics || {
    username: profile.username || 'anupyadav',
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
  };

  const commitData = generateCommitData();
  const trendData = generateTrendData();

  // Helper to determine the color of commit squares in the contribution grid
  const getCommitColorClass = (commits: number) => {
    if (commits === 0) return style.gridColors[0];
    if (commits <= 2) return style.gridColors[1];
    if (commits <= 5) return style.gridColors[2];
    if (commits <= 8) return style.gridColors[3];
    return style.gridColors[4];
  };

  // Create links for export templates
  const markdownReadmeStatsUrl = `https://github-readme-stats.vercel.app/api?username=${analytics.username}&show_icons=true&theme=dark`;
  const markdownTopLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${analytics.username}&layout=compact&theme=dark`;
  const markdownStreakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${analytics.username}&theme=dark`;

  return (
    <div className="space-y-10" id="github-analytics-root">
      
      {/* Centered Elegant Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto border-b border-slate-900 pb-6">
        <div className="inline-flex items-center space-x-2.5">
          <Github size={22} className={style.accentText} />
          <h3 className="text-xl font-black text-white uppercase tracking-wider font-sans">
            GitHub Developer Metrics
          </h3>
          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-800/30">
            ANALYTICS ENGINE
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Dynamic repository insights, automated streak tracking, multilingual analysis, and premium open-source telemetry visualization.
        </p>

        {/* Mode Toggles */}
        <div className="flex justify-center pt-4">
          <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-900">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'visual' ? 'bg-slate-900 text-cyan-400 border border-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Interactive Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'code' ? 'bg-slate-900 text-cyan-400 border border-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Readme Markdown Code
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <div className="space-y-8 max-w-6xl mx-auto">
          
          {/* Section 1: Profile Trophies Row */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Trophy size={16} className={style.accentText} />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                Verified Profile Trophies
              </h4>
            </div>

            {/* Responsive grid of centered awards/trophies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
              {analytics.trophies.map((trophy, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`p-4 rounded-xl border flex items-center space-x-4 bg-slate-950/20 backdrop-blur-sm transition-all duration-300 ${style.trophyHeader} ${style.trophyGlow}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                      <Award size={20} className={style.accentText} />
                    </div>
                    {/* Rank Badge */}
                    <span className="absolute -top-1 -right-1 text-[8px] font-black px-1.5 py-0.5 rounded bg-yellow-500 text-slate-950 font-mono shadow">
                      {trophy.rank}
                    </span>
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{trophy.title}</h5>
                    <p className="text-[10px] text-slate-400 leading-tight line-clamp-2">{trophy.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Core Stats, Streak and Top Languages (Centered 3-Column Bento) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column A: GitHub Stats Card */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`p-5 rounded-2xl bg-slate-950/40 border flex flex-col justify-between group transition-all duration-300 ${style.cardBg} ${style.glowStyle}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className={style.accentText} />
                    <span className="text-xs font-bold text-slate-200 font-mono tracking-wider">GENERAL STATS</span>
                  </div>
                  {/* Icon with interactive spring animation on hover */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 15,
                    }}
                    className={`p-1.5 rounded-lg ${style.iconBg}`}
                  >
                    <BookOpen size={14} />
                  </motion.div>
                </div>

                <div className="space-y-3.5 pt-1.5">
                  {[
                    { label: 'Total Commits', value: analytics.totalCommits.toLocaleString(), icon: GitCommit },
                    { label: 'Pull Requests', value: analytics.totalPRs.toLocaleString(), icon: GitPullRequest },
                    { label: 'Open Issues', value: analytics.totalIssues.toLocaleString(), icon: AlertCircle },
                    { label: 'Contributed To', value: analytics.totalContribs.toLocaleString(), icon: Star },
                  ].map((stat, idx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <StatIcon size={13} className="text-slate-500" />
                          <span>{stat.label}</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-white">{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-900/40 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">STABILITY TARGET: A+</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-900/40 font-mono">STABLE API</span>
              </div>
            </motion.div>

            {/* Column B: GitHub Streak Stats Card */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`p-5 rounded-2xl bg-slate-950/40 border flex flex-col justify-between group transition-all duration-300 ${style.cardBg} ${style.glowStyle}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div className="flex items-center space-x-2">
                    <Flame size={16} className="text-orange-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-200 font-mono tracking-wider">CONTRIBUTION STREAK</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -15 }}
                    className={`p-1.5 rounded-lg ${style.iconBg}`}
                  >
                    <Calendar size={14} />
                  </motion.div>
                </div>

                <div className="space-y-3.5 pt-1.5">
                  {[
                    { label: 'Current Active Streak', value: `${analytics.currentStreak} Days`, desc: 'Consecutive active push cycles' },
                    { label: 'Max Historical Streak', value: `${analytics.longestStreak} Days`, desc: 'Peak consistency records' },
                    { label: 'Total Active Days', value: `${analytics.activeDays} / 365`, desc: 'Core availability ratio' },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-sans">{stat.label}</span>
                        <span className="text-xs font-black font-mono text-orange-400">{stat.value}</span>
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono leading-none">{stat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-900/40 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">CONSISTENCY LEVEL</span>
                <span className="text-[10px] text-cyan-400 font-mono">92% PERFORMANCE</span>
              </div>
            </motion.div>

            {/* Column C: Top Languages Visual Percentage Card */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`p-5 rounded-2xl bg-slate-950/40 border flex flex-col justify-between group transition-all duration-300 ${style.cardBg} ${style.glowStyle}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                  <div className="flex items-center space-x-2">
                    <Code size={16} className={style.accentText} />
                    <span className="text-xs font-bold text-slate-200 font-mono tracking-wider">TOP LANGUAGES</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className={`p-1.5 rounded-lg ${style.iconBg}`}
                  >
                    <Terminal size={14} />
                  </motion.div>
                </div>

                {/* Horizontal Progress Bars */}
                <div className="space-y-3 pt-1.5">
                  {analytics.topLanguages.map((lang, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                          <span className="text-slate-300 font-bold">{lang.name}</span>
                        </div>
                        <span className="text-slate-400">{lang.percentage}%</span>
                      </div>
                      {/* Bar Track */}
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-900/40 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">LANGUAGES DETECTED</span>
                <span className="text-[10px] text-purple-400 font-mono">MULTILINGUAL API</span>
              </div>
            </motion.div>

          </div>

          {/* Section 3: Contribution Grid (The realistic commit map) */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-950/40 border border-slate-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className={style.accentText} />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">
                  Interactive Contribution Telemetry Grid
                </h4>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                <span>Less</span>
                <div className="flex space-x-1">
                  {style.gridColors.map((color, idx) => (
                    <span key={idx} className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Grid display centered and wrapped cleanly */}
            <div className="overflow-x-auto pt-2">
              <div className="flex flex-col items-center min-w-[580px] py-1">
                <div className="flex space-x-[3px]">
                  {commitData.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col space-y-[3px]">
                      {week.map((day, dIdx) => (
                        <motion.div
                          key={dIdx}
                          onClick={() => setSelectedCell({ date: day.date, commits: day.commits })}
                          whileHover={{ scale: 1.3, zIndex: 10 }}
                          className={`w-2.5 h-2.5 rounded-sm cursor-pointer transition-colors ${getCommitColorClass(day.commits)}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro details panel for the selected commit grid square */}
            <div className="flex justify-center h-8">
              {selectedCell ? (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] font-mono text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 flex items-center space-x-2"
                >
                  <span className="text-cyan-400 font-bold">{selectedCell.commits} commits</span>
                  <span className="text-slate-500">|</span>
                  <span>{new Date(selectedCell.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </motion.div>
              ) : (
                <span className="text-[10px] text-slate-500 font-mono italic">Click any pixel grid square above to view dynamic telemetry stats</span>
              )}
            </div>
          </div>

          {/* Section 4: Activity Graph Trend (Recharts Line/Area Graph) */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-950/40 border border-slate-900">
            <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
              <TrendingUp size={16} className={style.accentText} />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">
                Contribution Frequency Activity Trend
              </h4>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={10} 
                    fontFamily="monospace"
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    fontFamily="monospace"
                    tickLine={false}
                    axisLine={false}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: '#090d16', 
                      borderColor: '#1e293b', 
                      borderRadius: '12px' 
                    }}
                    labelStyle={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold' }}
                    itemStyle={{ color: '#22d3ee', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="commits" 
                    stroke={style.chartColor} 
                    fill={style.chartFill} 
                    strokeWidth={2} 
                    name="Commits"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section 5: Repository Stats & Pinned Projects Grid */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
              <Terminal size={16} className={style.accentText} />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">
                Pinned Repositories &amp; Repository Stats
              </h4>
            </div>

            {/* 3-Column Centered Grid of Repository Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {analytics.pinnedRepos.map((repo, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className={`p-5 rounded-2xl bg-slate-950/40 border flex flex-col justify-between group transition-all duration-300 ${style.cardBg} ${style.glowStyle}`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <Terminal size={13} className="text-cyan-400 shrink-0" />
                        <h5 className="text-xs font-bold text-white font-mono truncate group-hover:text-cyan-400 transition-colors">
                          {repo.name}
                        </h5>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0 uppercase">PINNED</span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed min-h-[44px]">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3.5 mt-2 border-t border-slate-900/40">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0 bg-cyan-400" />
                        <span>{repo.language}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-0.5">
                          <Star size={11} className="text-yellow-500" />
                          <span>{(repo.stars / 1000).toFixed(1)}k</span>
                        </div>
                        <div className="flex items-center space-x-0.5">
                          <GitFork size={11} className="text-cyan-400" />
                          <span>{repo.forks}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Markdown / Exporter Code View */
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-xs font-bold text-slate-300 font-mono">MARKDOWN EMBED CODES</span>
              <span className="text-[10px] font-mono text-cyan-400">COPY DIRECTLY TO README.MD</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">1. GitHub Profile Readme Stats Card</span>
                <div className="relative">
                  <pre className="bg-slate-900 p-4 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed border border-slate-850">
                    {`[![${analytics.username}'s GitHub stats](${markdownReadmeStatsUrl})](https://github.com/${analytics.username})`}
                  </pre>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">2. Top Languages Card</span>
                <div className="relative">
                  <pre className="bg-slate-900 p-4 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed border border-slate-850">
                    {`[![Top Langs](${markdownTopLangsUrl})](https://github.com/${analytics.username})`}
                  </pre>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">3. GitHub Streak Stats</span>
                <div className="relative">
                  <pre className="bg-slate-900 p-4 rounded-xl text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed border border-slate-850">
                    {`[![GitHub Streak](${markdownStreakUrl})](https://github.com/${analytics.username})`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
