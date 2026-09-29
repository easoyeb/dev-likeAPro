import { defineConfig } from 'vitepress'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/dev-likeAPro/' : '/',
  title: "Dev Like A Pro",
  description: "Personal Developer Wiki, Architecture Guides & CLI Cheat Sheets",
  lang: 'en-US',
  
  cleanUrls: true,

  themeConfig: {
    siteTitle: '⚡ Dev Like A Pro',

    // Top Navigation Bar
    nav: [
      { text: 'Home', link: '/' },
      { text: '📱 Android Guide', link: '/android-guide/' },
      { text: '🎓 Android Course', link: '/android-course/' },
      { text: 'Architecture', link: '/architecture/ops-manager-pattern' },
      { text: 'Workflows', link: '/workflow/vitepress-mermaid' },
      { text: 'Cheat Sheets', link: '/cheatsheets/cli-tools' },
      { text: '🧠 Human Harness', link: '/human-harness/' }
    ],

    // Multi-Sidebar: Unique sidebar for each documentation section
    sidebar: {
      '/android-guide/': [
        {
          text: '🚀 Course Overview',
          items: [
            { text: 'Curriculum Index', link: '/android-guide/' }
          ]
        },
        {
          text: '🟢 Core Foundations',
          collapsed: false,
          items: [
            { text: 'What is an Android App?', link: '/android-guide/lesson-01-what-is-an-android-app' },
            { text: 'Project Anatomy & Manifest', link: '/android-guide/lesson-02-project-anatomy' },
            { text: 'Gradle Build System Demystified', link: '/android-guide/lesson-03-gradle-demystified' },
            { text: 'Kotlin Fundamentals for Beginners', link: '/android-guide/lesson-04-kotlin-fundamentals' },
            { text: 'Functions, Lambdas & Scopes', link: '/android-guide/lesson-05-functions-and-lambdas' },
            { text: 'Classes, Data Classes & Objects', link: '/android-guide/lesson-06-classes-and-objects' },
            { text: 'Activity & Lifecycle Internals', link: '/android-guide/lesson-07-activity-lifecycle' }
          ]
        },
        {
          text: '🎨 Jetpack Compose UI',
          collapsed: false,
          items: [
            { text: 'Declarative Mental Shift', link: '/android-guide/lesson-08-compose-mental-shift' },
            { text: 'Layout Primitives (Box, Column, Row)', link: '/android-guide/lesson-09-layout-primitives' },
            { text: 'Modifiers Deep Dive', link: '/android-guide/lesson-10-modifiers-deep-dive' },
            { text: 'Compose State & Recomposition', link: '/android-guide/lesson-11-compose-state' },
            { text: 'High-Performance Lazy Lists', link: '/android-guide/lesson-12-lazy-lists' },
            { text: 'Material 3 Theming & Styling', link: '/android-guide/lesson-13-theming' },
            { text: 'Fluid Animations & Transitions', link: '/android-guide/lesson-14-animations' },
            { text: 'Canvas Drawing & Custom Seekbars', link: '/android-guide/lesson-15-canvas-drawing' }
          ]
        },
        {
          text: '🧠 Architecture, State & Concurrency',
          collapsed: false,
          items: [
            { text: 'Unidirectional Data Flow (UDF)', link: '/android-guide/lesson-16-udf-pattern' },
            { text: 'ViewModels & UI State Holders', link: '/android-guide/lesson-17-viewmodels' },
            { text: 'Kotlin Coroutines Demystified', link: '/android-guide/lesson-18-coroutines' },
            { text: 'Reactive Streams with Flow & StateFlow', link: '/android-guide/lesson-19-flow-and-stateflow' },
            { text: 'Dependency Injection with Koin', link: '/android-guide/lesson-20-koin-di' },
            { text: 'Key-Value Persistence (DataStore)', link: '/android-guide/lesson-21-data-persistence' },
            { text: 'Compose Navigation Architecture', link: '/android-guide/lesson-22-navigation' },
            { text: 'Defensive Programming & Error Recovery', link: '/android-guide/lesson-23-error-handling' }
          ]
        },
        {
          text: '🗄️ Database & Offline Storage (Room & SQLite)',
          collapsed: false,
          items: [
            { text: 'SQLite & Room Architecture', link: '/android-guide/database-room-fundamentals' },
            { text: 'Schema Design, Entities & Converters', link: '/android-guide/database-schema-entities' },
            { text: 'DAOs, Queries & Transactions', link: '/android-guide/database-daos-queries' },
            { text: 'Database Migrations Masterclass', link: '/android-guide/database-migrations-masterclass' },
            { text: 'Repository Layer & Compose UI', link: '/android-guide/database-repository-compose' },
            { text: 'Room Database Masterclass Overview', link: '/android-guide/lesson-46-room-database' }
          ]
        },
        {
          text: '🎬 Media Engines, JNI & Gestures',
          collapsed: false,
          items: [
            { text: 'How Video Playback Works', link: '/android-guide/lesson-24-how-video-works' },
            { text: 'SurfaceView vs TextureView', link: '/android-guide/lesson-25-surfaceview-textureview' },
            { text: 'JNI & Native C/C++ in Android', link: '/android-guide/lesson-26-jni-native-code' },
            { text: 'Player State Machines', link: '/android-guide/lesson-27-player-state-machine' },
            { text: 'Multi-Touch & Gesture Detection', link: '/android-guide/lesson-28-touch-and-gestures' },
            { text: 'Video Controls HUD & Auto-Hide', link: '/android-guide/lesson-29-controls-overlay' },
            { text: 'Edge Swipes (Volume, Brightness, Seek)', link: '/android-guide/lesson-30-edge-swipes' },
            { text: 'Audio & Subtitle Track Switching', link: '/android-guide/lesson-31-tracks-subtitles' },
            { text: 'Background Playback, Audio Focus & PiP', link: '/android-guide/lesson-32-background-pip' },
            { text: 'Hardware vs Software Decoding', link: '/android-guide/lesson-33-decoding-modes' },
            { text: 'MediaSession & Lock Screen Controls', link: '/android-guide/lesson-34-mediasession' },
            { text: 'Network Streaming (HLS, DASH, SMB)', link: '/android-guide/lesson-35-network-streaming' },
            { text: 'Custom Video Shaders (GLSL & Anime4K)', link: '/android-guide/lesson-36-custom-shaders' }
          ]
        },
        {
          text: '🛠️ Reverse-Engineering & Blueprints',
          collapsed: false,
          items: [
            { text: 'Mental Model of Reading Large Codebases', link: '/android-guide/lesson-37-reading-codebases' },
            { text: 'High-Speed CLI Code Search (rg, fd, fzf)', link: '/android-guide/lesson-38-cli-search-mastery' },
            { text: 'Feature Call Tracing (UI to Engine)', link: '/android-guide/lesson-39-feature-tracing' },
            { text: 'Blueprint: Adding Settings & Toggles', link: '/android-guide/lesson-40-adding-settings' },
            { text: 'Blueprint: Custom Video Components', link: '/android-guide/lesson-41-custom-components' },
            { text: 'Mobile Debugging with Logcat', link: '/android-guide/lesson-42-mobile-debugging' },
            { text: 'Mobile Git & Jujutsu (jj) Workflows', link: '/android-guide/lesson-43-mobile-git-workflow' },
            { text: 'Capstone: Building a Standalone Player App', link: '/android-guide/lesson-44-building-standalone-app' },
            { text: 'From Learner to Maintainer', link: '/android-guide/lesson-45-maintainer-guide' }
          ]
        }
      ],
      '/android-course/': [
        {
          text: '🚀 Course Curriculum',
          items: [
            { text: 'Course Overview', link: '/android-course/' },
            { text: 'Lesson 1: The Kotlin Decoder', link: '/android-course/kotlin-decoder' },
            { text: 'Lesson 2: Reading Code Like English', link: '/android-course/how-to-read-code' },
            { text: 'Lesson 3: Universal Code Navigation', link: '/android-course/codebase-navigation' },
            { text: 'Lesson 4: The Feature Lifecycle', link: '/android-course/feature-lifecycle' }
          ]
        },
        {
          text: '🛠️ Deep Dive Modules',
          items: [
            { text: 'Module 1: Compose & UI Basics', link: '/android-course/module1-basics' },
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
            { text: 'VitePress & Mermaid Mastery', link: '/workflow/vitepress-mermaid' },
            { text: 'Jujutsu (jj) Mastery', link: '/workflow/jujutsu-mastery' },
            { text: 'Code Search Masterclass', link: '/workflow/code-search' },
            { text: 'Git & Rebase Mastery', link: '/workflow/git-mastery' },
            { text: 'Termux & Android Dev Setup', link: '/workflow/termux-android-dev' }
          ]
        }
      ],
      '/architecture/': [
        {
          text: '🏗️ Architecture & Storage',
          items: [
            { text: 'Ops/Manager Pattern', link: '/architecture/ops-manager-pattern' },
            { text: 'Compose UI & State', link: '/architecture/compose-state' },
            { text: 'Room Database & Caching ⭐', link: '/android-guide/lesson-46-room-database' },
            { text: 'Data Persistence (DataStore)', link: '/android-guide/lesson-21-data-persistence' }
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
      ],
      '/human-harness/': [
        {
          text: '🧠 The Human Harness',
          items: [
            { text: 'Human Harness Blueprint', link: '/human-harness/' },
            { text: 'High-Speed Context Extraction', link: '/human-harness/context-extraction' },
            { text: 'Prompt Templates & Directives', link: '/human-harness/prompt-templates' },
            { text: 'Applying AI Code & Diffs', link: '/human-harness/patching-and-diffs' },
            { text: 'Termux Shell Automation Toolkit', link: '/human-harness/termux-automation-scripts' }
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
