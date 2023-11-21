import { useEffect } from "react";
import phaser from "phaser";

function BootloaderNave() {
  useEffect(() => {
    class BootloaderNaveScene extends phaser.Scene {
      constructor() {
        super("BootloaderNave");
      }

      preload() {
        // Rutas relativas a la carpeta pública (o la carpeta donde se sirven los archivos estáticos)
        this.load.image('BG', '/assets/nave/sky.png');
        // ... (otras rutas)

        this.load.on("complete", () => {
          this.scene.start("menu");
        });
      }

      create() {}
    }

    const config = {
      scene: [BootloaderNaveScene],
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

    return () => {
      game.destroy(true);
    };
  }, []); // El segundo argumento de useEffect debe ser un array vacío si solo quieres que se ejecute una vez

  return null; // React requiere que el componente devuelva algo, pero como el componente está manejando Phaser por fuera, devolvemos null.
}

export default BootloaderNave;