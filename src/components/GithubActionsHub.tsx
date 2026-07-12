import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Terminal as TermIcon, 
  Copy, 
  Check, 
  RefreshCw, 
  Github, 
  FileCode, 
  CheckCircle2, 
  Settings, 
  Eye, 
  Info, 
  AlertCircle, 
  Database, 
  ArrowRight, 
  Cpu, 
  BookOpen, 
  Flame, 
  Trophy, 
  Calendar, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { UserProfile } from '../types';

interface GithubActionsHubProps {
  profile: UserProfile;
}

// YAML raw codes
const BASE_SNAKE_YAML = (username: string) => `name: Generate Snake Contribution Grid

on:
  schedule:
    # Run once a day at midnight (UTC)
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches:
    - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      - name: Generate github-contribution-grid-snake.svg
        uses: Platane/snk@v3
        with:
          github_user_name: ${username}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
          
      - name: Push github-contribution-grid-snake.svg to Output Branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: github-pages-assets
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;

const BASE_BLOGS_YAML = (username: string, mediumUser: string, ytChannel: string) => `name: Sync Blog Posts, YouTube, and Repositories

on:
  schedule:
    - cron: '0 */12 * * *'
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  update-readme:
    name: Auto-update profile README lists
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Fetch Medium Blog Posts
        uses: gautamkrishnar/blog-post-workflow@v1
        with:
          comment_tag_name: "MEDIUM-BLOGS"
          feed_list: "https://medium.com/feed/@${mediumUser}"
          max_post_count: 5
          template: '<li><a href="$url" target="_blank"><strong>$title</strong></a> — <em>$published</em></li>'

      - name: Fetch YouTube Uploads
        uses: gautamkrishnar/blog-post-workflow@v1
        with:
          comment_tag_name: "YOUTUBE-VIDEOS"
          feed_list: "https://www.youtube.com/feeds/videos.xml?channel_id=${ytChannel}"
          max_post_count: 5
          template: '<li>🎥 <a href="$url" target="_blank"><strong>$title</strong></a></li>'

      - name: Fetch and Update Recent GitHub Repositories
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const username = "${username}";
            try {
              const response = await github.rest.repos.listForUser({
                username,
                sort: 'updated',
                per_page: 5,
                type: 'owner'
              });
              const repos = response.data.filter(r => !r.fork && r.name !== username);
              let content = '<ul>\\n';
              for (const repo of repos) {
                const lang = repo.language ? \` [\${repo.language}]\` : '';
                const desc = repo.description ? \` - *\${repo.description}*\` : '';
                content += \`  <li><a href="\${repo.html_url}"><strong>\${repo.name}</strong></a>\${lang} (★ \${repo.stargazers_count})\${desc}</li>\\n\`;
              }
              content += '</ul>';
              let readme = fs.readFileSync('README.md', 'utf8');
              const regex = /(<!-- REPOSITORIES:START -->)[\\s\\S]*?(<!-- REPOSITORIES:END -->)/g;
              if (regex.test(readme)) {
                readme = readme.replace(regex, \`$1\\n\${content}\\n$2\`);
                fs.writeFileSync('README.md', readme);
              }
            } catch (err) { console.error(err); }

      - name: Commit and Push Changes
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git add README.md
          git diff --quiet && git diff --staged --quiet || git commit -m "chore: auto-update RSS feeds and repository stats [skip ci]"
          git push origin main
`;

const BASE_METRICS_YAML = (username: string) => `name: Sync GitHub Profile Metrics and WakaTime

on:
  schedule:
    - cron: "0 0 * * 0"
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  github-metrics:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Generate Profile Metrics SVG
        uses: lowlighter/metrics@latest
        with:
          token: \${{ secrets.METRICS_TOKEN }}
          user: ${username}
          template: classic
          base: header, activity, community, repositories, metadata
          config_timezone: America/New_York
          
          plugin_languages: yes
          plugin_languages_sections: most-used
          plugin_languages_details: bytes-size, percentage
          
          plugin_wakatime: yes
          plugin_wakatime_token: \${{ secrets.WAKATIME_API_KEY }}
          plugin_wakatime_days: 7
          plugin_wakatime_sections: time, projects, languages, editors, os
          plugin_wakatime_limit: 5
          filename: github-metrics-profile.svg
          
      - name: Update WakaTime Weekly Leaderboard in README
        uses: athul/waka-readme@master
        with:
          WAKATIME_API_KEY: \${{ secrets.WAKATIME_API_KEY }}
          SHOW_OS: "true"
          SHOW_PROJECTS: "true"
          SHOW_EDITORS: "true"
          SHOW_TIME: "true"
          SHOW_TOTAL: "true"
          SECTION_NAME: "wakatime"
          COMMIT_MESSAGE: "chore: update wakatime coder metrics leaderboard"
          TARGET_BRANCH: "main"
`;

export default function GithubActionsHub({ profile }: GithubActionsHubProps) {
  // Config state
  const [username, setUsername] = useState(profile.username || 'anupyadav');
  const [mediumUser, setMediumUser] = useState('anupyadav');
  const [ytChannel, setYtChannel] = useState('UCYourChannelID');

  // Tab controller
  const [activeWorkflow, setActiveWorkflow] = useState<'snake' | 'blogs' | 'metrics'>('snake');
  const [isCopied, setIsCopied] = useState(false);

  // Simulated Runner console state
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Snake grid simulation animation
  const [snakePos, setSnakePos] = useState({ x: 0, y: 0 });
  const [snakeBody, setSnakeBody] = useState<{ x: number, y: number }[]>([
    { x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }
  ]);
  const [snakeDirection, setSnakeDirection] = useState<'R' | 'L' | 'D' | 'U'>('R');
  const [food, setFood] = useState({ x: 8, y: 3 });
  const [contributions, setContributions] = useState<number[][]>([]);

  // Initialize custom random-weight contributions grid (7 rows x 28 cols for viewport sizing)
  useEffect(() => {
    const grid: number[][] = [];
    for (let r = 0; r < 7; r++) {
      const row: number[] = [];
      for (let c = 0; c < 28; c++) {
        // Random level of greens (0: slate, 1: light, 2: medium, 3: emerald, 4: intense neon green)
        const val = Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 4);
        row.push(val);
      }
      grid.push(row);
    }
    setContributions(grid);
  }, []);

  // Snake Game Loop (Simulated Canvas in Grid)
  useEffect(() => {
    if (contributions.length === 0) return;

    const interval = setInterval(() => {
      // Direct the snake toward food
      setSnakeBody((prevBody) => {
        const head = prevBody[0];
        let nextX = head.x;
        let nextY = head.y;

        if (head.x < food.x) nextX++;
        else if (head.x > food.x) nextX--;
        else if (head.y < food.y) nextY++;
        else if (head.y > food.y) nextY--;

        // Keep inside bounds
        nextX = (nextX + 28) % 28;
        nextY = (nextY + 7) % 7;

        const newBody = [{ x: nextX, y: nextY }, ...prevBody];

        if (nextX === food.x && nextY === food.y) {
          // Snake eats food! Update grid contribution on hit to intense level
          const newGrid = [...contributions];
          newGrid[nextY][nextX] = 4;
          setContributions(newGrid);

          // Place new food on non-empty space
          setFood({
            x: Math.floor(Math.random() * 28),
            y: Math.floor(Math.random() * 7)
          });
        } else {
          newBody.pop(); // remove tail
        }
        return newBody;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [contributions, food]);

  // Handle YAML copying
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Run Simulated runner log sequencer
  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    setLogs([]);

    const logSequence = [
      { delay: 400, text: "🤖 Initializing OctoCraft automated workflow engine..." },
      { delay: 800, text: "🐳 Spawning container virtual machine: [ubuntu-latest] on host cluster..." },
      { delay: 1300, text: "🔑 Authenticating cryptographic repository secrets..." },
      { delay: 1700, text: "   -> SUCCESS: Decrypted GITHUB_TOKEN" },
      { delay: 2000, text: "   -> SUCCESS: Decrypted METRICS_TOKEN (Personal Access Token)" },
      { delay: 2400, text: "   -> SUCCESS: Decrypted WAKATIME_API_KEY (Time-tracking link)" },
      { delay: 3000, text: "🔄 Fetching repository contents from branch: 'main'..." },
      { delay: 3500, text: "🎯 Executing Step: [Check RSS feeds and parse XML payloads]..." },
      { delay: 4000, text: `   -> GET: https://medium.com/feed/@${mediumUser}` },
      { delay: 4500, text: "      -> PARSED: 'Compiling High-Performance Rust Systems into WebAssembly'" },
      { delay: 4800, text: "      -> PARSED: 'Architecting eBPF Kernel Telemetry inside Kubernetes Pod Meshes'" },
      { delay: 5200, text: `   -> GET: https://www.youtube.com/feeds/videos.xml?channel_id=${ytChannel}` },
      { delay: 5600, text: "      -> PARSED: 'Vlog: Sub-millisecond router meshes in Rust & WASM'" },
      { delay: 6200, text: `🎯 Executing Step: [Querying public repositories for user '${username}']...` },
      { delay: 6600, text: `   -> Retrieved 5 active repos (Primary: 'novamesh-proxy', 'aether-ai-orchestrator')` },
      { delay: 7200, text: "🎯 Executing Step: [Generating Platane Git Contribution Snake Game SVG]..." },
      { delay: 7600, text: "   -> Processing daily contribution pixel density maps..." },
      { delay: 8000, text: "   -> Snake solver calculated path successfully in 312ms." },
      { delay: 8400, text: "   -> SAVED output asset: 'dist/github-contribution-grid-snake-dark.svg'" },
      { delay: 8900, text: "🎯 Executing Step: [Querying WakaTime metrics endpoint]..." },
      { delay: 9300, text: "   -> Decoded logged activity: 48.5 hours in past 7 days." },
      { delay: 9600, text: "   -> Language profile updated: TypeScript (48%), Go (22%), Rust (15%)" },
      { delay: 10200, text: "📝 Inlining parsed markdown content inside profile README.md..." },
      { delay: 10800, text: "🚀 Committing build changes: 'chore: auto-update RSS feeds and repository stats [skip ci]'" },
      { delay: 11400, text: "   -> Pushing commit directly to origin/main with bypass hooks..." },
      { delay: 12000, text: "✅ WORKFLOW SUCCESSFULLY EXECUTED! README is completely up to date." }
    ];

    logSequence.forEach((item, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, item.text]);
        setProgress(Math.round(((index + 1) / logSequence.length) * 100));
        
        // Auto-scroll
        if (consoleEndRef.current) {
          consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        if (index === logSequence.length - 1) {
          setIsRunning(false);
        }
      }, item.delay);
    });
  };

  // Theme Styling Map
  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'cyber':
        return {
          accentText: 'text-purple-400',
          secondaryText: 'text-cyan-400',
          borderStyle: 'border-purple-500/20 hover:border-cyan-500/40',
          btnBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]',
          badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
          progressColor: 'bg-purple-500'
        };
      case 'emerald':
        return {
          accentText: 'text-emerald-400',
          secondaryText: 'text-teal-400',
          borderStyle: 'border-emerald-500/20 hover:border-teal-500/40',
          btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(10,185,129,0.4)]',
          badgeStyle: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          progressColor: 'bg-emerald-500'
        };
      case 'crimson':
        return {
          accentText: 'text-rose-400',
          secondaryText: 'text-orange-400',
          borderStyle: 'border-rose-500/20 hover:border-orange-500/40',
          btnBg: 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]',
          badgeStyle: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
          progressColor: 'bg-rose-500'
        };
      default:
        return {
          accentText: 'text-slate-200',
          secondaryText: 'text-slate-400',
          borderStyle: 'border-white/10 hover:border-white/20',
          btnBg: 'bg-white/10 hover:bg-white/25 text-white border border-white/20',
          badgeStyle: 'bg-white/5 text-slate-300 border-white/10',
          progressColor: 'bg-slate-400'
        };
    }
  };

  const style = getThemeStyles();

  // Pick current raw Yaml
  const getCurrentYaml = () => {
    switch (activeWorkflow) {
      case 'blogs':
        return BASE_BLOGS_YAML(username, mediumUser, ytChannel);
      case 'metrics':
        return BASE_METRICS_YAML(username);
      case 'snake':
      default:
        return BASE_SNAKE_YAML(username);
    }
  };

  return (
    <div id="github-actions-hub-root" className="space-y-8">
      
      {/* Dynamic parameters bar */}
      <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4">
        <div className="flex items-center space-x-2.5 border-b border-slate-900 pb-3">
          <Settings size={16} className={style.accentText} />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Configure Auto-Update Parameters</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">GitHub Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Medium ID (Blogs)</label>
            <input
              type="text"
              value={mediumUser}
              onChange={(e) => setMediumUser(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">YouTube Channel ID</label>
            <input
              type="text"
              value={ytChannel}
              onChange={(e) => setYtChannel(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Primary Action Tabs & Config panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Workflow Selection and code block (Lg: 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-900 gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'snake', label: '🐍 Contribution Snake' },
              { id: 'blogs', label: '🔄 RSS & Repos Blogs' },
              { id: 'metrics', label: '📊 Metrics & WakaTime' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveWorkflow(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all uppercase shrink-0 whitespace-nowrap ${
                  activeWorkflow === tab.id 
                    ? 'bg-slate-900 text-cyan-400 border border-slate-850' 
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Workflow Codebox Container */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-900 px-4 py-3 bg-slate-950/90">
              <div className="flex items-center space-x-2">
                <FileCode size={14} className={style.accentText} />
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                  {activeWorkflow === 'snake' ? '.github/workflows/snake-contribution.yml' :
                   activeWorkflow === 'blogs' ? '.github/workflows/readme-blog-posts.yml' :
                   '.github/workflows/github-metrics.yml'}
                </span>
              </div>

              <button
                onClick={() => handleCopy(getCurrentYaml())}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-850 text-[10px] font-mono text-slate-400 hover:text-white transition-colors"
              >
                {isCopied ? (
                  <>
                    <Check size={10} className="text-emerald-400 animate-pulse" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={10} />
                    <span>Copy YAML</span>
                  </>
                )}
              </button>
            </div>

            {/* Code pane */}
            <div className="p-4 overflow-y-auto max-h-[340px] font-mono text-[10.5px] text-slate-300 leading-relaxed no-scrollbar select-all bg-slate-950/50">
              <pre className="whitespace-pre">{getCurrentYaml()}</pre>
            </div>

            {/* Bottom info banner */}
            <div className="p-3 border-t border-slate-900/60 bg-slate-950/80 flex items-center space-x-2 text-[10px] text-slate-500 font-sans">
              <Info size={12} className="text-cyan-400 shrink-0" />
              <span>This workflow has been written directly to your workspace repository for production compilation.</span>
            </div>
          </div>
        </div>

        {/* Live Simulator Console (Lg: 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4 justify-between">
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4 flex flex-col justify-between h-full">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                <div className="flex items-center space-x-2">
                  <TermIcon size={14} className="text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">GitHub Actions Runner Simulator</span>
                </div>
                <span className="text-[8px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-850">VM: ONLINE</span>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-normal">
                Trigger a mock compilation cycle to see exactly how the GitHub virtual container fetches your variables, parses RSS posts, runs the snake game path solver, and commits directly to master!
              </p>
            </div>

            {/* Simulated runner Terminal */}
            <div className="h-[210px] rounded-xl bg-slate-950 border border-slate-900/80 p-3 font-mono text-[9.5px] leading-relaxed text-slate-300 overflow-y-auto no-scrollbar flex flex-col space-y-1 bg-gradient-to-b from-slate-950 to-black relative">
              {logs.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 font-sans space-y-1">
                  <TermIcon size={22} className="text-slate-800 animate-bounce" />
                  <span className="text-[10px] font-mono">CONSOLE IDLE</span>
                  <span className="text-[9px]">Click "Simulate Run" below to activate</span>
                </div>
              ) : (
                <>
                  {logs.map((log, lidx) => {
                    const isSuccess = log.includes("✅") || log.includes("SUCCESS");
                    const isStep = log.includes("🎯");
                    return (
                      <div 
                        key={lidx} 
                        className={`${
                          isSuccess ? 'text-emerald-400 font-bold' : 
                          isStep ? 'text-cyan-400 font-bold border-t border-slate-900/40 pt-1.5 mt-1' : 'text-slate-400'
                        }`}
                      >
                        {log}
                      </div>
                    );
                  })}
                  <div ref={consoleEndRef} />
                </>
              )}
            </div>

            {/* Runner Action trigger */}
            <div className="space-y-3 pt-2">
              {isRunning && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-mono text-slate-500">
                    <span>PROGRESS</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div className={`h-full ${style.progressColor} transition-all duration-300`} style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <button
                onClick={startSimulation}
                disabled={isRunning}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                  isRunning ? 'bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed' : style.btnBg
                }`}
              >
                <RefreshCw size={12} className={isRunning ? 'animate-spin' : ''} />
                <span>{isRunning ? 'Running Action Suite...' : 'Simulate Run (Full Suite)'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ----------------------------------------------------
          INTERACTIVE "PREVIEW REQUIRED" PORTFOLIO README SECTION
          ---------------------------------------------------- */}
      <div className="space-y-5 pt-3">
        <div className="flex items-center space-x-2.5">
          <Eye size={18} className="text-cyan-400" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider font-sans">Active Profile README Mockup Preview</h3>
          <span className="text-[10px] font-mono text-slate-500">— GENERATED OUTCOME</span>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-900 relative overflow-hidden space-y-8">
          
          {/* Header layout */}
          <div className="space-y-2 border-b border-slate-900 pb-5">
            <h4 className="text-lg font-extrabold text-white font-sans flex items-center gap-1.5">
              <span>Hello, I'm {profile.name} 👋</span>
              <span className="text-xs font-mono font-medium text-slate-500">({profile.username}/README.md)</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{profile.bio}</p>
          </div>

          {/* Interactive Snake game panel (The visual preview highlight) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">🐍 DYNAMIC CONTRIBUTIONS SNAKE</span>
              <span className="text-[9px] font-mono text-slate-500">Live grid solver pathing</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-850/60 relative overflow-hidden flex flex-col items-center">
              
              {/* Contributions pixel-art grid */}
              <div className="grid grid-rows-7 grid-flow-col gap-[2.5px] max-w-full overflow-x-auto no-scrollbar pb-1">
                {contributions.map((row, rIdx) => 
                  row.map((val, cIdx) => {
                    // Check if snake body is at this pixel
                    const isSnakeSegment = snakeBody.some(b => b.x === cIdx && b.y === rIdx);
                    const isHead = snakeBody[0].x === cIdx && snakeBody[0].y === rIdx;
                    const isFoodSegment = food.x === cIdx && food.y === rIdx;

                    let bgClass = 'bg-slate-900/60 border border-slate-900/20'; // level 0 (slate)
                    if (val === 1) bgClass = 'bg-emerald-950/40 border border-emerald-950/20'; // level 1
                    if (val === 2) bgClass = 'bg-emerald-800/40 border border-emerald-800/20'; // level 2
                    if (val === 3) bgClass = 'bg-emerald-600/70 border border-emerald-600/20'; // level 3
                    if (val === 4) bgClass = 'bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.4)]'; // level 4 (intense)

                    if (isSnakeSegment) {
                      bgClass = isHead ? 'bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.7)]' : 'bg-purple-600';
                    } else if (isFoodSegment) {
                      bgClass = 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse';
                    }

                    return (
                      <div 
                        key={`${rIdx}-${cIdx}`}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[1.5px] transition-all duration-300 ${bgClass}`}
                      />
                    );
                  })
                )}
              </div>

              {/* Status footer */}
              <div className="flex justify-between w-full text-[9px] font-mono text-slate-500 mt-3 pt-3 border-t border-slate-900/60">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-purple-500" />
                  <span>Snake solver active</span>
                </span>
                <span>Active eating loop: Score {snakeBody.length - 3}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Feed columns (RSS parsed outputs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Blog listings */}
            <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">✍️ RECENT ARTICLES (AUTO-PULLED)</span>
              
              <ul className="space-y-3 font-sans text-xs">
                <li className="flex items-start space-x-2 border-b border-slate-900/50 pb-2">
                  <span className="text-cyan-400 mt-0.5 font-mono">1.</span>
                  <div className="space-y-0.5">
                    <a href="#" className="font-bold text-white hover:text-cyan-400 transition-colors">Compiling High-Performance Rust Systems into WebAssembly</a>
                    <span className="block text-[9px] font-mono text-slate-500">PUBLISHED: June 28, 2026 • Medium</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2 border-b border-slate-900/50 pb-2">
                  <span className="text-cyan-400 mt-0.5 font-mono">2.</span>
                  <div className="space-y-0.5">
                    <a href="#" className="font-bold text-white hover:text-cyan-400 transition-colors">Architecting eBPF Kernel Telemetry inside Kubernetes Pod Meshes</a>
                    <span className="block text-[9px] font-mono text-slate-500">PUBLISHED: May 14, 2026 • Medium</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-400 mt-0.5 font-mono">3.</span>
                  <div className="space-y-0.5">
                    <a href="#" className="font-bold text-white hover:text-cyan-400 transition-colors">Orchestrating Multi-Agent State Pools using Google Gemini API</a>
                    <span className="block text-[9px] font-mono text-slate-500">PUBLISHED: March 05, 2026 • OctoCraft Blogs</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* YouTube videos */}
            <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">🎥 LATEST YOUTUBE UPLOADS</span>
              
              <ul className="space-y-3 font-sans text-xs">
                <li className="flex items-center space-x-2.5 border-b border-slate-900/50 pb-2.5">
                  <span className="text-red-500 font-bold shrink-0 font-mono text-[10px]">🎥</span>
                  <div>
                    <a href="#" className="font-bold text-white hover:text-red-400 transition-colors block">Architecting sub-millisecond route meshes in Rust &amp; WASM</a>
                    <span className="block text-[9px] font-mono text-slate-500">UPLOADED: 3 weeks ago • Duration: 12:45 mins</span>
                  </div>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-red-500 font-bold shrink-0 font-mono text-[10px]">🎥</span>
                  <div>
                    <a href="#" className="font-bold text-white hover:text-red-400 transition-colors block">Deep dive into Gemini Multi-modal prompt templates</a>
                    <span className="block text-[9px] font-mono text-slate-500">UPLOADED: 1 month ago • Duration: 18:20 mins</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* WakaTime Weekly Leaderboard & Repo listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* WakaTime Stats */}
            <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">📊 WAKATIME WEEKLY CODING STATS</span>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Logged Time (Past 7 Days):</span>
                  <span className="text-emerald-400 font-bold">48 hrs 12 mins</span>
                </div>

                <div className="space-y-2">
                  {[
                    { lang: 'TypeScript', percentage: 52, color: 'bg-blue-500' },
                    { lang: 'Rust', percentage: 28, color: 'bg-orange-500' },
                    { lang: 'Go', percentage: 20, color: 'bg-cyan-500' }
                  ].map((stat, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>{stat.lang}</span>
                        <span>{stat.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Repositories Sync */}
            <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">🛠️ RECENTLY ACTIVE REPOSITORIES</span>
              
              <ul className="space-y-3 font-sans text-xs">
                <li className="flex items-start space-x-2 border-b border-slate-900/50 pb-2">
                  <span className="text-purple-400 font-mono mt-0.5">●</span>
                  <div className="space-y-0.5">
                    <a href="#" className="font-bold text-white hover:text-purple-400 transition-colors">novamesh-proxy</a>
                    <p className="text-[10px] text-slate-400 font-sans line-clamp-1">WebAssembly proxy mesh built in Rust (★ 4820)</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 font-mono mt-0.5">●</span>
                  <div className="space-y-0.5">
                    <a href="#" className="font-bold text-white hover:text-purple-400 transition-colors">aether-ai-orchestrator</a>
                    <p className="text-[10px] text-slate-400 font-sans line-clamp-1">Enterprise agent orchestrator powered by Gemini (★ 3150)</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
