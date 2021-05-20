class Ui extends Phaser.Scene {


    constructor() {
        super({key: 'ui', active: true});
        window.ui = this;
        let dash;
        let melee;
        let jump;
        let trou;
        let faux;
        let container;
        let containers;
        let containersBool;
        let activeContainer;
        let boutons;

    }

    preload() {
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('dash', 'assets/dash.png');
        this.load.image('jump', 'assets/jump.png');
        this.load.image('melee', 'assets/melee.png');
        this.load.image('true', 'assets/true.png');
        this.load.image('false', 'assets/false.png');
        this.load.image('container', 'assets/block_containter.jpg');
    }

    create() {
        this.score = 0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._scoreText = this.add.text(16, 16, '...', {
            font: '32px "Hanalei Fill"',
            fill: '#fff'
        });

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauText = this.add.text(this.sys.canvas.width - 16, 16, '...', {
            font: '32px "Hanalei Fill"',
            align: 'right',
            fill: '#fff'
        })

        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauTextClass = this.add.text(this.sys.canvas.width - 16, 16 + 32, '...', {
            font: '24px "Hanalei Fill"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        this._tableauText.originX = 1;
        this._tableauTextClass.originX = 1;

        this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
        })

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me = this;
        setTimeout(function () {
            me.tableau = "Hello World"
        }, 100)


        let pad = new GamePad(this, 0, 0);
        pad.x = this.sys.canvas.width - pad.size - 32;
        pad.y = this.sys.canvas.height - pad.size - 32;


        let btFs = this.add.image(0, 0, 'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1, 1)
        btFs.setDisplaySize(48, 48)
        btFs.x = this.sys.canvas.width;
        btFs.y = this.sys.canvas.height;


        let ici = this;
        this.containers = new Array();
        this.boutons = new Array();
        this.containersBool = new Array();
        this.activeContainer = new Array();

        this.container = this.physics.add.sprite(400, 400, 'container');
        this.container2 = this.physics.add.sprite(800, 400, 'container');
        this.boolContainer = false;
        this.boolContainer2 = false;
        this.containers.push(this.container);
        this.containers.push(this.container2);
        this.containersBool.push(this.boolContainer);
        this.containersBool.push(this.boolContainer2);


        this.containers.forEach(function (enfant) {
            enfant.setDisplaySize(125, 125);
            enfant.body.setAllowGravity(false);
            enfant.setVisible(false);
        })


        this.dash = this.physics.add.sprite(200, 200, 'dash');
        this.melee = this.physics.add.sprite(400, 200, 'melee');
        this.jump = this.physics.add.sprite(600, 200, 'jump');
        this.trou = this.physics.add.sprite(800, 200, 'true');
        this.faux = this.physics.add.sprite(1000, 200, 'false');
        this.boutons.push(this.dash);
        this.boutons.push(this.melee);
        this.boutons.push(this.jump);
        this.boutons.push(this.trou);
        this.boutons.push(this.faux);

        this.boutons.forEach(function (enfant, index) {
            enfant.setDisplaySize(100, 100);
            enfant.body.setAllowGravity(false);
            enfant.setVisible(false);
            enfant.setInteractive();
            ici.input.enable(enfant);
            ici.input.setDraggable(enfant);
            ici.boutons.forEach(function (child) {
                if (enfant === child) {
                } else {
                    ici.physics.add.collider(enfant, child, function () {
                    });

                }
            })
        })


        this.containers.forEach(function (enfant, index) {
            let here = ici;
            ici.boutons.forEach(function (child) {
                here.physics.add.overlap(child, enfant, function () {
                    child.setPosition(enfant.x, enfant.y);
                    here.containersBool[index] = true;
                    here.activeContainer[index] = child;
                });
            });
        });


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;

        });
    }

    gagne(points = 1) {
        Tableau.current.player.ptsProg += points;
        this._scoreText.setText('Pts de Programmation: ' + Tableau.current.player.ptsProg );
    }

    perds(points = 1) {
        Tableau.current.player.ptsProg -= points;
        this._scoreText.setText('Pts de Programmation: ' + this.score);
    }

    update() {
        if (Tableau.current) {
            this._tableauText.setText(Tableau.current.scene.key);
            this._tableauTextClass.setText(Tableau.current.constructor.name);
            if (Tableau.current.getMatr() && Tableau.current.getAvail()) {
                this.showHUD();
            } else {
                this.hideHud();
            }
        }
    }

    showHUD() {
        this.containers.forEach(function (child) {
            child.setVisible(true);
        })
        this.boutons.forEach(function (kid) {
            kid.setVisible(true);
        })
    }

    hideHud() {
        let NameOne;
        let NameTwo;
        if (this.containersBool[0] == true){
            NameOne = this.activeContainer[0].texture.key;
            console.log(NameOne);
        }
        if (this.containersBool[1] == true){
            NameTwo = this.activeContainer[1].texture.key;
            console.log(NameTwo);
        }


        if (Tableau.current.player.ptsProg > 0) {
            if (NameOne === 'dash' && NameTwo === 'true') {
                Tableau.current.player.dashUnlocked = true;
                this.perds();
            }
            if (NameOne === 'melee' && NameTwo === 'true') {
                Tableau.current.player.meleeUnlocked = true;
                this.perds();
            }
            if (NameOne === 'jump' && NameTwo === 'true') {
                Tableau.current.player.jumpUnlocked = true;
                this.perds();
            }
        }


            if (NameOne === 'melee' && NameTwo === 'false' && Tableau.current.player.meleeUnlocked == true) {
                Tableau.current.player.meleeUnlocked = false;
                this.gagne();
            }
            if (NameOne === 'dash' && NameTwo === 'false' && Tableau.current.player.dashUnlocked == true ) {
                Tableau.current.player.dashUnlocked = false;
                this.gagne();
            }
            if (NameOne === 'jump' && NameTwo === 'false' && Tableau.current.player.jumpUnlocked == true) {
                Tableau.current.player.jumpUnlocked = false;
                this.gagne();
            }

            this.containers.forEach(function (child) {
                child.setVisible(false);
            })
            this.boutons.forEach(function (kid) {
                kid.setVisible(false);
            })

            this.dash.setPosition(200, 200);
            this.melee.setPosition(400, 200);
            this.jump.setPosition(600, 200);
            this.trou.setPosition(800, 200);
            this.faux.setPosition(1000, 200);

            this.containersBool[0] = false;
            this.containersBool[1] = false;
        }
}
