import phaser from "phaser";
import { useState, useEffect } from "react";
import BootloaderNave from "./BootloaderNave";
import Scene_playNave from "./scenes/Scene_playNave";
import Scene_playNave2 from "./scenes/Scene_playNave2";
import gameOver from "./scenes/gameOver";
import megaWin from "./scenes/megaWin";
import menu from "./scenes/menu";

function AppNave(){
    const[listo, setListo] = useState(false);

    useEffect(() => {const config = {
        scene: [BootloaderNave, megaWin, gameOver, menu, , Scene_playNave,Scene_playNave2 ],
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
let game = new Phaser.Game(config)
game.events.on("LISTO", setListo)

return() =>{
    setListo(false);
    game.destroy(true);
}}, [listo]);

}
export default AppNave;