# Level System Documentation

## Files Covered
- `src/Level.js`
- `src/LevelBuilder.js`

## `src/Level.js`
**Role:** Container for level data and runtime tile management.
- **Structure**:
    - `rooms[]`: Array of Room objects. Each Room has `links` (Up, Down, Left, Right) and `tiles[]`.
    - `trobs[]`: List of "Triggerable Objects" (active tiles that need updates, e.g., loose floors, gates, enemies).
- **Core Methods**:
    - `getTileAt(x, y, room)`: Returns tile at grid coordinates. Handles room boundaries (e.g., asking for x=-1 gets tile from Left room).
    - `fireEvent(event)`: Triggers event chains (e.g., stepping on a button triggers a gate).
    - `update()`: Updates all `trobs`.
- **Tile Types**: constants like `TILE_FLOOR`, `TILE_GATE`, `TILE_POTION`, `TILE_MIRROR`, etc.

## `src/LevelBuilder.js`
**Role:** Factory to create `Level` from JSON data.
- **`buildFromJSON(json)`**:
    - Parses the JSON map format.
    - Constructs the Room grid.
    - Links rooms together (`links` object).
    - **Wall Generator**: `generateWallPattern(room)` creates procedural wall visual variations so it doesn't look repetitive.
- **`buildTile()`**:
    - Instantiates specific Tile classes based on element type.
    - `PrinceJS.Tile.Base` (Walls, Floors) vs `PrinceJS.Tile.Gate`, `PrinceJS.Tile.Potion`, etc.
