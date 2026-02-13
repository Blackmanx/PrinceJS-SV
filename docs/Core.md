# Core & Utilities Documentation

## Files Covered
- `src/Boot.js`
- `src/Preloader.js`
- `src/Utils.js`

## `src/Boot.js`
**Role:** Application entry point.
- **`PrinceJS.Init()`**: Resets global game state (level, health, time).
- **`PrinceJS.Boot`**: Phaser state.
    - `preload()`: Loads the bitmap font.
    - `create()`: Sets the world scale (`PrinceJS.SCALE_FACTOR = 2`), initializes query parameters, and starts `Preloader`.

## `src/Preloader.js`
**Role:** Asset management and initialization.
- **`preload()`**: Loads ALL game assets.
    - Atlases (Graphics): `kid`, `princess`, `vizier`, `guards`, `environment` (dungeon/palace).
    - Audio (Music & SFX).
    - JSON Data: Animations for all characters (`kid`, `sword`, `fighter`, `princess`, `shadow`, `vizier`, `mouse`).
- **`create()`**:
    - Displays "Press to Start".
    - Initializes Input (Mouse, Keyboard, Gamepad).
    - **Control Flow**: Checks `PrinceJS.SKIP_TITLE` flag.
        - If `true`: Goes directly to `Game`.
        - If `false`: Goes to `Title`.

## `src/Utils.js`
**Role:** Static helper functions.

### Coordinate Conversion
The game uses a 320x200 resolution (scaled by 2).
- `convertBlockXtoX(block)`: Converts grid column (0-9) to pixel X.
- `convertBlockYtoY(block)`: Converts grid row (0-2) to pixel Y.
- `convertXtoBlockX(x)`: Inverse of above.

### Input Handling
- `pointerPressed(game)`: Checks for mouse/touch input.
- `gamepad*Pressed(game)`: Wrappers for Phaser gamepad input (A, B, X, Y, D-Pad).

### UI Effects
- `flashScreen(game, count, color, time)`: Flashes the background color (used for damage, potion effects).
- `flashRedDamage()`, `flashRedPotion()`, `flashGreenPotion()`, `flashYellowSword()`: Predefined flash patterns.

### Game State & Query Params
- `applyQuery()`: Parses URL parameters to override starting conditions (e.g., `?level=10&health=10`).
- `updateQuery()`: Updates the browser URL history to reflect current game state (level, health, time).
