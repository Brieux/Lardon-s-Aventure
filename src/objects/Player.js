class Player extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.3);
        this.setGravityY(700)
        this.setFriction(1,1);

        this.setBodySize(this.body.width-6,this.body.height-10);
        this.setOffset(3, 10);

        this.anims.create({
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
        });

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
    move(){
        var posX = this.x / 64;
        var posY = this.y;
        posX = Math.trunc(posX);
        //console.log("sur la case numero : " + posX);
        switch (true){
            case this._directionX<0:
                this.setVelocityX(-160);
                this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.setVelocityX(160);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-550);
            }
        }
      }

      powerUp(scene, time, delta){
        //console.log(scene);
        //console.log(time, delta);
        this.dashUse = scene.input.keyboard.addKey('SPACE');
        this.attackUse = scene.input.keyboard.addKey('Z');
        this.rangeUse = scene.input.keyboard.addKey('E');


        //attack cac
        if (this.attackUse.isDown){
          if(this.cacAvailable){
            //console.log("attack"); //On fait un truc
            this.attackCac();
            this.cacAvailable = false;
          }
          else {
            //console.log("Attaque non utilisable"); //on peut rien faire
          }
        }
        if (this.cacAvailable == false){
          //console.log("recharge"); //on attends
          this.delayCac -= delta;
          if (this.delayCac < 0){
            //console.log("attaque recup"); //on recup
            this.cacAvailable = true;
            this.delayCac = this.cacBasic;
          }
        }




        //dash
        if (this.dashUse.isDown){
          if(this.dashAvailable){
            //console.log("coucou"); //On fait un truc
            this.dash();
            this.dashAvailable = false;
          }
          else {
            //console.log("Sort non utilisable"); //on peut rien faire
          }
        }

        if (this.dashAvailable == false){
          //console.log("recharge"); //on attends
          this.delayDash -= delta;
          if (this.delayDash < 0){
            //console.log("Sort recup"); //on recup
            this.dashAvailable = true;
            this.delayDash = this.dashBasic;
          }
        }


          //Range
          if (this.rangeUse.isDown){
              if(this.rangeAvailable){
                  //console.log("coucou"); //On fait un truc
                  this.range();
                  this.rangeAvailable = false;
              }
              else {
                  //console.log("Sort non utilisable"); //on peut rien faire
              }
          }

          if (this.rangeAvailable == false){
              //console.log("recharge"); //on attends
              this.delayRange -= delta;
              if (this.delayRange < 0){
                  //console.log("Sort recup"); //on recup
                  this.rangeAvailable = true;
                  this.delayRange = this.rangeBasic;
              }
          }
        //console.log(this.dashUse.isDown, this.dashAvailable, this.delayDash, this.dashBasic);
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

        var projectile = new range(this.scene, this.x, this.y, 'asset/bomb.png');
      }


}
