var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y:0}
        }
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

var mapaJogadores = {};
function preload() {
    this.load.image('bg', 'assets/graph-verde.png');
    this.load.image('block', 'assets/formas-geometricas/ballBlue.png');
}

function create() {
    var self = this;
    this.socket = io.connect();
    this.otherPlayers = this.physics.add.group();

    this.cameras.main.setBounds(0, 0, 1920, 1080);
    this.physics.world.setBounds(0, 0, 1920, 1080);

    this.add.image(0, 0, 'bg').setOrigin(0);

    this.socket.on('novoJogador', function (novoJogador) {
        console.log('novo jogador', novoJogador);
        adcionarJogador(self, novoJogador);
    });


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
        this.socket.emit('movimento', {x: player.x, y: player.y})
    }
    posAnterior.x = player.x;
    posAnterior.y = player.y;
}

function adcionarJogador(self, novoJogador) {
    console.log(',',novoJogador);
    const otherPlayer = self.add.sprite(novoJogador.x, novoJogador.y, 'block');
    otherPlayer.playerId = novoJogador.playerID;
    self.otherPlayers.add(otherPlayer);
}

