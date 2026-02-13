# Game Loop Documentation

## Files Covered
- `src/Game.js`

## `src/Game.js`
**Role:** The main gameplay state.
- **`create()`**:
    - Initializes `PrinceJS.LevelBuilder` to build the world.
    - Spawns `Kid` (Player) and `Enemies`.
    - Spawns `Interface` (UI).
    - Setup Camera (`setupCamera`).
- **`update()`**:
    - Checks for interaction Input (Touch/Mouse).
    - **`updateWorld()`**: The core game tick (called every 80ms via `game.time.events.loop`).
        - Updates Level, Kid, Enemies, UI.
        - `checkLevelLogic()`: IMPORTANT. Contains hardcoded level scripting.
- **`checkLevelLogic()`**:
    - **Level 1**: Triggers the first gate opening event.
    - **Level 3**: Skeleton interaction logic (arise, fall).
    - **Level 4**: Mirror appearance and Shadow logic.
    - **Level 5**: Shadow stealing potion.
    - **Level 6**: Shadow causing exit door trap.
    - **Level 8**: Mouse script trigger.
    - **Level 12**: Shadow merging (Leap of Faith).
    - **Level 13**: Jaffar battle logic.
- **`nextLevel()` / `previousLevel()`**: Handles transitions, saving state (health), and resetting the world.
