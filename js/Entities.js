class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode(canDestroy) {
    if (!this.getData("isDead")) {
      // Set the texture to the explosion image, then play the animation
      this.setTexture("explosion"); // this refers to the same animation key we used when we added this.anims.create previously
      this.play("explosion"); // play the animation

      // pick a random explosion sound within the array we defined in this.sfx in SceneMain
      this.scene.sfx.explosions[
        Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)
      ].play();

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on(
        "animationcomplete",
        function() {
          if (canDestroy) {
            this.destroy();
          } else {
            this.setVisible(false);
          }
        },
        this
      );

      this.setData("isDead", true);
    }
  }
}

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, "Player");
    this.setData("speed", 200);
    this.play("player");
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    this.setScale(2);
    this.setFlipY(true);
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }

  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }

  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }

  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  turnRight() {
    this.body.angle += 3;
  }

  turnLeft() {
    this.body.angle -= 3;
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else {
        // when the "manual timer" is triggered:
        var laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData("timerShootTick", 0);
      }
    }
  }
}

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "pLaser");
    this.body.velocity.y = -200;
    this.setScale(1.75);
  }
}

class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "eLaser");
    this.body.velocity.y = 200;
  }
}

class EnemyChaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "enemy", "EnemyChaser");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.shootTimer = this.scene.time.addEvent({
      delay: Phaser.Math.Between(750, 1500),
      callback: function() {
        var laser = new EnemyLaser(this.scene, this.x, this.y);
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });
    this.play("enemy");
    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.MOVE_DOWN;
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }

  update() {
    if (!this.getData("isDead") && this.scene.player) {
      if (
        Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.scene.player.x,
          this.scene.player.y
        ) < 320
      ) {
        this.state = this.states.CHASE;
      }

      if (this.state == this.states.CHASE) {
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;

        var angle = Math.atan2(dy, dx);

        var speed = 100;
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        if (this.x < this.scene.player.x) {
          this.setFlipY(false);
        } else {
          this.setFlipY(true);
        }
      }
    }
  }
}

class EnemySpawner extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "spawner", "EnemySpawner");
    this.play("spawner");
    this.setScale(2);
  }
}