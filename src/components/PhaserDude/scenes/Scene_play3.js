import Phaser from "phaser";
class Scene_play3 extends Phaser.Scene {
    constructor() {
      super("Scene_play3");
      this.vidas = 100;
      this.scoreText;
      this.starLivesText
      this.timer;
      this.initialTime = 30;
      this.bombHit = false; // Variable para controlar si una bomba ya golpeó al jugador
      this.starLives = 6;
    }
  
    preload() {
      // Agrega aquí tus cargas de recursos si es necesario
    }
  
    create() {
      // Se agrega el fondo
      this.add.tileSprite(0, 0, 800, 600, 'fondo').setOrigin(0, 0).setScrollFactor(0);
  
      // Se crea la plataforma en el suelo
      this.platform = this.physics.add.staticGroup();
      this.platform.create(400, 568, 'platform').setScale(2).refreshBody();
  
      // Se crea el jugador
      this.player = this.physics.add.sprite(100, 450, 'dude');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.player.setScale(1.3);
  
      // Aquí la animación del jugador
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20,
      });
  
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.physics.add.collider(this.player, this.platform);
  
      // Se crea la estrella que caerá desde arriba
      this.star = this.physics.add.sprite(400, 100, 'star');
      this.star.setBounce(1);
      this.star.setCollideWorldBounds(true);
      this.star.setScale(1.3);
      this.physics.add.collider(this.star, this.platform);
  
      // Establecer velocidad inicial diagonal
      this.star.setVelocity(Phaser.Math.Between(-200, 200), 300);
  
      //Permitir que la estrella rebote en la cabeza del jugador
      this.physics.add.collider(this.player, this.star, this.hitStar, null, this);
      this.physics.add.collider(this.platform, this.star, this.downStar, null, this);

  
      // Se crea el grupo de bombas
      this.bombs = this.physics.add.group();
  
      // Configurar eventos de tiempo para generar bombas
      this.time.addEvent({
        delay: 1000, // Intervalo en milisegundos
        callback: this.dropBomb,
        callbackScope: this,
        loop: true, // Hacer que se repita
      });
  
      // Inicialización de las teclas de control
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Configuración de gravedad
      this.physics.world.gravity.y = 300;
  
      // Puntuación y contador de tiempo
      this.scoreText = this.add.text(16, 16, 'Vida: ' + this.vidas + '%', { fontSize: '32px', fill: '#000' });
      this.timer = this.add.text(550, 16, 'Tiempo: 30', { fontSize: '32px', fill: '#000' });
      this.starLivesText = this.add.text(250,16, "Estrellas: " + this.starLives,{ fontSize: '32px', fill: '#000' });
  
      // Configuración del evento de tiempo
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.onTimerTick,
        callbackScope: this,
        loop: true,
      });
    }
  
    update() {
      // Controladores de movimiento de personaje izquierda y derecha
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-300);
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(300);
        this.player.anims.play('right', true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
      }
  
      // Lógica para saltar
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-250); // Puedes ajustar este valor según tus necesidades
      }
  
       // Lógica para que las bombas caigan rectas
  this.bombs.children.iterate(function (bomb) {
    if (bomb) {
      // Restablecer la variable bombHit a false
      this.bombHit = false;

      // Verificar si la bomba toca al jugador
      if (Phaser.Geom.Intersects.RectangleToRectangle(bomb.getBounds(), this.player.getBounds())) {
        this.hitBomb();
        this.bombHit = true; // Marcar que esta bomba ya golpeó al jugador
      }    
      bomb.y += 5; // Ajusta la velocidad de caída según tus preferencias

      // Comprueba si la bomba está fuera de la pantalla vertical y la destruye
      if (bomb.y > 580 || bomb.y < 0) {
        bomb.destroy();
      }
    }
  }, this);

  if (this.star.y > 500 && this.star.y < 510) {
    console.log('SUELO');
    this.starLives--; // Restar vida de estrella
    this.starLivesText.setText('Estrellas: ' + this.starLives);
  
        if (this.starLives <= 0) {
          console.log('Perdiste');
          this.scene.start('Game_over');
        }
  }
    }
  
    // Función llamada cuando el jugador golpea la estrella
    hitStar(player, star) {
      if (star.body.touching.down) {
        console.log('Toca el player');
        // Hacer que la estrella rebote hacia arriba
        star.setVelocityY(-400);
        // Actualizar el texto de las vidas
        this.scoreText.setText('Vida: ' + this.vidas);
  
        // Agregar más lógica según tus necesidades, como reiniciar el nivel si las vidas llegan a cero
        if (this.vidas <= 0) {
          console.log('Perdiste');
          this.scene.start('Game_over');
        }
      }
    }

    // Función llamada cuando una bomba toca al jugador
    hitBomb() {
      console.log('restando vida');
      this.vidas--;
  
      // Actualizar el texto de las vidas
      this.scoreText.setText('Vida: ' + this.vidas + '%');
  
      // Agregar más lógica según tus necesidades, como reiniciar el nivel si las vidas llegan a cero
      if (this.vidas <= 0) {
        console.log('Perdiste');
        this.scene.start('Game_over');
      }
    }
  
    // Función para generar bombas
    dropBomb() {
      let bomb = this.bombs.create(Phaser.Math.Between(0, 800), 0, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setScale(2);
      bomb.setVelocity(Phaser.Math.Between(-50, 50), 0); // Ajusta la velocidad inicial según tus preferencias
    }
  
    onTimerTick() {
      this.initialTime--;
  
      if (this.initialTime <= 0) {
        // Añade el código para perder el juego o pasar al siguiente nivel
        console.log('Tiempo agotado');
        this.scene.start('Winner');
      } else {
        this.timer.setText('Tiempo: ' + this.initialTime);
      }
    }
  }
  
  export default Scene_play3;
  