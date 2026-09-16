# 🥋 Jujutsu (`jj`) Mastery Guide

A comprehensive, practical guide to using **Jujutsu (`jj`)** — the modern, Git-compatible version control system. Designed for solo developers, open-source maintainers, and teams who want fearless editing, automatic rebasing, and no staging area friction.

---

## 🧠 The `jj` Mental Model vs Git

| Concept | Git | Jujutsu (`jj`) |
| :--- | :--- | :--- |
| **Working Copy** | Uncommitted working tree on disk | **Always a live commit (`@`)** |
| **Staging Area** | Manual `git add <files>` | **None** (changes are tracked live in `@`) |
| **Branches** | Mandatory names to keep commits alive | **Optional Bookmarks** (commits are first-class) |
| **Identities** | 40-character SHA hash (`7fbf02f`) | **Stable Change ID** (`ywxxpyxp`) + Commit SHA |
| **Rebasing** | Manual, error-prone merge conflict loops | **Automatic & Transparent** (live DAG updates) |
| **Undo / Safety** | Limited `git reflog` | **Full Operation Log** (`jj op log` & `jj undo`) |

---

## 🚀 Daily Workflow

### 1. Starting a New Task
In `jj`, you don't need to create a branch first. Just create a new commit:
```bash
jj new
```
This puts you at a clean working commit (`@`) sitting on top of your previous work.

### 2. Making Changes & Live Tracking
Edit your files normally. `jj` automatically tracks file modifications in the background:
```bash
jj status
```
*No `git add` required!*

### 3. Adding or Updating the Commit Message
You can describe your commit at **any time** — before, during, or after making changes:
```bash
jj describe -m "feat(ui): implement Material 3 Expressive grouped cards"
```

### 4. Viewing History
```bash
jj log
```
Shows a clean ASCII graph of your commit stack, change IDs, and bookmarks.

---

## 🔖 Working with Bookmarks (Git Branches)

In `jj`, branches are called **Bookmarks**. They are lightweight pointers used for pushing to Git remotes (like GitHub).

### Moving a Bookmark to Current Work
When you are ready to publish:
```bash
jj bookmark set master -r @
```

### Tracking Remote Bookmarks
If pushing for the first time or tracking an upstream branch:
```bash
jj bookmark track master@origin
```

### Pushing to GitHub / Git Remote
```bash
jj git push
```

---

## 🛠️ Common Scenarios & Solutions

### Q1: What if I forgot `jj new` and continued working?
All changes you just made are in the current commit `@`. You have two options:
* **Option A (Keep together):** Just describe the commit with `jj describe -m "..."` and move forward with `jj new`.
* **Option B (Split them up):** Use `jj split` to interactively separate your changes into two distinct commits.

### Q2: What if I ran `jj new` without describing the previous commit?
Don't worry! In `jj`, nothing is lost. The previous commit remains in your history as `(no description set)`.
You can describe it at any time using its change ID:
```bash
jj describe -r <change-id> -m "feat: your message here"
```

### Q3: How do I remove a randomly created file / secret?
* **In the current commit (`@`):**
  * Delete from disk: `rm my_secret.jks` (`jj` auto-detects deletion).
  * Keep on disk but untrack:
    ```bash
    jj file untrack my_secret.jks
    echo "my_secret.jks" >> .git/info/exclude
    ```
* **In an older commit in the stack:**
  1. Jump into the old commit: `jj edit <change-id>`
  2. Delete or untrack the file: `rm my_secret.jks`
  3. Return to latest work: `jj new master` (all descendant commits automatically rebase!).

### Q4: Can I use `git` and `jj` simultaneously?
**Yes!** `jj` colocates directly with Git (`.jj` lives alongside `.git`).
* `jj` commands immediately update the Git state.
* If you run a `git` command (like `git status`), `jj` detects changes on the next invocation automatically.

---

## ⚡ Essential Commands Cheat Sheet

| Task | Command |
| :--- | :--- |
| **New commit** | `jj new` |
| **Set message** | `jj describe -m "message"` |
| **View status** | `jj status` |
| **View log** | `jj log` |
| **Move bookmark** | `jj bookmark set <name> -r @` |
| **Push to Git** | `jj git push` |
| **Fetch from Git** | `jj git fetch` |
| **Edit old commit** | `jj edit <change-id>` |
| **Squash into parent** | `jj squash` |
| **Undo last operation**| `jj undo` |
| **Untrack local file** | `jj file untrack <file>` |
