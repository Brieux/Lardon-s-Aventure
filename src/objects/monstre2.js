class monstre2 extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */

    preload(){
        this.load.spritesheet('Enmi1Walk',
            'assets/animEnmi1.png',
            { frameWidth: 1512, frameHeight: 702  }
        );
    }

    constructor(scene, x, y) {
        super(scene, x, y);
        this.body.allowGravity=true;

        this.setDisplaySize(6,6);
        this.setVelocityX(45);
        this.setCollideWorldBounds(true);
        this.setBounce(1,0);
        this.setSize(700,700)
        this.setOffset(400,-50)
        this.anims.create(
            {
                key: 'walk',
                frames: this.anims.generateFrameNumbers('Enmi1Walk', { start: 0, end: 3}),
                frameRate: 4,
                repeat:-1
            });
        this.anims.play('walk');
    }


    update(){
      if (this.body.velocity.x > 0){
        this.flipX = true;
      }
      else {
        this.flipX = false;
      }
    }

    getKilled(){
        this.destroy();
    }
}
