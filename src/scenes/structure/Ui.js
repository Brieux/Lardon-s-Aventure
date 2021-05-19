class Ui extends Phaser.Scene{


    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
        let dash;
        let melee;
        let jump;
        let trou;
        let faux;
        let container;

    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('dash', 'assets/dash.png');
        this.load.image('jump', 'assets/jump.png');
        this.load.image('melee', 'assets/melee.png');
        this.load.image('true', 'assets/true.png');
        this.load.image('false', 'assets/false.png');
        this.load.image('container', 'assets/block_containter.jpg');
    }
    create (){
        console.log("create Ui")

        this.score=0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._scoreText = this.add.text(16, 16, '...', {
            font:'32px "Hanalei Fill"',
            fill: '#fff'
        });

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '...', {
            font:'32px "Hanalei Fill"',
            align: 'right',
            fill: '#fff'
        })

        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '...', {
            font:'24px "Hanalei Fill"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        this._tableauText.originX=1;
        this._tableauTextClass.originX=1;

        this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
        })

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
        },100)



        let pad=new GamePad(this,0,0);
        pad.x=this.sys.canvas.width-pad.size-32;
        pad.y=this.sys.canvas.height-pad.size-32;



        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height;



        this.container = this.physics.add.sprite(400,400,'container');
        this.container.setDisplaySize(125,125);
        this.container.body.setAllowGravity(false);
        this.container.setVisible(false);

        this.container2 = this.physics.add.sprite(800,400,'container');
        this.container2.setDisplaySize(125,125);
        this.container2.body.setAllowGravity(false);
        this.container2.setVisible(false);

        this.dash = this.physics.add.sprite(200,200,'dash');
        this.dash.setDisplaySize(100,100);
        this.dash.body.setAllowGravity(false);
        this.dash.setVisible(false);
        this.dash.setInteractive();

        this.melee = this.physics.add.sprite(400,200,'melee');
        this.melee.setDisplaySize(100,100);
        this.melee.body.setAllowGravity(false);
        this.melee.setVisible(false);
        this.melee.setInteractive();

        this.jump = this.physics.add.sprite(600,200,'jump');
        this.jump.setDisplaySize(100,100);
        this.jump.body.setAllowGravity(false);
        this.jump.setVisible(false);
        this.jump.setInteractive();

        this.trou = this.physics.add.sprite(800,200,'true');
        this.trou.setDisplaySize(100,100);
        this.trou.body.setAllowGravity(false);
        this.trou.setVisible(false);
        this.trou.setInteractive();

        this.faux = this.physics.add.sprite(1000,200,'false');
        this.faux.setDisplaySize(100,100);
        this.faux.body.setAllowGravity(false);
        this.faux.setVisible(false);
        this.faux.setInteractive();


        let ici = this;

        this.physics.add.overlap(this.melee, this.container, function(){
            ici.melee.setPosition(ici.container.x, ici.container.y);
        });
        this.physics.add.overlap(this.dash, this.container, function(){
            ici.dash.setPosition(ici.container.x, ici.container.y);
        });
        this.physics.add.overlap(this.jump, this.container, function(){
            ici.jump.setPosition(ici.container.x, ici.container.y);
        });
        this.physics.add.overlap(this.trou, this.container, function(){
            ici.trou.setPosition(ici.container.x, ici.container.y);
        });
        this.physics.add.overlap(this.faux, this.container, function(){
            ici.faux.setPosition(ici.container.x, ici.container.y);
        });

        this.physics.add.overlap(this.melee, this.container2, function(){
            ici.melee.setPosition(ici.container2.x, ici.container2.y);
        });
        this.physics.add.overlap(this.dash, this.container2, function(){
            ici.dash.setPosition(ici.container2.x, ici.container2.y);
        });
        this.physics.add.overlap(this.jump, this.container2, function(){
            ici.jump.setPosition(ici.container2.x, ici.container2.y);
        });
        this.physics.add.overlap(this.trou, this.container2, function(){
            ici.trou.setPosition(ici.container2.x, ici.container2.y);
        });
        this.physics.add.overlap(this.faux, this.container2, function(){
            ici.faux.setPosition(ici.container2.x, ici.container2.y);
        });


        this.input.enable(this.dash);
        this.input.setDraggable(this.dash);
        this.input.enable(this.trou);
        this.input.setDraggable(this.trou);
        this.input.enable(this.faux);
        this.input.setDraggable(this.faux);
        this.input.enable(this.melee);
        this.input.setDraggable(this.melee);
        this.input.enable(this.jump);
        this.input.setDraggable(this.jump);


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;

        });
    }

    gagne(points=10)
    {
        this.score+=points;
        this._scoreText.setText('Score: ' + this.score);
    }
    update(){
        if(Tableau.current) {
            this._tableauText.setText(Tableau.current.scene.key);
            this._tableauTextClass.setText(Tableau.current.constructor.name);
            if (Tableau.current.getMatr() && Tableau.current.getAvail()) {
                this.showHUD();
            }
            else{
                this.hideHud();
            }
        }
    }

    showHUD(){
        this.dash.setVisible(true);
        this.melee.setVisible(true);
        this.jump.setVisible(true);
        this.trou.setVisible(true);
        this.faux.setVisible(true);
        this.container.setVisible(true);
        this.container2.setVisible(true);
    }

    hideHud(){
        if(this.dash.x == this.container.x){
            Tableau.current.player.dashUnlocked = true;
        }
        
        this.dash.setVisible(false);
        this.jump.setVisible(false);
        this.trou.setVisible(false);
        this.faux.setVisible(false);
        this.melee.setVisible(false);
        this.container.setVisible(false);
        this.container2.setVisible(false);

        this.dash.setPosition(200,200);
        this.melee.setPosition(400,200);
        this.jump.setPosition(600,200);
        this.trou.setPosition(800,200);
        this.faux.setPosition(1000,200);
    }
}
