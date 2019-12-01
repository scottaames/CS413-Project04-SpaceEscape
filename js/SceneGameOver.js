class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: "monospace",
      fontSize: 48,
      fontStyle: "bold",
      color: "#ffffff",
      align: "center"
    });
    this.title.setOrigin(0.5);

    this.sfx = {
      btnHoverSnd: this.sound.add("btnHoverSnd"),
      btnDownSnd: this.sound.add("btnDownSnd")
    };

    this.btnRestart = this.add
      .sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "restartBtn"
      )
      .setInteractive();

    this.btnRestart.on(
      "pointerover",
      function() {
        this.btnRestart.setTexture("restartBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.btnRestart.on("pointerout", function() {
      this.setTexture("restartBtn");
    });

    this.btnRestart.on(
      "pointerdown",
      function() {
        this.btnRestart.setTexture("restartBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.btnRestart.on(
      "pointerup",
      function() {
        this.btnRestart.setTexture("restartBtn");
        this.scene.start("SceneMain");
      },
      this
    );

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
