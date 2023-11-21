
import phaser from "phaser";


    class Bootloader extends phaser.Scene {
      constructor() {
        super("Bootloader");
      }

      preload() {
        this.load.image("bomb", "assets/dude/bomb.png");
        this.load.spritesheet("dude", "assets/dude/dude.png", {
          frameWidth: 32,
          frameHeight: 48,
        });
        this.load.image("platform", "assets/dude/platform.png");
        this.load.image("sky", "assets/dude/sky.png");
        this.load.image("star", "assets/dude/star.png");
        this.load.audio("sonidoBG", "assets/dude/MenuSound.mp3");
        this.load.image("MenuBG", "assets/dude/MenuBG.png");
        this.load.spritesheet("button", "assets/dude/StartButton.png", {
          frameWidth: 290,
          frameHeight: 130,
        });
        this.load.image("winner", "assets/dude/winner.png");
        this.load.image("GameOver", "assets/dude/GameOver.png");
        this.load.audio("Lose", "./assets/dude/lose.mp3");
        this.load.audio("Win", "./assets/dude/win.wav");

        // Scene_play2
        this.load.image("fondo", "assets/dude/BG.png");
        this.load.image("lava", "assets/dude/lava.png");

        this.load.on("complete", () => {
          this.scene.start("Menu");
        });
      }

      create() {}
    }


export default Bootloader;
