import Phaser from "phaser";
class Winner extends Phaser.Scene{

    constructor(){
        super("Winner");
    }

    preload(){
    
        console.log('ganaste');
    }

    
    create(){
    
        this.add.image(400, 300, 'winner');

       //Para el sonido del inicio
        this.sound.stopAll('MenuSound');

         //Resproduccion del sonido

        const sonido = this.sound.add('Win');
        const soundConfig = {
            volume: 1,
            loop: false
          };
          
          sonido.play(soundConfig);

    }
}
export default Winner;