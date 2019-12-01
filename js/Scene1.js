class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("map", "../assets/map.png");

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
        this.load.spritesheet(
            "explosion",
            "../assets/spritesheets/explosion.png",
            {
                frameWidth: 16,
                frameHeight: 16
            }
        );
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");

        this.anims.create({
            key: "enemy_anim",
            frames: this.anims.generateFrameNumbers("enemy"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "spawner_anim",
            frames: this.anims.generateFrameNumbers("spawner"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
    }
}
