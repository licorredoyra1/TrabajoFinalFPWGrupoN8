import Phaser from "phaser";
class Game_over extends Phaser.Scene{

    constructor(){
        super("Game_over");
    }

    preload(){
        
    }

    
    create(){
    
        this.add.image(400, 300, 'GameOver');

        this.sound.stopAll('MenuSound');

        const sonido = this.sound.add('Lose');
        const soundConfig = {
            volume: 1,
            loop: false
          };
          
          sonido.play(soundConfig);
        
    }
}
export default Game_over;