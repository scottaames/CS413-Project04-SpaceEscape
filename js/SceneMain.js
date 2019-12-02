class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  init(data) {
    this.difficulty = data.difficulty;
  }

  preload() {
    // load background
    this.load.image("background1", "../assets/sprites/sprBg0.png");
    this.load.image("background2", "../assets/sprites/sprBg1.png");

    // load sprites
    this.load.image("pLaser", "../assets/sprites/laserPlayer.png");
    this.load.image("eLaser", "../assets/sprites/laserEnemy.png");

    // load spritesheets
    this.load.spritesheet("enemy", "../assets/spritesheets/ship1.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "../assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("spawner", "../assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "../assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    // load game audio
    this.load.audio("explodeSnd1", "../assets/sounds/sndExplode0.wav");
    this.load.audio("explodeSnd2", "../assets/sounds/sndExplode1.wav");
    this.load.audio("laserSnd", "../assets/sounds/sndLaser.wav");
  }

  create() {
    // create animations
    this.anims.create({
      key: "enemy",
      frames: this.anims.generateFrameNumbers("enemy"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "player",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "spawner",
      frames: this.anims.generateFrameNumbers("spawner"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    // create sound effects
    this.sfx = {
      explosions: [
        this.sound.add("explodeSnd1"),
        this.sound.add("explodeSnd2")
      ],
      laser: this.sound.add("laserSnd")
    };

    this.backgrounds = [];
    for (var i = 0; i < 4; i++) {
      var keys = ["background1", "background2"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 7);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2,
      "player"
    );

    // keyboard controls
    this.up = this.input.keyboard.addKey("W");
    this.down = this.input.keyboard.addKey("S");
    this.left = this.input.keyboard.addKey("A");
    this.right = this.input.keyboard.addKey("D");
    /*     this.turnRight = this.input.keyboard.addKey("RIGHT");
    this.turnLeft = this.input.keyboard.addKey("LEFT"); */
    this.fire = this.input.keyboard.addKey("SPACE");

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.physics.add.overlap(this.player, this.enemies, function(
      player,
      enemy
    ) {
      if (!player.getData("isDead") && !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(
      player,
      laser
    ) {
      if (!player.getData("isDead") && !laser.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });

    for (var i = 1; i <= this.difficulty; i++) {
      var x = Phaser.Math.Between(50, this.game.config.width - 50);
      var y = Phaser.Math.Between(40, 250);
      var enemy = new EnemySpawner(this, x, y, this.difficulty).setOrigin(0.5);
      if (enemy !== null) {
        enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
        this.enemies.add(enemy);
      }
    }

    this.time.addEvent({
      delay: 3500 / this.difficulty,
      callback: function() {
        var enemy = new EnemyChaser(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0
        );
        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.overlap(this.playerLasers, this.enemies, function(
      playerLaser,
      enemy
    ) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        playerLaser.destroy();
      }
    });

    this.currScore = 0;
    this.scoreToWin = 6 * this.difficulty;
    this.timer = this.add
      .text(
        this.game.config.width - 5,
        this.game.config.height,
        "SCORE\n" + this.currScore + "/" + this.scoreToWin,
        {
          fontFamily: "roboto",
          fontSize: 28,
          fontStyle: "bold",
          color: "yellow",
          align: "right"
        }
      )
      .setOrigin(1);
  }

  getEnemiesByType(type) {
    var enemyArr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        enemyArr.push(enemy);
      }
    }
    return enemyArr;
  }

  update() {
    // scroll background
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }

    this.timer.text = "SCORE\n" + this.currScore + "/" + this.scoreToWin;

    if (this.currScore >= this.scoreToWin && !this.player.getData("isDead")) {
      this.player.onWin();
    }

    // player movement
    if (!this.player.getData("isDead")) {
      this.player.update();

      if (this.up.isDown) {
        this.player.moveUp();
      } else if (this.down.isDown) {
        this.player.moveDown();
      }

      if (this.left.isDown) {
        this.player.moveLeft();
      } else if (this.right.isDown) {
        this.player.moveRight();
      }

      if (this.fire.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData(
          "timerShootTick",
          this.player.getData("timerShootDelay") - 1
        );
        this.player.setData("isShooting", false);
      }
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      enemy.update();

      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }
    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}
