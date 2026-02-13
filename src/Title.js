"use strict";

PrinceJS.Title = function (game) {
  this.tick = 0;
};

PrinceJS.Title.prototype = {
  preload: function () { },

  create: function () {
    this.stopMusic();

    this.tick = 0;

    this.game.world.setBounds(0, 0, PrinceJS.SCREEN_WIDTH, PrinceJS.SCREEN_HEIGHT);

    this.back = this.game.add.image(0, 0, "title", "main_background");
    this.back.alpha = 1;

    // Skip the prologue intro tweens and go straight to the menu
    /*
    this.tween1 = this.game.add.tween(this.back).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);

    this.tween1.onComplete.add(() => {
      this.game.sound.play("PrologueA");
    });
    */

    this.presents = this.game.add.image(this.world.centerX, this.world.centerY + 29.5, "title", "presents");
    this.presents.anchor.setTo(0.5, 0.5);
    this.presents.visible = false;

    this.author = this.game.add.image(this.world.centerX - 3, this.world.centerY + 37, "title", "author");
    this.author.anchor.setTo(0.5, 0.5);
    this.author.visible = false;

    this.prince = this.game.add.image(0, 0, "title", "prince");
    this.prince.visible = false;

    this.textBack = this.game.add.image(0, this.world.height, "title", "in_the_absence");
    this.textBack.anchor.setTo(0, 1);

    this.cropRect = new Phaser.Rectangle(0, 0, 0, this.textBack.height);
    this.tween2 = this.game.add
      .tween(this.cropRect)
      .to({ width: this.textBack.width }, 200, Phaser.Easing.Linear.None, false, 0, 0, false);
    this.textBack.crop(this.cropRect);

    this.tween3 = this.game.add
      .tween(this.textBack)
      .to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);

    // Disable automatic transition to cutscene to keep the menu visible
    /*
    this.tween3.onComplete.add(() => {
      PrinceJS.Utils.delayed(() => {
        this.cutscene();
      }, 3500);
    });
    */

    this.input.keyboard.onDownCallback = this.handleInput.bind(this);

    // MENU STATE
    this.menuOptions = [
      { text: "JUEGO COMPLETO", action: () => this.startGame(1), locked: true },
      { text: "EMPEZAR", action: () => this.startGame(0) }, // Level 0
      { text: "CONTROLES", action: () => this.toggleControls() }
    ];

    // Check Unlock Status
    try {
      if (localStorage.getItem('pop_unlocked') === 'true') {
        this.menuOptions[0].locked = false;
      }
    } catch (e) { }

    this.selectedOption = 0;
    this.createMenu();
    this.createControlsOverlay();

    this.inControls = false;

    // Delay gamepad input to prevent carryover from Press to Start
    this.gamepadReady = false;
    PrinceJS.Utils.delayed(() => {
      this.gamepadReady = true;
    }, 500);
  },

  createMenu: function () {
    this.menuGroup = this.game.add.group();
    this.buttons = [];

    let startY = this.world.centerY - 20;

    for (let i = 0; i < this.menuOptions.length; i++) {
      let opt = this.menuOptions[i];
      if (opt.locked) continue;

      let text = this.game.add.bitmapText(this.world.centerX, startY + (i * 30), "font", opt.text, 16);
      text.anchor.setTo(0.5, 0.5);
      text.inputEnabled = true;
      text.events.onInputDown.add(() => {
        this.selectedOption = i;
        this.selectOption();
      });

      this.menuGroup.add(text);
      this.buttons.push(text);
    }
    this.updateSelection();
  },

  createControlsOverlay: function () {
    this.controlsGroup = this.game.add.group();
    this.controlsGroup.visible = false;

    // Background dim
    let bg = this.game.add.graphics(0, 0);
    bg.beginFill(0x000000, 0.9);
    bg.drawRect(0, 0, this.world.width, this.world.height);
    bg.endFill();
    this.controlsGroup.add(bg);

    let title = this.game.add.bitmapText(this.world.centerX, 40, "font", "CONTROLES", 16);
    title.anchor.setTo(0.5, 0.5);
    this.controlsGroup.add(title);

    let tips = [
      "TECLADO:",
      "FLECHAS / WASD : MOVER",
      "SHIFT : AGARRAR / ANDAR DESPACIO",
      "ESPACIO : SALTAR / ACCION",
      "",
      "MANDO XBOX:",
      "JOYSTICK / D-PAD : MOVER",
      "X : AGARRAR / ANDAR DESPACIO",
      "A : SALTAR / ACCION",
      "SELECT : REINICIAR NIVEL",
      "",
      "MENU: USA D-PAD ARRIBA/ABAJO + A",
      "",
      "CONSEJO: ANDA PARA EVITAR PINCHOS",
      "CONSEJO: AGARRATE PARA NO HACERTE DAÑO"
    ];

    for (let i = 0; i < tips.length; i++) {
      let t = this.game.add.bitmapText(this.world.centerX, 80 + (i * 15), "font", tips[i], 12);
      t.anchor.setTo(0.5, 0.5);
      this.controlsGroup.add(t);
    }

    let back = this.game.add.bitmapText(this.world.centerX, this.world.height - 30, "font", "PULSA UNA TECLA PARA VOLVER", 12);
    back.anchor.setTo(0.5, 0.5);
    this.controlsGroup.add(back);
  },

  updateSelection: function () {
    for (let i = 0; i < this.buttons.length; i++) {
      let btn = this.buttons[i];
      if (i === this.selectedOption) {
        btn.tint = 0xFF0000; // Red selection
      } else {
        btn.tint = 0xFFFFFF;
      }
    }
  },

  handleInput: function (e) {
    if (this.inControls) {
      this.toggleControls();
      return;
    }

    if (e.keyCode === Phaser.Keyboard.UP) {
      this.selectedOption--;
      if (this.selectedOption < 0) this.selectedOption = this.buttons.length - 1;
      this.updateSelection();
    } else if (e.keyCode === Phaser.Keyboard.DOWN) {
      this.selectedOption++;
      if (this.selectedOption >= this.buttons.length) this.selectedOption = 0;
      this.updateSelection();
    } else if (e.keyCode === Phaser.Keyboard.ENTER || e.keyCode === Phaser.Keyboard.SPACEBAR) {
      this.selectOption();
    }
  },

  selectOption: function () {
    let activeOptions = this.menuOptions.filter(o => !o.locked);
    let opt = activeOptions[this.selectedOption];
    if (opt && opt.action) {
      opt.action();
    }
  },

  toggleControls: function () {
    this.inControls = !this.inControls;
    this.controlsGroup.visible = this.inControls;
    this.menuGroup.visible = !this.inControls;
  },

  startGame: function (level) {
    this.stopMusic();
    this.input.keyboard.onDownCallback = null;
    PrinceJS.currentLevel = level;
    this.state.start("Game");
  },

  play: function () {
    // Legacy support
    this.startGame(1);
  },

  cutscene: function () {
    this.stopMusic();
    this.input.keyboard.onDownCallback = null;
    this.state.start("Cutscene");
  },

  stopMusic: function () {
    this.game.sound.stopAll();
  },

  update: function () {
    // Don't process gamepad input until ready (prevents carryover from Press to Start)
    if (!this.gamepadReady) return;

    // Gamepad menu navigation
    if (this.inControls) {
      if (PrinceJS.Utils.gamepadButtonPressedCheck(this.game, [PrinceJS.Gamepad.A, PrinceJS.Gamepad.B], "controls_exit")) {
        this.toggleControls();
      }
      return;
    }

    // Navigate up (D-pad only, no continuous joystick)
    if (PrinceJS.Utils.gamepadButtonPressedCheck(this.game, [PrinceJS.Gamepad.DPadU], "menu_up")) {
      this.selectedOption--;
      if (this.selectedOption < 0) this.selectedOption = this.buttons.length - 1;
      this.updateSelection();
    }
    // Navigate down (D-pad only)
    else if (PrinceJS.Utils.gamepadButtonPressedCheck(this.game, [PrinceJS.Gamepad.DPadD], "menu_down")) {
      this.selectedOption++;
      if (this.selectedOption >= this.buttons.length) this.selectedOption = 0;
      this.updateSelection();
    }
    // Select option
    if (PrinceJS.Utils.gamepadButtonPressedCheck(this.game, [PrinceJS.Gamepad.A], "menu_select")) {
      this.selectOption();
    }
  }
};
