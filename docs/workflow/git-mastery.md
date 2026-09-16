# 🐙 Git & Rebase Mastery

Clean version control workflows, commit isolation rules, and rebase strategies for Android & cross-platform development.

---

## 📜 Core Rules

1. **Explicit Commits Only:** Never auto-commit or push unless explicitly requested.
2. **Rebase Over Merge:** Keep commit history linear and clean by always rebasing feature branches against `master`/`main`.
3. **Separate Structural Refactors & Features:** Keep refactors (namespace updates, directory moves) in distinct commits separate from UI fixes or feature additions.

---

## ⚡ Essential Commands

### 1. Rebase Against Main
```bash
git fetch origin
git rebase origin/master
```

### 2. Interactive Rebase & Squash
Clean up local WIP commits before pushing:
```bash
git rebase -i HEAD~3
```

### 3. Stage Specific Files
Avoid blanket `git add .` when working on Android storage or Termux environments:
```bash
git add app/src/main/kotlin/path/to/File.kt
git commit -m "feat: Add custom playback option"
```

### 4. Git Stash Workflow
```bash
git stash save "WIP feature implementation"
git pull --rebase origin master
git stash pop
```
