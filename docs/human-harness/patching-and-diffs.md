# 🩹 Applying AI Code & Diffs in Termux

The biggest pain point of coding on mobile without an automated agent is **applying the AI's generated code into your local files**.

Typing code manually using an on-screen keyboard is slow, frustrating, and guarantees syntax errors. In this guide, you will learn how to apply changes in **under 3 seconds** using `git apply`, `patch`, and clipboard automation in Termux.

---

## 🚫 The 3 Mobile Traps to Avoid

1. **The "Thumb-Select" Trap:** Trying to manually copy 50 lines from your browser, switch to AndroidIDE, highlight 50 lines, and tap Paste. One slipped finger deletes a critical closing bracket `}`.
2. **The "Whole-File Overwrite" Trap:** Asking the AI to reprint a 1,000-line file just to change 3 lines. Free web AIs will silently delete imports or compress functions with `// ... rest of code ...`, corrupting your file.
3. **The "No-Safety-Net" Trap:** Editing your main Git branch directly without creating a checkpoint.

---

## 🛡️ Step 0: The Safety Net (Always Branch First)

Before applying any AI-generated code, create a scratch branch in Termux:

```bash
# Create and switch to a temporary experimental branch:
git checkout -b ai-temp-experiment
```
If the AI produces broken code, you can wipe it clean in 1 second:
```bash
git restore .
# or return to safety:
git checkout master
git branch -D ai-temp-experiment
```

---

## ⚡ Technique 1: 1-Click Patching with `git apply` (The Gold Standard)

When you ask the AI for a **Unified Diff** (using Template 3 from the previous guide), applying it takes a single command:

```mermaid
flowchart LR
    AI["Web AI Output (Diff)"] -->|"Copy to Clipboard"| Clip["Android Clipboard"]
    Clip -->|"termux-clipboard-get"| GitApply["git apply -v"]
    GitApply --> Disk["Local Source Files Updated!"]
```

### The Command:
In Termux, run:
```bash
termux-clipboard-get | git apply -v
```

### Dry-Run Verification:
If you want to verify that the patch matches cleanly before touching your files:
```bash
termux-clipboard-get | git apply --check
```
- If it prints nothing: The patch matches perfectly!
- If it prints an error: Your local file has changed since you copied the context.

---

## 📄 Technique 2: Direct File Creation with `cat << 'EOF'`

When the AI writes a brand new file (e.g. a new Entity, DAO, or Helper class):

1. Tap **Copy Code** in the browser.
2. In Termux, type:
   ```bash
   cat << 'EOF' > app/src/main/kotlin/xyz/mpv/rex/database/entities/NewEntity.kt
   ```
3. Long-press to paste the clipboard content.
4. Type `EOF` on a new line and press **Enter**.

### The Automated 1-Liner:
Or use `termux-clipboard-get` to save the clipboard directly to a file:
```bash
termux-clipboard-get > app/src/main/kotlin/xyz/mpv/rex/database/entities/NewEntity.kt
```

---

## ✂️ Technique 3: Precise Function Replacement with `micro`

If you are using a terminal text editor, install **`micro`** (it supports native mouse/touch taps, intuitive Ctrl+C/Ctrl+V, and syntax highlighting):

```bash
pkg install micro

# Open the file at the exact line:
micro +85 app/src/main/kotlin/xyz/mpv/rex/ui/player/PlayerViewModel.kt
```
- Tap on the screen where you want to edit.
- Press **Ctrl+K** to cut old lines.
- Press **Ctrl+V** to paste new code from the AI.
- Press **Ctrl+S** to save and **Ctrl+Q** to exit.

---

## 🛑 How to Handle Truncated AI Responses

Free web models have output token cutoffs (usually ~4,000 characters). When generating large classes, the AI may stop dead in the middle of a line:

```kotlin
    fun processPlaybackQueue() {
        val nextItem = queue.firstOrNull()
        if (nextIt
```

### What NOT to do:
Do **NOT** say: *"You stopped, start over from the beginning!"*
The AI will just run out of tokens again at the exact same spot!

### The Exact Prompt to Resume:
Paste this into the chat:
> *"You were cut off at line `if (nextIt`. Continue outputting from that exact word onwards. Do NOT repeat any previous lines. Output only the remaining code."*

Then in Termux, simply append the second half to your file or paste it right where the cursor stopped.
