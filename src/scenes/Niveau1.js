class Niveau1 extends Tableau{
    //MUSIQUE:http://onlinesequencer.net/2073382
    //MATRIX:http://onlinesequencer.net/2073386
    //MATRIX CASSEE :http://onlinesequencer.net/2073461
    //TITRE http://onlinesequencer.net/2073438



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
        this.load.image('cafardMatrix', 'assets/enmi1Matrix.png');
        this.load.image('criquetMatrix', 'assets/enmi2Matrix.png');
        this.load.image('persoNormal', 'assets/player.png');
        this.load.image('busNormal', 'assets/MagicoBus.png');
        this.load.image('busMatrix', 'assets/MagicoBusMatrix.png');

        this.load.spritesheet('AnimPlayer',
            'assets/animRun.png',
            { frameWidth: 1559, frameHeight: 1194  }
        );
        this.load.spritesheet('AnimIdle',
            'assets/animIdle.png',
            { frameWidth: 1559, frameHeight: 1194  }
        );
        this.load.spritesheet('Enmi1Walk',
            'assets/animEnmi1.png',
            { frameWidth: 1512, frameHeight: 702  }
        );
        this.load.spritesheet('Enmi2Walk',
            'assets/animEnmi2.png',
            { frameWidth: 966, frameHeight: 709  }
        );
        this.load.spritesheet('Enmi2Die',
            'assets/animEnmi2Dead.png',
            { frameWidth: 966, frameHeight: 709  }
        );
        this.load.spritesheet('Enmi1Die',
            'assets/animEnmi1Dead.png',
            { frameWidth: 1512, frameHeight: 702  }
        );
        this.load.audio('MusicNormal', 'assets/sound/Normal.mp3');
        this.load.audio('MusicMatrix', 'assets/sound/Matrice.mp3');
        this.load.image('Matrix', 'assets/francoisXavier/matrix.png')
    }

    create() {
        super.create();

        /////////////////////////////////////////////// La BASE DU NIVEAU /////////////////////////////////////

        //on définit la taille du tableau

        let largeurDuTableau=9417;
        let hauteurDuTableau=964; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.physics.add.collider(this.player,this.platforms);
        this.Ambiance = this.sound.add('MusicNormal');
        this.AmbianceMatrix = this.sound.add('MusicMatrix');
        this.AmbianceMatrix.play();
        this.Ambiance.play();

        this.Ambiance.volume = 0;
        this.AmbianceMatrix.volume = 0;
        this.Ambiance.loop = true;
        this.AmbianceMatrix.loop = true;

        this.tweens.add({
            targets:this.Ambiance,
            volume:1,
            duration:1500,
        })

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            9417,
            964,
            'bg'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);

        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            9417,
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
        cafard = new monstre2(this,2000,600);
        ennemis[0] = cafard;

        criquet = new monstreviolet(this,1500,100);
        ennemis[1] = criquet;

        let plate = this.physics.add.staticGroup();
        plate.create(0,775);
        plate.children.entries[0].setDisplaySize(1210,50);
        plate.create(1600,775);
        plate.children.entries[1].setDisplaySize(2100,50);
        plate.create(3500,500);
        plate.children.entries[2].setDisplaySize(200,50);
        plate.create(3150,700);
        plate.children.entries[3].setDisplaySize(110,50);
        plate.create(3750,400);
        plate.children.entries[4].setDisplaySize(100,50);

        //partie 2
        plate.create(4500,480);
        plate.children.entries[5].setDisplaySize(1325,50);
        plate.create(6625,750);
        plate.children.entries[6].setDisplaySize(900,50);
        plate.create(7500,400);
        plate.children.entries[7].setDisplaySize(250,50);


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
        this.starsFxContainer = this.add.container();
        this.starsFxContainer.x = this.stars.x;
        this.starsFxContainer.y =  this.stars.y;

        this.particlesMatrix = this.add.particles('Matrix');
        this.emmiter = this.particlesMatrix.createEmitter({
            frequency: 25,
            lifespan: 750,
            quantity: 1,
            gravityX: 0,
            gravityY: 750,
            x: { min: 0, max: 2 },
            y: { min: 0, max: 2 },
            radial: true,
            scale: {min: -0.75 , max :0.75},
            alpha: { start: 1, end: 0 },
            speed: 0,
            angle: { min: 0, max: 360 },
        });


        this.starsFxContainer.add(this.particlesMatrix);


        this.physics.add.collider(plate, cafard);
        this.physics.add.collider(plate, this.stars);
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        ui.gagne();

        this.bus = this.physics.add.sprite(8500,600,"busNormal")
        this.bus.setDisplaySize(693,400);
        this.bus.body.setAllowGravity(false);
        this.bus.setSize(1200,600);
        this.bus.setOffset(350,100);
        this.bus.body.pushable = false;
        this.physics.add.collider(this.player, this.bus);
        this.tweens.add({
            targets: this.bus,
            y: {
                from: 600,
                to:550, //on monte de 20 px
                duration: 2000,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });

        super.normalMode = true;

    }

    update(time, delta){
        super.update()
        /*if(this.player.y > 775){
            this.player.isDead=true;
            this.player.visible=false;
            this.player.isDead=false;
            this.scene.restart();
        }*/
        if(super.getMatrix() && super.getAvailable()){
            this.sky2.setTexture('solMatrix');
            this.sky.setTexture('fondMatrix');
            this.player.setTexture('persoMatrix');
            cafard.setTexture('cafardMatrix');
            criquet.setTexture('criquetMatrix');
            this.player.body.enable = false;
            cafard.body.enable = false;
            criquet.body.enable = false;
            criquet.pausetween();
            this.AmbianceMatrix.volume = 1;
            this.Ambiance.volume = 0;

        }
        if(!super.getMatrix() && super.getNormalMode()) {
            this.sky2.setTexture('terrain');
            this.sky.setTexture('fond');
            cafard.y = cafard.y -20;
            cafard.body.enable = true;
            criquet.body.enable = true;
            this.player.body.enable = true;
            criquet.playtween();
            super.normalMode = false;
            this.AmbianceMatrix.volume = 0;
            this.Ambiance.volume = 1;

        }
        if(!super.getMatrix()) {
            this.player.move(this, time, delta);
            this.player.powerUp(this, time, delta);
            //le ciel se déplace moins vite que la caméra pour donner un effet paralax
            this.sky2.tilePositionX = this.cameras.main.scrollX;
            //le deuxième ciel se déplace moins vite pour accentuer l'effet
            this.sky.tilePositionX = this.cameras.main.scrollX * 0.3 + 500;

            cafard.update();
            criquet.update();

            //console.log(cafard);
        }
    }

    getMatr(){
        return super.getMatrix();
    }

    getAvail(){
        return super.getAvailable();
    }


    MusicNormal(){
        this.tweens.add({
            targets:this.AmbianceMatrix,
            volume:0,
            duration:1500,
        })
        this.tweens.add({
            targets:this.Ambiance,
            volume:1,
            duration:1500,
        })
    }
}

