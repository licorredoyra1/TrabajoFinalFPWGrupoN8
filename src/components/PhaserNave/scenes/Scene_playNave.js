class Scene_play extends Phaser.Scene{
  constructor() {
    super("Scene_play"); 
    this.playerLife = 3;
    this.score = 0; 
    this.bonusActive = false;
    this.bonusTime = 0;
    this.bonusDuration = 10; // Duración del bonus en segundos
    this.i = 200;
  }

  preload(){
    this.load.image('disparo', '../img/shoot.png');
    
  }

  create(){
    //background
    this.add.image(400,300,'BG');

    //creacion jugador 
    this.player = this.physics.add.sprite(400,300,'nave');
    this.cursors = this.input.keyboard.createCursorKeys(); 

    this.player.setCollideWorldBounds(true,0,0);

    //vidas
    this.lifeText = this.add.text(20, 20, 'Life: ' + this.playerLife, { fontSize: '20px', fill: '#fff' });

    //puntaje
    this.scoreText = this.add.text(600, 20, 'Score: ' + this.score, { fontSize: '20px', fill: '#fff' });

    // Grupo para las naves enemigas
    this.enemiesGroup = this.physics.add.group();

    this.homeButton = this.add.image(725, 20, 'home') 
    .setOrigin(0, 0)
    .setInteractive()
    .on('pointerdown', () => this.goToMenu());

    // Genera naves enemigas cada cierto tiempo
    this.enemyTimer = this.time.addEvent({
      delay: 1000, 
      callback: () => {
          const enemy = this.physics.add.image(this.game.config.width, Phaser.Math.Between(50, this.game.config.height - 50), 'enemigo');
          this.enemiesGroup.add(enemy);
          enemy.setOrigin(1, 0.5);
          enemy.speed = Phaser.Math.Between(100, 200); 
          enemy.setVelocityX(-enemy.speed); 
          enemy.enemyLife = 2;
      },
      callbackScope: this,
      loop: true    
    });

    // Barra de tiempo del bonus
    this.bonusBar = this.add.graphics();
    this.bonusBar.fillStyle(0x808080); // Color gris por defecto
    this.bonusBar.fillRect(0, 0, this.game.config.width, 20); // Parte superior de la pantalla

    // Grupo para el bonus
    this.bonusGroup = this.physics.add.group();

    // Temporizador para generar el bonus cada 30 segundos
    this.bonusTimer = this.time.addEvent({
      delay: 15000,
      callback: this.spawnBonus,
      callbackScope: this,
      loop: true
    });




    //Variable para determinar el tiempo entre disparos
    this.nextDisparoTime = 0;

    //cracion animacion jugador
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
      frameRate: 0,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('nave', { start: 1, end: 1 }),
      frameRate: 0,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
      frameRate: 0,
      repeat: -1
    });

    //creacion particulas
    this.particles = this.add.particles(-10,0,'particula',{
      speed:100,
      angle:{min:150, max:210},
      scale:{start:1, end:0},
      blendMode: 'ADD'
    });

    //para que las particulas sigan al jugador
    this.particles.startFollow(this.player);

    //crea grupo de disparos
    this.disparosGroup = this.physics.add.group();
    }

  update() 
  {
    //colision jugador y enemigos
    this.physics.overlap(this.player, this.enemiesGroup, this.playerCollision, null, this);

    //colision disparos y enemigos
    this.physics.overlap(this.disparosGroup, this.enemiesGroup, this.enemyDestroy, null, this);

    // Verifica la colisión entre el jugador y el bonus
  this.physics.overlap(this.player, this.bonusGroup, this.collectBonus, null, this);

    // Disparo de la nave
    this.disparar();
  
    if (this.cursors.left.isDown) 
    {
      this.player.setVelocityX(-200);
      this.player.anims.play('left', true);
    } else if(this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
      this.player.anims.play('down',true);
    }
    else if(this.cursors.down.isDown){
      this.player.setVelocityY(200);
      this.player.anims.play('up',true);
    }
    else{
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('idle',true);
    }



      // Mover el bonus
  this.bonusGroup.children.iterate((bonus) => {
    bonus.y += Math.sin(bonus.x / 50) * 2; // Ajusta la amplitud del movimiento vertical
  });

  }

  disparar(){

   if (this.cursors.space.isDown && (this.time.now > this.nextDisparoTime)) {
    let numDisparos = 1;

    if (this.bonusActive) {
      numDisparos = 3;

      // Ángulos para los disparos del triple disparo
      const angles = [30, 0, -30];

      for (let i = 0; i < numDisparos; i++) {
        const angle = Phaser.Math.DegToRad(angles[i]); // Convertir grados a radianes
        const velocityX = 500 * Math.cos(angle); // Componente X de la velocidad
        const velocityY = 500 * Math.sin(angle); // Componente Y de la velocidad

        const disparo = this.disparosGroup.create(this.player.x, this.player.y, 'disparo');
        this.disparosGroup.add(disparo);
        disparo.setVelocity(velocityX, velocityY);
      }
    } else {
      const disparo = this.disparosGroup.create(this.player.x, this.player.y, 'disparo');
      this.disparosGroup.add(disparo);
      disparo.setVelocityX(500);
    }

    this.nextDisparoTime = this.time.now + 200;
  }

  }

  goToMenu() {
    this.scene.start('menu'); 
  }
  playerCollision(player, enemy) {
    this.playerLife--;

    this.lifeText.setText('Life: ' + this.playerLife);

    enemy.destroy();

    if (this.playerLife <= 0) {
      this.scene.start("gameOver");
      this.playerLife = 3;
      this.score = 0; 
    } 
  }  

  enemyDestroy(disparo, enemy) {
    enemy.enemyLife -= 1;

    disparo.destroy();

    if (enemy.enemyLife <= 0) {
      enemy.destroy();
      this.score += 20;
      this.scoreText.setText('Score: ' + this.score);
    }

    if(this.score >= 200){
      this.scene.start("Scene_play2", { playerLife: this.playerLife, score: this.score }); //pasa la vida actual del jugador como un parametro
      this.score = 0;
    }
  }


   // Método para generar el bonus
   spawnBonus() {
    const bonus = this.physics.add.image(this.game.config.width + 50, Phaser.Math.Between(50, this.game.config.height - 50), 'bonus');
    this.bonusGroup.add(bonus);
  
    // Configura la posición y movimiento del bonus
    bonus.setOrigin(0.5, 0.5);
    bonus.setVelocityX(-100); // Puedes ajustar la velocidad según tus preferencias
    bonus.setVelocityY(Phaser.Math.Between(-50, 50)); // Movimiento vertical aleatorio
  }

// Método para actualizar la barra de tiempo del bonus
updateBonusBar() {
  const progress = this.bonusTime / this.bonusDuration;
  const barWidth = this.game.config.width * progress;

  // Cambia el color de la barra según si el bonus está activo o no
  this.bonusBar.clear();
  if (this.bonusActive) {
    this.bonusBar.fillStyle(0x00ff00); // Color verde cuando el bonus está activo
  } else {
    this.bonusBar.fillStyle(0x808080); // Color gris cuando el bonus no está activo
  }
  this.bonusBar.fillRect(0, 0, barWidth, 20); // Parte superior de la pantalla
}

// Método para activar el bonus
activateBonus() {
  this.bonusActive = true;
  this.bonusTime = this.bonusDuration;

  // Muestra la barra de tiempo
  this.bonusBar.setVisible(true);

  // Programa la reducción de la barra cada segundo
  this.bonusBarEvent = this.time.addEvent({
    delay: 1000,
    callback: this.reduceBonusBar,
    callbackScope: this,
    loop: true,
  });
}

// Método para finalizar el bonus
endBonus() {
  this.bonusActive = false;
  this.bonusTime = 0;

  // Oculta la barra de tiempo
  this.bonusBar.setVisible(false);

  // Detiene el evento de reducción de la barra
  if (this.bonusBarEvent) {
    this.bonusBarEvent.destroy();
  }
}

// Método para reducir la barra de tiempo del bonus
reduceBonusBar() {
  if (this.bonusTime > 0) {
    this.bonusTime -= 1;
    this.updateBonusBar();
  } else {
    this.endBonus(); // Desactiva el bonus y restablece la barra de tiempo
  }
}
  collectBonus(player, bonus) {
    // Desactiva el bonus
    this.activateBonus();
    bonus.destroy();
    
      // Establece un temporizador para desactivar el disparo modificado después de 10 segundos
    this.time.delayedCall(10000, () => {
    this.endBonus(); // Desactiva el bonus y restablece la barra de tiempo
  });
  }

}
export default Scene_play;