var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 800,
  parent: "gameport",
  backgroundColor: "black",
  scene: [SceneMain, SceneStartMenu, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  autofocus: true
};

var game = new Phaser.Game(config);
