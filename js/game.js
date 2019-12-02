const config = {
  type: Phaser.WEBGL,
  width: 1024,
  height: 768,
  parent: "gameport",
  backgroundColor: "black",
  scene: [
    SceneStartMenu,
    SceneDifficulty,
    SceneInstructions,
    SceneCredits,
    SceneMain,
    SceneGameOver
  ],
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

const game = new Phaser.Game(config);
