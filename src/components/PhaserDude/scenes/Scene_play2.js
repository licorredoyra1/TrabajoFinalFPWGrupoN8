import Phaser from "phaser";
class Scene_play2 extends Phaser.Scene {

  constructor() {
    super("Scene_play2");
    this.score = 0;
    this.scoreText;
  }

  preload() {

  }

  create() {
    // Se declaran las vidas del personaje
    this.vidas = 1

    // Se agrega el fondo
    this.add.tileSprite(0, 0, 2400, 600, 'fondo').setOrigin(0, 0).setScrollFactor(0);

    // Piso de lava
    this.lavaPlatforms = this.physics.add.staticGroup();
    // ----Se agrega las propiedades de lava
    this.lavaPlatforms.create(1400, 560, 'lava').setSize(2500, 80).setOffset(-1, 17);

    // Plataformas
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(0, 568, 'platform').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');
    this.platforms.create(1300, 220, 'platform');
    this.platforms.create(1900, 220, 'platform');

    // Se crea la variable para player
    this.player = this.physics.add.sprite(100, 100, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Puntuación que se mostrará en pantalla
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    // Aquí la animación del jugador
    this.anims.create({
      key: 'left', //--movimiento hacia la izquierda
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn', //--estado quieto
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right', //--movimiento hacia la derecha
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.physics.add.collider(this.player, this.platforms);

    // Se agregan las estrellas
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11, // cantidad de estrellas
      setXY: { x: 100, y: 0, stepX: 180 }, // ajusta la posición de las estrellas
    });
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.world.gravity.y = 300;

    // Colisiones entre las estrellas y las plataformas
    this.physics.add.collider(this.stars, this.platforms);

    // Colisiones entre el jugador y las estrellas
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Choque entre el jugador y la lava
    this.physics.add.overlap(this.player, this.lavaPlatforms, this.colisionPlayerLava, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Cámara para el personaje
    this.cameras.main.setBounds(0, 0, 2400, 600); //--establece los límites de la cámara
    this.cameras.main.startFollow(this.player); //--comando de seguimiento de cámara a player 
    this.physics.world.setBounds(0, 0, 2400, 600); //--establece los límites del nivel (visualmente)

    // Código para colisión lava-personaje
    let bombsLevel2 = this.physics.add.group({
      key: 'bomb',
      repeat: 2, // Ajusta el número de bombas que deseas crear
      setXY: { x: 2300, y: 0, stepX: -100 } // Ajusta la posición y el stepX
  });


    this.platforms.children.iterate(function (platform) {
        let bomb = bombsLevel2.create(platform.x + Phaser.Math.Between(20, platform.width - 20), platform.y - 30, 'bomb');
        bomb.setBounce(1, 1);
        bomb.setVelocity(Phaser.Math.Between(-200, -100), 300);
    });

    bombsLevel2.children.iterate(function (child) {
      child.setBounce(1, 1); // Ajusta los valores de rebote según tus preferencias
      child.setVelocity(Phaser.Math.Between(-200, -100), 300); // Velocidad inicial, ajusta según tus necesidades
  });

    this.physics.add.collider(bombsLevel2, this.platforms);
    this.physics.add.collider(this.player, bombsLevel2, this.hitBombLevel2, null, this);

    this.bombsLevel2 = bombsLevel2;

    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

  }

  update() {

    // Controladores de movimiento de personaje izquierda y derecha 
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    // Lógica para saltar
    if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    }


    // Movimiento diagonal de las bombas
    this.bombsLevel2.children.iterate(function (bomb) {
      // Cambia la velocidad en el eje X a una velocidad constante
      if (bomb.body.velocity.x === 0) {
          bomb.setVelocityX(Phaser.Math.Between(-200, -100));
      }

      // Comprueba si la bomba toca los límites laterales y invierte la velocidad en el eje X
      if (bomb.x >= 2400 - bomb.width / 2) {
          bomb.setVelocityX(Phaser.Math.Between(-200, -100));
      } else if (bomb.x <= bomb.width / 2) {
          bomb.setVelocityX(Phaser.Math.Between(100, 200));
      }
    });
  }
  collectStar(player, star) {
    star.disableBody(true, true);

    // Puedes ajustar la puntuación según tus necesidades
    this.score += 10;

    // Verifica que this.scoreText esté definido antes de llamar a setText
    if (this.scoreText) {
      this.scoreText.setText('Score: ' + this.score);
    }
    if (this.score >= 100) {
      // Si el puntaje alcanza 100, cambia a la escena 3
      this.scene.start('Scene_play3');
    }

    if (this.stars.countActive(true) === 0) {
      // Agrega más estrellas cuando se recolectan todas
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
  }

  hitBombLevel2(player, bomb) {
    this.vidas--;

    player.setTint(0xff0000);

    if (this.vidas <= 0) {
      console.log('perdiste');
      player.clearTint();
      this.scene.start('Game_over');
    }
  }

  // Función para colisionar entre player y lava
  colisionPlayerLava(player, lavaPlatforms) {
    this.vidas--;

    player.setTint(0xff0000);

    if (this.vidas <= 0) {
      console.log('perdiste');
      player.clearTint();
      this.scene.start('Game_over');
    }
  }
}

export default Scene_play2;
