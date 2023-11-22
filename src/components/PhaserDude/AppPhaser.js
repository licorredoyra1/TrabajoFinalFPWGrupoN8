import Phaser from "phaser";
import { useState, useEffect } from "react";
import Game_over from './scenes/Game_over';
import Menu from "./scenes/Menu";
import Scene_play from "./scenes/Scene_play";
import Scene_play2 from "./scenes/Scene_play2";
import Scene_play3 from "./scenes/Scene_play3";
import Winner from "./scenes/Winner";
import Bootloader from "./Bootloader";

function AppPhaser(){
    const[listo, setListo] = useState(false);

    useEffect(() => {const config = {
        scene: [Bootloader, Menu, Scene_play, Winner, Game_over, Scene_play2, Scene_play3],
        title: "FPWTP04",
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
                    y: 500
                }
            }
        },
        
        
    };
let game = new Phaser.Game(config)
game.events.on("LISTO", setListo)

return() =>{
    setListo(false);
    game.destroy(true);
}}, [listo]);

}
export default AppPhaser;