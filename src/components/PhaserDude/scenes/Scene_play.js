import Phaser from "phaser";
class Scene_play extends Phaser.Scene
{

  constructor() {
    super("Scene_play"); 
  } 

  preload(){
    this.load.image('bomb', '../assets/bomb.png');
  }

  create(){
    this.add.image(400,300,'sky');

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

      // Crea las animaciones del jugador aquí
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

    //CREACION DE LAS PLATAFORMAS
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    // CREACIÓN DE LAS ESTRELLAS
    let stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });

    let contador = 0;

    //puntuacion que se mostrara en pantalla
    let score = 0;
    let scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    // CREACIÓN DE LAS BOMBAS
    let bombs = this.physics.add.group({
      key: 'bomb',
      repeat: 4, 
      setXY: { x: 170, y: 0, stepX: 100 } 
    });

    bombs.children.iterate(function (child) {
      child.setBounce(0.5, 1); 
    });

    //funcion recolectar estrellas + puntuacion + nuevas estrellas + posicion random bombas 
    function collectStar (player, star)
    {
      star.disableBody(true, true);

      score += 10;
      scoreText.setText('Score: ' + score);

      contador++;

      if (contador === 12) {
      this.scene.start('Scene_play2');
      
     }

      if (stars.countActive(true) === 0)
      {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }

    //funsion gameover al colisionar con bomba
    function hitBomb(player, bomb)
    {
      this.physics.pause();
    
      player.setTint(0xff0000);
      player.anims.play('turn');

      this.scene.start('Game_over');
    }    

    //CREACION FISICAS
    this.physics.world.gravity.y = 300;
    //colision jugador-platafotmas
    this.physics.add.collider(this.player, platforms);
    this.cursors = this.input.keyboard.createCursorKeys();
    //colision estrellas-plataformas
    this.physics.add.collider(stars, platforms);
    //recoleccion de estrellas por parte del jugador
    this.physics.add.overlap(this.player, stars, collectStar, null, this);
    //colision bombas-platafotmas
    this.physics.add.collider(bombs, platforms);
    //config colision con bombas por parte del jugador
    this.physics.add.collider(this.player, bombs, hitBomb, null, this);

  }
  
  update() 
  {
    if (this.cursors.left.isDown) 
    {
      this.player.setVelocityX(-200);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    //logica para saltar
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default Scene_play;