export type ProfileTheme = 'cyber' | 'glass-dark' | 'emerald' | 'crimson';

export interface ProfileSocials {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  email: string;
}

export interface ProfileStats {
  followers: number;
  stars: number;
  repos: number;
  views: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface CurrentProject {
  name: string;
  desc: string;
  tech: string[];
  link: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  stars: number;
  forks: number;
  demoUrl: string;
  repoUrl: string;
  imageTheme: 'mesh' | 'neural' | 'storage' | 'compiler';
}

export interface TechStack {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud: string[];
  devops: string[];
  operatingSystems: string[];
  tools: string[];
  frameworks: string[];
  ai: string[];
  cyberSecurity: string[];
}

export interface GithubAnalytics {
  username: string;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalContribs: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  trophies: { title: string; rank: 'SSS' | 'SS' | 'S' | 'A' | 'B'; desc: string; type: string }[];
  pinnedRepos: { name: string; desc: string; language: string; stars: number; forks: number }[];
}

export interface UserProfile {
  name: string;
  username: string;
  role: string;
  company: string;
  location: string;
  bio: string;
  theme: ProfileTheme;
  socials: ProfileSocials;
  stats: ProfileStats;
  skills: string[];
  highlights: string[];
  mission: string;
  timeline: TimelineEvent[];
  projects: CurrentProject[];
  learning: string[];
  goals: string[];
  interests: string[];
  techStack: TechStack;
  featuredProjects: FeaturedProject[];
  githubAnalytics?: GithubAnalytics;
}
