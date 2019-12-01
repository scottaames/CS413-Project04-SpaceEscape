var config = {
    width: 800,
    height: 800,
    parent: "gameport",
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    autofocus: true
};

var game = new Phaser.Game(config);
