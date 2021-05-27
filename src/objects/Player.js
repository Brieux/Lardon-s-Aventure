class Player extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, "AnimPlayer")
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true);
        this.setGravityY(2500);
        this.body.setAllowGravity(true);
        this.setFriction(1,1);
        this.setDisplaySize(525,325);
        this.setSize(450,1200);
        this.setOffset(525,0);
        this.setVelocityY(0);
        this.onAir = false;
        this.saveY =this.scene.height;
        this.dashUnlocked = false;
        this.jumpUnlocked = false;
        this.meleeUnlocked = false;
        this.ptsProg = -1;


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

        this.anims.create(
            {
                key: 'left',
                frames: this.anims.generateFrameNumbers('AnimPlayer', { start: 2, end:  7}),
                frameRate: 10,
                repeat: -1
            });

        this.anims.create(
            {
                key: 'right',
                frames: this.anims.generateFrameNumbers('AnimPlayer', { start: 2, end: 7 }),
                frameRate: 10,
                repeat: -1

            });

        this.anims.create(
            {
                key: 'turn',
                frames: this.anims.generateFrameNumbers('AnimIdle', { start: 0, end: 4 }),
                frameRate: 5,
                yoyo :-1,
                repeat: -1
            });

        this.anims.create(
            {
                key: 'jumpLeft',
                frames: [ { key: 'AnimPlayer', frame: 1 } ],
                frameRate: 20
            });

        this.anims.create(
            {
                key: 'jumpRight',
                frames: [ { key: 'AnimPlayer', frame: 1 } ],
                frameRate: 20
            });

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
                this.flipX = true;
                this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.setVelocityX(550);
                this.flipX = false;
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('turn', true);
        }
        if(this.jumpUnlocked) {
            if (this._directionY < 0) {
                if (this.body.blocked.down) {
                    this.setVelocityY(-1600);
                }
            }
        }
    }

      powerUp(scene, time, delta){
        this.dashUse = scene.input.keyboard.addKey('A');
        this.attackUse = scene.input.keyboard.addKey('Z');

        //attack cac
          if(this.meleeUnlocked) {
              if (this.attackUse.isDown) {
                  if (this.cacAvailable) {
                      //console.log("attack"); //On fait un truc
                      this.attackCac();
                      this.cacAvailable = false;
                  }
              }
              if (this.cacAvailable == false) {
                  this.delayCac -= delta;
                  if (this.delayCac < 0) {
                      this.cacAvailable = true;
                      this.delayCac = this.cacBasic;
                  }
              }
          }
        //dash
        if(this.dashUnlocked) {
            if (this.dashUse.isDown) {
                if (this.dashAvailable) {
                    this.dash();
                    this.dashAvailable = false;
                } else {
                }
            }

            if (this.dashAvailable == false) {
                this.delayDash -= delta;
                if (this.delayDash < 0) {
                    this.dashAvailable = true;
                    this.delayDash = this.dashBasic;
                }
            }
        }
      }

      dash(){ // la vitesse est la pour le dash //target est la cible du dash
        if(this._directionX > 0){
            this.sens = 1;
        }

        if(this._directionX<0){
            this.sens = -1;
        }
          Tableau.current.tweens.timeline({
              targets: Tableau.current.player.body.velocity,
              ease: 'Power2',
              duration: 100,
              loop: 0,
              tweens: [
                  {
                      targets: Tableau.current.player.body.velocity,
                      x: this.sens * 7500
                  },
                  {
                      targets: Tableau.current.player.body.velocity,
                      x: 0
                  }
              ]
          });
      }

      attackCac() {
          console.log(ennemis);
          console.log(this.x);
          console.log(this.y);
          var i;
          for (i = 0; i < ennemis.length; i++) {
              console.log(ennemis[i].x, ennemis[i].y);

              if (this._directionX > 0) {
                  console.log("droit");
                  if (ennemis[i].x > this.x) {
                      console.log(((ennemis[i].x / 64) - 250) - (this.x / 64) <= 0);
                      if (((ennemis[i].x / 64) - 200) - (this.x / 64) <= 0) {
                          ennemis[i].getKilled();
                      }
                  }
              }

              if (this._directionX < 0) {
                  console.log("gauche");
                  if (ennemis[i].x < this.x) {
                      if (((ennemis[i].x / 64) + 200) - (this.x / 64) >= 0) {
                          ennemis[i].getKilled();
                      }
                  }
              }
          }
      }

}
