var config = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  parent: "gameport",
  backgroundColor: "black",
  scene: [SceneStartMenu, SceneMain, SceneGameOver],
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
