class range extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y,){
        super(scene,x,y,"asset/bomb.png");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity=true;
        this.scale = 2;
/*
        this.setDisplaySize(64,64);
        this.setVelocityX(45);
        this.setCollideWorldBounds(true);
        this.setBounce(1,0);*/
    }
}