
/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GamePadButtons extends GameKeyboard{
        constructor(scene, x, y,size=100) {
        super(scene, x, y)
        scene.add.existing(this);

        this.size=size;
        let w=this.size/2;
        let pad2=scene.add.container();

        game.input.addPointer();
        game.input.addPointer();

        let btnUP=scene.add.circle(0,0,w*2,0xff0000,0.3).setInteractive();
        this.add(btnUP);
        btnUP.setInteractive();
        btnUP.on('pointerdown',function(){
                Tableau.current.player.directionY=-1;
                btnUP.alpha = 0.75;
        });
        btnUP.on('pointerup',function(){
                Tableau.current.player.directionY=-0;
                btnUP.alpha = 1;
        });

        let btnLEFT=scene.add.circle(0,0,w*2,0xffffff,0.3).setInteractive();
        this.add(btnLEFT);
        btnLEFT.setInteractive();
        btnLEFT.on('pointerdown',function(){
                Tableau.current.player.directionX=-1;
                btnLEFT.alpha = 0.75;
        });
        btnLEFT.on('pointerup',function(){
                Tableau.current.player.directionX=0;
                btnLEFT.alpha = 1;
        });

        let btnRIGHT=scene.add.circle(0,0,w*2,0xffffff,0.3).setInteractive();
        this.add(btnRIGHT);
        btnRIGHT.setInteractive();
        btnRIGHT.on('pointerdown',function(){
                Tableau.current.player.directionX=1;
                btnRIGHT.alpha = 0.75;
        });
        btnRIGHT.on('pointerup',function(){
                Tableau.current.player.directionX=0;
                btnRIGHT.alpha = 1;
        });


        let btnA=scene.add.circle(0,0,w*2,0x00ff00,0.3).setInteractive();
        this.add(btnA);
        btnA.setInteractive();
        btnA.on('pointerdown',function(){
                Tableau.switchMode();
                btnA.alpha = 0.75;
        });
        btnA.on('pointerup',function(){
                Tableau.reloadMode();
                btnA.alpha = 1;
        });


        btnUP.x=scene.sys.canvas.width * -1 + w * 10;
        btnLEFT.x=w*-4.5;
        btnRIGHT.x=w*0;
        btnLEFT.y=w*-1;
        btnRIGHT.y=w*-1;
        btnUP.y=w*-0.9;
        btnA.x=scene.sys.canvas.width * -1 + w * 6;
        btnA.y=w*-2.4;
    }

}