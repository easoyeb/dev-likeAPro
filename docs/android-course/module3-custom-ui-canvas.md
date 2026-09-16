# 🎨 Module 3: Custom UI, Canvas & Component Drawing

When standard Compose components (`Slider`, `LinearProgressIndicator`) are not customizable enough, Android developers use **`Canvas`** to draw custom UI graphics.

---

## 1. How Custom Progress Bars are Drawn

In `Seekbar.kt`, the video progress bar is drawn manually inside a `Canvas`:

```kotlin
Canvas(modifier = Modifier.fillMaxWidth().height(48.dp)) {
    // 1. Compute progress in pixels
    val totalWidth = size.width
    val progressPx = totalWidth * progressFraction
    
    // 2. Determine primary color dynamically
    val primaryColor = if (whiteSeekBar) Color.White else MaterialTheme.colorScheme.primary
    
    // 3. Draw played track segment
    drawLine(
        color = primaryColor,
        start = Offset(0f, centerY),
        end = Offset(progressPx, centerY),
        strokeWidth = 5.dp.toPx()
    )
    
    // 4. Draw buffer track segment (50% opacity)
    drawLine(
        color = primaryColor.copy(alpha = 0.5f),
        start = Offset(progressPx, centerY),
        end = Offset(readAheadPx, centerY),
        strokeWidth = 5.dp.toPx()
    )
}
```

---

## 2. Dynamic Color Selection

By conditionally selecting `primaryColor`:
- Default mode: Evaluates to `MaterialTheme.colorScheme.primary` (Accent theme color like purple, blue, red).
- White Progress Bar mode: Evaluates to `Color.White` across all drawing functions (`drawPathWithGaps`, `drawCircle`, `drawLine`).

---
*Next: Proceed to [Module 4: How Pros Read Codebases & Add Features](./module4-how-to-read-codebases).*
