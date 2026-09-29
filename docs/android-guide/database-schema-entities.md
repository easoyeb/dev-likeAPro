# 📐 Schema Design, Entities & Type Converters

In this guide, you will learn how to design production-grade relational database schemas for Android using Room. We explore entity mapping, auto-generated vs natural primary keys, relational modeling with foreign keys and cascading deletes, index optimization, and custom `@TypeConverter` classes using **mpvRex**'s codebase as our blueprint.

---

## 👶 1. The Beginner Analogy: Designing the Blueprints

Before building a skyscraper, an architect draws blueprints specifying room dimensions, wall materials, and doorways connecting one room to another.

In a database:
- **The Entity (`@Entity`):** The blueprint of a table. It dictates what columns exist and what data type each column holds.
- **The Primary Key (`@PrimaryKey`):** The unique apartment number or national ID card that guarantees no two rows can ever be confused.
- **The Foreign Key (`@ForeignKey`):** The digital cord connecting an item to its parent container (e.g. an item in a playlist connected to the playlist itself).
- **The Type Converter (`@TypeConverter`):** A translator stationed at the door who converts Kotlin objects (like Enums or Dates) into raw SQLite strings or numbers, and converts them back upon retrieval.

---

## 🏗️ 2. Primary Keys: Auto-Generated vs Natural Keys

Room entities must declare at least one primary key to uniquely identify every record.

### Pattern 1: Auto-Incrementing Integer Keys
Used when entities are created dynamically by the user and do not possess an inherently unique natural string:

```kotlin
package xyz.mpv.rex.database.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "PlaylistEntity")
data class PlaylistEntity(
    // 🔑 SQLite automatically generates 1, 2, 3... when inserting with id = 0:
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    
    val name: String,
    val createdAt: Long,
    val updatedAt: Long,
    val customThumbnailPath: String? = null,
    val m3uSourceUrl: String? = null,
    val isM3uPlaylist: Boolean = false
)
```

### Pattern 2: Natural String Keys
Used when a unique real-world identifier already exists (such as a unique file path or video title). This avoids redundant ID columns:

```kotlin
package xyz.mpv.rex.database.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "PlaybackStateEntity")
data class PlaybackStateEntity(
    // 🔑 The video title itself serves as the unique natural key:
    @PrimaryKey
    val mediaTitle: String,
    
    val lastPosition: Int,             // Last played timestamp (ms)
    val playbackSpeed: Double = 1.0,   // Playback rate
    val sid: Int = -1,                 // Subtitle track ID
    val aid: Int = -1,                 // Audio track ID
    val subDelay: Int = 0,             // Subtitle offset (ms)
    val audioDelay: Int = 0,           // Audio offset (ms)
    val externalSubtitles: String = "" // External subtitle URI
)
```

---

## 🔗 3. Relational Modeling: Foreign Keys & Cascading Deletes

In a media player, playlists contain video items. If a user deletes a playlist, what should happen to the 50 songs or video clips inside that playlist?
Without a foreign key, the items become **orphan records**, wasting storage space and corrupting state.

### Real mpvRex Architecture: `PlaylistItemEntity`

Here is how **mpvRex** enforces database integrity between `PlaylistEntity` and `PlaylistItemEntity` ([`PlaylistItemEntity.kt`](file:///root/Projects/mpvRex/app/src/main/kotlin/xyz/mpv/rex/database/entities/PlaylistItemEntity.kt)):

```kotlin
package xyz.mpv.rex.database.entities

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(
    tableName = "PlaylistItemEntity",
    foreignKeys = [
        ForeignKey(
            entity = PlaylistEntity::class,
            parentColumns = ["id"],          // Primary key in PlaylistEntity
            childColumns = ["playlistId"],    // Foreign key in PlaylistItemEntity
            onDelete = ForeignKey.CASCADE    // ⚡ If Playlist is deleted, automatically delete all its items!
        )
    ],
    indices = [
        // ⚡ Indexing the foreign key column is CRUCIAL for query performance:
        Index(value = ["playlistId"])
    ]
)
data class PlaylistItemEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    
    val playlistId: Int,                     // Points to PlaylistEntity.id
    val filePath: String,
    val fileName: String,
    val position: Int,                       // Sequence order inside playlist
    val addedAt: Long,
    val lastPlayedAt: Long = 0,
    val playCount: Int = 0,
    val lastPosition: Long = 0
)
```

### Why Indexing Foreign Keys is Mandatory
When you declare `Index(value = ["playlistId"])`, Room creates a B-Tree index in SQLite:
```sql
CREATE INDEX IF NOT EXISTS `index_PlaylistItemEntity_playlistId` ON `PlaylistItemEntity` (`playlistId`);
```
- **Without an index:** Every time a user deletes a playlist, SQLite must perform a **full table scan** through every single playlist item on disk to find matching rows.
- **With an index:** SQLite jumps directly to the matching rows in $O(\log N)$ time, completing the deletion in milliseconds even with tens of thousands of media files.

---

## 🔄 4. Room Type Converters: Storing Complex Kotlin Types

SQLite natively only supports **5 primitive storage classes**:
1. `NULL`
2. `INTEGER` (1, 2, 4, or 8 bytes)
3. `REAL` (floating point)
4. `TEXT` (UTF-8 string)
5. `BLOB` (raw binary data)

SQLite does not know what a Kotlin `Enum`, `Instant`, or `List<String>` is. **Type Converters** bridge this gap.

### Case Study: Converting Enums to Strings in mpvRex

In **mpvRex**, network connections support various protocols (`SMB`, `FTP`, `WEBDAV`, `SFTP`, `NFS`):

```kotlin
// The Domain Enum:
enum class NetworkProtocol {
    SMB, FTP, FTPS, SFTP, WEBDAV, WEBDAVS, NFS
}
```

To store this enum in SQLite, we write a `@TypeConverter` class ([`NetworkProtocolConverter.kt`](file:///root/Projects/mpvRex/app/src/main/kotlin/xyz/mpv/rex/database/converters/NetworkProtocolConverter.kt)):

```kotlin
package xyz.mpv.rex.database.converters

import androidx.room.TypeConverter
import xyz.mpv.rex.domain.network.NetworkProtocol

class NetworkProtocolConverter {
    // 1. Serialization: Kotlin Enum -> SQLite TEXT
    @TypeConverter
    fun fromNetworkProtocol(protocol: NetworkProtocol): String {
        return protocol.name
    }

    // 2. Deserialization: SQLite TEXT -> Kotlin Enum
    @TypeConverter
    fun toNetworkProtocol(value: String): NetworkProtocol {
        return NetworkProtocol.valueOf(value)
    }
}
```

### Registering the Converter
Register the converter on your database class or DAO using `@TypeConverters`:

```kotlin
@Database(
    entities = [NetworkConnection::class, ...],
    version = 18
)
@TypeConverters(NetworkProtocolConverter::class) // ⚡ Registered here!
abstract class MpvExDatabase : RoomDatabase() { ... }
```

---

## 📜 5. Schema Export & Verification Contracts

In production applications, never leave schema changes to guesswork. Enable Room's schema export in `app/build.gradle.kts`:

```kotlin
ksp {
    arg("room.schemaLocation", "$projectDir/schemas")
}
```

When you build the project with `exportSchema = true` in `@Database`, Room automatically generates a versioned JSON contract (e.g. `schemas/xyz.mpv.rex.database.MpvExDatabase/18.json`).
This file captures:
- Every table name and SQL `CREATE TABLE` query.
- All column types, default values, and nullability flags.
- Complete identity hash strings used by Room at runtime to verify that your code matches the disk database.

---

## 🎯 Summary Checklist for Entities

| Feature | Annotation | Best Practice |
| :--- | :--- | :--- |
| **Table Definition** | `@Entity(tableName = "...")` | Always specify an explicit `tableName` to decouple from class refactorings. |
| **Auto ID** | `@PrimaryKey(autoGenerate = true)` | Use for user-generated lists and history items. |
| **Natural Key** | `@PrimaryKey` | Use for unique file paths, URIs, or titles. |
| **Relational Link** | `@ForeignKey(..., onDelete = CASCADE)` | Protects against orphan records on deletion. |
| **Query Speed** | `indices = [Index("column")]` | Index all foreign keys and frequently filtered columns. |
| **Custom Types** | `@TypeConverter` | Use for Enums, Dates, and JSON serialization. |
