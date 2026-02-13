# Scenes & Cutscenes Documentation

## Files Covered
- `src/Title.js`
- `src/Credits.js`
- `src/EndTitle.js`
- `src/Cutscene.js`
- `src/Scene.js`

## `src/Title.js`
**Role:** Main Menu / Intro sequence.
- Sequences text and images ("Jordan Mechner Presents...").
- Transitions to `Cutscene` (if Level 1) or `Game`.

## `src/Cutscene.js`
**Role:** Scripted event player.
- **Asset**: Loads scripts from `assets/cutscenes/sceneX.json`.
- **Interpreter**: `executeProgram()` parses opcodes:
    - `ADD_ACTOR`, `ACTION`, `MOVE`.
    - `WAIT`, `FADEIN`, `FADEOUT`.
    - `MUSIC`, `SOUND`.
- Used for the "Princess in room" scenes between levels.

## `src/Scene.js`
**Role:** Renderer for the Cutscene environment.
- Builds the static room (bed, pillars, stars).
- Manages "Trobs" (like Torches) in the cutscene view.

## `src/EndTitle.js` & `src/Credits.js`
- Simple states that sequence text/images and music for the ending and credits roll.
