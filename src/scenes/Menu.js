class Menu extends Tableau{

    constructor() {
        super('Bureau');
        let perso;
    }

    preload() {
        super.preload();
        this.load.image('sol', 'assets/BURO.png');
        this.load.image('persoNormal', 'assets/PlayerBureau.png');
        this.load.video('intro', 'assets/intro.mp4','loadeddata', false, true);

    }

    create() {
        super.create();
        vid = this.add.video(width / 2, height / 2, 'intro');
        vid.setDisplaySize(width, height);
        vid.play(true);
        vid.setDepth(40);
        vid.setLoop(false);
        vid.setCurrentTime(vid.getDuration());

        let largeurDuTableau=2335;
        let hauteurDuTableau=1314; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.sky=this.add.tileSprite(
            0,
            0,
            0,0,
            'sol'
        );
        this.sky.setSize(3290,1780);
        this.sky.setDisplaySize(2335,1314);
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);

        this.perso = this.physics.add.sprite(300,525, 'persoNormal');
        this.perso.body.setAllowGravity(false);
        this.perso.setDisplaySize(150,410);


    }

    update(){
        super.update();
        if (vid.getCurrentTime() == vid.getDuration()) {
            vid.alpha -= 0.1;
            this.perso.body.setVelocity(400,0)
        }
        if (this.perso.x > 1850){
            this.win();
        }

    }
    getMatr(){
        return super.getMatrix();
    }

    getAvail(){
        return super.getAvailable();
    }
}