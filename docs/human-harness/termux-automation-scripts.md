# 🧰 Automating the Middleman: Termux Shell Toolkit

To make your **Human Harness** workflow feel just as fast as an automated agent, you need terminal shortcuts.

In this guide, you will get a ready-to-use **bash script toolkit** for Termux that automates:
1. Extracting context to clipboard (`ai-ctx`)
2. Packaging git diffs (`ai-diff`)
3. Applying clipboard diffs (`ai-patch`)
4. Capturing compiler errors into ready-to-paste prompts (`ai-error`)
5. Capturing Logcat runtime crashes (`ai-logcat`)

---

## 🛠️ Step 1: Install the Toolkit in Termux

Run these commands in Termux to create your personal script directory and ensure `termux-api` is installed:

```bash
pkg install termux-api git
mkdir -p ~/bin
export PATH="$HOME/bin:$PATH"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
```

---

## 📜 Script 1: `ai-ctx` (Instant Context Extractor)

Save this script as `~/bin/ai-ctx`:

```bash
#!/usr/bin/env bash
# Usage:
#   ai-ctx app/src/main/File.kt
#   ai-ctx app/src/main/File.kt 50 120 (extracts lines 50 to 120)

FILE="$1"
START="$2"
END="$3"

if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
    echo "Usage: ai-ctx <file_path> [start_line] [end_line]"
    exit 1
fi

if [ -n "$START" ] && [ -n "$END" ]; then
    {
        echo "File: \`$FILE\` (Lines $START-$END)"
        echo '```kotlin'
        sed -n "${START},${END}p" "$FILE"
        echo '```'
    } | termux-clipboard-set
    echo "📋 Copied lines $START-$END of $FILE to clipboard!"
else
    {
        echo "File: \`$FILE\`"
        echo '```kotlin'
        cat "$FILE"
        echo '```'
    } | termux-clipboard-set
    echo "📋 Copied entire file $FILE to clipboard!"
fi
```
Make it executable:
```bash
chmod +x ~/bin/ai-ctx
```

---

## 📜 Script 2: `ai-diff` (Diff to Clipboard)

Save this script as `~/bin/ai-diff`:

```bash
#!/usr/bin/env bash
# Usage:
#   ai-diff          (copies uncommitted working changes)
#   ai-diff HEAD~1   (copies last commit)

TARGET="${1:-}"

{
    echo "# Current Git Diff for Review"
    echo '```diff'
    if [ -z "$TARGET" ]; then
        git diff
    else
        git show "$TARGET"
    fi
    echo '```'
} | termux-clipboard-set

echo "📋 Git diff copied to Android clipboard!"
```
Make it executable:
```bash
chmod +x ~/bin/ai-diff
```

---

## 📜 Script 3: `ai-patch` (1-Click Clipboard Patch Applier)

Save this script as `~/bin/ai-patch`:

```bash
#!/usr/bin/env bash
# Usage: ai-patch [--check]

MODE="$1"

if [ "$MODE" = "--check" ]; then
    echo "🔍 Dry-running patch from clipboard..."
    termux-clipboard-get | git apply --check
    if [ $? -eq 0 ]; then
        echo "✅ Patch matches cleanly! Run 'ai-patch' to apply."
    else
        echo "❌ Patch failed dry-run check. Local files may differ."
    fi
else
    echo "⚡ Applying patch from clipboard..."
    termux-clipboard-get | git apply -v
    if [ $? -eq 0 ]; then
        echo "🎉 Successfully applied AI patch!"
        git status --short
    else
        echo "⚠️ Patch application failed. Try dry-running with 'ai-patch --check'."
    fi
fi
```
Make it executable:
```bash
chmod +x ~/bin/ai-patch
```

---

## 📜 Script 4: `ai-error` (Compiler Error Packager)

When a Gradle build fails, you don't need to manually scroll and copy the errors. This script runs a fast Kotlin compilation check and automatically formats the error into your clipboard:

Save this script as `~/bin/ai-error`:

```bash
#!/usr/bin/env bash
# Usage: ai-error

echo "🔨 Running fast compilation check..."
BUILD_OUTPUT=$(./gradlew compileDebugKotlin --quiet 2>&1)

if [ $? -eq 0 ]; then
    echo "🎉 Compilation succeeded with zero errors!"
else
    {
        echo "### KOTLIN COMPILER ERROR:"
        echo '```text'
        echo "$BUILD_OUTPUT" | tail -n 25
        echo '```'
        echo ""
        echo "Please fix this error based on the files provided earlier. Output only the corrected code block."
    } | termux-clipboard-set

    echo "❌ Build failed. Error prompt copied directly to Android clipboard!"
    echo "👉 Switch to your web AI chat and hit Paste!"
fi
```
Make it executable:
```bash
chmod +x ~/bin/ai-error
```

---

## 📜 Script 5: `ai-logcat` (Crash & Exception Grabber)

When the app crashes on your phone, run this to copy the crash stack trace directly:

Save this script as `~/bin/ai-logcat`:

```bash
#!/usr/bin/env bash
# Usage: ai-logcat [lines, default 40]

LINES="${1:-40}"

echo "📱 Capturing last $LINES lines of Logcat errors..."
{
    echo "### RUNTIME LOGCAT CRASH DUMP:"
    echo '```text'
    logcat -d -t "$LINES" *:E | grep -v "chatty"
    echo '```'
    echo ""
    echo "Analyze this exception and provide the fix."
} | termux-clipboard-set

echo "📋 Logcat crash dump copied to clipboard!"
```
Make it executable:
```bash
chmod +x ~/bin/ai-logcat
```

---

## ⚡ The Full 30-Second Workflow in Action

Here is what your daily coding loop looks like using this toolkit:

1. **Extract Context:**
   ```bash
   ai-ctx app/src/main/kotlin/xyz/mpv/rex/ui/player/PlayerViewModel.kt 80 140
   ```
2. **Switch to Web Chat:** Tap **Paste** and send.
3. **Copy AI Output:** Tap the AI's "Copy Code" button.
4. **Apply Patch in Termux:**
   ```bash
   ai-patch
   ```
5. **Verify Build:**
   ```bash
   ai-error
   ```
   *(If errors occur, it automatically re-copies the prompt to clipboard—just paste back to the AI!)*

You are now operating at agentic speed with **$0 subscription costs**!
