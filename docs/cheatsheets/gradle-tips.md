# ⚡ Gradle & Build Speed Optimization Cheat Sheet

Building Android projects—especially on mobile devices (Termux, AndroidIDE) or low-RAM environments—can be painfully slow if Gradle is misconfigured.

This cheat sheet collects the most effective **build speed flags**, **caching rules**, and **command shortcuts** for lightning-fast compilation.

---

## 1. The Golden Rule: Targeted Compilation

Never run a full APK build (`./gradlew assembleDebug`) when you only want to verify if your Kotlin code compiles without syntax errors!

| What You Want To Do | Fast Command | Why It Saves Time |
| :--- | :--- | :--- |
| **Verify Kotlin Syntax** | `./gradlew compileDebugKotlin` | Skips resource packaging, DEX merging, AAPT2, and APK signing. Runs in ~5-10s instead of minutes! |
| **Verify Specific Subproject** | `./gradlew :app:compileDebugKotlin` | Only compiles the `:app` module. |
| **Fast Install to Device** | `./gradlew installDebug` | Compiles, builds, and pushes directly to ADB device in one step. |
| **Offline Fast Build** | `./gradlew compileDebugKotlin --offline` | Stops Gradle from pinging maven/Google repositories over the network. |

---

## 2. Essential `gradle.properties` Optimizations

Create or edit `~/.gradle/gradle.properties` or `<project-root>/gradle.properties`:

```properties
# Keep the Gradle daemon alive in the background
org.gradle.daemon=true

# Compile independent modules in parallel
org.gradle.parallel=true

# Reuse compilation outputs from previous builds across branches
org.gradle.caching=true

# Fine-tune JVM memory (adjust according to your phone/PC RAM)
# For 8GB RAM devices:
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m -XX:+UseParallelGC

# Enable Kotlin incremental compilation
kotlin.incremental=true
kotlin.incremental.usePreciseJavaTracking=true
```

---

## 3. Fast CLI Flags Matrix

| Flag | Purpose | When to Use |
| :--- | :--- | :--- |
| `--offline` | Disables network calls | When working without internet or on slow mobile data. |
| `--parallel` | Compiles decoupled modules concurrently | On multi-core processors. |
| `--build-cache` | Reuses task outputs from previous runs | When switching branches or rebasing. |
| `--configure-on-demand` | Only configures modules required by requested task | On multi-module projects. |
| `-x test` | Skips unit tests during build | When doing rapid UI prototyping. |
| `--console=plain` | Strips interactive ANSI animation | Inside Termux / headless scripts to reduce CPU overhead. |

---

## 4. Mobile / Termux Build Acceleration: Init Scripts

When developing inside Termux / Android chroot environments (like **mpvRex**), you can supply a custom init script using `-I`:

```bash
./gradlew compileDebugKotlin -I local-env.gradle.kts
```

This points Gradle directly to the local Android SDK directory (`ANDROID_HOME`) and Java runtime (`JAVA_HOME`) without re-querying system variables every run.

---

## 5. What NEVER To Do 🛑

1. **Never run `./gradlew clean` before every build**: Clean destroys the Gradle build cache and Kotlin incremental data, forcing a 100% recompilation from scratch. Only clean if you suspect a corrupt build artifact.
2. **Never chain Gradle with git in single line**: E.g. `./gradlew assembleDebug && git commit ...` is dangerous because errors can get masked and mobile background killers can terminate mid-flow. Run each step deliberately.
