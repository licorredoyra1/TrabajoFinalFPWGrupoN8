import Phaser from "phaser";

class megaWin extends Phaser.Scene{


    constructor(){
        super("megaWin");
    }


    preload(){

    }

    create(){
        this.sound.stopAll('win');
        this.sound.stopAll('gameOver');
        this.sound.stopAll('sound');
        this.sonido = this.sound.add('win');
        const soundConfig = {
            volume: 1,
            loop: true
        }
        
        this.sonido.play(soundConfig);
    this.add.image(400,300, "megaWin");
    this.startButton = this.physics.add.sprite(400,420, "restart").setInteractive();
    

    this.startButton.on('pointerdown',() => {
        this.scene.start("menu");
    });

    }
}
    export default megaWin;