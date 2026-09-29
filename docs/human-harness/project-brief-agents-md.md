# 📋 The Portable Project Brief (`AGENTS.md`)

When you use an automated agent, it reads a system prompt or configuration file behind the scenes on every invocation. 

When you act as the **Human Harness**, you must provide that baseline context yourself. Instead of typing your project's rules, library versions, and architecture from memory in every conversation, you maintain a compact, 30-line file in your repository root called **`AGENTS.md`** (or `PROJECT_BRIEF.md`).

Pasting this file at the start of a chat takes **1 tap** and prevents 90% of AI hallucinations.

---

## 🏗️ 1. Real-World Production Template (`AGENTS.md`)

Create this file at the root of your project:

```markdown
# PROJECT BRIEF: mpvRex (Android Video Player)

## 1. Architecture & Design Patterns
- Architecture: Clean Architecture + Unidirectional Data Flow (UDF).
- UI Layer: 100% Jetpack Compose with Material 3. No XML views.
- State Management: ViewModels exposing `StateFlow<UIState>`. UI collects with `collectAsStateWithLifecycle()`.
- Data & Persistence: Room Persistence Library (SQLite) + Preferences DataStore.
- Dependency Injection: Koin (`koinViewModel()`, `singleOf`, `inject()`).
- Media Engine: Native `libmpv.so` via JNI bindings and SurfaceView.

## 2. Concurrency & Threading Rules
- Database queries, file system scans, and JNI operations MUST use `withContext(Dispatchers.IO)`.
- Never execute blocking calls on `Dispatchers.Main`.
- Flow transformations must use `SharingStarted.WhileSubscribed(5_000)` to preserve phone battery.

## 3. Environment & Build Constraints
- Development Environment: Android device running Ubuntu 24.04 chroot (via Termux) and AndroidIDE.
- NO DESKTOP ANDROID STUDIO: Do not suggest GUI-based menus or Android Studio wizards.
- Git Safety: Never chain multiple git commands with `&&` (e.g. `add && commit && push`). Always execute git steps independently.
- Clean Diffs: Provide changes as Search/Replace blocks or unified diffs. Never truncate code with `// ... rest of code unchanged`.
```

---

## ⚡ 2. The 1-Tap Clipboard Shortcut

Add this alias to your `~/.bashrc` in Ubuntu:

```bash
alias ctx-brief="cat ~/Projects/mpvRex/AGENTS.md | clip && echo '📋 AGENTS.md copied to Android clipboard!'"
```

Whenever you open a new chat window in ChatGPT, Claude, or Gemini:
1. In your Ubuntu terminal, type:
   ```bash
   ctx-brief
   ```
2. Switch to the browser and hit **Paste**.
3. Now the AI has the complete architectural blueprint of your app before you ask a single question!

---

## 🎯 What this Eliminates

| Without `AGENTS.md` | With `AGENTS.md` |
| :--- | :--- |
| AI suggests XML layouts or `findViewById()` | AI writes 100% Jetpack Compose UI |
| AI suggests Hilt or Dagger injection | AI writes clean Koin DI definitions |
| AI runs database queries on Main thread | AI wraps Room operations in `Dispatchers.IO` |
| AI suggests desktop Android Studio menus | AI gives Termux/CLI compatible solutions |
