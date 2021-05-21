class Niveau1 extends Tableau{

    constructor() {
        super('Niveau 1');
    }
    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/enmi1.png');
        this.load.image('monstre2', 'assets/enmi1.png');
        this.load.image('ground', 'assets/platform.png');;
        this.load.image('terrain', 'assets/BackGround1.png');
        this.load.image('solMatrix', 'assets/BackGround1_matrix.png');
        this.load.image('fondMatrix', 'assets/backGround_Matrix.jpg');
        this.load.image('persoMatrix', 'assets/skinMatrix.png');
        this.load.image('persoNormal', 'assets/player.png');
        this.load.spritesheet('AnimPlayer',
            'assets/run112000.png',
            { frameWidth: 1559, frameHeight: 1194  }
        );
        this.load.spritesheet('AnimIdle',
            'assets/idleSpritesheet.png',
            { frameWidth: 1559, frameHeight: 1194  }
        );
    }

    create() {
        super.create();

        /////////////////////////////////////////////// La BASE DU NIVEAU /////////////////////////////////////

        //on définit la taille du tableau

        let largeurDuTableau=7150;
        let hauteurDuTableau=964; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.physics.add.collider(this.player,this.platforms);


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            1654,
            964,
            'bg'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);

        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            4961,
            964,
            'terrain'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=1;


        this.player.setDepth(10);

        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);


        this.physics.add.collider(this.player,this.platforms);

        //Monstres
        /*cafard = new monstre2(this,400,800);
        ennemis[0] = cafard;

        criquet = new monstreviolet(this,450,200);
        ennemis[1] = criquet;*/
        let plate = this.physics.add.staticGroup();
        plate.create(0,775);
        plate.children.entries[0].setDisplaySize(1210,10);
        plate.create(1600,775);
        plate.children.entries[1].setDisplaySize(2100,10);


        plate.children.iterate(function (child) {
            child.setOrigin(0,0);
            child.visible = false;
            child.refreshBody();});
        this.physics.add.collider(this.player, plate);
        /*let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        this.player.renderDebug(debug,{
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });*/
    /*
        //plateformes

        plate.create(130 , 250, 'ground');
        plate.create(200, 200, 'ground');
        plate.create(410, 140, 'ground');
        plate.create(670, 400, 'ground');
        plate.create(820, 350, 'ground');
        plate.create(1000, 250, 'ground');
        plate.create(1250, 250, 'ground');
        plate.create(1500, 180, 'ground');
        plate.create(1750, 210, 'ground');
        plate.create(1820, 100, 'ground');
        plate.children.iterate(function (child) {
            child.setDisplaySize(100,50);
            child.setOrigin(0,0);
            child.refreshBody();});
        this.physics.add.collider(this.player, plate);
        this.physics.add.collider(this.star1, plate);
        this.physics.add.collider(cafard, plate);
        this.physics.add.collider(criquet, plate);*/
        this.stars = this.physics.add.sprite(600,600,"star").setCollideWorldBounds(true).setBounce(0.4);
        this.stars.body.setAllowGravity(false);
        this.stars.setDisplaySize(100,100)
        this.stars.setDepth(10);
        this.tweens.add({
            targets: this.stars,
            y: {
                from: 600,
                to:550, //on monte de 20 px
                duration: 2000,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });

        this.physics.add.collider(plate, this.stars);
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        ui.gagne();
    }

    update(time, delta){
        super.update()
        if(this.player.y > 775){
            this.player.isDead=true;
            this.player.visible=false;
            this.player.isDead=false;
            this.scene.restart();
        }
        if(super.getMatrix() && super.getAvailable()){
            this.sky2.setTexture('solMatrix');
            this.sky.setTexture('fondMatrix');
            this.player.setTexture('persoMatrix');
            this.player.body.enable = false;

        }
        else {
            this.sky2.setTexture('terrain');
            this.sky.setTexture('fond');

            //cafard.body.enable = true;
            //criquet.body.enable = true;
            this.player.body.enable = true;

        }
        if(!super.getMatrix()) {
            this.player.move(this, time, delta);
            this.player.powerUp(this, time, delta);
            //le ciel se déplace moins vite que la caméra pour donner un effet paralax
            this.sky2.tilePositionX = this.cameras.main.scrollX;
            //le deuxième ciel se déplace moins vite pour accentuer l'effet
            this.sky.tilePositionX = this.cameras.main.scrollX * 0.3 + 500;

            //cafard.update();
            //criquet.update();

            //console.log(cafard);
        }
    }

    getMatr(){
        return super.getMatrix();
    }

    getAvail(){
        return super.getAvailable();
    }
}

