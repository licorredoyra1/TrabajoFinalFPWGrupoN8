import Phaser from "phaser";
class Menu extends Phaser.Scene{

    constructor(){
        super("Menu");
    }

    preload(){
            
    }

    create(){
        this.sonido = this.sound.add('sonidoBG');
        const soundConfig = {
            volume: 1,
            loop: true
        }
        
        this.sonido.play(soundConfig);
    

        this.add.image(400,300, 'MenuBG');
        this.startButton = this.add.image(415, 370, 'button').setInteractive();
        
        //this.startButton.on('pointerover', ()=>{
        //    this.startButton.setFrame(1);
        //});

        //this.startButton.on('pointerout',() => {
        //    this.startButton.setFrame(0);
        //});

        this.startButton.on('pointerdown',() => {
           this.scene.start('Scene_play');
        });


    }


}
export default Menu;