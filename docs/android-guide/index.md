# 🚀 The Complete Android Developer Guide (Zero to Hero)

Welcome to the comprehensive, step-by-step Android engineering curriculum. This guide is built from the ground up for absolute beginners, teaching you how modern Android applications are built, how Kotlin works, and how high-performance media players like **mpvRex** are structured and maintained.

---

## 📚 Curriculum Table of Contents

### 🟢 Core Foundations & Fundamentals
- [**What is an Android App Really?**](/android-guide/lesson-01-what-is-an-android-app) — APK anatomy, ART runtime, sandboxing, and compilation.
- [**Android Project Anatomy Decoded**](/android-guide/lesson-02-project-anatomy) — Manifest, resources, source code, and assets in plain English.
- [**Gradle Build System Demystified**](/android-guide/lesson-03-gradle-demystified) — Dependencies, plugins, compilation tasks, and mobile Termux init scripts.
- [**Kotlin Fundamentals for Beginners**](/android-guide/lesson-04-kotlin-fundamentals) — `val` vs `var`, null safety (`?`, `!!`), basic types, and strings.
- [**Functions, Lambdas & Scopes**](/android-guide/lesson-05-functions-and-lambdas) — Functions, default arguments, trailing lambdas `{ }`, and scope functions.
- [**Classes, Data Classes & Objects**](/android-guide/lesson-06-classes-and-objects) — Modeling state, singletons, companion objects, and data structures.
- [**The Android Activity & Lifecycle**](/android-guide/lesson-07-activity-lifecycle) — `MainActivity`, lifecycle states (`onCreate`, `onPause`, `onDestroy`), and surviving app backgrounding.

### 🎨 Modern UI with Jetpack Compose
- [**The Declarative Mental Shift**](/android-guide/lesson-08-compose-mental-shift) — Why Compose replaces XML, state-driven UI rendering.
- [**Layout Primitives (`Box`, `Column`, `Row`)**](/android-guide/lesson-09-layout-primitives) — How UI elements position and stack on screen.
- [**Modifiers Deep Dive**](/android-guide/lesson-10-modifiers-deep-dive) — Sizing, padding, clicks, graphics layers, and execution order.
- [**Compose State & Recomposition**](/android-guide/lesson-11-compose-state) — Recomposition, `remember`, `mutableStateOf`, and state hoisting.
- [**High-Performance Lists (`LazyColumn`)**](/android-guide/lesson-12-lazy-lists) — Virtualized lists, item recycling, and unique keys.
- [**Material 3 Theming & Styling**](/android-guide/lesson-13-theming) — Color schemes, typography, dark mode, and dynamic theming.
- [**Fluid Animations & Transitions**](/android-guide/lesson-14-animations) — `AnimatedVisibility`, `animateFloatAsState`, and smooth HUD transitions.
- [**Drawing Custom Graphics with Canvas**](/android-guide/lesson-15-canvas-drawing) — Coordinate geometry, drawing paths, bars, and waves for player seekbars.

### 🧠 Architecture, Concurrency & State
- [**Unidirectional Data Flow (UDF)**](/android-guide/lesson-16-udf-pattern) — Single source of truth: events go up, state flows down.
- [**ViewModels & UI State Holders**](/android-guide/lesson-17-viewmodels) — Surviving screen rotation, keeping logic out of UI files.
- [**Kotlin Coroutines Demystified**](/android-guide/lesson-18-coroutines) — Asynchronous programming, `suspend`, `launch`, and Thread dispatchers.
- [**Reactive Streams with Kotlin Flow & StateFlow**](/android-guide/lesson-19-flow-and-stateflow) — Real-time reactive data updates in Compose.
- [**Dependency Injection (DI) with Koin**](/android-guide/lesson-20-koin-di) — Decoupling components and providing services with `koinInject()`.
- [**Settings & Data Persistence**](/android-guide/lesson-21-data-persistence) — SharedPreferences, DataStore, and persistent user configuration.
- [**Compose Navigation Architecture**](/android-guide/lesson-22-navigation) — `NavHost`, type-safe routes, back-stack management.
- [**Defensive Programming & Error Recovery**](/android-guide/lesson-23-error-handling) — Preventing crashes, `Result` wrapper pattern, and logs.

### 🗄️ Database & Offline Storage (Room & SQLite)
- [**SQLite & Room Architecture Fundamentals**](/android-guide/database-room-fundamentals) — Android Bionic SQLite engine, WAL mode, thread connection pooling, and Room singleton setup.
- [**Schema Design, Entities & Type Converters**](/android-guide/database-schema-entities) — Auto-increment vs natural keys, foreign keys (`CASCADE`), indices, and `@TypeConverter` enums.
- [**DAOs, Reactive Flow Queries & Transactions**](/android-guide/database-daos-queries) — Modern `@Upsert`, subqueries with `COALESCE`, pagination, `@Transaction` reordering, and live `Flow` updates.
- [**Database Migrations & Schema Evolution Masterclass**](/android-guide/database-migrations-masterclass) — Zero data-loss migrations, `ALTER TABLE ADD COLUMN`, the 12-step table recreation pattern, and mpvRex v1 to v18 evolution.
- [**Repository Pattern & Jetpack Compose Integration**](/android-guide/database-repository-compose) — Clean Architecture, DI with Koin, lifecycle-aware `stateIn()` collection, and real-time Compose UI rendering.
- [**Room Database Masterclass Overview**](/android-guide/lesson-46-room-database) — Quickstart overview of entities, DAOs, and metadata caching in SQLite.

### 🎬 Media Engines, Gestures & Native JNI
- [**How Video Playback Actually Works**](/android-guide/lesson-24-how-video-works) — Containers, demuxing, video/audio decoders, and frame pipelines.
- [**Displaying Video: SurfaceView vs TextureView**](/android-guide/lesson-25-surfaceview-textureview) — Rendering video hardware buffers on Android screens.
- [**JNI & Native C/C++ in Android**](/android-guide/lesson-26-jni-native-code) — How Kotlin communicates with C libraries like `libmpv`.
- [**Player State Machines**](/android-guide/lesson-27-player-state-machine) — Managing `Idle`, `Buffering`, `Playing`, `Paused`, and `Seeking`.
- [**Multi-Touch & Gesture Detection**](/android-guide/lesson-28-touch-and-gestures) — Pointer input, drag math, double taps, and pinch-to-zoom.
- [**Video Controls Overlay & Auto-Hide HUD**](/android-guide/lesson-29-controls-overlay) — Timers, touch interception, and animated overlays.
- [**Edge Swiping: Brightness, Volume & Seek**](/android-guide/lesson-30-edge-swipes) — Calculating swipe deltas and drawing screen HUD indicators.
- [**Audio & Subtitle Track Switching**](/android-guide/lesson-31-tracks-subtitles) — Extracting track lists, switching languages, and parsing subtitles.
- [**Background Playback, Audio Focus & PIP**](/android-guide/lesson-32-background-pip) — Picture-in-Picture mode, audio ducking, and headphone unplug events.
- [**Hardware vs Software Decoding**](/android-guide/lesson-33-decoding-modes) — MediaCodec vs CPU decoding tradeoffs and battery optimization.
- [**MediaSession & Lock Screen Controls**](/android-guide/lesson-34-mediasession) — Lock screen media cards, Bluetooth headsets, and notification tiles.
- [**Network Streaming & Remote Protocols**](/android-guide/lesson-35-network-streaming) — HLS (.m3u8), DASH, SMB, WebDAV, and Jellyfin integration.
- [**Custom Video Shaders & Post-Processing (GLSL)**](/android-guide/lesson-36-custom-shaders) — GPU shader hooks, HDR-Toys tone mapping, and Anime4K upscaling.

### 🛠️ Reverse-Engineering & Building Real Features
- [**The Mental Model of Reading Large Codebases**](/android-guide/lesson-37-reading-codebases) — How to navigate 100k+ lines without feeling overwhelmed.
- [**Precision Search with CLI Tools**](/android-guide/lesson-38-cli-search-mastery) — Using `ripgrep`, `fd`, and `fzf` in Termux to locate any symbol in seconds.
- [**Feature Tracing: UI Tap to Native Core**](/android-guide/lesson-39-feature-tracing) — Walking call stacks from a button click down to `libmpv`.
- [**Blueprint: Adding a New Preference & Setting**](/android-guide/lesson-40-adding-settings) — `strings.xml` ➔ DataStore ➔ Settings UI ➔ Engine behavior.
- [**Blueprint: Building a Custom Video Component**](/android-guide/lesson-41-custom-components) — Designing, drawing, and wiring a custom seekbar from scratch.
- [**Debugging on Mobile with Logcat**](/android-guide/lesson-42-mobile-debugging) — Reading logs, filtering tags, and resolving stack traces in Termux.
- [**Mobile Git & Jujutsu (jj) Workflows**](/android-guide/lesson-43-mobile-git-workflow) — Atomic commits, branch hygiene, and Jujutsu VCS in Termux.
- [**Capstone Blueprint: Building a Standalone App**](/android-guide/lesson-44-building-standalone-app) — Step-by-step architecture blueprint for a new Android project.
- [**From Learner to Maintainer**](/android-guide/lesson-45-maintainer-guide) — Code review best practices, safe upgrades, and release management.
