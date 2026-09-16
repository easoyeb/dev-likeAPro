# 📱 Termux & AndroidIDE Development Setup

Guidelines for developing Kotlin/Android applications inside Termux / AndroidIDE environments on Android devices.

---

## ⚠️ Environment Constraints & Ownership

- **Storage Permissions:** Android shared storage (`/sdcard`) does not preserve standard POSIX file permissions. Keep git projects in `$HOME/Projects/` or local app storage.
- **Gradle Initialization Script:** Always pass local environment init scripts to optimize build speed and target local ABI (`arm64-v8a`).

---

## 🛠️ Gradle Execution Rules

### Local Development Builds
```bash
./gradlew installDebug -I local-env.gradle.kts
```

### Fast Compilation Check
When working on large multi-file edits, quickly test syntax and compilation without full packaging:
```bash
./gradlew compileDebugKotlin -I local-env.gradle.kts
```

### Strict Command Rule
> **Rule:** Never run a Gradle command without `-I local-env.gradle.kts`.
