import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Clock, 
  Coffee, 
  ExternalLink, 
  Flame, 
  Globe, 
  Heart, 
  Info, 
  Link, 
  MessageSquare, 
  Play, 
  Quote, 
  Share2, 
  Sparkles, 
  ThumbsUp, 
  Tv, 
  Youtube, 
  TrendingUp, 
  Trophy, 
  ArrowRight,
  BookMarked,
  Twitter,
  Linkedin,
  Mail,
  Check,
  RotateCw,
  Search,
  Filter
} from 'lucide-react';
import { UserProfile } from '../types';

interface DeveloperCornerProps {
  profile: UserProfile;
}

// ----------------------------------------------------
// PRESET DEV QUOTES & JOKES DATA
// ----------------------------------------------------
const DEV_QUOTES = [
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "The most disastrous thing that you can do is learn your first programming language so well that you single-mindedly use it for everything.", author: "Jerry Coffin" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "There are only two hard things in Computer Science: cache invalidation and naming things.", author: "Phil Karlton" },
  { text: "Perfecting the craft of software requires writing code, deleting code, and repeating.", author: "Anonymous" }
];

const DEV_JOKES = [
  { setup: "Why do programmers wear glasses?", punchline: "Because they can't C#!" },
  { setup: "How many programmers does it take to change a light bulb?", punchline: "None, that's a hardware problem." },
  { setup: "What's a programmer's favorite place to hang out?", punchline: "The Foo Bar." },
  { setup: "Why did the programmer quit his job?", punchline: "Because he didn't get arrays (a raise)!" },
  { setup: "['hip', 'hip']", punchline: "(hip hip array!)" },
  { setup: "There are 10 types of people in the world...", punchline: "Those who understand binary, and those who don't." }
];

export default function DeveloperCorner({ profile }: DeveloperCornerProps) {
  // --- STATES ---
  const [activeTab, setActiveTab] = useState<'journey' | 'integrations' | 'sandbox' | 'socials'>('journey');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isSpinningQuote, setIsSpinningQuote] = useState(false);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  
  // Spotify Simulated Play State
  const [spotifyPlaying, setSpotifyPlaying] = useState(true);
  const [spotifyProgress, setSpotifyProgress] = useState(38); // percentage
  const [currentSong, setCurrentSong] = useState({
    title: "Resonance",
    artist: "Home",
    album: "Odyssey"
  });

  // Coffee Support Form State
  const [coffeeCount, setCoffeeCount] = useState(3);
  const [supporterName, setSupporterName] = useState('');
  const [supportMsg, setSupportMsg] = useState('');
  const [supportFeed, setSupportFeed] = useState([
    { name: 'Satoshi_N', count: 5, message: 'Amazing work on the WebAssembly proxy mesh sidecar! Insane speeds.', time: '2h ago' },
    { name: 'dev_grace', count: 3, message: 'The interactive preview is absolutely gorgeous. Keep crafting!', time: '1d ago' },
  ]);
  const [isSubmittingSupport, setIsSubmittingSupport] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState(false);

  // Search/Filter for certificates/blogs
  const [certQuery, setCertQuery] = useState('');
  const [blogFilter, setBlogFilter] = useState<'all' | 'rust' | 'webassembly' | 'ai'>('all');

  // Handle Spotify Progress Bar Tick (silky smooth, no lag)
  useEffect(() => {
    let interval: any;
    if (spotifyPlaying) {
      interval = setInterval(() => {
        setSpotifyProgress(p => {
          if (p >= 100) return 0;
          return p + 0.5;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [spotifyPlaying]);

  // Rotator actions
  const rotateQuote = () => {
    setIsSpinningQuote(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % DEV_QUOTES.length);
      setIsSpinningQuote(false);
    }, 600);
  };

  const rotateJoke = () => {
    setShowPunchline(false);
    setTimeout(() => {
      setJokeIndex((prev) => (prev + 1) % DEV_JOKES.length);
    }, 200);
  };

  // Support Submission
  const handleCoffeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supporterName.trim()) return;
    setIsSubmittingSupport(true);
    setTimeout(() => {
      setSupportFeed(prev => [
        {
          name: supporterName,
          count: coffeeCount,
          message: supportMsg || 'Fueled up the compiler with premium roast!',
          time: 'Just now'
        },
        ...prev
      ]);
      setIsSubmittingSupport(false);
      setSupportSuccess(true);
      setSupporterName('');
      setSupportMsg('');
      setTimeout(() => setSupportSuccess(false), 4000);
    }, 1000);
  };

  // Theme Styling Map
  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          accentText: 'text-purple-400',
          secondaryText: 'text-cyan-400',
          gradientBorder: 'border-purple-500/20 hover:border-cyan-500/40',
          cardBg: 'bg-purple-950/5 border-purple-500/10 hover:border-purple-500/30',
          btnBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]',
          btnSecBg: 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/30',
          accentGradient: 'from-purple-500 via-fuchsia-500 to-cyan-500',
          badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
          tabActive: 'border-purple-500 text-white bg-purple-500/5',
          tabInactive: 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5',
          glowingText: 'text-neon-cyber',
          glowRing: 'ring-purple-500/20',
          barColor: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]'
        };
      case 'emerald':
        return {
          accentText: 'text-emerald-400',
          secondaryText: 'text-teal-400',
          gradientBorder: 'border-emerald-500/20 hover:border-teal-500/40',
          cardBg: 'bg-emerald-950/5 border-emerald-500/10 hover:border-emerald-500/30',
          btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]',
          btnSecBg: 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/30',
          accentGradient: 'from-emerald-500 via-teal-500 to-green-600',
          badgeStyle: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          tabActive: 'border-emerald-500 text-white bg-emerald-500/5',
          tabInactive: 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5',
          glowingText: 'text-neon-emerald',
          glowRing: 'ring-emerald-500/20',
          barColor: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
        };
      case 'crimson':
        return {
          accentText: 'text-rose-400',
          secondaryText: 'text-orange-400',
          gradientBorder: 'border-rose-500/20 hover:border-orange-500/40',
          cardBg: 'bg-rose-950/5 border-rose-500/10 hover:border-rose-500/30',
          btnBg: 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]',
          btnSecBg: 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-rose-500/30',
          accentGradient: 'from-rose-500 via-orange-500 to-red-600',
          badgeStyle: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
          tabActive: 'border-rose-500 text-white bg-rose-500/5',
          tabInactive: 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5',
          glowingText: 'text-neon-crimson',
          glowRing: 'ring-rose-500/20',
          barColor: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
        };
      case 'glass-dark':
      default:
        return {
          accentText: 'text-slate-200',
          secondaryText: 'text-slate-300',
          gradientBorder: 'border-white/10 hover:border-white/25',
          cardBg: 'bg-white/5 border-white/10 hover:border-white/20',
          btnBg: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
          btnSecBg: 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-white/20',
          accentGradient: 'from-white to-slate-400',
          badgeStyle: 'bg-white/5 text-slate-300 border-white/10',
          tabActive: 'border-white/20 text-white bg-white/5',
          tabInactive: 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5',
          glowingText: 'text-neon-glass',
          glowRing: 'ring-white/10',
          barColor: 'bg-slate-400 shadow-[0_0_8px_rgba(255,255,255,0.3)]'
        };
    }
  };

  const style = getThemeStyles();

  // ----------------------------------------------------
  // DATA PRESETS
  // ----------------------------------------------------
  const educationData = [
    {
      degree: 'Master of Technology in Computer Science & Engineering',
      school: 'Indian Institute of Technology (IIT), Delhi',
      period: '2021 — 2023',
      grade: 'Cumulative GPA: 9.6 / 10',
      highlights: ['Specialized in Distributed Orchestration & eBPF Kernels', 'Outstanding Dissertation Award for WASM-Microservices Proxy Framework']
    },
    {
      degree: 'Bachelor of Technology in Computer Science',
      school: 'National Institute of Technology (NIT), GZP',
      period: '2017 — 2021',
      grade: 'Cumulative GPA: 9.2 / 10',
      highlights: ['Winner of NIT Technical Hackathon 2019', 'Core Developer Lead at Campus Open Source Club']
    }
  ];

  const certificatesData = [
    { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'The Linux Foundation', id: 'CKA-8402941', verifyUrl: 'https://linuxfoundation.org/verify', tags: ['Kubernetes', 'DevOps', 'Cloud'] },
    { name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', id: 'AWS-SAP-9941', verifyUrl: 'https://aws.amazon.com/verify', tags: ['AWS', 'Cloud Architecture'] },
    { name: 'Google Cloud Professional Cloud Architect', issuer: 'Google Cloud Platform', id: 'GCP-PCA-1205', verifyUrl: 'https://google.com/cloud/verify', tags: ['Google Cloud', 'Serverless'] },
    { name: 'Rust Advanced Systems Engineering', issuer: 'Rust Foundation Academic', id: 'RUST-ASE-4421', verifyUrl: 'https://rust-lang.org/verify', tags: ['Rust', 'Systems Prog'] }
  ];

  const achievementsData = [
    { title: 'Google Summer of Code (GSoC) Mentor', org: 'The CNCF Foundation', year: '2025', desc: 'Mentored 3 student projects optimizing WASM runtime compiling layers for Kubernetes container pipelines.' },
    { title: '1st Place Winner - Smart India National Hackathon', org: 'Govt. of India (MHRD)', year: '2020', desc: 'Designed a low-latency geo-distributed data syncing network over weak radio interfaces.' },
    { title: 'Top 1% Global Competitor', org: 'Codeforces & LeetCode', year: 'Ongoing', desc: 'Consistently placing in top brackets during weekly elite software optimization contests.' },
    { title: 'Open Source Core Contributor', org: 'eBPF-Go Core Library', year: '2024', desc: 'Committed core patch sets optimizing low-level event ring-buffer socket parsing metrics.' }
  ];

  const blogsData = [
    {
      title: 'Deep Dive: Compiling High-Performance Rust Systems into WebAssembly',
      platform: 'Dev.to',
      date: 'June 28, 2026',
      readTime: '8 min read',
      views: '4.2k views',
      category: 'rust',
      link: 'https://dev.to/anupyadav/rust-wasm-systems',
      likes: 312,
      comments: 24,
      excerpt: 'How to bypass standard filesystem constraints and leverage shared linear memory offsets to run full-stack Rust service sidecars inside sandboxed client-facing runtimes.'
    },
    {
      title: 'Architecting eBPF Kernel Telemetry inside Kubernetes Pod Meshes',
      platform: 'Medium',
      date: 'May 14, 2026',
      readTime: '12 min read',
      views: '6.8k views',
      category: 'webassembly',
      link: 'https://medium.com/@anupyadav/ebpf-telemetry-k8s',
      likes: 540,
      comments: 48,
      excerpt: 'Deploying direct kernel monitoring probes using eBPF socket maps. Capture sub-microsecond latency statistics between nested gRPC microservices with zero application code changes.'
    },
    {
      title: 'Orchestrating Multi-Agent State Pools using Google Gemini API',
      platform: 'OctoCraft Blogs',
      date: 'March 05, 2026',
      readTime: '9 min read',
      views: '3.1k views',
      category: 'ai',
      link: '#',
      likes: 218,
      comments: 15,
      excerpt: 'Utilizing structured output paradigms and function arrays inside Node.js workers to organize autonomous agents into high-efficiency software debugging teams.'
    }
  ];

  // Competitive Programming stats
  const leetCodeStats = { solved: 742, total: 2400, rank: 'Top 2.1%', activeStreak: 45, maxStreak: 120, rating: 2120 };
  const codeforcesStats = { rank: 'Candidate Master', currentRating: 1982, maxRating: 2045, badge: 'candidate_master', solvedContests: 94 };
  const hackerRankStats = { badges: ['Problem Solving (Gold)', 'Python (Gold)', 'C++ (Gold)'], globalRank: 'Top 0.5%', points: 2840 };

  // Filtered lists
  const filteredCerts = certificatesData.filter(cert => 
    cert.name.toLowerCase().includes(certQuery.toLowerCase()) || 
    cert.issuer.toLowerCase().includes(certQuery.toLowerCase()) ||
    cert.tags.some(t => t.toLowerCase().includes(certQuery.toLowerCase()))
  );

  const filteredBlogs = blogsData.filter(blog => {
    if (blogFilter === 'all') return true;
    return blog.category === blogFilter;
  });

  return (
    <div id="developer-corner-root" className="space-y-10">

      {/* ----------------------------------------------------
          NAV TABS (PORTALS)
          ---------------------------------------------------- */}
      <div className="flex border-b border-slate-900 pb-px overflow-x-auto no-scrollbar gap-1">
        {[
          { id: 'journey', label: 'Journey & Education', icon: BookOpen },
          { id: 'integrations', label: 'Real-Time Integrations', icon: Flame },
          { id: 'sandbox', label: 'Tech Blogs & Media', icon: BookMarked },
          { id: 'socials', label: 'Developer Zen & Coffee', icon: Coffee },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 text-xs font-mono tracking-wide uppercase transition-all duration-300 shrink-0 ${
                isActive ? style.tabActive : style.tabInactive
              }`}
            >
              <TabIcon size={14} className={isActive ? style.accentText : 'text-slate-500'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >

          {/* ====================================================
              1. JOURNEY & ACADEMIC HUB (Education & Achievements)
              ==================================================== */}
          {activeTab === 'journey' && (
            <div className="space-y-8">
              
              {/* Education Grid */}
              <div className="space-y-5">
                <div className="flex items-center space-x-2.5">
                  <BookOpen size={18} className={style.accentText} />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-sans">Academic Pillars</h3>
                  <span className="text-[10px] font-mono text-slate-500">— EDUCATION</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {educationData.map((edu, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 hover:border-slate-800 transition-all group relative overflow-hidden"
                    >
                      {/* Decorative soft glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-mono text-slate-500 bg-slate-900 border border-slate-800/80 px-2.5 py-1 rounded">
                          {edu.period}
                        </span>
                        <span className={`text-[10px] font-mono font-bold ${style.secondaryText}`}>
                          {edu.grade}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-slate-400 font-sans font-medium mb-3">
                        {edu.school}
                      </p>

                      <ul className="space-y-1.5 border-t border-slate-900/60 pt-3">
                        {edu.highlights.map((hl, hlIdx) => (
                          <li key={hlIdx} className="text-[11px] text-slate-400 flex items-start space-x-2">
                            <ArrowRight size={10} className={`${style.accentText} mt-1 shrink-0`} />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="space-y-5">
                <div className="flex items-center space-x-2.5">
                  <Award size={18} className={style.secondaryText} />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-sans">Honors &amp; Pinned Achievements</h3>
                  <span className="text-[10px] font-mono text-slate-500">— RECOGNITIONS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievementsData.map((ach, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-xl bg-slate-950/40 border border-slate-850/60 hover:bg-slate-950/70 transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Trophy size={14} className={`${style.accentText} shrink-0 animate-pulse`} />
                          <h4 className="text-xs font-bold text-white tracking-tight">{ach.title}</h4>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                          {ach.year}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-semibold">
                        {ach.org}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {ach.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ====================================================
              2. REAL-TIME INTEGRATIONS NODE (Spotify, Competitive Programming, Youtube)
              ==================================================== */}
          {activeTab === 'integrations' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* Spotify "Now Playing" Widget (4 Cols on medium) */}
              <div className="md:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-slate-950/40 border border-slate-850/80 relative overflow-hidden group">
                
                {/* Vinyl Background Graphic */}
                <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-slate-900/40 rounded-full border border-slate-800 flex items-center justify-center opacity-40 group-hover:rotate-180 transition-transform duration-1000">
                  <div className="w-24 h-24 rounded-full border border-slate-700/50 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center border border-slate-600">
                      <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-2 h-2">
                        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping" />
                        <div className="absolute inset-0 bg-emerald-500 rounded-full" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">SPOTIFY SYNC</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">LIVE FEED</span>
                  </div>

                  <div className="flex items-center space-x-3.5 pt-1.5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-purple-800/80 via-emerald-800/80 to-slate-950 border border-slate-800 flex items-center justify-center relative shadow-lg overflow-hidden shrink-0">
                      {spotifyPlaying ? (
                        /* Sound Bars */
                        <div className="flex items-end space-x-0.5 h-6">
                          <div className="w-0.5 bg-emerald-400 animate-[pulse-soft_0.6s_ease-in-out_infinite_alternate]" style={{ height: '70%' }} />
                          <div className="w-0.5 bg-emerald-400 animate-[pulse-soft_0.8s_ease-in-out_infinite_alternate]" style={{ height: '100%', animationDelay: '-0.3s' }} />
                          <div className="w-0.5 bg-emerald-400 animate-[pulse-soft_0.5s_ease-in-out_infinite_alternate]" style={{ height: '40%', animationDelay: '-0.1s' }} />
                          <div className="w-0.5 bg-emerald-400 animate-[pulse-soft_0.7s_ease-in-out_infinite_alternate]" style={{ height: '85%', animationDelay: '-0.5s' }} />
                        </div>
                      ) : (
                        <div className="w-0.5 bg-slate-600 h-5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                        {currentSong.title}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400 truncate">
                        {currentSong.artist} • <span className="text-slate-500">{currentSong.album}</span>
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="space-y-1.5">
                    <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 transition-all duration-1000 shadow-[0_0_8px_rgba(52,211,153,0.5)]" 
                        style={{ width: `${spotifyProgress}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-slate-500">
                      <span>{Math.floor((spotifyProgress * 180) / 100 / 60)}:{(Math.floor((spotifyProgress * 180) / 100) % 60).toString().padStart(2, '0')}</span>
                      <span>3:00</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-900/60 relative z-10">
                  <span className="text-[9px] font-mono text-slate-500">Device: Mac Pro</span>
                  <button 
                    onClick={() => setSpotifyPlaying(!spotifyPlaying)}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-850 text-[10px] font-mono text-slate-300 border border-slate-800 hover:text-emerald-400 transition-all"
                  >
                    <Play size={8} className={spotifyPlaying ? 'rotate-90 fill-emerald-400' : ''} />
                    <span>{spotifyPlaying ? 'Pause Sync' : 'Resume Play'}</span>
                  </button>
                </div>

              </div>

              {/* YouTube Node Widget */}
              <div className="md:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-slate-950/40 border border-slate-850/80 group">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Youtube size={16} className="text-red-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">LATEST YOUTUBE EXPOSE</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">NODE FEED</span>
                  </div>

                  <div className="relative aspect-video rounded-xl bg-slate-900/60 border border-slate-850 overflow-hidden flex items-center justify-center cursor-pointer group/vid">
                    {/* Simulated Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-0 opacity-85" />
                    <div className="absolute inset-0 bg-radial from-transparent to-black/60" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)]" />

                    <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover/vid:scale-110 group-hover/vid:bg-red-600 group-hover/vid:text-white transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                        <Play size={16} className="fill-current translate-x-0.5" />
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 bg-black/70 px-2 py-0.5 rounded border border-slate-800">
                        12:45 MINS
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                      <h5 className="text-xs font-bold text-white line-clamp-1 group-hover/vid:text-red-400 transition-colors">
                        Architecting sub-millisecond route meshes in Rust &amp; WASM
                      </h5>
                      <p className="text-[9px] font-mono text-slate-400">
                        2.4k views • 3 weeks ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-900/60">
                  <span className="text-[9px] font-mono text-slate-500">Channel: Anup Codes</span>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <span>Visit Channel</span>
                    <ExternalLink size={10} />
                  </a>
                </div>

              </div>

              {/* Competitive Programming Grid (12 Cols) */}
              <div className="md:col-span-12 space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} className={style.accentText} />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Algorithms &amp; Competitive Programming</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  
                  {/* LeetCode Card */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 hover:border-orange-500/20 transition-all flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <span className="text-xs font-bold text-orange-400 font-sans">LeetCode Node</span>
                        <span className="text-[9px] font-mono text-slate-500">RANK: {leetCodeStats.rank}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="block text-2xl font-black font-mono text-white">
                            {leetCodeStats.solved}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase">PROBLEMS SOLVED</span>
                        </div>

                        {/* Circular Indicator SVG */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="20" className="stroke-slate-800" strokeWidth="3.5" fill="transparent" />
                            <circle cx="24" cy="24" r="20" className="stroke-orange-400" strokeWidth="3.5" fill="transparent" strokeDasharray={`${2 * Math.PI * 20}`} strokeDashoffset={`${2 * Math.PI * 20 * (1 - leetCodeStats.solved / leetCodeStats.total)}`} />
                          </svg>
                          <span className="absolute text-[8px] font-mono text-orange-400 font-bold">31%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-900/60 p-2 rounded-lg border border-slate-850">
                        <div>
                          <span className="text-slate-500 block">RATING</span>
                          <span className="text-slate-300 font-bold">{leetCodeStats.rating}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">STREAK</span>
                          <span className="text-emerald-400 font-bold">● {leetCodeStats.activeStreak} Days</span>
                        </div>
                      </div>
                    </div>

                    <a 
                      href="https://leetcode.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="mt-4 pt-3.5 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-500 hover:text-white transition-colors"
                    >
                      <span>LeetCode Profile</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>

                  {/* Codeforces Card */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 hover:border-red-500/20 transition-all flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <span className="text-xs font-bold text-red-400 font-sans">Codeforces Node</span>
                        <span className="text-[9px] font-mono text-red-400 bg-red-950/20 border border-red-900/30 px-2 py-0.5 rounded">
                          {codeforcesStats.rank}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="block text-2xl font-black font-mono text-white">
                            {codeforcesStats.currentRating}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase">CURRENT RATING</span>
                        </div>

                        <div className="space-y-0.5 text-right">
                          <span className="block text-base font-bold font-mono text-slate-400">
                            {codeforcesStats.maxRating}
                          </span>
                          <span className="block text-[9px] font-mono text-slate-500 uppercase">MAX RATING</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                        <span className="text-slate-500">SOLVED CONTESTS</span>
                        <span className="text-slate-300 font-bold">{codeforcesStats.solvedContests}</span>
                      </div>
                    </div>

                    <a 
                      href="https://codeforces.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="mt-4 pt-3.5 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-500 hover:text-white transition-colors"
                    >
                      <span>Codeforces Profile</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>

                  {/* HackerRank Card */}
                  <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <span className="text-xs font-bold text-emerald-400 font-sans">HackerRank Node</span>
                        <span className="text-[9px] font-mono text-slate-500">GLOBAL: {hackerRankStats.globalRank}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">EARNED GOLD STARS</span>
                        <div className="flex flex-wrap gap-1.5">
                          {hackerRankStats.badges.map((b, bIdx) => (
                            <span 
                              key={bIdx}
                              className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-900 text-slate-300 border border-emerald-950/50"
                            >
                              ★ {b.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                        <span className="text-slate-500">TOTAL POINTS</span>
                        <span className="text-slate-300 font-bold">{hackerRankStats.points}</span>
                      </div>
                    </div>

                    <a 
                      href="https://hackerrank.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="mt-4 pt-3.5 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-500 hover:text-white transition-colors"
                    >
                      <span>HackerRank Profile</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ====================================================
              3. TECH BLOGS & MEDIA (Dev.to & Medium Articles)
              ==================================================== */}
          {activeTab === 'sandbox' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2.5">
                  <BookMarked size={18} className={style.accentText} />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-sans">Recent Publications</h3>
                  <span className="text-[10px] font-mono text-slate-500">— RECENT BLOGS</span>
                </div>

                {/* Filter controls */}
                <div className="flex flex-wrap gap-1 bg-slate-950/80 border border-slate-850 p-1 rounded-xl">
                  {[
                    { id: 'all', label: 'All Articles' },
                    { id: 'rust', label: 'Rust' },
                    { id: 'webassembly', label: 'eBPF / WASM' },
                    { id: 'ai', label: 'Artificial Intel.' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setBlogFilter(btn.id as any)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all ${
                        blogFilter === btn.id 
                          ? 'bg-slate-900 text-cyan-400 border border-slate-800' 
                          : 'text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Certificates / Credential search */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  placeholder="Search technical credentials, certifications, or competencies..."
                  className="w-full bg-slate-950/60 border border-slate-850 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              {/* Blogs Column */}
              <div className="grid grid-cols-1 gap-4">
                {filteredBlogs.map((blog, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 hover:border-slate-800 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${
                            blog.platform === 'Dev.to' ? 'bg-indigo-950/40 text-indigo-300 border-indigo-900/40' :
                            blog.platform === 'Medium' ? 'bg-cyan-950/40 text-cyan-300 border-cyan-900/40' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}>
                            {blog.platform}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">{blog.date}</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500">{blog.readTime}</span>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 leading-snug">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-900/60 pt-3.5 mt-2">
                      <div className="flex items-center space-x-4 text-[10px] font-mono text-slate-500">
                        <span className="flex items-center space-x-1">
                          <ThumbsUp size={11} className="text-slate-400" />
                          <span>{blog.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare size={11} className="text-slate-400" />
                          <span>{blog.comments}</span>
                        </span>
                        <span>{blog.views}</span>
                      </div>

                      <a 
                        href={blog.link}
                        target="_blank" 
                        rel="noreferrer"
                        className={`text-[10px] font-mono flex items-center space-x-1 ${style.accentText} hover:underline`}
                      >
                        <span>Read Article</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Certificates Row */}
              {filteredCerts.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <Award size={16} className={style.secondaryText} />
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Verified Professional Credentials</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCerts.map((cert, cIdx) => (
                      <div 
                        key={cIdx}
                        className="p-4 rounded-xl bg-slate-950/30 border border-slate-850/60 hover:bg-slate-950/60 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] font-mono text-slate-500">{cert.issuer}</span>
                            <span className="text-[8px] font-mono text-slate-600">ID: {cert.id}</span>
                          </div>
                          <h5 className="text-xs font-bold text-white mb-2 leading-tight">
                            {cert.name}
                          </h5>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-900/60 pt-2.5 mt-2">
                          <div className="flex flex-wrap gap-1">
                            {cert.tags.slice(0, 2).map((t, tIdx) => (
                              <span key={tIdx} className="text-[8px] font-mono text-slate-500 bg-slate-900 px-1 py-0.5 rounded border border-slate-850">
                                {t}
                              </span>
                            ))}
                          </div>

                          <a 
                            href={cert.verifyUrl}
                            target="_blank" 
                            rel="noreferrer"
                            className="text-[9px] font-mono text-cyan-400 hover:text-white flex items-center space-x-0.5 transition-colors"
                          >
                            <span>Verify</span>
                            <ExternalLink size={8} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ====================================================
              4. DEVELOPER ZEN & COFFEE (Support, Quote, Jokes)
              ==================================================== */}
          {activeTab === 'socials' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* Dev Quote & Jokes Widget (6 Cols) */}
              <div className="md:col-span-6 space-y-6">
                
                {/* Random Dev Quote */}
                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 flex flex-col justify-between h-[180px] relative overflow-hidden group">
                  <div className="absolute top-3 right-3 opacity-5 text-white pointer-events-none">
                    <Quote size={80} />
                  </div>

                  <div className="space-y-2.5 relative z-10">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">RANDOM DEV QUOTE</span>
                    <p className={`text-xs text-slate-200 leading-relaxed italic ${isSpinningQuote ? 'opacity-30 translate-y-1' : ''} transition-all duration-300`}>
                      "{DEV_QUOTES[quoteIndex].text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-900/60 relative z-10">
                    <span className={`text-[10px] font-mono font-semibold ${style.accentText}`}>
                      — {DEV_QUOTES[quoteIndex].author}
                    </span>
                    
                    <button 
                      onClick={rotateQuote}
                      disabled={isSpinningQuote}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-all duration-300 disabled:opacity-50"
                      title="Next Quote"
                    >
                      <RotateCw size={12} className={isSpinningQuote ? 'animate-spin' : ''} />
                    </button>
                  </div>
                </div>

                {/* Interactive Dev Joke */}
                <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-850 flex flex-col justify-between h-[180px] relative overflow-hidden">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">INTERACTIVE CHUCKLE SEC</span>
                    <p className="text-xs text-slate-200 font-sans leading-normal font-medium">
                      {DEV_JOKES[jokeIndex].setup}
                    </p>

                    <AnimatePresence mode="wait">
                      {showPunchline ? (
                        <motion.p 
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`text-xs font-mono font-bold ${style.secondaryText}`}
                        >
                          {DEV_JOKES[jokeIndex].punchline}
                        </motion.p>
                      ) : (
                        <button
                          onClick={() => setShowPunchline(true)}
                          className="px-2.5 py-1 text-[10px] font-mono bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded border border-slate-800 transition-colors"
                        >
                          Reveal Punchline...
                        </button>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-end pt-3 border-t border-slate-900/60">
                    <button
                      onClick={rotateJoke}
                      className="text-[10px] font-mono text-slate-500 hover:text-white flex items-center space-x-1.5 transition-colors"
                    >
                      <span>Next Joke</span>
                      <ArrowRight size={10} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Buy Me A Coffee portal (6 Cols) */}
              <div className="md:col-span-6 p-5 rounded-2xl bg-slate-950/40 border border-slate-850 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Coffee size={16} className={`${style.accentText} animate-pulse`} />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">FUEL THE CODE ENGINE</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">COFFEE HUB</span>
                  </div>

                  <form onSubmit={handleCoffeeSubmit} className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-slate-850">
                      <span className="text-xs text-slate-400 font-sans font-medium pl-1">Buy Anup</span>
                      
                      <div className="flex items-center space-x-1">
                        {[1, 3, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setCoffeeCount(num)}
                            className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                              coffeeCount === num 
                                ? style.btnBg
                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                        <span className="text-xs font-mono text-slate-500 px-1">☕</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={supporterName}
                        onChange={(e) => setSupporterName(e.target.value)}
                        placeholder="Your GitHub / Name"
                        className="w-full bg-slate-950/60 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      <input
                        type="text"
                        value={supportMsg}
                        onChange={(e) => setSupportMsg(e.target.value)}
                        placeholder="Say something nice..."
                        className="w-full bg-slate-950/60 border border-slate-850 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingSupport}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1.5 ${style.btnBg}`}
                    >
                      {isSubmittingSupport ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Coffee size={13} />
                          <span>Support with ${coffeeCount * 5} (Coffee)</span>
                        </>
                      )}
                    </button>
                  </form>

                  <AnimatePresence>
                    {supportSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 text-[10px] font-mono flex items-center space-x-1.5"
                      >
                        <Check size={12} />
                        <span>Support processed. Transaction hash simulated successfully!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Live simulated contribution feed */}
                <div className="mt-4 pt-4 border-t border-slate-900/60 space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">RECENT SUPPORTERS FEED</span>
                  <div className="space-y-2 max-h-[85px] overflow-y-auto no-scrollbar">
                    {supportFeed.map((feed, fIdx) => (
                      <div key={fIdx} className="text-[10px] bg-slate-900/30 p-2 rounded-lg border border-slate-850/60 flex justify-between items-start">
                        <div className="min-w-0 flex-1 pr-2">
                          <span className="font-bold text-slate-300 font-mono">@{feed.name}</span>
                          <span className="text-slate-500 mx-1">•</span>
                          <span className="text-slate-400 line-clamp-1">{feed.message}</span>
                        </div>
                        <span className="text-emerald-400 font-mono text-[9px] shrink-0 font-bold">
                          ☕ x{feed.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
