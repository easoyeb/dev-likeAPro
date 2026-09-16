# ⚡ Dev Like A Pro

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646CFF?style=flat-square&logo=vite)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![GitHub Actions](https://img.shields.io/badge/Deploy-GitHub_Pages-2088FF?style=flat-square&logo=githubactions)](https://github.com/easoyeb/dev-likeAPro/actions)
[![Branch](https://img.shields.io/badge/branch-master-blue?style=flat-square&logo=git)](https://github.com/easoyeb/dev-likeAPro)

A modern developer wiki, software engineering knowledge base, architecture guides, and CLI cheat sheets. Built with **VitePress** and **Vue 3**.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (`corepack enable && corepack prepare pnpm@latest --activate`)

### Installation & Development

```bash
# 1. Clone repository
git clone git@github.com:easoyeb/dev-likeAPro.git
cd dev-likeAPro

# 2. Install dependencies
pnpm install

# 3. Start local development server
pnpm run docs:dev
```

The portal will be live at:
👉 **`http://localhost:5173/`**

#### 📱 Local Network / Mobile (Termux) Access
To preview the documentation portal on mobile devices or across your local Wi-Fi network:
```bash
pnpm run docs:dev --host 0.0.0.0
```

---

## 🛠️ CLI Commands

| Command | Description |
| :--- | :--- |
| `pnpm run docs:dev` | Start the development server with instant Hot Module Replacement (HMR) |
| `pnpm run docs:dev --host 0.0.0.0` | Expose dev server to local network interfaces |
| `pnpm run docs:build` | Build optimized static HTML assets for production in `docs/.vitepress/dist` |
| `pnpm run docs:preview` | Locally preview the production build |

---

## 📚 Documentation Sections

| Section | Key Content |
| :--- | :--- |
| **📱 Android Course** | Kotlin syntax decoding, 3 universal navigation anchors, feature lifecycle blueprints, Jetpack Compose UDF state, Canvas drawing, and reverse-engineering real codebases. |
| **🏗️ Architecture & Patterns** | Decoupled Ops/Manager pattern to prevent god-objects; Unidirectional Data Flow (UDF) state hierarchies in Compose. |
| **🚀 Developer Workflows** | VitePress documentation setup, Jujutsu (`jj`) version control, Git interactive rebasing, `ripgrep`/`fd`/`fzf` search pipelines, and Termux development setups. |
| **⚡ CLI Cheat Sheets** | Fast CLI search commands, Gradle daemon optimization, and compilation speed acceleration. |
| **🤖 AI & Automation** | Best practices for agentic pair programming with Antigravity and AI coding assistants. |

---

## 📁 Repository Structure

```text
dev-likeAPro/
├── .github/workflows/
│   └── deploy.yml               # Automated GitHub Pages deployment pipeline
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts           # Multi-sidebar, navigation, search, and base config
│   │   └── theme/
│   │       ├── index.mts        # Custom theme entry with interactive diagram engine
│   │       └── custom.css       # Theme styling & layout overrides
│   ├── ai/                      # AI & Agentic pair programming
│   ├── android-course/          # 4 Core Lessons + 4 In-depth Android Modules
│   ├── architecture/            # Architectural patterns (UDF, Ops/Manager)
│   ├── cheatsheets/             # Terminal, tool, and build optimization sheets
│   ├── workflow/                # Developer toolchains, Git, Jujutsu, and VitePress
│   └── index.md                 # Portal homepage
├── package.json                 # Project scripts and dependencies
├── pnpm-lock.yaml               # Deterministic dependency lockfile
└── README.md                    # Project documentation & quickstart
```

---

*Maintained with ⚡ for high-performance software engineering*
