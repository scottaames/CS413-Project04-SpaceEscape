class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }

  init(data) {
    this.hasWon = data.hasWon;
    this.difficulty = data.difficulty;
  }

  preload() {
    // load background
    this.load.image("background1", "../assets/sprites/sprBg0.png");
    this.load.image("background2", "../assets/sprites/sprBg1.png");

    this.load.image("restartBtn", "../assets/buttons/restartBtn@2x.png");
    this.load.image(
      "restartBtnHover",
      "../assets/buttons/restartBtnHover@2x.png"
    );
    this.load.image(
      "restartBtnDown",
      "../assets/buttons/restartBtnDown@2x.png"
    );
    this.load.image("contBtn", "../assets/buttons/contBtn@2x.png");
    this.load.image("contBtnHover", "../assets/buttons/contBtnHover@2x.png");
    this.load.image("contBtnDown", "../assets/buttons/contBtnDown@2x.png");
  }

  create() {
    this.title = this.add
      .text(this.game.config.width / 2, 110, "GAME OVER.", {
        fontFamily: "roboto",
        fontSize: 100,
        fontStyle: "bold",
        color: "darkred",
        align: "center"
      })
      .setOrigin(0.5);

    this.title2 = this.add
      .text(this.game.config.width / 2, 290, "Try again?", {
        fontFamily: "roboto",
        fontSize: 60,
        fontStyle: "bold",
        color: "beige",
        align: "center"
      })
      .setOrigin(0.5);

    this.sfx = {
      btnHoverSnd: this.sound.add("btnHoverSnd"),
      btnDownSnd: this.sound.add("btnDownSnd")
    };

    this.restartBtn = this.add
      .sprite(this.game.config.width * 0.5, this.title2.y + 165, "restartBtn")
      .setInteractive()
      .setScale(0.8);

    this.restartBtn.on(
      "pointerover",
      function() {
        this.restartBtn.setTexture("restartBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.restartBtn.on("pointerout", function() {
      this.setTexture("restartBtn");
    });

    this.restartBtn.on(
      "pointerdown",
      function() {
        this.restartBtn.setTexture("restartBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.restartBtn.on(
      "pointerup",
      function() {
        this.restartBtn.setTexture("restartBtn");
        this.scene.start("SceneDifficulty");
      },
      this
    );
    this.contBtn = this.add
      .sprite(this.game.config.width * 0.5, this.restartBtn.y + 120, "contBtn")
      .setInteractive();

    this.contBtn.on(
      "pointerover",
      function() {
        this.contBtn.setTexture("contBtnHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnHoverSnd.play(); // play the button over sound
      },
      this
    );

    this.contBtn.on("pointerout", function() {
      this.setTexture("contBtn");
    });

    this.contBtn.on(
      "pointerdown",
      function() {
        this.contBtn.setTexture("contBtnDown");
        this.sfx.btnDownSnd.play();
      },
      this
    );

    this.contBtn.on(
      "pointerup",
      function() {
        this.contBtn.setTexture("contBtn");
        this.scene.start("SceneMain", { difficulty: this.difficulty });
      },
      this
    );

    this.backgrounds = [];
    for (var i = 0; i < 4; i++) {
      var keys = ["background1", "background2"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 7);
      this.backgrounds.push(bg);
    }

    if (!this.hasWon) {
      this.contBtn.active = false;
      this.contBtn.disableInteractive().setTint(0x2d2d2d);
    } else {
      this.title.setText("Good job!\nYou have advanced\nto the next level.");
      this.title.setStyle({
        fontFamily: "roboto",
        fontSize: 60,
        fontStyle: "",
        color: "#2a786a",
        align: "center"
      });
      this.title2.setText("What are you\nwaiting for?");
      this.title2.setStyle({
        fontSize: 38,
        fontStyle: ""
      });
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}
