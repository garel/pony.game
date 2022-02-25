import 'phaser';

const tileMapKey: string = "tileMap";
const layers: string[] = ["ground", "trees", "buildings"];

export default class Demo extends Phaser.Scene
{
    private player!:Phaser.GameObjects.Sprite;
    private up!:Phaser.Input.Keyboard.Key;
    private down!:Phaser.Input.Keyboard.Key;
    private left!:Phaser.Input.Keyboard.Key;
    private right!:Phaser.Input.Keyboard.Key;

    constructor ()
    {
        super('Pony');
    }

    preload ()
    {

        this.load.image('tileSet','assets/tileset/sheet.png');
        this.load.tilemapTiledJSON(tileMapKey, 'assets/tilemap/map.json');
        this.load.spritesheet('character', 'assets/character/ninja.png', {frameWidth: 32, frameHeight: 36});
    }

    create ()
    {
        const map = this.make.tilemap({key: tileMapKey});
        const mapTileSet = map.addTilesetImage('tiles', 'tileSet');
        this.player = this.add.sprite(40, 40, 'character');
        layers.forEach(layer => map.createLayer(layer, mapTileSet));

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('character', { frames: [ 0, 1, 2 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', { frames: [ 3, 4, 5 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('character', { frames: [ 6, 7, 8 ] }),
            frameRate: 8,
            repeat: -1
        });


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', { frames: [ 9, 10, 11 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.player.depth = 100;

        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update()
    {
        if(this.up.isDown) {
            this.player.play('up');
            this.player.y -= 2;
        }
        else if(this.down.isDown) {
            this.player.play('down');
            this.player.y += 2;
        }
        else if(this.left.isDown) {
            this.player.play('left');
            this.player.x -= 2;
        }
        else if(this.right.isDown) {
            this.player.play('right');
            this.player.x += 2;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo
};

const game = new Phaser.Game(config);
