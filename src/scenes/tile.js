class tile extends Tableau{
    preload() {
        super.preload();
        this.load.image('tiles', 'assets/Tiled/generic_platformer_tiles.png');
        this.load.tilemapTiledJSON('map', 'assets/Tiled/final.json');
        this.load.image('star', 'assets/star.png');
    }

    create(){
        super.create();
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('final', 'tiles');
        this.background = this.map.createLayer('Calque de Tuiles ciel', this.tileset, 0, 0);
        this.player.setDepth(10000);
        this.platforms = this.map.createLayer('Calque de Tuiles 2', this.tileset, 0, 0);
        this.platforms.setCollisionByExclusion(-1,true);
        this.star1=this.physics.add.sprite(800,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(1);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.star1);
        this.physics.add.collider(this.star1, this.platforms);

    }

}