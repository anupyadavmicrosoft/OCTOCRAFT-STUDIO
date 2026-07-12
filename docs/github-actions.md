# 🚀 GitHub Actions Auto-Updating Portfolio System

This repository is equipped with an automated suite of **GitHub Actions Workflows** that keep your profile, blogs, repositories, metrics, contribution graphics, and coder time-tracking constantly up to date with zero manual overhead. 

---

## 📌 Automated Workflows Included

| Workflow Name | File Path | Frequency | Description |
|---|---|---|---|
| **🐍 Contributions Snake Game** | `.github/workflows/snake-contribution.yml` | Every 24 hours | Generates an animated 2D snake game grid eating your commits and outputs light/dark SVG graphics to a separate branch. |
| **🔄 RSS Feeds & Repos Sync** | `.github/workflows/readme-blog-posts.yml` | Every 12 hours | Fetches recent articles from **Medium**, **Dev.to**, uploaded videos from **YouTube**, and your latest active repos, injecting them into your `README.md`. |
| **📊 Profile Metrics & WakaTime** | `.github/workflows/github-metrics.yml` | Every Sunday | Compiles high-density language stats, contribution charts, and daily/weekly development editor time-tracking via **WakaTime**. |

---

## 🔑 Required Repository Secrets & Setup

To activate all automations, you need to add the following secrets inside your GitHub repository settings under **Settings ➔ Secrets and variables ➔ Actions ➔ New repository secret**:

### 1. `GITHUB_TOKEN` (Automatically Provided)
No setup required! GitHub automatically generates this for workflows. Make sure your workflow has **Read and write permissions** enabled:
* Go to **Settings ➔ Actions ➔ General**.
* Under **Workflow permissions**, select **Read and write permissions** and click **Save**.

### 2. `METRICS_TOKEN` (Personal Access Token)
Required by the `lowlighter/metrics` action to query high-density API stats about your account.
1. Go to your GitHub **Settings ➔ Developer settings ➔ Personal access tokens ➔ Fine-grained tokens** (or classic tokens).
2. Generate a token with the following scopes:
   * **Read/Write access** to `Metadata`, `Contents`, and `Profile`.
3. Save the token as `METRICS_TOKEN` in your repo secrets.

### 3. `WAKATIME_API_KEY` (Developer Tracking Key)
Required to fetch coding activity stats from WakaTime.
1. Sign up/Log in at [WakaTime](https://wakatime.com/).
2. Navigate to your **Account Settings ➔ API Key** and copy your secret key.
3. Save the key as `WAKATIME_API_KEY` in your repo secrets.

---

## 📝 GitHub Profile README Marker Setup

The dynamic RSS and stats workflows depend on finding specific **HTML comments (markers)** inside your `README.md` to know where to insert content safely without disrupting your custom profile code.

Copy and paste the following template block into your personal **GitHub Profile README** file:

```markdown
# Hello, I'm Anup Yadav 👋

<!-- Contributions Snake Animation -->
<div align="center">
  <img src="https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/github-pages-assets/github-contribution-grid-snake-dark.svg" alt="GitHub Contribution Snake Grid Animation" />
</div>

## ✍️ Recent Blog Posts (Medium & Dev.to)
<ul>
<!-- MEDIUM-BLOGS:START -->
<!-- MEDIUM-BLOGS:END -->
</ul>

<ul>
<!-- DEVTO-BLOGS:START -->
<!-- DEVTO-BLOGS:END -->
</ul>

## 🎥 Latest YouTube Uploads
<ul>
<!-- YOUTUBE-VIDEOS:START -->
<!-- YOUTUBE-VIDEOS:END -->
</ul>

## 🛠️ Recently Active Repositories
<!-- REPOSITORIES:START -->
<!-- REPOSITORIES:END -->

## 📊 WakaTime Coding Leaderboard
<!-- wakatime:START -->
<!-- wakatime:END -->

## 📈 High-Density Analytics Profile
<div align="center">
  <img src="https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/github-metrics-profile.svg" alt="GitHub Profile Metrics Analytics" />
</div>
```

---

## 🛠️ Testing Workflows Manually

You do not need to wait for the cron jobs to fire! You can trigger any action instantly from your browser:
1. Navigate to the **Actions** tab of your repository.
2. Select the desired workflow from the left sidebar (e.g. *Sync Blog Posts, YouTube, and Repositories*).
3. Click the **Run workflow** dropdown, choose your branch (`main`), and click **Run workflow**.

---
*Crafted with precision by the OctoCraft Dev Studio.*
