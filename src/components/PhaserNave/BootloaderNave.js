import { useState, useEffect } from "react";
import phaser from "phaser";

function AppNave() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    class BootloaderNave extends phaser.Scene {
      constructor() {
        super("BootloaderNave");
      }

    preload() {
        
        this.load.image('BG', '..../assets/nave/sky.png');
        this.load.image('lvl2', '..../assets/nave/lvl2.png');
        this.load.spritesheet('nave', '..../assets/nave/nave.png', {
            frameWidth:70,
            frameHeight:62});
        this.load.image('enemigo','..../assets/nave/enemy.png');
        this.load.on("complete", () =>{
        this.scene.start("menu");
        });
         this.load.image('particula','..../assets/nave/red.png');
         this.load.image('disparo', '..../assets/nave/shoot.png');
         this.load.image('enemigo','..../assets/nave/enemy.png');
         this.load.image('boss', '..../assets/nave/boss.png');
         this.load.spritesheet('bala', '..../assets/nave/disparoBoss.png',{frameWidth:49,frameHeight:22});
         this.load.image('menuBg', '..../assets/nave/MenuBG.png');
         this.load.spritesheet('menuPlay', '..../assets/nave/playbt.png', {frameWidth:120,
         frameHeight:120});
         this.load.image('restart', '..../assets/nave/restartbt.png');
         this.load.image('gameOver', '..../assets/nave/GameOver.png');
         this.load.image('titulo', '..../assets/nave/titulo.png');
         this.load.image('megaWin', '..../assets/nave/megaWin.png');
         this.load.image('bonus', '..../assets/nave/bonus.png'); // Imagen del bonus
         this.load.image('home', '..../assets/nave/home.png'); // Imagen del home
         
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

export default AppNave;