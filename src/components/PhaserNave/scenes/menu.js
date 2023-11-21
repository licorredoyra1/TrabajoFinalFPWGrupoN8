import Phaser from "phaser";

class menu extends Phaser.Scene{


    constructor(){
        super("menu");
    }


    preload(){

        
    }

    create(){
    this.add.image(400,300, "menuBg");
    this.startButton = this.physics.add.sprite(400,420, "menuPlay").setInteractive();
    this.add.image(400,200, "titulo");

    this.startButton.on('pointerdown',() => {
        this.scene.start("Scene_playNave");
    });

    }
}
export default menu;