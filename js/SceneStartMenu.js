class SceneStartMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    // load background
    this.load.image("background1", "../assets/sprites/sprBg0.png");
    this.load.image("background2", "../assets/sprites/sprBg1.png");

    // load menu assets
    this.load.image("title", "../assets/sprites/title.png");
    this.load.image("playBtn", "../assets/buttons/sprBtnPlay.png");
    this.load.image("playBtnHover", "../assets/buttons/sprBtnPlayHover.png");
    this.load.image("playBtnDown", "../assets/buttons/sprBtnPlayDown.png");
    this.load.image("restartBtn", "../assets/buttons/sprBtnRestart.png");
    this.load.image(
      "restartBtnHover",
      "../assets/buttons/sprBtnRestartHover.png"
    );
    this.load.image(
      "restartBtnDown",
      "../assets/buttons/sprBtnRestartDown.png"
    );
    this.load.audio("btnHoverSnd", "../assets/sounds/sndBtnOver.wav");
    this.load.audio("btnDownSnd", "../assets/sounds/sndBtnDown.wav");
  }

  create() {
    this.sfx = {
      btnHoverSnd: this.sound.add("btnHoverSnd"),
      btnDownSnd: this.sound.add("btnDownSnd")
    };

    this.playBtn = this.add
      .sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "playBtn"
      )
      .setInteractive();

    this.playBtn.on(
      "pointerover",
      function() {
        this.playBtn.setTexture("playBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.playBtn.on("pointerout", function() {
      this.setTexture("playBtn");
    });

    this.playBtn.on(
      "pointerdown",
      function() {
        this.playBtn.setTexture("playBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.playBtn.on(
      "pointerup",
      function() {
        this.playBtn.setTexture("playBtn");
        this.scene.start("SceneMain");
      },
      this
    );

    this.title = this.add.image(this.game.config.width / 2, 250, "title");
    this.title.setCrop(0, 0, this.title.width, this.title.height / 2);

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["background1", "background2"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}
