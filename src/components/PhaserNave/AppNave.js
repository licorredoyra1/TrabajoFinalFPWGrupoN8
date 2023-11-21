import React, { useEffect } from "react";
import Phaser from "phaser";
import BootloaderNave from "./BootloaderNave";
import Scene_playNave from "./scenes/Scene_playNave";
import Scene_playNave2 from "./scenes/Scene_playNave2";
import gameOver from "./scenes/gameOver";
import megaWin from "./scenes/megaWin";
import menu from "./scenes/menu";

function AppNave() {
  useEffect(() => {
    const config = {
      scene: [BootloaderNave, megaWin, gameOver, menu, Scene_playNave, Scene_playNave2],
      title: "FPWTpExpress",
      version: "0.0.1",
      type: Phaser.AUTO,
      scale: {
        parent: "phaser_container",
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      backgroundColor: "#ffffff",
      pixelArt: false,
      physics: {
        default: "arcade",
        "arcade": {
          gravity: {
            y: 0
          }
        }
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []); // El segundo argumento de useEffect debe ser un array vacío si solo quieres que se ejecute una vez

  // Aquí puedes devolver cualquier contenido JSX que desees renderizar
  return BootloaderNave;
}

export default AppNave;