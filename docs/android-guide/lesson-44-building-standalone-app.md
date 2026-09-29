# 🏗️ Building a Standalone App from Scratch


In this lesson, you will learn how to take everything you've learned and build a brand-new, modern Android application from an empty folder.

---

## 👶 1. The Beginner Analogy: The Architect's Blank Blueprint

Up until now, you have been studying and modifying an existing mansion (`mpvRex`). 
Now you have the knowledge to lay the foundation and frame a brand-new house of your own from scratch!

---

## 📊 2. Visual Architecture: The Minimal Android Project Skeleton

```text
MyNewApp/
├── settings.gradle.kts                       ──> Registers modules & repos
├── build.gradle.kts                          ──> Root build plugins
├── gradle/libs.versions.toml                 ──> Library versions
└── app/
    ├── build.gradle.kts                      ──> App SDK & Compose plugins
    └── src/main/
        ├── AndroidManifest.xml               ──> Permissions & MainActivity
        ├── res/values/strings.xml            ──> App name string
        └── kotlin/com/example/app/
            ├── App.kt                        ──> Application class (Koin DI)
            └── MainActivity.kt               ──> Host Activity (Compose UI)
```

---

## 🔍 3. The 5 Core Files Every New Project Needs

### 1. `settings.gradle.kts`
```kotlin
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "MyNewApp"
include(":app")
```

---

### 2. `app/build.gradle.kts`
```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.example.mynewapp"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.example.mynewapp"
        minSdk = 26
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2026.02.01"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.activity:activity-compose:1.10.0")
    implementation("io.insert-koin:koin-androidx-compose:4.0.0")
}
```

---

### 3. `app/src/main/AndroidManifest.xml`
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:name=".App"
        android:label="My New App"
        android:theme="@android:style/Theme.Material.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

---

### 4. `App.kt` (Application Class & Dependency Injection)
```kotlin
package com.example.mynewapp

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin

class App : Application() {
    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidContext(this@App)
            // Register your modules here!
        }
    }
}
```

---

### 5. `MainActivity.kt` (Edge-to-Edge Compose Host)
```kotlin
package com.example.mynewapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    Box(contentAlignment = Alignment.Center) {
                        Text(
                            text = "Built with Antigravity & Kotlin! 🚀",
                            style = MaterialTheme.typography.headlineMedium
                        )
                    }
                }
            }
        }
    }
}
```

---

## 🎯 4. Key Takeaways

- [x] Every Android app starts with the same 5 core files.
- [x] Use **`enableEdgeToEdge()`** and **`setContent { }`** inside `ComponentActivity`.
- [x] Initialize Koin inside a custom **`Application`** class.
- [x] Build your UI declaratively inside `@Composable` functions without a single legacy XML layout.
