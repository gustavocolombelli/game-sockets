var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
let posAnterior = {x: 0, y: 0};

var cursors;


var game = new Phaser.Game(config);
let socket = io();


var keyObj;
keyObj = scene.input.keyboard.addKey('W');  // Get key object

function preload() {
    this.load.image('bg', 'assets/graph-verde.png');
    this.load.image('block', 'assets/formas-geometricas/ballBlue.png');
}

function create() {

    //  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(0, 0, 1920, 1080);
    this.physics.world.setBounds(0, 0, 1920, 1080);

    //  Mash 4 images together to create our background
    this.add.image(0, 0, 'bg').setOrigin(0);



    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.image(400, 300, 'block');

    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player, true, 1, 1);

}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-500);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(500);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-500);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(500);
    }
    console.log(player.x, player.y);
    if (posAnterior && (player.x !== posAnterior.x || player.y !== posAnterior.y)) {
        socket.emit('movimento', {x: player.x, y: player.y})
    }
    posAnterior.x = player.x;
    posAnterior.y = player.y;
}
