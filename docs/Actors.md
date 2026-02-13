# Actors & Combat Documentation

## Files Covered
- `src/Actor.js`
- `src/Fighter.js`
- `src/Kid.js`
- `src/Enemy.js`
- `src/Mouse.js`

## `src/Actor.js` (Base Class)
**Extends:** `Phaser.Sprite`
**Role:** Basic animated entity.
- **Animation System**: Custom command-based animation engine (not standard Phaser animations).
    - `registerCommand(id, fn)`: Maps bytecodes to functions.
    - `processCommand()`: Executes the animation sequence commands defined in the JSON assets.
    - `updateCharFrame()`: Updates collider offset (`charFdx`, `charFdy`) based on current frame data.
- **Properties**:
    - `charFace`: Direction (1 = Right, -1 = Left).
    - `action`: Current state string (e.g., "stand", "run"). Changing this resets the animation sequence.

## `src/Fighter.js`
**Extends:** `PrinceJS.Actor`
**Role:** Entity with physics and combat capabilities.
- **Physics**:
    - `updateAcceleration()`: Applies gravity.
    - `updateVelocity()`: Updates X/Y based on velocity.
    - `checkBarrier()`: Collision detection with walls/gates.
    - `checkFloor()`: Falling logic and landing.
- **Combat Logic**:
    - `engarde()`: Switching to combat mode (unsheathe sword).
    - `strike()`: Attack logic.
    - `block()`: Defense logic.
    - `stabbed()`: Damage handling.
- **Interaction**:
    - `opponentDistance()`: Calculates distance to opponent for AI/Combat checks.

## `src/Kid.js` (The Prince)
**Extends:** `PrinceJS.Fighter`
**Role:** Player Character logic.
- **Input Handling**:
    - `updateBehaviour()`: Polls keyboard/gamepad (via `this.keyU()`, `this.keyL()`, etc.) to trigger actions.
- **Actions**:
    - Movement: `stand`, `run`, `turn`, `stoop` (crouch).
    - Jumping: `standjump`, `runjump`.
    - Acrobatics: `hang`, `climbup`, `climbdown`.
- **Special Interactions**:
    - `drinkPotion()`: Handling potion types (Recover, Add Health, Float, Flip, Damage).
    - `gotSword()`: Picking up the sword in Level 1.

## `src/Enemy.js`
**Extends:** `PrinceJS.Fighter`
**Role:** AI Opponents.
- **AI Configuration**:
    - Defined by `skill` level (0-11).
    - Probabilities for `strike`, `block`, `advance`, `impairblock`.
- **Behavior Loop**:
    - `updateBehaviour()`: Decides next move based on distance to player.
    - `willStartFight()`: Checks if player is close enough to engage.
    - `engarde()`, `retreat()`, `advance()`, `strike()`: AI execution of combat moves.
- **Specific Enemies**:
    - `Guard`: Standard enemies.
    - `Shadow`: The doppelganger (has special method `appearOutOfMirror`).
    - `Skeleton`: Immortal enemy in Level 3.
    - `Jaffar`: Final boss.

## `src/Mouse.js`
**Extends:** `PrinceJS.Actor`
**Role:** Scripted mouse event in Level 8.
- **Logic**: Simple state machine to run out, wait, triggering the exit door button.
