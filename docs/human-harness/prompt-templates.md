# 🎯 Prompt Templates & Directives for Free Web AIs

Free web LLMs (ChatGPT Free, Claude 3.5 Sonnet web, Gemini 1.5 Flash web, DeepSeek) are fundamentally tuned for **conversational chat**, not automated coding. 

If you ask them casually: *"Fix this function"*, they will:
1. Write 3 paragraphs of polite conversational filler you don't need.
2. Truncate long files with `// ... rest of your code unchanged ...`, forcing you to manually piece parts together.
3. Forget your build constraints (e.g. running on Android in Termux without Android Studio).

In this guide, you will get **copy-paste prompt templates and system directives** that force web AIs to act like senior automated coding engines.

---

## 🛡️ 1. The "Senior Android Architect" System Directive

Paste this directive into the web chat **at the very beginning of your session** (or in ChatGPT's "Custom Instructions"):

```markdown
You are a Senior Android & Kotlin Architect specializing in Jetpack Compose, Coroutines, Room SQLite, Koin DI, and media engines like mpvRex.

ENVIRONMENT & RULES:
1. Environment: I develop on Android inside Termux and AndroidIDE. I do NOT have desktop Android Studio.
2. NO CONVERSATIONAL FILLER: Never start with "Certainly!", "Sure thing!", or polite apologies. Get straight to technical execution.
3. NO LAZY TRUNCATION: Never write `// ... rest of code unchanged ...` or `// TODO`. Always output complete, compile-ready replacement blocks or functions.
4. COROUTINE & THREAD SAFETY: All database operations, file I/O, and JNI calls must explicitly declare Dispatchers.IO. UI state must use StateFlow and collectAsStateWithLifecycle().
5. OUTPUT FORMAT: When writing code, always specify the EXACT relative file path header and use markdown code blocks with the language tag.
```

---

## 🛠️ 2. Template 1: Feature Implementation (Full Stack Slice)

Use this template when adding a new setting, UI toggle, or database record:

````markdown
### TASK: Implement [Feature Name, e.g. "Auto-Loop Playlist Setting"]

### CONTEXT:
I have attached the relevant files below.

File: `[Path to Entity or Prefs]`
```kotlin
[PASTE CODE HERE]
```

File: `[Path to ViewModel or Screen]`
```kotlin
[PASTE CODE HERE]
```

### REQUIREMENTS:
1. Update the data layer to persist this setting.
2. Expose the value reactively through the ViewModel as a `StateFlow`.
3. Provide the Jetpack Compose UI component (Switch or Dropdown).
4. Output the complete, drop-in replacement code for each file with exact line targets.
````

---

## 🐞 3. Template 2: Stack Trace & Logcat Diagnosis

When your app crashes or throws an exception in Logcat, use this prompt to pinpoint the root cause immediately:

````markdown
### BUG REPORT: Runtime Crash / Exception

### 1. LOGCAT STACK TRACE:
```text
[PASTE RAW LOGCAT OUTPUT HERE]
```

### 2. RELEVANT SOURCE CODE:
File: `[Path to crashing file, e.g. PlayerPlaybackStateController.kt]`
Lines: [e.g. 110-165]
```kotlin
[PASTE CODE BLOCK]
```

### INSTRUCTIONS:
1. Identify the exact line of code that triggered this exception.
2. Explain the root cause in 2 bullet points (e.g. null pointer, thread violation, database schema mismatch).
3. Provide the corrected, null-safe Kotlin code snippet to eliminate this crash.
````

---

## 🔄 4. Template 3: The "Unified Diff" Prompt (Zero-Typing Edits)

If you have a large file (e.g. 500+ lines) and don't want the AI to print 500 lines just to change 5 lines, force it to generate a **Unified Diff**:

````markdown
### TASK: Update [FunctionName]

Here is my current code in `[FilePath]`:
```kotlin
[PASTE RELEVANT FUNCTION]
```

REQUIREMENT:
Output your answer STRICTLY as a standard Unified Diff (`diff -u`) block.
Do NOT output conversational text.
Example format:
```diff
--- a/app/src/main/kotlin/MyClass.kt
+++ b/app/src/main/kotlin/MyClass.kt
@@ -45,7 +45,7 @@
- val oldLogic = false
+ val oldLogic = true
```
````
*(In the next guide, you will learn how to apply this diff in Termux with one command: `termux-clipboard-get | git apply`!)*

---

## 🔍 5. Template 4: Reverse-Engineering & Feature Tracing

When studying a complex reference project like **mpvRex**:

````markdown
### REVERSE-ENGINEERING ANALYSIS

I am analyzing how [Feature, e.g. "Hardware Decoding switching"] works in this codebase.

Here is the entry point:
File: `[FilePath]`
```kotlin
[PASTE CODE]
```

QUESTION:
1. Trace the execution flow: which Manager/Ops class receives this call next?
2. Does this call touch native C/C++ (JNI / libmpv) or Android MediaCodec?
3. Where is the resulting playback state stored or persisted?
4. Summarize the sequence in a clean ASCII or Mermaid sequence diagram.
````
