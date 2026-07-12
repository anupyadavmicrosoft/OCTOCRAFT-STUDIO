import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Palette, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layout, 
  Layers, 
  MapPin, 
  Briefcase, 
  Building, 
  Eye, 
  Star, 
  GitFork, 
  Users,
  Workflow,
  Github
} from 'lucide-react';
import { UserProfile, ProfileTheme, TechStack, FeaturedProject } from '../types';

interface ControlsProps {
  profile: UserProfile;
  onChange: (updated: UserProfile) => void;
}

const THEMES: Array<{ id: ProfileTheme; name: string; desc: string; colors: string }> = [
  { id: 'cyber', name: 'Cyberpunk Neon', desc: 'Vibrant purple & cyan with glow highlights', colors: 'from-purple-600 to-cyan-500' },
  { id: 'glass-dark', name: 'Minimalist Slate', desc: 'Elegant matte slate with glowing white nodes', colors: 'from-slate-600 to-slate-400' },
  { id: 'emerald', name: 'Emerald Matrix', desc: 'Sleek black with glowing toxic green elements', colors: 'from-emerald-600 to-teal-500' },
  { id: 'crimson', name: 'Solar Eclipse', desc: 'Rich deep crimson red and blazing orange flare', colors: 'from-red-600 to-orange-500' }
];

const PREDEFINED_SKILLS = [
  'TypeScript', 'React', 'Node.js', 'Next.js', 'Go', 'Rust', 'Python', 'C++', 'Kubernetes',
  'Docker', 'AWS', 'GCP', 'Terraform', 'GraphQL', 'TailwindCSS', 'Drizzle', 'PostgreSQL',
  'Redis', 'AI Integration', 'LangChain', 'LlamaIndex', 'TensorFlow', 'Gemini SDK', 'Web3'
];

export default function Controls({ profile, onChange }: ControlsProps) {
  const [newSkill, setNewSkill] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState<keyof TechStack>('languages');

  const updateField = (field: keyof UserProfile, value: any) => {
    onChange({ ...profile, [field]: value });
  };

  const addTechStackItem = (category: keyof TechStack, itemToAdd: string) => {
    const trimmed = itemToAdd.trim();
    if (!trimmed) return;
    
    const currentStack = profile.techStack || {
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
    
    const items = currentStack[category] || [];
    if (!items.includes(trimmed)) {
      onChange({
        ...profile,
        techStack: {
          ...currentStack,
          [category]: [...items, trimmed]
        }
      });
    }
  };

  const removeTechStackItem = (category: keyof TechStack, itemToRemove: string) => {
    const currentStack = profile.techStack || {
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
    
    const items = currentStack[category] || [];
    onChange({
      ...profile,
      techStack: {
        ...currentStack,
        [category]: items.filter(item => item !== itemToRemove)
      }
    });
  };

  const updateNestedField = (parent: 'socials' | 'stats', field: string, value: any) => {
    onChange({
      ...profile,
      [parent]: {
        ...profile[parent],
        [field]: value
      }
    });
  };

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !profile.skills.includes(trimmed)) {
      onChange({
        ...profile,
        skills: [...profile.skills, trimmed]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...profile,
      skills: profile.skills.filter(s => s !== skillToRemove)
    });
  };

  const addHighlight = () => {
    const trimmed = newHighlight.trim();
    if (trimmed && !profile.highlights.includes(trimmed)) {
      onChange({
        ...profile,
        highlights: [...profile.highlights, trimmed]
      });
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    onChange({
      ...profile,
      highlights: profile.highlights.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6 glass-morphism rounded-2xl border border-slate-800 p-6 shadow-xl">
      
      {/* Title */}
      <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-800/80">
        <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
          <Settings size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-none">Profile Configuration</h2>
          <span className="text-[10px] font-mono text-slate-500">REALTIME PROFILE BUILDER</span>
        </div>
      </div>

      {/* 1. Theme Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
          <Palette size={14} className="text-purple-400" />
          <span>Profile Theme System</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {THEMES.map((theme) => {
            const isSelected = profile.theme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => updateField('theme', theme.id)}
                className={`p-3.5 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between hover:scale-[1.01] ${isSelected ? 'bg-slate-900 border-purple-500/50 shadow-lg shadow-purple-500/5' : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-950/80'}`}
              >
                {/* Visual gradient edge indicator */}
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${theme.colors}`} />
                <div className="pl-2">
                  <div className="text-sm font-bold text-white">{theme.name}</div>
                  <div className="text-[10px] text-slate-500 mt-1 leading-normal">{theme.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Core Identity Info */}
      <div className="space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
          <User size={14} className="text-cyan-400" />
          <span>Identity & Credentials</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Full Name</span>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase">GitHub Username</span>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => updateField('username', e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center space-x-1">
              <Briefcase size={10} /> <span>Current Role / Title</span>
            </span>
            <input
              type="text"
              value={profile.role}
              onChange={(e) => updateField('role', e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center space-x-1">
              <Building size={10} /> <span>Current Company</span>
            </span>
            <input
              type="text"
              value={profile.company}
              onChange={(e) => updateField('company', e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center space-x-1">
              <MapPin size={10} /> <span>Location</span>
            </span>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Short Professional Bio</span>
          <textarea
            value={profile.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            rows={2}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* 3. GitHub Metrics Mock */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
          <Layers size={14} className="text-yellow-400" />
          <span>Real-time GitHub Metrics & Counters</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center space-x-1 justify-center">
              <Users size={10} className="text-cyan-400" /> <span>Followers</span>
            </span>
            <input
              type="number"
              value={profile.stats.followers}
              onChange={(e) => updateNestedField('stats', 'followers', parseInt(e.target.value) || 0)}
              className="w-full bg-transparent text-center font-bold text-white text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center space-x-1 justify-center">
              <Star size={10} className="text-yellow-400" /> <span>Stars</span>
            </span>
            <input
              type="number"
              value={profile.stats.stars}
              onChange={(e) => updateNestedField('stats', 'stars', parseInt(e.target.value) || 0)}
              className="w-full bg-transparent text-center font-bold text-white text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase flex items-center space-x-1 justify-center">
              <GitFork size={10} className="text-purple-400" /> <span>Repos</span>
            </span>
            <input
              type="number"
              value={profile.stats.repos}
              onChange={(e) => updateNestedField('stats', 'repos', parseInt(e.target.value) || 0)}
              className="w-full bg-transparent text-center font-bold text-white text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Social Links */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
          <Sparkles size={14} className="text-indigo-400" />
          <span>Professional Network URLs</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2 bg-slate-950/40 border border-slate-800 rounded-xl px-3 py-1.5">
            <span className="text-slate-500 font-mono text-[10px] w-14 uppercase">LinkedIn</span>
            <input
              type="text"
              value={profile.socials.linkedin}
              onChange={(e) => updateNestedField('socials', 'linkedin', e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none w-full font-sans text-xs"
            />
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/40 border border-slate-800 rounded-xl px-3 py-1.5">
            <span className="text-slate-500 font-mono text-[10px] w-14 uppercase">Twitter</span>
            <input
              type="text"
              value={profile.socials.twitter}
              onChange={(e) => updateNestedField('socials', 'twitter', e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none w-full font-sans text-xs"
            />
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/40 border border-slate-800 rounded-xl px-3 py-1.5">
            <span className="text-slate-500 font-mono text-[10px] w-14 uppercase">Website</span>
            <input
              type="text"
              value={profile.socials.website}
              onChange={(e) => updateNestedField('socials', 'website', e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none w-full font-sans text-xs"
            />
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/40 border border-slate-800 rounded-xl px-3 py-1.5">
            <span className="text-slate-500 font-mono text-[10px] w-14 uppercase">Email</span>
            <input
              type="text"
              value={profile.socials.email}
              onChange={(e) => updateNestedField('socials', 'email', e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none w-full font-sans text-xs"
            />
          </div>
        </div>
      </div>

      {/* 5. Specialization Highlights */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
          <Layout size={14} className="text-rose-400" />
          <span>Specialization Highlights</span>
        </label>
        
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add new highlight (e.g. OSS Contributor)"
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHighlight()}
            className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
          />
          <button
            onClick={addHighlight}
            className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-cyan-400 transition-all hover:scale-105"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1.5">
          {profile.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <span>{highlight}</span>
              <button onClick={() => removeHighlight(index)} className="text-rose-400/70 hover:text-rose-400">
                <Trash2 size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Technical Stack & Skills */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
          <Layout size={14} className="text-emerald-400" />
          <span>Technical Stack Arsenal</span>
        </label>

        {/* Text Area for Quick Manual Skill Insertion */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search or add skill tag (e.g. Go, Rust)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill(newSkill)}
            className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
          />
          <button
            onClick={() => addSkill(newSkill)}
            className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-emerald-400 transition-all hover:scale-105"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Predefined skill presets for seamless discovery */}
        <div className="py-2.5">
          <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Predefined Tag Suggestions:</div>
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1.5 bg-slate-950/40 rounded-xl border border-slate-850">
            {PREDEFINED_SKILLS.filter(s => !profile.skills.includes(s)).map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-850 text-[10px] font-mono text-slate-400 hover:text-white border border-slate-800/80"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Selected skills inventory with clear actions */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Your Skills Arsenal ({profile.skills.length}):</div>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <div 
                key={skill}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-850 text-xs font-mono text-emerald-400"
              >
                <span>{skill}</span>
                <button 
                  onClick={() => removeSkill(skill)}
                  className="text-slate-500 hover:text-rose-400 ml-1 shrink-0"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7. About Me: Mission & Strategic Directives */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
          <Sparkles size={14} className="text-pink-400" />
          <span>Strategic Profile Directives</span>
        </label>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Core Mission Statement</span>
          <textarea
            value={profile.mission}
            onChange={(e) => updateField('mission', e.target.value)}
            rows={2}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Dynamic Learning & Topics editor */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Currently Learning &amp; Upskilling</span>
          <div className="flex space-x-2">
            <input
              type="text"
              id="new-learning-input"
              placeholder="e.g. LLM fine-tuning patterns"
              className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val && !profile.learning.includes(val)) {
                    updateField('learning', [...profile.learning, val]);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.learning.map((topic, index) => (
              <div key={index} className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-950 border border-slate-850 text-[10px] text-slate-300">
                <span>{topic}</span>
                <button 
                  onClick={() => updateField('learning', profile.learning.filter((_, i) => i !== index))}
                  className="text-slate-500 hover:text-rose-400 ml-1"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Future goals editor */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Future Roadmap Milestones</span>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="e.g. Complete Rust systems certification"
              className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val && !profile.goals.includes(val)) {
                    updateField('goals', [...profile.goals, val]);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>
          <div className="space-y-1">
            {profile.goals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between px-2 py-1 rounded bg-slate-950 border border-slate-850 text-xs text-slate-300">
                <span className="truncate pr-2">{goal}</span>
                <button 
                  onClick={() => updateField('goals', profile.goals.filter((_, i) => i !== index))}
                  className="text-slate-500 hover:text-rose-400"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Leisure Pursuits / Interests editor */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Leisure Pursuits &amp; Interests</span>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="e.g. Photography, Space Research"
              className="flex-1 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val && !profile.interests.includes(val)) {
                    updateField('interests', [...profile.interests, val]);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((interest, index) => (
              <div key={index} className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-950 border border-slate-850 text-[10px] text-slate-300">
                <span>{interest}</span>
                <button 
                  onClick={() => updateField('interests', profile.interests.filter((_, i) => i !== index))}
                  className="text-slate-500 hover:text-rose-400 ml-1"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Tech Stack Categories Customization */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
            <Layers size={14} className="text-cyan-400" />
            <span>Categorized Tech Stack Editor</span>
          </label>

          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Select Target Category</span>
              <select
                value={activeCategoryTab}
                onChange={(e) => setActiveCategoryTab(e.target.value as keyof TechStack)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
              >
                <option value="languages">Languages</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="databases">Databases</option>
                <option value="cloud">Cloud</option>
                <option value="devops">DevOps</option>
                <option value="operatingSystems">Operating Systems</option>
                <option value="tools">Tools</option>
                <option value="frameworks">Frameworks</option>
                <option value="ai">AI</option>
                <option value="cyberSecurity">Cyber Security</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Add Technology Item</span>
              <input
                type="text"
                placeholder={`Type and press Enter to add to ${activeCategoryTab}`}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      addTechStackItem(activeCategoryTab, val);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase">
                Active Items in {activeCategoryTab} ({(profile.techStack?.[activeCategoryTab] || []).length})
              </span>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-950/40 border border-slate-850 min-h-[48px]">
                {(profile.techStack?.[activeCategoryTab] || []).map((item, index) => (
                  <div key={index} className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono">
                    <span>{item}</span>
                    <button
                      onClick={() => removeTechStackItem(activeCategoryTab, item)}
                      className="text-slate-500 hover:text-rose-400 ml-1.5 shrink-0"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                {(profile.techStack?.[activeCategoryTab] || []).length === 0 && (
                  <span className="text-[10px] text-slate-500 italic font-mono">No items listed. Type and press Enter above.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 9. Featured Productions Editor */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
            <Workflow size={14} className="text-purple-400" />
            <span>Featured Productions Editor</span>
          </label>

          {/* Quick Create Form */}
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Add Production Card</span>
            
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Project Title</span>
              <input 
                type="text" 
                id="feat-proj-title"
                placeholder="e.g. NovaMesh Proxy"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase">Description</span>
              <textarea 
                id="feat-proj-desc"
                rows={2}
                placeholder="Brief summary of architecture & features..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase">GitHub Stars</span>
                <input 
                  type="number" 
                  id="feat-proj-stars"
                  placeholder="3400"
                  defaultValue="1200"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Forks</span>
                <input 
                  type="number" 
                  id="feat-proj-forks"
                  placeholder="150"
                  defaultValue="80"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Demo Sandbox URL</span>
                <input 
                  type="text" 
                  id="feat-proj-demo"
                  placeholder="https://anupyadav.dev/demo"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Repository URL</span>
                <input 
                  type="text" 
                  id="feat-proj-repo"
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Tech Badges (comma sep)</span>
                <input 
                  type="text" 
                  id="feat-proj-tech"
                  placeholder="Rust, Wasm, eBPF"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Interactive Screen theme</span>
                <select 
                  id="feat-proj-img-theme"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="mesh">Cluster Mesh</option>
                  <option value="neural">Neural Stream</option>
                  <option value="storage">Raft Consensus</option>
                  <option value="compiler">Compiler Code</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                const titleEl = document.getElementById('feat-proj-title') as HTMLInputElement;
                const descEl = document.getElementById('feat-proj-desc') as HTMLTextAreaElement;
                const starsEl = document.getElementById('feat-proj-stars') as HTMLInputElement;
                const forksEl = document.getElementById('feat-proj-forks') as HTMLInputElement;
                const demoEl = document.getElementById('feat-proj-demo') as HTMLInputElement;
                const repoEl = document.getElementById('feat-proj-repo') as HTMLInputElement;
                const techEl = document.getElementById('feat-proj-tech') as HTMLInputElement;
                const themeEl = document.getElementById('feat-proj-img-theme') as HTMLSelectElement;

                if (titleEl && descEl) {
                  const title = titleEl.value.trim();
                  const description = descEl.value.trim();
                  if (!title || !description) return;

                  const stars = parseInt(starsEl.value) || 0;
                  const forks = parseInt(forksEl.value) || 0;
                  const demoUrl = demoEl.value.trim();
                  const repoUrl = repoEl.value.trim();
                  const tech = techEl.value.split(',').map(t => t.trim()).filter(Boolean);
                  const imageTheme = themeEl.value as any;

                  const newProject: FeaturedProject = {
                    title,
                    description,
                    tech,
                    stars,
                    forks,
                    demoUrl,
                    repoUrl,
                    imageTheme
                  };

                  const currentFeatured = profile.featuredProjects || [];
                  updateField('featuredProjects', [...currentFeatured, newProject]);

                  // Reset inputs
                  titleEl.value = '';
                  descEl.value = '';
                  starsEl.value = '1200';
                  forksEl.value = '80';
                  demoEl.value = '';
                  repoEl.value = '';
                  techEl.value = '';
                }
              }}
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-purple-500/20"
            >
              Add Project Card
            </button>
          </div>

          {/* Existing list with delete button */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Active Featured Cards ({(profile.featuredProjects || []).length})</span>
            <div className="space-y-2">
              {(profile.featuredProjects || []).map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-850">
                  <div className="space-y-0.5 truncate pr-2">
                    <span className="text-xs font-bold text-slate-200 block truncate">{project.title}</span>
                    <span className="text-[9px] font-mono text-slate-500 block truncate">
                      {project.tech.join(', ')} | Theme: {project.imageTheme}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const updated = (profile.featuredProjects || []).filter((_, i) => i !== index);
                      updateField('featuredProjects', updated);
                    }}
                    className="px-2 py-1 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 hover:border-rose-900/60 text-rose-400 rounded-lg text-[10px] font-semibold transition-colors shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {(profile.featuredProjects || []).length === 0 && (
                <span className="text-[10px] text-slate-500 italic font-mono block">No featured cards. Create one above.</span>
              )}
            </div>
          </div>
        </div>

        {/* 10. GitHub Analytics Customization */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
            <Github size={14} className="text-cyan-400" />
            <span>GitHub Analytics Config</span>
          </label>

          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">GitHub Username</span>
              <input
                type="text"
                value={profile.githubAnalytics?.username ?? profile.username}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  updateField('githubAnalytics', {
                    ...(profile.githubAnalytics || {
                      username: profile.username,
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
                    }),
                    username: val
                  });
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50 font-mono"
                placeholder="anupyadav"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Commits Count</span>
                <input
                  type="number"
                  value={profile.githubAnalytics?.totalCommits ?? 14205}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    updateField('githubAnalytics', {
                      ...(profile.githubAnalytics || {}),
                      totalCommits: val
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Active Streak</span>
                <input
                  type="number"
                  value={profile.githubAnalytics?.currentStreak ?? 18}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    updateField('githubAnalytics', {
                      ...(profile.githubAnalytics || {}),
                      currentStreak: val
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
