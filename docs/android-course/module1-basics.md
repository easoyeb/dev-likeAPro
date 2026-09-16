# 📦 Module 1: Android & Jetpack Compose Fundamentals

## 1. Modern Android App Architecture

Modern Android development uses **Jetpack Compose** (declarative UI framework) combined with **Kotlin**.

```
[ UI Layer (Composables) ] ◄── Observes ── [ ViewModel (State Holder) ]
                                                   │
                                            Delegates to
                                                   ▼
                                         [ Managers / Repository ]
```

---

## 2. Declarative UI vs Imperative XML

In traditional Android (XML):
- You had XML layout files and imperative Java/Kotlin code calling `findViewById` or `binding.myButton.setText()`.

In Jetpack Compose:
- UI is written as pure Kotlin functions annotated with `@Composable`.
- When state changes, Compose automatically **recomposes** (re-renders) only the UI elements affected by that state.

```kotlin
@Composable
fun Greeting(name: String) {
    Text(
        text = "Hello $name!",
        style = MaterialTheme.typography.titleLarge,
        color = MaterialTheme.colorScheme.primary
    )
}
```

---

## 3. The `Modifier` Chain

Every Composable takes a `Modifier` to control layout, size, padding, click events, and drawing:

```kotlin
Box(
    modifier = Modifier
        .fillMaxWidth()
        .height(48.dp)
        .padding(horizontal = 16.dp)
        .clickable { /* Handle click */ }
)
```

---
*Next: Proceed to [Module 2: State, Preferences & Dependency Injection](./module2-state-management).*
