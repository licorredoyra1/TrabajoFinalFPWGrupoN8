import phaser from "phaser";
import { useState, useEffect } from "react";

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