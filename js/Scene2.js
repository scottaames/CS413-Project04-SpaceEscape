class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        // add background
        this.map = this.add.tileSprite(
            0,
            0,
            config.width,
            config.height,
            "map"
        );
        this.map.setOrigin(0, 0);
        this.map.setScale(1);

        this.enemy = this.add
            .sprite(config.width / 2 - 50, config.height / 2, "enemy")
            .setScale(3);

        this.player = this.add
            .sprite(config.width / 2, config.height / 2, "player")
            .setScale(2)
            .toggleFlipY();

        this.spawnerTopLeft = this.add.sprite(40, 40, "spawner").setScale(2);
        this.spawnerTopRight = this.add
            .sprite(config.width - 40, 40, "spawner")
            .setScale(2);
        this.spawnerBotLeft = this.add
            .sprite(40, config.height - 40, "spawner")
            .setScale(2)
            .toggleFlipY();
        this.spawnerBotRight = this.add
            .sprite(config.width - 40, config.height - 40, "spawner")
            .setScale(2)
            .toggleFlipY();

        this.enemy.play("enemy_anim");
        this.player.play("player_anim");
        this.spawnerTopLeft.play("spawner_anim");
        this.spawnerTopRight.play("spawner_anim");
        this.spawnerBotLeft.play("spawner_anim");
        this.spawnerBotRight.play("spawner_anim");

        //this.input.on("gameobjectdown", this.destroyShip, this);

        /*
        this.add.text(20, 20, "Playing game", {
            font: "25px Arial",
            fill: "yellow"
        });

        const bounds = new Rectangle([
            0 + this.player.width,
            0 + this.player.height,
            config.width - this.player.width,
            config.height - this.player.height
        ]);
        */
        this.physics.world.setBoundsCollision();
        this.physics.add.existing(this.player);

        // keyboard controls
        this.input.keyboard.on("keydown-" + "W", function(event) {
            this.movePlayer("up", 2);
        });
        this.input.keyboard.on("keyup-" + "W", function(event) {
            this.movePlayer("up", 0);
        });
        this.input.keyboard.on("keydown-" + "S", function(event) {
            this.movePlayer("down", 2);
        });
        this.input.keyboard.on("keyup-" + "S", function(event) {
            this.movePlayer("down", 0);
        });
        this.input.keyboard.on("keydown-" + "A", function(event) {
            this.movePlayer("left", 2);
        });
        this.input.keyboard.on("keyup-" + "A", function(event) {
            this.movePlayer("left", 0);
        });
        this.input.keyboard.on("keydown-" + "D", function(event) {
            this.movePlayer("right", 2);
        });
        this.input.keyboard.on("keyup-" + "D", function(event) {
            this.movePlayer("right", 0);
        });
        this.input.keyboard.on("keydown-" + "LEFT", function(event) {
            player.angle += 1;
        });
        this.input.keyboard.on("keyup-" + "LEFT", function(event) {
            player.angle += 0;
        });
        this.input.keyboard.on("keydown-" + "RIGHT", function(event) {
            player.angle -= 1;
        });
        this.input.keyboard.on("keyup-" + "RIGHT", function(event) {
            player.angle -= 0;
        });
    }

    update() {
        this.moveEnemy(this.enemy, 2);
        //this.moveShip(this.player, 2);
        //this.moveShip(this.spawner, 3);

        this.map.tilePositionY -= 0.5;
    }

    moveEnemy(ship, speed) {
        ship.y += speed;
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    movePlayer(direction, speed) {
        switch (direction) {
            case "up":
                this.player.y > this.player.height / 2
                    ? (this.player.y -= speed)
                    : (this.player.y = this.player.height / 2);
                break;
            case "down":
                this.player.y < config.height - this.player.height / 2
                    ? (this.player.y += speed)
                    : config.height - this.player.height / 2;
                break;
            case "left":
                this.player.x > this.player.width / 2
                    ? (this.player.x -= speed)
                    : (this.player.x = this.player.width / 2);
                break;
            case "right":
                this.player.x < config.width - this.player.width / 2
                    ? (this.player.x -= speed)
                    : config.width - this.player.width / 2;
                break;
        }
    }

    turnPLayer(player, speed) {}

    resetShipPos(ship) {
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    // 1.3
    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }
}
