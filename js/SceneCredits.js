class SceneCredits extends Phaser.Scene {
  constructor() {
    super({ key: "SceneCredits" });
  }

  preload() {
    // load background
    this.load.image("background1", "../assets/sprites/sprBg0.png");
    this.load.image("background2", "../assets/sprites/sprBg1.png");

    this.load.image("credits", "../assets/sprites/credits.png");
    this.load.image("backBtn", "../assets/buttons/backBtn@2x.png");
    this.load.image("backBtnHover", "../assets/buttons/backBtnHover@2x.png");
    this.load.image("backBtnDown", "../assets/buttons/backBtnDown@2x.png");

    this.load.audio("btnHoverSnd", "../assets/sounds/sndBtnOver.wav");
    this.load.audio("btnDownSnd", "../assets/sounds/sndBtnDown.wav");
  }

  create() {
    this.sfx = {
      btnHoverSnd: this.sound.add("btnHoverSnd"),
      btnDownSnd: this.sound.add("btnDownSnd")
    };

    this.credits = this.add
      .image(
        this.game.config.width / 2,
        this.game.config.height / 2 - 70,
        "credits"
      )
      .setOrigin(0.5);
    this.credits.displayHeight += 70;

    this.backgrounds = [];
    for (var i = 0; i < 4; i++) {
      var keys = ["background1", "background2"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 7);
      this.backgrounds.push(bg);
    }

    this.backBtn = this.add
      .sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.9,
        "backBtn"
      )
      .setInteractive();

    this.backBtn.on(
      "pointerover",
      function() {
        this.backBtn.setTexture("backBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.backBtn.on("pointerout", function() {
      this.setTexture("backBtn");
    });

    this.backBtn.on(
      "pointerdown",
      function() {
        this.backBtn.setTexture("backBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.backBtn.on(
      "pointerup",
      function() {
        this.backBtn.setTexture("backBtn");
        this.scene.start("SceneStartMenu");
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
