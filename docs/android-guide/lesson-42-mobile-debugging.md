# 🐞 Mobile Debugging with Logcat


In this lesson, you will learn how to read error logs, diagnose crashes, and filter stack traces directly inside **Termux** using Android's **`logcat`** tool.

---

## 👶 1. The Beginner Analogy: The Airplane Flight Black Box

When an airplane has an issue in mid-air, engineers don't guess what happened—they pull the **Flight Data Black Box Recorder**:
- It records every engine temperature change, altitude shift, and sensor error second by second.
- In Android, **`logcat`** is that black box! Whenever an app stumbles, freezes, or crashes, it prints the exact file name and line number responsible.

---

## 📊 2. Visual Architecture: The Logcat Diagnostic Pipeline

```mermaid
flowchart LR
    AppCrash["App Crashes / Throws Exception"] --> Logcat["Android OS Logcat Buffer"]
    Logcat --> Filter["Termux Filter: logcat -d | grep 'xyz.mpv.rex'"]
    Filter --> Output["Formatted Stack Trace with File & Line Number!"]
```

---

## 🔍 3. Essential Termux Debugging Commands

### 📋 A. Reading App Logs in Termux
```bash
# 1. Clear old logs so you only see fresh events:
logcat -c

# 2. Dump all logs from mpvRex:
logcat -d | grep -i "xyz.mpv.rex"

# 3. Stream logs live in real time while using the app:
logcat -v time | grep -i "xyz.mpv.rex"
```

---

### 🏷️ B. Filtering by Specific Tags
In `mpvRex`, classes tag their log messages:
- `Log.d("PlayerViewModel", "Starting playback...")`
- `Log.e("MPVView", "Surface destroyed unexpectedly")`

```bash
# Filter only player logs:
logcat -s "MPVView" "PlayerViewModel" "TrackManager"
```

---

## 💥 4. How to Read an Android Stack Trace

When an app crashes, Logcat prints a **Stack Trace**. Beginners often panic when seeing 100 lines of red text. 

**Here is the secret: Look ONLY for "Caused by:" and lines with YOUR package name!**

```text
FATAL EXCEPTION: main
Process: xyz.mpv.rex, PID: 12450
java.lang.NullPointerException: Attempt to invoke virtual method 'long java.lang.Long.longValue()' on a null object reference
    at xyz.mpv.rex.ui.player.SeekbarKt.StandardSeekbar(Seekbar.kt:142)  <── THE CRASH IS HERE!
    at xyz.mpv.rex.ui.player.SeekbarKt$StandardSeekbar$1.invoke(Seekbar.kt:98)
    at androidx.compose.runtime.Recomposer.performRecompose(Recomposer.kt:1020)
    ... (Ignore the 40 lines of Android internal framework code below!)
```

### How to Fix This Bug in 10 Seconds:
1. Open [`Seekbar.kt`](file:///root/Projects/mpvRex/app/src/main/kotlin/xyz/mpv/rex/ui/player/controls/components/Seekbar.kt) at **line 142**.
2. You will see a `Long` value was `null` when your code expected a non-null number.
3. Add a null-safe fallback: `position ?: 0L`. Done!

---

## ⚙️ 5. Diagnosing Native C Crashes (`SIGSEGV`)

If `libmpv` encounters a corrupted video file or an invalid memory address:
```text
Fatal signal 11 (SIGSEGV), code 1 (SEGV_MAPERR), fault addr 0x0 in tid 12512 (mpv core)
```
- **What it means:** A native C function attempted to access a null pointer (`0x0`).
- **Solution in mpvRex:** Check if the file URI was valid before passing it to `MPVLib.command("loadfile")`, or verify that `detachSurface()` was called before the Activity was destroyed.

---

## 🎯 6. Key Takeaways

- [x] **`logcat -c`** clears the log buffer; **`logcat -d | grep 'package'`** dumps recent logs.
- [x] Ignore framework lines in stack traces; scan immediately for **`Caused by:`** and your app's package name.
- [x] The file name and line number in the stack trace pinpoint the exact line of code that failed.
- [x] Native C crashes appear as **`SIGSEGV`** signals, usually caused by invalid file paths or drawing to a destroyed surface.
