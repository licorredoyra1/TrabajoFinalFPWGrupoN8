import { useState, useEffect } from "react";
import phaser from "phaser";

function AppPhaser() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    class Bootloader extends phaser.Scene {
      constructor() {
        super("Bootloader");
      }

      preload() {
        this.load.image("bomb", "../assets/bomb.png");
        this.load.spritesheet("dude", "../assets/dude.png", {
          frameWidth: 32,
          frameHeight: 48,
        });
        this.load.image("platform", "../assets/platform.png");
        this.load.image("sky", "../assets/sky.png");
        this.load.image("star", "../assets/star.png");
        this.load.audio("sonidoBG", "../assets/MenuSound.mp3");
        this.load.image("MenuBG", "../assets/MenuBG.png");
        this.load.spritesheet("button", "../assets/StartButton.png", {
          frameWidth: 290,
          frameHeight: 130,
        });
        this.load.image("winner", "../assets/winner.png");
        this.load.image("GameOver", "../assets/GameOver.png");
        this.load.audio("Lose", "./assets/lose.mp3");
        this.load.audio("Win", "./assets/win.wav");

        // Scene_play2
        this.load.image("fondo", "../assets/BG.png");
        this.load.image("lava", "../assets/lava.png");

        this.load.on("complete", () => {
          this.scene.start("Menu");
        });
      }

      create() {}
    }

    const config = {
      scene: [Bootloader],
      title: "FPWTP04",
      version: "0.0.1",
      type: phaser.AUTO,
      scale: {
        parent: "phaser_container",
        width: 800,
        height: 600,
        mode: phaser.Scale.FIT,
        autoCenter: phaser.Scale.CENTER_BOTH,
      },
      backgroundColor: "#ffffff",
      pixelArt: false,
      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            y: 500,
          },
        },
      },
    };

    const game = new phaser.Game(config);
    game.events.on("LISTO", setListo);

    return () => {
      setListo(false);
      game.destroy(true);
    };
  }, [listo]);

  return null; // React requiere que el componente devuelva algo, pero como el componente está manejando Phaser por fuera, devolvemos null.
}

export default AppPhaser;
