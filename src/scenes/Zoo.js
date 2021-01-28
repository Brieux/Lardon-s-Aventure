class Zoo extends Tableau{

    preload(){
        super.preload();
        this.load.image('sky-2', 'assets/sky-2.png');
        this.load.image('panthere', 'assets/panther.png')
        this.load.image('mosquito', 'assets/mosquito.png')
        this.load.image('parrot', 'assets/parrot.png')
        this.load.image('frog', 'assets/frog.png')
        this.load.image('monkey', 'assets/monkey.png')
    }

    create(){
        super.create();
        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        //fait passer les éléments devant le ciel
        this.player.setDepth(10)

        //Proto 1
        this.monstre1=this.physics.add.sprite(300,this.sys.canvas.height-70,'panthere');
        this.monstre1.setOrigin(0,0);
        this.monstre1.setDisplaySize(64,64);
        this.monstre1.setCollideWorldBounds(true);
        this.monstre1.setBounce(0);
        this.monstre1.setVelocityX((Math.abs(this.player.x - this.monstre1 .x))%10);
        this.physics.add.overlap(this.player, this.monstre1, this.hitSpike, null, this);

        //Proto 2
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,'frog');
        this.monstre.setOrigin(Phaser.Math.Between(0,4),3);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        if (Phaser.Math.Between(0,1) == 1){
            this.monstre.setVelocityX(Phaser.Math.Between(45,55));
        }
        else {
            this.monstre.setVelocityX(- (Phaser.Math.Between(45,55)));
        }
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //Proto 3
        this.monstre2=this.physics.add.sprite(300,this.sys.canvas.height-70,'parrot');
        this.monstre2.setOrigin(-9,5);
        this.monstre2.setDisplaySize(64,64);
        this.monstre2.setCollideWorldBounds(false);
        this.monstre2.setBounce(0);
        this.monstre2.setVelocityX(-100);
        this.physics.add.overlap(this.player, this.monstre2, this.hitSpike, null, this);
        this.monstre2.body.allowGravity = false;
        
        //Proto 4
        this.monstre3=this.physics.add.sprite(300,this.sys.canvas.height-70,'monkey');
        this.monstre3.setOrigin(-7,5);
        this.monstre3.setDisplaySize(64,64);    
        this.monstre3.setVelocityY(-100);
        this.physics.add.overlap(this.player, this.monstre3, this.hitSpike, null, this);
        this.monstre3.body.allowGravity = false;

        //Proto 5
        this.monstre4=this.physics.add.sprite(300,this.sys.canvas.height-70,'mosquito');
        this.monstre4.setOrigin(-1,3);
        this.monstre4.setDisplaySize(64,64);    
        this.physics.add.overlap(this.player, this.monstre4, this.hitSpike, null, this);
        this.monstre4.body.allowGravity = false;
        this.monstre4.cercle = true;
        this.monstre4.setVelocityX(75);
        this.monstre4.setVelocityY(75); 
        this.monstre4.velocityX = 75;
        this.monstre4.velocityY = 0;
        this.monstre4.boolX = true;
        this.monstre4.boolY = false;
    }

    update(){
        super.update();
        this.sky.tilePositionX++;
        this.monstre1.setVelocityX((this.player.x - this.monstre1.x)%60);
        //console.log((Math.abs(this.player.x - this.monstre1.x))%60)
        if (this.monstre2.x < -700){
            //destroy this
        }
        if(this.monstre3.y < 400){
            this.monstre3.setVelocityY(100);
        }
        if(this.monstre3.y > 600){
            this.monstre3.setVelocityY(-100);
        }

        //console.log(this.monstre4.cercle)
            if (this.monstre4.boolX){
                this.monstre4.setVelocityX(this.monstre4.velocityX -1);
                this.monstre4.velocityX = this.monstre4.velocityX -1;
                if (this.monstre4.velocityX == -75){
                    this.monstre4.boolX = !this.monstre4.boolX;
                }
            }
            if (!this.monstre4.boolX){
                this.monstre4.setVelocityX(this.monstre4.velocityX +1);
                this.monstre4.velocityX = this.monstre4.velocityX +1;
                if (this.monstre4.velocityX == 75){
                    this.monstre4.boolX = !this.monstre4.boolX;
                }
            }
            if (this.monstre4.boolY){
                this.monstre4.setVelocityY(this.monstre4.velocityY -1);
                this.monstre4.velocityY = this.monstre4.velocityY -1;
                if (this.monstre4.velocityY == -75){
                    this.monstre4.boolY = !this.monstre4.boolY;
                }
            }
            if(!this.monstre4.boolY){
                this.monstre4.setVelocityY(this.monstre4.velocityY +1);
                this.monstre4.velocityY = this.monstre4.velocityY +1;
                if (this.monstre4.velocityY == 75){
                    this.monstre4.boolY = !this.monstre4.boolY;
                }
            }
            /*
            console.log(this.monstre4.boolX);
            console.log(this.monstre4.boolY);
            console.log(this.monstre4.velocityX);
            console.log(this.monstre4.velocityY);*/
    }

}