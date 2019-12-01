class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    // load background
    this.load.image("map", "../assets/sprites/map.png");

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

    // load menu assets
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

    // add background
    this.map = this.add.tileSprite(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      "map"
    );
    this.map.setOrigin(0, 0);
    this.map.setScale(1);

    this.player = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2,
      "player"
    );

    this.spawnerTopLeft = new EnemySpawner(this, 40, 40);
    this.spawnerTopRight = new EnemySpawner(
      this,
      this.game.config.width - 40,
      40
    );

    // keyboard controls
    this.up = this.input.keyboard.addKey("W");
    this.down = this.input.keyboard.addKey("S");
    this.left = this.input.keyboard.addKey("A");
    this.right = this.input.keyboard.addKey("D");
    this.turnRight = this.input.keyboard.addKey("LEFT");
    this.turnLeft = this.input.keyboard.addKey("RIGHT");
    this.fire = this.input.keyboard.addKey("SPACE");

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.enemies.add(this.spawnerTopLeft);
    this.enemies.add(this.spawnerTopRight);

    this.physics.add.overlap(this.player, this.enemies, function(
      player,
      enemy
    ) {
      if (!player.getData("isDead") && !enemy.getData("isDead")) {
        player.explode(false);
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(
      player,
      laser
    ) {
      if (!player.getData("isDead") && !laser.getData("isDead")) {
        player.explode(false);
        laser.destroy();
      }
    });

    this.time.addEvent({
      delay: 1000,
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

    this.physics.add.collider(this.playerLasers, this.enemies, function(
      playerLaser,
      enemy
    ) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
      }
    });
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

    this.map.tilePositionY -= 0.5;

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
