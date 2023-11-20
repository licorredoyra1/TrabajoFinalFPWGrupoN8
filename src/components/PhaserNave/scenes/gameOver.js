
class gameOver extends Phaser.Scene{


    constructor(){
        super("gameOver");
    }


    preload(){

    }

    create(){
    this.add.image(400,300, "gameOver");
    this.startButton = this.physics.add.sprite(400,420, "restart").setInteractive();
    

    this.startButton.on('pointerdown',() => {
        this.scene.start("menu");
    });

    }
}
    export default gameOver;