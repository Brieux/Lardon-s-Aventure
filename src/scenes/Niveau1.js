class Niveau1 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
<<<<<<< Updated upstream
        this.load.image('monster-violet', 'assets/ennemi2.png');
        this.load.image('monstre2', 'assets/ennemi.png');
        this.load.image('ground', 'assets/platform.png');;
        this.load.image('sol', 'assets/BackGround1.png');
        this.load.image('fond', 'assets/Background2.png');
=======
        this.load.image('monster-violet', 'assets/enmi1.png');
        this.load.image('monstre2', 'assets/enmi1.png');
        this.load.image('ground', 'assets/platform.png');;
        this.load.image('sol', 'assets/BackGround1_0000_Calque-2.png');
        this.load.image('fond', 'assets/assets/Background2_0001_Calque 2.jpg');
>>>>>>> Stashed changes
        this.load.video('intro', 'assets/intro.mp4','loadeddata', false, true);
    }

    create() {
        super.create();

        vid = this.add.video(448, 224, 'intro');
        vid.setDisplaySize(896,448);
        vid.play(true);
        vid.setDepth(40);
        vid.setLoop(false);
        vid.setCurrentTime(vid.getDuration());

        /////////////////////////////////////////////// La BASE DU NIVEAU /////////////////////////////////////

        //on définit la taille du tableau
<<<<<<< Updated upstream
        let largeurDuTableau=4961;
=======
        let largeurDuTableau=1654;
>>>>>>> Stashed changes
        let hauteurDuTableau=964; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.physics.add.collider(this.player,this.platforms);


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
<<<<<<< Updated upstream
            4961,
=======
            1654,
>>>>>>> Stashed changes
            964,
            'fond'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra

        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
<<<<<<< Updated upstream
            0,
            4961,
=======
            242,
            1654,
>>>>>>> Stashed changes
            964,
            'sol'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=1;

        this.player.setDepth(10);

        //des étoiles
        this.star1=this.physics.add.sprite(1900,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(1);


        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);


        this.physics.add.collider(this.player,this.platforms);

        //Monstres
        cafard = new monstre2(this,400,100);
        ennemis[0] = cafard;

        criquet = new monstreviolet(this,450,200);
        ennemis[1] = criquet;
    /*
        //plateformes
        let plate = this.physics.add.staticGroup();
        plate.create(0, 300, 'ground');
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






    }

    update(time, delta){
        super.update();
        this.player.powerUp(this, time, delta);
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.6;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky.tilePositionX=this.cameras.main.scrollX*0.3+500;

        if (vid.getCurrentTime() == vid.getDuration()){
          vid.alpha -= 0.1;
        }
        if (vid.getCurrentTime() != vid.getDuration()){
          this.player.stop();
        }

        cafard.update();
        criquet.update();
        //console.log(cafard);

    }



}
