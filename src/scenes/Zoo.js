class Zoo extends Tableau{

    preload(){
        super.preload();
        this.load.image('sky-2', 'assets/sky-2.png');
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
        this.monstre1=this.physics.add.sprite(300,this.sys.canvas.height-70,'proto ');
        this.monstre1.setOrigin(0,0);
        this.monstre1.setDisplaySize(64,64);
        this.monstre1.setCollideWorldBounds(true);
        this.monstre1.setBounce(0);
        this.monstre1.setVelocityX((Math.abs(this.player.x - this.monstre1 .x))%10);
        this.physics.add.overlap(this.player, this.monstre1, this.hitSpike, null, this);

        //Proto 2
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,'proto 2');
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
    }

    update(){
        super.update();
        this.sky.tilePositionX++;
        this.monstre1.setVelocityX((this.player.x - this.monstre1.x)%60);
        console.log((Math.abs(this.player.x - this.monstre1.x))%60)
    }

}