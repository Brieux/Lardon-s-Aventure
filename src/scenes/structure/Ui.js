class Ui extends Phaser.Scene{


    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
        let si;
        let container;

    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('if', 'assets/if.jpg');
        this.load.image('container', 'assets/if_containter.jpg');
        this.load.image('true', 'assets/true.jpg');
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



        this.container = this.physics.add.sprite(500,500,'container');
        this.container.setDisplaySize(125,125);
        this.container.body.setAllowGravity(false);
        this.container.setVisible(false);

        this.si = this.physics.add.sprite(200,200,'if');
        this.si.setDisplaySize(100,100);
        this.si.body.setAllowGravity(false);
        this.si.setVisible(false);
        this.si.setInteractive();



        this.input.enable(this.si);
        this.input.setDraggable(this.si);


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
        this.si.setVisible(true);
        this.container.setVisible(true);
    }

    hideHud(){
        this.si.setVisible(false);
        this.container.setVisible(false);
        this.si.setPosition(200,200);
    }
}
