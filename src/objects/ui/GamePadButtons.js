
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

        let btnUP=scene.add.circle(0,0,w/2,0xff0000,0.3).setInteractive();
        let btnLEFT=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnRIGHT=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();


        let btnA=scene.add.circle(0,0,w/2,0x00ff00,0.3).setInteractive();

        this.add(btnUP);
        this.add(btnLEFT);
        this.add(btnRIGHT);
        this.add(btnA);

        btnUP.setInteractive();
        btnLEFT.setInteractive();
        btnRIGHT.setInteractive();
        btnA.setInteractive();

        btnUP.x=scene.sys.canvas.width * -1 + w * 6;
        btnLEFT.x=w*-2;
        btnRIGHT.x=w*0;
        btnLEFT.y=w;
        btnRIGHT.y=w;
        btnUP.y=w+1;


        btnA.x=scene.sys.canvas.width * -1 + w * 5;
        btnA.y=0;


        btnLEFT.on('pointerdown',function(){
            Tableau.current.player.directionX=-1;
        });
        btnRIGHT.on('pointerdown',function(){
            Tableau.current.player.directionX=1;
        });
        btnUP.on('pointerdown',function(){
            Tableau.current.player.directionY=-1;
        });


        btnLEFT.on('pointerup',function(){
            Tableau.current.player.directionX=0;
        });
        btnRIGHT.on('pointerup',function(){
            Tableau.current.player.directionX=0;
        });
        btnUP.on('pointerup',function(){
            Tableau.current.player.directionY=-0;
        });


        btnA.on('pointerdown',function(){
            Tableau.switchMode();
        });
        btnA.on('pointerup',function(){
                Tableau.reloadMode();
        });





    }

}