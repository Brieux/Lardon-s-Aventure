class monstreviolet extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    preload(){

    }

    constructor(scene, x, y) {
        super(scene, x, y);
        this.body.allowGravity=false;

        this.setDisplaySize(6,6);
        this.setVelocityX(75);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setSize(700,700)
        this.setOffset(125,45)
        this.anims.create(
            {
                key: 'fly',
                frames: this.anims.generateFrameNumbers('Enmi2Walk', { start: 0, end: 3}),
                frameRate: 9,
                repeat:-1
            });
        this.anims.create(
            {
                key: 'die2',
                frames: this.anims.generateFrameNumbers('Enmi2Die', { start: 0, end: 3}),
                frameRate: 12
            });
        this.anims.play('fly');

        this.tween1 = this.scene.tweens.add({
            targets: this,
            y: {
                from: 200,
                to:250, //on monte de 20 px
                duration: 1000,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });
    }

    update(){
      if (this.body.velocity.x > 0){
        this.setFlip(true, false);
      }
      else {
        this.setFlip(false, false);
      }


    }

    pausetween(){
        this.tween1.pause();
    }
    playtween(){
        this.tween1.resume();
    }


    getKilled(){
        this.anims.play('die2');
        this.isDead = true; //ok le monstre est mort
        let here = this;
        setTimeout(function(){
            here.disableBody(true, true);
        },500)

    }

}
