class monstre2 extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monstre2");
        this.body.allowGravity=true;

        this.setDisplaySize(64,64);
        this.setVelocityX(45);
        this.setCollideWorldBounds(true);
        this.setBounce(1,0);
    }
    update(){
      if (this.body.velocity.x > 0){
        this.setFlip(true, false);
      }
      else {
        this.setFlip(false, false);
      }
    }
}
