/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
        this.matrix = false;
        this.chgtAvailable = true;
        this.normalMode = true ;

    }

    getMatrix(){
        return this.matrix;
    }

    getAvailable(){
        return this.chgtAvailable;
    }
    getNormalMode(){
        return this.normalMode;
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('fond', 'assets/Background2.png');
        this.load.image('player', 'assets/player.png');

    }
    create(){
        Tableau.current=this;
        this.sys.scene.scale.lockOrientation("landscape")
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'fond').setOrigin(0,0);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);
        /**
         * Le joueur
         * @type {Player}
         */


        this.player=new Player(this,0,600);


    }
    update(time, delta){
        super.update();
        if(this.input.keyboard.addKey("ALT").isDown && this.chgtAvailable && Tableau.current.scene.key == 'Niveau 1'){
            this.chgt();
            this.chgtAvailable = false;


        }if(this.input.keyboard.addKey("ALT").isUp ){
            this.chgtAvailable = true;
        }


        this.player.update();
    }

    chgt(){
        if (this.matrix){

            this.matrix = false;
            this.normalMode = true;
        }
        else {

            this.matrix =  true;
        }
    }

    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */

    ramasserEtoile (player, star)
    {
        star.disableBody(true, true);
        ui.gagne();

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                }
            }
        }
        Tableau.current.emmiter.on =false;
    }


    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    hitMonster(player, monster){
        let me=this;
        if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
            if((
                // si le player descend
                player.body.velocity.y > 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30

            ) || (
                player.body.velocity.x >= 3000 // pour tuer les monstre quand on leur dash dessus
            ) || (
                player.body.velocity.x <= -3000
            )
          )

            {
                monster.isDead=true; //ok le monstre est mort
                monster.disableBody(true,true);//plus de collision
                //notre joueur rebondit sur le monstre
                player.directionY=500;
            }else{
                //le joueur est mort
                if(!me.player.isDead){
                    me.player.isDead=true;
                    me.player.visible=false;
                    me.player.isDead=false;
                    me.scene.restart();


                }


            }
        }

    }

    /**
     * Pour reset cette scène proprement
     *
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    win(){
        this.suivant();
    }

    /**
     * Va au tableau suivant
     */
    suivant(){
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){
                if(sc.scene.key !== "ui"){
                    if(!nextScene){
                        if(ceSeraLaSuivante){
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key){
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene){
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau){
        if(Tableau.current){

            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;
