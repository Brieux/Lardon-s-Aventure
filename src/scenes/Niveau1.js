class Niveau1 extends Tableau{
    //MUSIQUE:http://onlinesequencer.net/2073382
    //MATRIX:http://onlinesequencer.net/2073386
    //MATRIX CASSEE :http://onlinesequencer.net/2073461
    //TITRE http://onlinesequencer.net/2073438



    constructor() {
        super('Ville');
    }
    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/enmi1.png');
        this.load.image('monstre2', 'assets/enmi1.png');
        this.load.image('ground', 'assets/platform.png');;
        this.load.image('terrain', 'assets/BackGround1.png');
        this.load.image('solMatrix', 'assets/BackGround1_matrix.png');
        this.load.image('fondMatrix', 'assets/backGroundMatrix.png');
        this.load.image('fondNormal', 'assets/Background2.png');
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
        this.load.image('Matrix', 'assets/francoisXavier/matrix.png');

        this.load.image('FondTexte2', 'assets/TexteNar/FondTexte2.png');
        this.load.image('texte2', 'assets/TexteNar/textenarra2.png');
        this.load.image('FondTexte3', 'assets/TexteNar/FondTexte3.png');
        this.load.image('texte3', 'assets/TexteNar/textenarra3.png');
        this.load.image('FondTexte4', 'assets/TexteNar/FondTexte4.png');
        this.load.image('texte4', 'assets/TexteNar/textenarra4.png');
        this.load.image('FondTexte5', 'assets/TexteNar/FondTexte5.png');
        this.load.image('texte5', 'assets/TexteNar/textenarra5.png');
        this.load.image('FondTexteUnlock', 'assets/TexteNar/FondTexteUnlock.png');
        this.load.image('texteUnlock', 'assets/TexteNar/texteUnlock.png');
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
        this.sky=this.add.image(
            0,
            0,
            'fondNormal'
        );
        this.sky.setOrigin(0,0);
        this.skyBug=this.add.image(
            0,
            0,
            'fondMatrix'
        ).setBlendMode(1);
        this.skyBug.setOrigin(0,0);
        this.skyBug.alpha = 0.25;

        this.tweens.add({
            targets: this.skyBug,
            x: {
                from: 0,
                to:75, //on monte de 20 px
                duration: 125,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            },
            y: {
                from: 0,
                to:15, //on monte de 20 px
                duration: 125,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });
        this.skyBug.visible = false;

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

        cafard2 = new monstre2(this,5000,300);
        ennemis[2] = cafard2;

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

        let mur = this.physics.add.sprite(1700,725);
        mur.body.setAllowGravity(false);
        mur.body.immovable = true;
        mur.visible = false;
        this.physics.add.collider(mur, cafard);

        let mur2 = this.physics.add.sprite(4600,380);
        mur2.body.setAllowGravity(false);
        mur2.body.immovable = true;
        mur2.visible = false;
        this.physics.add.collider(mur2, cafard2);

        let mur3 = this.physics.add.sprite(5700,380);
        mur3.body.setAllowGravity(false);
        mur3.body.immovable = true;
        mur3.visible = false;
        this.physics.add.collider(mur3, cafard2);

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
        this.physics.add.collider(plate, cafard2);
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
        this.busTween = this.tweens.add({
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

        this.fondTexte = this.add.image(1200,250,'FondTexte2').setBlendMode(1);
        this.texte1 = this.add.image(1200,250,'texte2');

        this.fondTexte2 = this.add.image(1900,250,'FondTexte3').setBlendMode(1);
        this.texte2 = this.add.image(1900,250,'texte3');
        this.fondTexte2.alpha = 0;
        this.texte2.alpha = 0;
        this.fondTexte2.y = 600;
        this.texte2.y =  600;

        this.fondTexte3 = this.add.image(8620,750,'FondTexte4').setBlendMode(1);
        this.texte3 = this.add.image(8620,750,'texte4');
        this.fondTexte3.alpha = 0;
        this.texte3.alpha = 0;

        this.fondTexte4 = this.add.image(8850,550,'FondTexte5').setBlendMode(1);
        this.texte4 = this.add.image(8850,550,'texte5');
        this.fondTexte4.alpha = 0;
        this.texte4.alpha = 0;

        this.fondTexteUnlock = this.add.image(1225,300,'FondTexteUnlock').setBlendMode(1);
        this.texteUnlock = this.add.image(1250,275,'texteUnlock');
        this.fondTexteUnlock.alpha = 0;
        this.texteUnlock.alpha = 0;

        this.Texte2Screen = true;
        this.Texte3OnScreen = true;
        this.Texte3OffScreen = true;
        this.Texte4OnScreen = true;
        this.TexteUnlock = true;

    }

    update(time, delta){
        super.update()
        this.texteOnScreen();
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
            cafard.setTexture('cafardMatrix');
            cafard2.setTexture('cafardMatrix');
            criquet.setTexture('criquetMatrix');
            this.bus.setTexture('busMatrix');
            this.player.body.enable = false;
            cafard.body.enable = false;
            cafard2.body.enable = false;
            criquet.body.enable = false;
            criquet.pausetween();
            this.busTween.pause();
            this.AmbianceMatrix.volume = 1;
            this.Ambiance.volume = 0;
            this.skyBug.visible = true;

        }
        if(!super.getMatrix() && super.getNormalMode()) {
            this.sky2.setTexture('terrain');
            this.sky.setTexture('fondNormal');
            this.bus.setTexture('busNormal');
            cafard.y = cafard.y -20;
            cafard2.y = cafard2.y -20;
            cafard.body.enable = true;
            cafard2.body.enable = true;
            criquet.body.enable = true;
            this.player.body.enable = true;
            criquet.playtween();
            this.busTween.resume();
            super.normalMode = false;
            this.AmbianceMatrix.volume = 0;
            this.Ambiance.volume = 1;
            this.skyBug.visible = false;

        }
        if(!super.getMatrix()) {
            this.player.move(this, time, delta);
            this.player.powerUp(this, time, delta);
            //le ciel se déplace moins vite que la caméra pour donner un effet paralax
            this.sky2.tilePositionX = this.cameras.main.scrollX;

            cafard.update();
            criquet.update();


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

    texteOnScreen(){
        this.fondTexte.x = this.player.x + 450;
        this.texte1.x = this.player.x + 450;

        this.fondTexte2.x = this.player.x+500;
        this.texte2.x = this.player.x+500;


            if (this.Texte2Screen && (this.player.x >=500 || this.getMatr())){
                this.tweens.add({
                    targets: this.fondTexte,
                    alpha: {
                        from: 1,
                        to:0, //on monte de 20 px
                        duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                        ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                    }
                });
                this.tweens.add({
                    targets: this.texte1,
                    alpha: {
                        from: 1,
                        to:0, //on monte de 20 px
                        duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                        ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                    }
                });
                this.Texte2Screen = false;
        }
            // ----------------------------------------------------------------------------------------------
            // ----------------------------------------------------------------------------------------------
            // ----------------------------------------------------------------------------------------------
            if(this.Texte3OnScreen){
                if (this.getMatr()){
                    this.tweens.add({
                        targets: this.fondTexte2,
                        alpha: {
                            from: 0,
                            to:1, //on monte de 20 px
                            duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                        }
                    });
                    this.tweens.add({
                        targets: this.texte2,
                        alpha: {
                            from: 0,
                            to: 1, //on monte de 20 px
                            duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                        }
                    });
                    this.Texte3OnScreen = false;
                }
            }



        if(this.Texte3OffScreen && this.Texte3OnScreen === false){
            if (!this.getMatr()){
                this.tweens.add({
                    targets: this.fondTexte2,
                    alpha: {
                        from: 1,
                        to:0, //on monte de 20 px
                        duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                        ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                    }
                });
                this.tweens.add({
                    targets: this.texte2,
                    alpha: {
                        from: 1,
                        to: 0, //on monte de 20 px
                        duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                        ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                    }
                });
                this.Texte3OffScreen = false;
            }
        }

        if(this.Texte3OffScreen === false &&this.TexteUnlock === true){
            this.tweens.add({
                targets: this.fondTexteUnlock,
                alpha: {
                    from: 0,
                    to:1, //on monte de 20 px
                    duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                    ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                }
            });
            this.tweens.add({
                targets: this.texteUnlock,
                alpha: {
                    from: 0,
                    to: 1, //on monte de 20 px
                    duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                    ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                }
            });
            let here= this;
            setTimeout(function(){
                here.tweens.add({
                    targets: here.fondTexteUnlock,
                    alpha: {
                        from: 1,
                        to:0, //on monte de 20 px
                        duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                        ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                    }
                });
                here.tweens.add({
                    targets: here.texteUnlock,
                    alpha: {
                        from: 1,
                        to: 0, //on monte de 20 px
                        duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                        ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                    }
                });
            }, 4000);
            this.TexteUnlock = false;
        }
        // ----------------------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------
        // ----------------------------------------------------------------------------------------------
        if(this.Texte4OnScreen){
            if (this.player.x >=8200){
                this.tweens.add({
                    targets: this.fondTexte3,
                    alpha: {
                        from: 0,
                        to:1, //on monte de 20 px
                        duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                        ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                    }
                });
                this.tweens.add({
                    targets: this.texte3,
                    alpha: {
                        from: 0,
                        to: 1, //on monte de 20 px
                        duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                        ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                    }
                });
                this.Texte4OnScreen =  false;
                let here = this;
                setTimeout(function(){
                    here.tweens.add({
                        targets: here.fondTexte3,
                        alpha: {
                            from: 1,
                            to:0, //on monte de 20 px
                            duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                        }
                    });
                    here.tweens.add({
                        targets: here.texte3,
                        alpha: {
                            from: 1,
                            to: 0, //on monte de 20 px
                            duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                        }
                    });
                }, 4000);

                setTimeout(function(){
                    here.tweens.add({
                        targets: here.fondTexte4,
                        alpha: {
                            from: 0,
                            to:1, //on monte de 20 px
                            duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                        }
                    });
                    here.tweens.add({
                        targets: here.texte4,
                        alpha: {
                            from: 0,
                            to: 1, //on monte de 20 px
                            duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                        }
                    });
                }, 4500);

                setTimeout(function(){
                    here.tweens.add({
                        targets: here.fondTexte4,
                        alpha: {
                            from: 1,
                            to:0, //on monte de 20 px
                            duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération

                        }
                    });
                    here.tweens.add({
                        targets: here.texte4,
                        alpha: {
                            from: 1,
                            to: 0, //on monte de 20 px
                            duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                        }
                    });
                }, 8500);
                setTimeout(function(){
                    here.cameras.main.fadeOut(500, 0, 0, 0);
                    here.player.body.enable = false;
                }, 9000);
            }
        }

    }
}

