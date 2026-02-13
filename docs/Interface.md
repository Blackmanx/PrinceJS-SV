# Interface Documentation

## Files Covered
- `src/Interface.js`

## `src/Interface.js`
**Role:** HUD Management.
- **Layers**:
    - `layerRed`, `layerGreen`, etc. for full-screen flash effects.
- **Elements**:
    - **Health**: Manages sprites for Player HP (bottom left) and Enemy HP (bottom right).
        - `setPlayerLive()`, `setOpponentLive()`.
        - `damagePlayerLive()`, `recoverPlayerLive()`.
    - **Text**: Central text display.
        - `showLevel()`: "LEVEL X".
        - `showRemainingMinutes()`: "XX MINUTES LEFT".
        - `showGamePaused()`.
- **`updateUI()`**:
    - Updates text visibility (flashing effects for "Press Button").
    - Toggles HP sprite frames (empty/full).
