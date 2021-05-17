class Player extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true);
        this.setGravityY(2500);
        this.body.setAllowGravity(true);
        this.setFriction(1,1);
        this.setDisplaySize(116,319);
        this.setOffset(0,0);
        this.setVelocityY(0);
        this.onAir = false;
        this.saveY =this.scene.height;


        /*this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });*/

        this._directionX=0;
        this._directionY=0;

        //dash
        this.dashAvailable = true;
        this.dashBasic = 2000
        this.delayDash = this.dashBasic;

        //attack cac
        this.cacAvailable = true;
        this.cacBasic = 2000;
        this.delayCac = this.cacBasic;

        //attack a distance
        this.rangeAvailable = true;
        this.rangeBasic = 2000;
        this.delayRange = this.rangeBasic;


    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;

    }


    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(scene, time, delta){
        var posX = this.x / 64;
        posX = Math.trunc(posX);
        //console.log("sur la case numero : " + posX);
        switch (true){
            case this._directionX<0:
                this.setVelocityX(-550);
                //this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.setVelocityX(550);
                //this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                //this.anims.play('turn');
        }
        if(this._directionY < 0)
        {
            if(this.body.blocked.down)
            {
                this.setVelocityY(-1600);
            }
        }
    }

      powerUp(scene, time, delta){
        this.dashUse = scene.input.keyboard.addKey('A');
        this.attackUse = scene.input.keyboard.addKey('Z');
        this.rangeUse = scene.input.keyboard.addKey('E');

        //attack cac
        if (this.attackUse.isDown){
          if(this.cacAvailable){
            //console.log("attack"); //On fait un truc
            this.attackCac();
            this.cacAvailable = false;
          }
        }
        if (this.cacAvailable == false){
          this.delayCac -= delta;
          if (this.delayCac < 0){
            this.cacAvailable = true;
            this.delayCac = this.cacBasic;
          }
        }
        //dash
        if (this.dashUse.isDown){
          if(this.dashAvailable){
            this.dash();
            this.dashAvailable = false;
          }
          else {
          }
        }

        if (this.dashAvailable == false){
          this.delayDash -= delta;
          if (this.delayDash < 0){
            this.dashAvailable = true;
            this.delayDash = this.dashBasic;
          }
        }


          //Range
          if (this.rangeUse.isDown){
              if(this.rangeAvailable){
                  this.range();
                  this.rangeAvailable = false;
              }
              else {
              }
          }

          if (this.rangeAvailable == false){
              this.delayRange -= delta;
              if (this.delayRange < 0){
                  this.rangeAvailable = true;
                  this.delayRange = this.rangeBasic;
              }
          }
      }

      dash(){ // la vitesse est la pour le dash //target est la cible du dash
        var posX = this.x / 64;
        posX = Math.trunc(posX);

        var target;
        if (this._directionX > 0){
          target = posX + 8;
        }
        else if (this._directionX < 0){
          target = posX - 8;
        }
        else {
          target = posX;
        }

          if (target > posX){
            this.setVelocityX(8000);
          }
          else if (target < posX){
            this.setVelocityX(-8000);
        }
      }

      attackCac() {
          console.log(ennemis);
          var i;
          for (i = 0; i < ennemis.length; i++) {
              console.log(ennemis[i].x, ennemis[i].y);
              if (this._directionX > 0) {
                  console.log("droit");
                  if (ennemis[i].x > this.x) {
                      if (((ennemis[i].x / 64) - 2) - (this.x / 64) <= 0) {
                          ennemis[i].isDead = true; //ok le monstre est mort
                          ennemis[i].disableBody(true, true);
                      }
                  }
              }

              if (this._directionX < 0) {
                  console.log("gauche");
                  if (ennemis[i].x < this.x) {
                      if (((ennemis[i].x / 64) + 2) - (this.x / 64) >= 0) {
                          ennemis[i].isDead = true; //ok le monstre est mort
                          ennemis[i].disableBody(true, true);
                      }
                  }
              }
          }
      }
      range(){
        console.log("Salut");
      }


}
