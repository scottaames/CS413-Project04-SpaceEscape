class SceneInstructions extends Phaser.Scene {
  constructor() {
    super({ key: "SceneInstructions" });
  }

  preload() {
    // load background
    this.load.image("background1", "../assets/sprites/sprBg0.png");
    this.load.image("background2", "../assets/sprites/sprBg1.png");

    this.load.image("startBtn", "../assets/buttons/startBtn@2x.png");
    this.load.image("startBtnHover", "../assets/buttons/startBtnHover@2x.png");
    this.load.image("startBtnDown", "../assets/buttons/startBtnDown@2x.png");
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

    this.title = this.add
      .text(this.game.config.width / 2, 45, "How To Play:", {
        fontFamily: "roboto",
        fontSize: 62,
        fontStyle: "bold",
        color: "#44d7b6",
        align: "center"
      })
      .setOrigin(0.5);

    this.body1 = this.add
      .text(
        this.game.config.width * 0.5,
        this.title.y + 75,
        "1.\t Use W, A, S, D to move the spaceship \n\tup, left, down, and right, respectively.",
        {
          fontFamily: "roboto",
          fontSize: 22,
          fontStyle: "",
          color: "#2a786a",
          align: "center"
        }
      )
      .setOrigin(0.5);

    this.body2 = this.add
      .text(
        this.game.config.width * 0.5,
        this.body1.y + 70,
        "2.\t Avoid all spaceships and their lasers. \n One hit and you're done!",
        {
          fontFamily: "roboto",
          fontSize: 22,
          fontStyle: "",
          color: "#2a786a",
          align: "center"
        }
      )
      .setOrigin(0.5);

    this.body3 = this.add
      .text(
        this.game.config.width * 0.5,
        this.body2.y + 100,
        "3.\t Reach the target score by killing\nenemies and destroy all spawners (the \nstationary, larger ships) to get to \nthe next level.",
        {
          fontFamily: "roboto",
          fontSize: 22,
          fontStyle: "",
          color: "#2a786a",
          align: "center"
        }
      )
      .setOrigin(0.5);

    this.body4 = this.add
      .text(
        this.game.config.width * 0.5,
        this.body3.y + 120,
        "4.\t Each level gets progressively harder\nthrough increased enemies, slower player\nmovement, and larger player size,\nto name a few.",
        {
          fontFamily: "roboto",
          fontSize: 22,
          fontStyle: "",
          color: "#2a786a",
          align: "center"
        }
      )
      .setOrigin(0.5);

    this.body5 = this.add
      .text(this.game.config.width * 0.5, this.body4.y + 80, "Good luck!!", {
        fontFamily: "roboto",
        fontSize: 26,
        fontStyle: "bold",
        color: "#cc8664",
        align: "center"
      })
      .setOrigin(0.5);

    this.startBtn = this.add
      .sprite(
        this.game.config.width * 0.5 - 190,
        this.game.config.height * 0.9,
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

    this.backBtn = this.add
      .sprite(
        this.game.config.width * 0.5 + 190,
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
