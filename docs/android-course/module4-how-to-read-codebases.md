# 🔍 Module 4: How Pros Read Codebases & Add Features

Have you ever wondered: **"How does an AI or senior engineer add a new feature to a massive app just by reading a few files?"**

Here is the exact reverse-engineering breakdown of how the **White Video Progress Bar** feature was added to **mpvRex**.

---

## 🛠️ The 5-Step Codebase Reverse-Engineering Methodology

```
[ 1. Search Precedents ] ➔ Grep for similar features (e.g. 'use_wavy_seekbar')
            │
            ▼
[ 2. Map Data Flow     ] ➔ PreferenceStore ➔ Composable ➔ Canvas
            │
            ▼
[ 3. Identify Points   ] ➔ PlayerPreferences.kt + Seekbar.kt
            │
            ▼
[ 4. Expose in UI      ] ➔ PlayerPreferencesScreen.kt + strings.xml
            │
            ▼
[ 5. Compile & Test    ] ➔ ./gradlew compileDebugKotlin
```

---

### Step 1: Search for Precedents (Never Guess!)
Instead of scanning all 500+ files in the app, use **ripgrep** to search for terms related to the seekbar:
```bash
# Grep search for seekbar preferences:
grep_search("use_wavy_seekbar")
grep_search("SeekbarStyle")
```
This immediately revealed:
- `PlayerPreferences.kt` (stores user preferences)
- `Seekbar.kt` (draws the progress bar UI)
- `PlayerPreferencesScreen.kt` (renders settings toggles)

---

### Step 2: Trace the Data Flow
Next, view lines around `use_wavy_seekbar` inside `PlayerPreferences.kt`:
```kotlin
// We saw how existing toggles are defined:
val useWavySeekbar = preferenceStore.getBoolean("use_wavy_seekbar", true)
val showSeekBarWhenSeeking = preferenceStore.getBoolean("show_seekbar_when_seeking", false)
```
So to add a new toggle, we just follow the exact pattern:
```kotlin
val whiteSeekBar = preferenceStore.getBoolean("white_seekbar", false)
```

---

### Step 3: Find the Painting / Rendering Logic
Opening `Seekbar.kt`, we searched for `MaterialTheme.colorScheme.primary` or color definitions:
```kotlin
// Original code in SquigglySeekbar & StandardSeekbar:
val primaryColor = MaterialTheme.colorScheme.primary
```
By changing this single line in both Composables:
```kotlin
val playerPreferences = koinInject<PlayerPreferences>()
val whiteSeekBar by playerPreferences.whiteSeekBar.collectAsState()
val primaryColor = if (whiteSeekBar) Color.White else MaterialTheme.colorScheme.primary
```
Now, whenever `whiteSeekBar` is `true`, all progress bar tracks, thumbs, buffer lines, and caps automatically evaluate to `Color.White`!

---

### Step 4: Add the Preference Switch to Settings UI
Finally, add string resources in `strings.xml` and add a `SwitchPreference` inside `PlayerPreferencesScreen.kt` and `PlayerControlsPreferencesScreen.kt`:
```kotlin
val whiteSeekBar by preferences.whiteSeekBar.collectAsState()
SwitchPreference(
    value = whiteSeekBar,
    onValueChange = preferences.whiteSeekBar::set,
    title = { Text(stringResource(R.string.pref_player_white_seekbar_title)) },
    summary = { Text(stringResource(R.string.pref_player_white_seekbar_summary)) },
)
```

---

### Step 5: Verify with Fast Compilation
Never assume changes work without testing:
```bash
./gradlew compileDebugKotlin -I local-env.gradle.kts
./gradlew installDebug -I local-env.gradle.kts
```

---
*Congratulations! You now know how senior engineers and AI assistants reverse-engineer codebases and build features efficiently.*
