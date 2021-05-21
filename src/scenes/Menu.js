class Menu extends Tableau{

    constructor() {
        super('Bureau');
        let persou;
    }

    preload() {
        super.preload();
        this.load.image('sol', 'assets/BURO.png');
        this.load.image('persoNormalBureau', 'assets/PlayerBureau.png');
        this.load.video('intro', 'assets/intro.mp4','loadeddata', false, true);
        this.load.spritesheet('AnimBureau',
            'assets/animBureau.png',
            { frameWidth: 1559, frameHeight: 1194 })
        this.load.spritesheet('AnimIdleBureau',
            'assets/animIdleBureau.png',
            { frameWidth: 1559, frameHeight: 1194 })
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

        this.fond=this.add.tileSprite(
            0,
            0,
            0,0,
            'sol'
        );
        this.fond.setSize(3290,1780);
        this.fond.setDisplaySize(2335,1314);
        this.fond.setOrigin(0,0);
        this.fond.setScrollFactor(0);

        this.anims.create(
            {
                key: 'idle',
                frames: this.anims.generateFrameNumbers('AnimIdleBureau', { start: 0, end:  4}),
                frameRate: 5,
                repeat: -1,
                yoyo: -1
            });

        this.persou = this.physics.add.sprite(300,525, 'persoNormalBureau');
        this.persou.anims.play('idle', true);
        this.persou.body.setAllowGravity(false);
        this.persou.setDisplaySize(750,410);

        this.text = this.add.text(1100,650, 'Cliquez pour commencer');
        this.text.setFontSize(40);
        this.tweens.add({
            targets: this.text,
            alpha: {
                from: 0.2,
                to:1, //on monte de 20 px
                duration: 1100,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });

        this.anims.create(
            {
                key: 'run',
                frames: this.anims.generateFrameNumbers('AnimBureau', { start: 2, end:  7}),
                frameRate: 10,
                repeat: -1
            });

        let here = this;
        this.input.on('pointerdown', function(){
            here.persou.body.setVelocity(800,0);
            console.log;
            console.log(here.anims);
            here.persou.anims.play('run');
        });


    }

    update(){
        super.update();
        if (vid.getCurrentTime() == vid.getDuration()) {
            vid.alpha -= 0.1;
            //this.persou.body.setVelocity(400,0)
        }
        if(this.persou.x > 1000 && this.persou.x < 1100){
            console.log("plop");
            this.cameras.main.fadeOut(500, 0, 0, 0);
        }

        if (this.persou.x > 1850){

            console.log("loading new scne");
            this.load.reset();
            this.suivant();


        }

    }


    getMatr(){
        return super.getMatrix();
    }

    getAvail(){
        return super.getAvailable();
    }
}