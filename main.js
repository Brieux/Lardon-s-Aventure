
let width=1654; //896;
let height=964; //448;
var vid;
var ennemis = [];
var cafard;
var criquet;
var cafard2;

let config = {
    type: Phaser.AUTO,


    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100*3 },
            debug: false,
        }
    },
    scene: [
        new Ui(),
        new Menu("Bureau"),
        new Niveau1("Niveau 1"),
    ],
    width: width,
    height: height,
    scale: {
        mode: Phaser.Scale.FIT,
        orientation:Phaser.Scale.LANDSCAPE,
        parent: 'game',
        width: width,
        height: height,
        min: {
            width: 0,
            height: 0
        },
        max: {
            width: width*1.5,
            height: height*1.5
        },
        autoCenter:Phaser.Scale.Center.CENTER_BOTH

    },
    autoRound: false

};
let game;
function resize() {
    /*
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowWidth<width || windowHeight<height){
        if(windowRatio < gameRatio){
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
        }
        else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    }else{
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
    }

     */

}
window.onload = function() {
    game=new Phaser.Game(config);
    window.addEventListener("resize", resize, false);
    window.addEventListener("scroll", resize, false);
}
