class SceneStartMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneStartMenu" });
  }

  preload() {
    // load background
    this.load.image("background1", "../assets/sprites/sprBg0.png");
    this.load.image("background2", "../assets/sprites/sprBg1.png");

    // load menu assets
    this.load.image("title", "../assets/sprites/title.png");
    this.load.image("startBtn", "../assets/buttons/startBtn@2x.png");
    this.load.image("startBtnHover", "../assets/buttons/startBtnHover@2x.png");
    this.load.image("startBtnDown", "../assets/buttons/startBtnDown@2x.png");
    this.load.image("creditsBtn", "../assets/buttons/creditsBtn@2x.png");
    this.load.image(
      "creditsBtnHover",
      "../assets/buttons/creditsBtnHover@2x.png"
    );
    this.load.image(
      "creditsBtnDown",
      "../assets/buttons/creditsBtnDown@2x.png"
    );
    this.load.image("instructBtn", "../assets/buttons/instructBtn@2x.png");
    this.load.image(
      "instructBtnHover",
      "../assets/buttons/instructBtnHover@2x.png"
    );
    this.load.image(
      "instructBtnDown",
      "../assets/buttons/instructBtnDown@2x.png"
    );

    this.load.audio("btnHoverSnd", "../assets/sounds/sndBtnOver.wav");
    this.load.audio("btnDownSnd", "../assets/sounds/sndBtnDown.wav");
  }

  create() {
    this.sfx = {
      btnHoverSnd: this.sound.add("btnHoverSnd"),
      btnDownSnd: this.sound.add("btnDownSnd")
    };

    this.startBtn = this.add
      .sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "startBtn"
      )
      .setInteractive();

    this.startBtn.on(
      "pointerover",
      function() {
        this.startBtn.setTexture("startBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.startBtn.on("pointerout", function() {
      this.setTexture("startBtn");
    });

    this.startBtn.on(
      "pointerdown",
      function() {
        this.startBtn.setTexture("startBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.startBtn.on(
      "pointerup",
      function() {
        this.startBtn.setTexture("startBtn");
        this.scene.start("SceneDifficulty");
      },
      this
    );

    this.instructBtn = this.add
      .sprite(
        this.startBtn.x,
        this.startBtn.y + this.startBtn.height * 1.2,
        "instructBtn"
      )
      .setInteractive();

    this.instructBtn.on(
      "pointerover",
      function() {
        this.instructBtn.setTexture("instructBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.instructBtn.on("pointerout", function() {
      this.setTexture("instructBtn");
    });

    this.instructBtn.on(
      "pointerdown",
      function() {
        this.instructBtn.setTexture("instructBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.instructBtn.on(
      "pointerup",
      function() {
        this.instructBtn.setTexture("startBtn");
        this.scene.start("SceneInstructions");
      },
      this
    );

    this.creditsBtn = this.add
      .sprite(
        this.startBtn.x,
        this.instructBtn.y + this.instructBtn.height * 1.2,
        "creditsBtn"
      )
      .setInteractive();

    this.creditsBtn.on(
      "pointerover",
      function() {
        this.creditsBtn.setTexture("creditsBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.creditsBtn.on("pointerout", function() {
      this.setTexture("creditsBtn");
    });

    this.creditsBtn.on(
      "pointerdown",
      function() {
        this.creditsBtn.setTexture("creditsBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.creditsBtn.on(
      "pointerup",
      function() {
        this.creditsBtn.setTexture("creditsBtn");
        this.scene.start("SceneCredits");
      },
      this
    );

    this.title = this.add.image(
      this.game.config.width / 2,
      this.game.config.height * 0.2,
      "title"
    );

    this.backgrounds = [];
    for (var i = 0; i < 4; i++) {
      var keys = ["background1", "background2"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 7);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}
