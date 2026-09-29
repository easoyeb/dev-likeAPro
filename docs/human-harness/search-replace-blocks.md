# 🔁 The Search/Replace Block Protocol (The Aider Pattern)

While Unified Diffs (`diff -u`) are great, free web LLMs often get line numbers wrong (e.g. `@@ -45,12 +45,14 @@`), causing `git apply` to reject the patch.

The most robust, battle-tested technique used by professional coding harnesses like **Aider**, **Antigravity**, and **OpenCode** is the **Search/Replace Block Pattern**.

In this guide, you will learn how to prompt web AIs for Search/Replace blocks and how to apply them automatically in Termux using a lightweight script.

---

## 👶 1. The Core Concept: Exact Anchor Matching

Instead of guessing line numbers, a Search/Replace block provides:
1. **The Exact Old Code (SEARCH):** A unique snippet of lines already in the file.
2. **The Exact New Code (REPLACE):** What those lines should become.

```text
<<<<<<< SEARCH
val isM3uPlaylist: Boolean = false
=======
val isM3uPlaylist: Boolean = false,
val customThumbnailPath: String? = null
>>>>>>> REPLACE
```

Because the script searches for the exact character sequence, **it never fails due to line number mismatches or surrounding file edits**!

---

## 🎯 2. The Search/Replace Prompt Directive

Add this block to your prompt when asking a web AI for code modifications:

````markdown
### EDITING INSTRUCTION:
Do NOT output the full file.
Output your changes ONLY as Search/Replace blocks formatted exactly like this:

File: `path/to/file.kt`
<<<<<<< SEARCH
// exact unique lines from the current file
=======
// new replacement lines
>>>>>>> REPLACE
````

---

## 📜 3. The Automatic Termux Patching Tool (`apply-sr.py`)

To make applying Search/Replace blocks effortless, save this Python script as `~/bin/apply-sr`:

```python
#!/usr/bin/env python3
import sys
import re
import subprocess

def get_clipboard():
    try:
        return subprocess.check_output(['termux-clipboard-get'], text=True)
    except Exception:
        return sys.stdin.read()

def apply_blocks(text):
    # Regex to extract: File: `path` followed by SEARCH/REPLACE blocks
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
    content = get_clipboard()
    if not content.strip():
        print("Clipboard is empty! Copy the AI's response first.")
        sys.exit(1)
    apply_blocks(content)
```

Make it executable:
```bash
chmod +x ~/bin/apply-sr
```

---

## ⚡ 4. The 3-Step Execution Loop

1. **Ask Web AI:** Use the directive above.
2. **Copy Response:** Tap **Copy** in your browser.
3. **Run in Termux:**
   ```bash
   apply-sr
   ```
The script reads your clipboard, locates the file, finds the exact `SEARCH` lines, swaps them with the `REPLACE` lines, and saves the file on disk instantly. Zero typing, zero thumb strain.
