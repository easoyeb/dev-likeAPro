# ⚡ CLI Tools Cheat Sheet: ripgrep, find, fzf, sed & awk

Quick reference for essential command-line tools used in daily software development.

---

## 🔍 `ripgrep` (`rg`)
```bash
# Basic search
rg "pattern" path/

# Search specific file extension
rg "pattern" -g "*.kt"

# Case insensitive
rg -i "pattern"

# Search regex
rg -e "fun \w+Screen"

# Exclude directory
rg "pattern" -g "!**/build/**"
```

## 📁 `find`
```bash
# Find files by name
find . -name "*.kt"

# Find directories
find . -type d -name "components"

# Find modified in last 24 hours
find . -mtime -1

# Exec command on found files
find . -name "*.log" -exec rm -f {} +
```

## ⚡ `fzf` (Fuzzy Finder)
```bash
# Interactive file search & open
vim $(fzf)

# Search command history
history | fzf
```
