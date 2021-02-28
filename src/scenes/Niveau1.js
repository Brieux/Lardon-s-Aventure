class Niveau1 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/monster-violet.png');
        this.load.image('monstre2', 'assets/monstre2.png');
        this.load.image('monstre3', 'assets/monstre3.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('sky-2', 'assets/sky-2.png');




    }
    create() {
        super.create();

        /////////////////////////////////////////////// La BASE DU NIVEAU /////////////////////////////////////

        //on définit la taille du tableau
        let largeurDuTableau=2000;
        let hauteurDuTableau=450; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.physics.add.collider(this.player,this.platforms);


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=0;

        this.player.setDepth(10);




        //des étoiles
        this.star1=this.physics.add.sprite(1900,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(1);


        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);


        this.physics.add.collider(this.player,this.platforms);


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

        //Monstres
        new monstre2(this,400,100);
        new monstre2(this,800,100);
        new monstre2(this,1200,100);
        new monstre2(this,1930,100);
        new MonsterFly(this,400,150);
        new MonsterFly(this,1000,200);
        new MonsterFly(this,1800,100);
        new monstre3(this,1000,150);
        new monstreviolet(this,450,300);
        new monstreviolet(this,800,300);
        new monstreviolet(this,1800,300);




    }

    update(){
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.2;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.3+500;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.1+30;
    }



}
