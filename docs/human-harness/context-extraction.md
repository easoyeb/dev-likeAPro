# ⚡ High-Speed Context Extraction in Termux

When acting as the human harness between your mobile project and a free web LLM, your biggest bottleneck is **getting the right code into your phone's clipboard quickly**.

If you manually open a file, drag your thumb across 200 lines to select text, and switch apps, you will waste minutes per prompt. In this guide, you will learn how to extract targeted, token-efficient context directly into your Android clipboard with single CLI commands in **Termux**.

---

## 📋 1. Essential Termux Setup: `termux-api`

To pipe terminal output straight into your Android system clipboard, ensure the Termux API package is installed:

```bash
# In Termux:
pkg install termux-api
```
*(Make sure the Termux:API app is installed on your phone from F-Droid).*

Once installed, you have two superpower commands:
- **`termux-clipboard-set`:** Copies stdin directly to Android's clipboard.
- **`termux-clipboard-get`:** Prints whatever is currently in your Android clipboard.

---

## ✂️ 2. Method 1: Slicing Exact Line Ranges with `sed`

Never feed an entire 1,500-line ViewModel to a web AI when you only need to modify one function. High-token prompts confuse free models and cause them to truncate responses.

### How to Copy Exact Lines to Clipboard
Suppose lines 85 to 135 in `PlayerViewModel.kt` contain the function you want to modify:

```bash
# Preview lines in terminal first:
sed -n '85,135p' app/src/main/kotlin/xyz/mpv/rex/ui/player/PlayerViewModel.kt

# Copy directly to Android clipboard:
sed -n '85,135p' app/src/main/kotlin/xyz/mpv/rex/ui/player/PlayerViewModel.kt | termux-clipboard-set
```

Now simply switch to your browser and tap **Paste**!

---

## 🔍 3. Method 2: Precision Symbol Extraction with `ripgrep`

If you don't know the line numbers but know the function or class name:

```bash
# Extract function definition with 10 lines of surrounding context:
rg -C 10 "fun handleTrackSelection" app/src/main/ | termux-clipboard-set
```

---

## 📦 4. Method 3: Bundling Code with File Headers Automatically

Web AIs give much better code when they know the exact file path and package name. Instead of manually typing:
> *"Here is file `app/src/main/.../MyFile.kt`:"*

Use this bash function in your `~/.bashrc`:

```bash
# Add this function to your ~/.bashrc in Termux:
ctx() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "Error: File '$file' does not exist."
        return 1
    fi

    {
        echo "File: \`$file\`"
        echo '```kotlin'
        cat "$file"
        echo '```'
    } | termux-clipboard-set

    echo "✅ Copied '$file' to clipboard with Markdown formatting!"
}
```

### Usage:
```bash
ctx app/src/main/kotlin/xyz/mpv/rex/database/dao/PlaylistDao.kt
```
Now switch to ChatGPT / Claude / Gemini and hit Paste. It instantly receives:

````markdown
File: `app/src/main/kotlin/xyz/mpv/rex/database/dao/PlaylistDao.kt`
```kotlin
package xyz.mpv.rex.database.dao
... full file contents ...
```
````

---

## 📊 5. Method 4: Packaging Git Diffs for Fast Code Review

When asking an AI: *"Did I break anything with this change?"* or *"Write a unit test for my recent edits"*, feed it a clean `git diff`:

```bash
# 1. Copy unstaged working tree changes:
git diff | termux-clipboard-set

# 2. Copy the most recent commit:
git show HEAD | termux-clipboard-set

# 3. Copy diff between your branch and master:
git diff origin/master...HEAD | termux-clipboard-set
```

---

## 🚀 6. The Master Multi-File Context Bundler (`bundle-ctx.sh`)

When you are wiring a feature that touches **an Entity, a DAO, a Repository, and a ViewModel**, you need to feed all 4 files at once.

Save this script as `~/bin/bundle-ctx.sh`:

```bash
#!/usr/bin/env bash
# Usage: bundle-ctx.sh file1.kt file2.kt file3.kt ...

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
} | termux-clipboard-set

echo "🚀 Bundled $# files and copied directly to Android clipboard!"
```

### Execution:
```bash
bundle-ctx.sh \
    app/src/main/kotlin/xyz/mpv/rex/database/entities/PlaylistEntity.kt \
    app/src/main/kotlin/xyz/mpv/rex/database/dao/PlaylistDao.kt \
    app/src/main/kotlin/xyz/mpv/rex/database/repository/PlaylistRepository.kt
```
In 1 second, your entire architecture slice is formatted in markdown and ready to paste into free web AI chats.
