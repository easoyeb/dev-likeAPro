# 🧰 Automating the Middleman: Ubuntu on Android Shell Toolkit

To make your **Human Harness** workflow feel just as fast as an automated agent, you need terminal shortcuts.

In this guide, you will get a ready-to-use **bash script toolkit** for your **Ubuntu chroot environment** that leverages your native `/usr/local/bin/clip` socket bridge to automate:
1. Extracting context to clipboard (`ai-ctx`)
2. Packaging git diffs (`ai-diff`)
3. Slicing public class outlines (`ai-outline`)
4. Capturing compiler errors into ready-to-paste prompts (`ai-error`)
5. Capturing Logcat runtime crashes (`ai-logcat`)
6. Applying Search/Replace blocks (`apply-sr`)

---

## 🛠️ Step 1: Install the Toolkit in Ubuntu

Your environment already has `/usr/local/bin/clip` connected to Android's clipboard via the localhost socket bridge.

Ensure your personal script directory exists and is in `PATH`:

```bash
mkdir -p /usr/local/bin
```

---

## 📜 Script 1: `ai-ctx` (Instant Context Extractor)

Save this script as `/usr/local/bin/ai-ctx`:

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
    } | clip
    echo "📋 Copied lines $START-$END of $FILE to Android clipboard!"
else
    {
        echo "File: \`$FILE\`"
        echo '```kotlin'
        cat "$FILE"
        echo '```'
    } | clip
    echo "📋 Copied entire file $FILE to Android clipboard!"
fi
```
Make it executable:
```bash
chmod +x /usr/local/bin/ai-ctx
```

---

## 📜 Script 2: `ai-diff` (Diff to Clipboard)

Save this script as `/usr/local/bin/ai-diff`:

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
} | clip

echo "📋 Git diff copied to Android clipboard!"
```
Make it executable:
```bash
chmod +x /usr/local/bin/ai-diff
```

---

## 📜 Script 3: `ai-outline` (Symbol & Skeleton Extractor)

When you want to feed an entire class's public API to the AI without wasting tokens on internal method bodies:

Save this script as `/usr/local/bin/ai-outline`:

```bash
#!/usr/bin/env bash
# Usage: ai-outline path/to/File.kt

FILE="$1"

if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
    echo "Usage: ai-outline <file.kt>"
    exit 1
fi

{
    echo "### Class Skeleton Outline: \`$FILE\`"
    echo '```kotlin'
    grep -E '^\s*(class|interface|object|enum|sealed|abstract|fun|val|var)\b' "$FILE" | grep -v 'private '
    echo '```'
} | clip

echo "📋 Compressed public skeleton outline copied to Android clipboard!"
```
Make it executable:
```bash
chmod +x /usr/local/bin/ai-outline
```

---

## 📜 Script 4: `ai-error` (Compiler Error Packager)

When a Gradle build fails, this script runs a fast Kotlin compilation check and automatically formats the error into your Android clipboard:

Save this script as `/usr/local/bin/ai-error`:

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
        echo "Please fix this error based on the files provided earlier. Output only the Search/Replace block."
    } | clip

    echo "❌ Build failed. Error prompt copied directly to Android clipboard!"
    echo "👉 Switch to your web AI chat and hit Paste!"
fi
```
Make it executable:
```bash
chmod +x /usr/local/bin/ai-error
```

---

## 📜 Script 5: `ai-logcat` (Crash & Exception Grabber)

When the app crashes on your phone, run this to copy the crash stack trace directly:

Save this script as `/usr/local/bin/ai-logcat`:

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
    echo "Analyze this exception and provide the Search/Replace fix."
} | clip

echo "📋 Logcat crash dump copied to Android clipboard!"
```
Make it executable:
```bash
chmod +x /usr/local/bin/ai-logcat
```

---

## 📜 Script 6: `apply-sr` (Search/Replace Block Applier)

Save this script as `/usr/local/bin/apply-sr`:

```python
#!/usr/bin/env python3
import sys
import re

def apply_blocks(text):
    file_pattern = re.compile(r'File:\s*[`"]?([^`"\n]+)[`"]?', re.IGNORECASE)
    block_pattern = re.compile(r'<<<<<<<\s*SEARCH\n(.*?)\n=======\n(.*?)\n>>>>>>>\s*REPLACE', re.DOTALL)

    sections = re.split(r'(?=File:\s*[`"]?[^`"\n]+[`"]?)', text)
    applied_count = 0

    for section in sections:
        file_match = file_pattern.search(section)
        if not file_match:
            continue
        filepath = file_match.group(1).strip()

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            print(f"❌ File not found: {filepath}")
            continue

        blocks = block_pattern.findall(section)
        if not blocks:
            continue

        modified = content
        for search, replace in blocks:
            if search in modified:
                modified = modified.replace(search, replace, 1)
                applied_count += 1
                print(f"✅ Applied block to: {filepath}")
            else:
                print(f"⚠️ Search block not found in {filepath}:\n{search[:80]}...")

        if modified != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(modified)

    if applied_count == 0:
        print("❌ No matching Search/Replace blocks were applied.")
    else:
        print(f"🎉 Successfully applied {applied_count} change(s)!")

if __name__ == '__main__':
    print("Paste your Search/Replace block below, then press Enter and Ctrl+D:")
    raw = sys.stdin.read()
    if not raw.strip():
        print("Input was empty.")
        sys.exit(1)
    apply_blocks(raw)
```
Make it executable:
```bash
chmod +x /usr/local/bin/apply-sr
```

---

## ⚡ The Full 30-Second Workflow in Action

Here is what your daily coding loop looks like inside Ubuntu:

1. **Extract Context:**
   ```bash
   ai-ctx app/src/main/kotlin/xyz/mpv/rex/ui/player/PlayerViewModel.kt 80 140
   ```
2. **Switch to Web Chat:** Tap **Paste** and send.
3. **Copy AI Output:** Tap the AI's "Copy Code" button in your browser.
4. **Apply in Ubuntu:**
   ```bash
   apply-sr
   # Long-press to paste in terminal, then press Ctrl+D!
   ```
5. **Verify Build:**
   ```bash
   ai-error
   ```
   *(If errors occur, it automatically re-copies the prompt to clipboard—just paste back to the AI!)*
