class megaWin extends Phaser.Scene{


    constructor(){
        super("megaWin");
    }


    preload(){

    }

    create(){
    this.add.image(400,300, "megaWin");
    this.startButton = this.physics.add.sprite(400,420, "restart").setInteractive();
    

    this.startButton.on('pointerdown',() => {
        this.scene.start("menu");
    });

    }
}
    export default megaWin;