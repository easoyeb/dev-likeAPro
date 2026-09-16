import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Dev Like A Pro",
  description: "Personal Developer Wiki, Architecture Guides & CLI Cheat Sheets",
  lang: 'en-US',
  
  cleanUrls: true,

  themeConfig: {
    siteTitle: '⚡ Dev Like A Pro',

    // Top Navigation Bar
    nav: [
      { text: 'Home', link: '/' },
      { text: '📱 Android Course', link: '/android-course/' },
      { text: 'Workflows', link: '/workflow/code-search' },
      { text: 'Architecture', link: '/architecture/ops-manager-pattern' },
      { text: 'Cheat Sheets', link: '/cheatsheets/cli-tools' },
      { text: 'AI & Automation', link: '/ai/agent-guide' }
    ],

    // Multi-Sidebar: Unique sidebar for each documentation section
    sidebar: {
      '/android-course/': [
        {
          text: '📱 Android Course',
          items: [
            { text: 'Course Overview', link: '/android-course/' },
            { text: 'Lesson 1: The Kotlin Decoder', link: '/android-course/kotlin-decoder' },
            { text: 'Module 1: Fundamentals', link: '/android-course/module1-basics' },
            { text: 'Module 2: State & Storage', link: '/android-course/module2-state-management' },
            { text: 'Module 3: Custom UI & Canvas', link: '/android-course/module3-custom-ui-canvas' },
            { text: 'Module 4: Reading Codebases', link: '/android-course/module4-how-to-read-codebases' }
          ]
        }
      ],
      '/workflow/': [
        {
          text: '🚀 Developer Workflows',
          items: [
            { text: 'Jujutsu (jj) Mastery', link: '/workflow/jujutsu-mastery' },
            { text: 'Code Search Masterclass', link: '/workflow/code-search' },
            { text: 'Git & Rebase Mastery', link: '/workflow/git-mastery' },
            { text: 'Termux & Android Dev Setup', link: '/workflow/termux-android-dev' }
          ]
        }
      ],
      '/architecture/': [
        {
          text: '🏗️ Architecture & Patterns',
          items: [
            { text: 'Ops/Manager Pattern', link: '/architecture/ops-manager-pattern' },
            { text: 'Compose UI & State', link: '/architecture/compose-state' }
          ]
        }
      ],
      '/cheatsheets/': [
        {
          text: '⚡ CLI Cheat Sheets',
          items: [
            { text: 'ripgrep, find & FZF', link: '/cheatsheets/cli-tools' },
            { text: 'Gradle & Build Speed', link: '/cheatsheets/gradle-tips' }
          ]
        }
      ],
      '/ai/': [
        {
          text: '🤖 AI & Automation',
          items: [
            { text: 'Antigravity & Agentic Pair Programming', link: '/ai/agent-guide' }
          ]
        }
      ]
    },

    // Offline Local Search Configuration
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },

    // Footer
    footer: {
      message: 'Personal Developer Wiki & Technical Knowledge Base',
      copyright: 'Copyright © 2026'
    },

    // Document Footer Navigation
    docFooter: {
      prev: 'Previous Page',
      next: 'Next Page'
    }
  }
})
