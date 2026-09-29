# ⚡ High-Speed Context Extraction in Ubuntu on Android

When acting as the human harness between your mobile project and a free web LLM, your biggest bottleneck is **getting the right code into your phone's clipboard quickly**.

If you manually open a file, drag your thumb across 200 lines to select text, and switch apps, you will waste minutes per prompt. In this guide, you will learn how to extract targeted, token-efficient context directly into your Android clipboard with single CLI commands inside your **Ubuntu chroot** environment.

---

## 📋 1. The Architecture: Localhost Socket Clipboard Bridge

Inside an **Ubuntu chroot/sandbox** running on Android via Termux, standard Bionic binaries like `/data/data/com.termux/.../termux-clipboard-set` cannot run due to Bionic libc vs GNU glibc differences and Android UID sandbox boundaries.

Instead, your environment uses a **Localhost Socket Bridge**:
1. **Termux Host:** Runs a background `socat` listener on `127.0.0.1:28282` connected to Android's `termux-clipboard-set`.
2. **Ubuntu Environment:** The `/usr/local/bin/clip` wrapper script streams text over bash's native `/dev/tcp/127.0.0.1/28282` directly into the Android clipboard with zero external package dependencies!

### The Command: `clip`
Inside Ubuntu, you pipe any terminal output straight to Android's clipboard:
```bash
echo "Hello from Ubuntu!" | clip
```

---

## ✂️ 2. Method 1: Slicing Exact Line Ranges with `sed`

Never feed an entire 1,500-line ViewModel to a web AI when you only need to modify one function. High-token prompts confuse free models and cause them to truncate responses.

### How to Copy Exact Lines to Clipboard
Suppose lines 85 to 135 in `PlayerViewModel.kt` contain the function you want to modify:

```bash
# Preview lines in terminal first:
sed -n '85,135p' app/src/main/kotlin/xyz/mpv/rex/ui/player/PlayerViewModel.kt

# Copy directly to Android clipboard:
sed -n '85,135p' app/src/main/kotlin/xyz/mpv/rex/ui/player/PlayerViewModel.kt | clip
```

Now simply switch to your browser and tap **Paste**!

---

## 🔍 3. Method 2: Precision Symbol Extraction with `ripgrep`

If you don't know the line numbers but know the function or class name:

```bash
# Extract function definition with 10 lines of surrounding context straight to clipboard:
rg -C 10 "fun handleTrackSelection" app/src/main/ | clip
```

---

## 📦 4. Method 3: The Built-in `ctx` File Helper

Your Ubuntu environment already includes `/usr/local/bin/ctx` ([`README.md`](file:///root/Projects/dev-likeAPro/README.md)):

```bash
# Formats file with markdown syntax highlighting and sends to Android clipboard:
ctx app/src/main/kotlin/xyz/mpv/rex/database/dao/PlaylistDao.kt
```

Switch to ChatGPT / Claude / Gemini and hit Paste. It instantly receives:

````markdown
```kt
package xyz.mpv.rex.database.dao
... full file contents ...
```
````

---

## 📊 5. Method 4: Packaging Git Diffs for Fast Code Review

When asking an AI: *"Did I break anything with this change?"* or *"Write a unit test for my recent edits"*, feed it a clean `git diff`:

```bash
# 1. Copy unstaged working tree changes:
git diff | clip

# 2. Copy the most recent commit:
git show HEAD | clip

# 3. Copy diff between your branch and master:
git diff origin/master...HEAD | clip
```

---

## 🚀 6. The Master Multi-File Context Bundler (`bundle-ctx.sh`)

When you are wiring a feature that touches **an Entity, a DAO, a Repository, and a ViewModel**, you need to feed all 4 files at once.

Save this script as `/usr/local/bin/bundle-ctx`:

```bash
#!/usr/bin/env bash
# Usage: bundle-ctx file1.kt file2.kt file3.kt ...

if [ "$#" -eq 0 ]; then
    echo "Usage: bundle-ctx <file1> <file2> ..."
    exit 1
fi

{
    echo "# Project Context Bundle"
    echo "Generated on: $(date)"
    echo ""
    for file in "$@"; do
        if [ -f "$file" ]; then
            echo "## File: \`$file\`"
            echo '```kotlin'
            cat "$file"
            echo '```'
            echo ""
        else
            echo "⚠️ Warning: '$file' not found." >&2
        fi
    done
} | clip

echo "🚀 Bundled $# files and copied directly to Android clipboard!"
```

Make it executable:
```bash
chmod +x /usr/local/bin/bundle-ctx
```

### Execution:
```bash
bundle-ctx \
    app/src/main/kotlin/xyz/mpv/rex/database/entities/PlaylistEntity.kt \
    app/src/main/kotlin/xyz/mpv/rex/database/dao/PlaylistDao.kt \
    app/src/main/kotlin/xyz/mpv/rex/database/repository/PlaylistRepository.kt
```
In 1 second, your entire architecture slice is formatted in markdown and ready to paste into free web AI chats.
