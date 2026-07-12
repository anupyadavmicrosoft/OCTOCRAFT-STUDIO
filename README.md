# 🪐 OctoCraft: Ultra-Premium Profile Engine & GitHub Actions Hub

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/anupyadav/anupyadav?style=for-the-badge&color=gold)](https://github.com/anupyadav/anupyadav)
[![Forks](https://img.shields.io/github/forks/anupyadav/anupyadav?style=for-the-badge&color=purple)](https://github.com/anupyadav/anupyadav)
[![WakaTime Logged](https://img.shields.io/badge/Time%20Tracked-48.5%20hrs-emerald?style=for-the-badge&logo=wakatime)](https://wakatime.com)

**Engineered for Elite Software Architects, Devops Specialists, and Open Source Maintainers.**  
A high-fidelity, interactive profile customizer and automated markdown generator integrated with fully simulated GitHub Actions pipelines.

[Explore Platform](https://ais-dev-3s64d5ocwd2fceadffbiw7-241761640336.asia-southeast1.run.app) • [View Live Preview](https://ais-pre-3s64d5ocwd2fceadffbiw7-241761640336.asia-southeast1.run.app) • [Report Issue](https://github.com/anupyadav/anupyadav/issues)

</div>

---

## 🧬 Architectural Vision & Mood

OctoCraft is a professional profile suite designed from the ground up to empower high-performing developers with highly customizable, aesthetic, and automated profile representation. Instead of default markdown templates, OctoCraft relies on **mathematical typography rhythm**, **ambient glassmorphism**, and **CI/CD automation** to construct profile pages that command attention.

```
┌────────────────────────────────────────────────────────┐
│               OCTOCRAFT PROFILE ENGINE                 │
├────────────────────────────────────────────────────────┤
│  [Preview Canvas]  ──► Real-time customizable designs  │
│  [Code Exporter]   ──► Generates premium markdown & SVGs│
│  [Actions Orche]  ──► Syncs blogs, contributions, time│
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Systems

### 1. 🎨 Dynamic Visual Core & Themes
Configure and hot-swap premium visual presets styled with responsive layouts:
-   **Cosmic Slate Theme** (Default): Premium dark slate aesthetics with neutral gray offsets.
-   **Neon Cyberpunk Theme**: Vibrant glowing purples, pinks, and cyans.
-   **Forest Emerald Theme**: Rich green/teal interfaces representing active green contribution blocks.
-   **Crimson Eclipse Theme**: Deep scarlet gradients for intense coding environments.

### 2. 🐍 Automated Contributions Snake Solver
Uses a customized, path-finding algorithm that simulates a snake traversing your contribution grid to eat pixels (commits) and output beautiful dynamic SVG graphics directly to your branch.

### 3. 🔄 Multi-Feed RSS Parser
Synchronize active publishing streams from multiple platforms:
-   **Medium**: Automate feed pulls for high-density engineering articles.
-   **Dev.to**: Integrate technical community postings.
-   **YouTube**: Render video playlist nodes.

### 4. 📊 WakaTime Analytics Leaderboard
Embed weekly coder stats (editor of choice, operating systems, project distributions, total hours) inside clean SVG widgets.

---

## 🛠️ Complete GitHub Actions Suite

This profile engine includes three pre-engineered workflow files written directly to `.github/workflows/`:

### 📥 1. Snake Game contribution Grid (`snake-contribution.yml`)
Runs once daily to generate `github-contribution-grid-snake.svg` and push it to your `github-pages-assets` branch.
```yaml
name: Generate Snake Contribution Grid
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
...
```

### 📥 2. Blogs, YouTube, and Repos Sync (`readme-blog-posts.yml`)
Syncs active RSS streams and formats recently active repository grids.
```yaml
name: Sync Blog Posts, YouTube, and Repositories
on:
  schedule:
    - cron: '0 */12 * * *'
  workflow_dispatch:
...
```

### 📥 3. High-Density Analytics Profile & WakaTime (`github-metrics.yml`)
Compiles language distributions and charts via WakaTime API credentials.
```yaml
name: Sync GitHub Profile Metrics and WakaTime
on:
  schedule:
    - cron: "0 0 * * 0"
  workflow_dispatch:
...
```

---

## 🔑 Setup & Secret Configuration

To make all dynamic pipelines functional, configure these variables in your repository:
1.  **`METRICS_TOKEN`**: A Fine-Grained GitHub Personal Access Token with read/write scopes to `Contents`, `Metadata`, and `Profile`.
2.  **`WAKATIME_API_KEY`**: Your unique developer key obtained from WakaTime Settings.
3.  **Workflow Permissions**: Ensure Actions have full read/write privileges in **Settings ➔ Actions ➔ General ➔ Workflow permissions**.

---

## 🛠️ Local Development & Quickstart

```bash
# Clone the repository
git clone https://github.com/anupyadav/anupyadav.git

# Install premium dependencies
npm install

# Start local high-performance server on port 3000
npm run dev
```

---

## 🏆 Hall of Fame Credentials

Created and maintained by [Anup Yadav](https://github.com/anupyadav) to power high-density engineering portfolios across the open-source spectrum.

*Crafted with high-contrast precision, fluid layout motion, and strict performance design.*
