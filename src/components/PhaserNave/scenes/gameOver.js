import Phaser from "phaser";

class gameOver extends Phaser.Scene{


    constructor(){
        super("gameOver");
    }


    preload(){

    }

    create(){
        this.sound.stopAll('win');
        this.sound.stopAll('gameOver');
        this.sound.stopAll('sound');
        this.sonido = this.sound.add('gameOver');
        const soundConfig = {
            volume: 1,
            loop: true
        }
        
        this.sonido.play(soundConfig);
    this.add.image(400,300, "gameOver");
    this.startButton = this.physics.add.sprite(400,420, "restart").setInteractive();
    

    this.startButton.on('pointerdown',() => {
        this.scene.start("menu");
    });

    }
}
    export default gameOver;