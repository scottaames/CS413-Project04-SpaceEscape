class SceneDifficulty extends Phaser.Scene {
  constructor() {
    super({ key: "SceneDifficulty" });
  }

  preload() {
    // load background
    this.load.image("background1", "../assets/sprites/sprBg0.png");
    this.load.image("background2", "../assets/sprites/sprBg1.png");

    // load buttons
    this.load.image("easyBtn", "../assets/buttons/easyBtn@2x.png");
    this.load.image("easyBtnHover", "../assets/buttons/easyBtnHover@2x.png");
    this.load.image("easyBtnDown", "../assets/buttons/easyBtnDown@2x.png");
    this.load.image("medBtn", "../assets/buttons/medBtn@2x.png");
    this.load.image("medBtnHover", "../assets/buttons/medBtnHover@2x.png");
    this.load.image("medBtnDown", "../assets/buttons/medBtnDown@2x.png");
    this.load.image("hardBtn", "../assets/buttons/hardBtn@2x.png");
    this.load.image("hardBtnHover", "../assets/buttons/hardBtnHover@2x.png");
    this.load.image("hardBtnDown", "../assets/buttons/hardBtnDown@2x.png");
    this.load.image("diffTitle", "../assets/sprites/selectDiff.png");

    this.load.audio("btnHoverSnd", "../assets/sounds/sndBtnOver@2x.wav");
    this.load.audio("btnDownSnd", "../assets/sounds/sndBtnDown@2x.wav");
  }

  create() {
    this.backgrounds = [];
    for (var i = 0; i < 4; i++) {
      var keys = ["background1", "background2"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 5);
      this.backgrounds.push(bg);
    }

    this.add.image(this.game.config.width / 2, 130, "diffTitle");

    this.sfx = {
      btnHoverSnd: this.sound.add("btnHoverSnd"),
      btnDownSnd: this.sound.add("btnDownSnd")
    };

    this.easyBtn = this.add
      .sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "easyBtn"
      )
      .setInteractive();

    this.easyBtn.on(
      "pointerover",
      function() {
        this.easyBtn.setTexture("easyBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.easyBtn.on("pointerout", function() {
      this.setTexture("easyBtn");
    });

    this.easyBtn.on(
      "pointerdown",
      function() {
        this.easyBtn.setTexture("easyBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.easyBtn.on(
      "pointerup",
      function() {
        this.easyBtn.setTexture("easyBtn");
        this.scene.start("SceneMain", { difficulty: 3 });
      },
      this
    );

    this.medBtn = this.add
      .sprite(
        this.easyBtn.x,
        this.easyBtn.y + this.easyBtn.height * 1.1,
        "medBtn"
      )
      .setInteractive();

    this.medBtn.on(
      "pointerover",
      function() {
        this.medBtn.setTexture("medBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.medBtn.on("pointerout", function() {
      this.setTexture("medBtn");
    });

    this.medBtn.on(
      "pointerdown",
      function() {
        this.medBtn.setTexture("medBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.medBtn.on(
      "pointerup",
      function() {
        this.medBtn.setTexture("easyBtn");
        this.scene.start("SceneMain", { difficulty: 5 });
      },
      this
    );

    this.hardBtn = this.add
      .sprite(
        this.easyBtn.x,
        this.medBtn.y + this.medBtn.height * 1.1,
        "hardBtn"
      )
      .setInteractive();

    this.hardBtn.on(
      "pointerover",
      function() {
        this.hardBtn.setTexture("hardBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.hardBtn.on("pointerout", function() {
      this.setTexture("hardBtn");
    });

    this.hardBtn.on(
      "pointerdown",
      function() {
        this.hardBtn.setTexture("hardBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.hardBtn.on(
      "pointerup",
      function() {
        this.hardBtn.setTexture("hardBtn");
        this.scene.start("SceneMain", { difficulty: 7 });
      },
      this
    );
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}
