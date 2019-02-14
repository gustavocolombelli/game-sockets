const socket = io();

let pos = {x: 0, y: 0};
let posAtual = {x: 0, y: 0};
let posAnterior = {x: 0, y: 0};

var up = false,
    right = false,
    down = false,
    left = false,
    x = window.innerWidth / 2 - 130 / 2;
y = window.innerHeight / 2 - 130 / 2;
posAtual.x = window.innerWidth / 2 - 130 / 2;
posAtual.y = window.innerHeight / 2 - 130 / 2;

socket.on('connect', function () {
    $("#msgs").append("conectado com o id: " + socket.id);
    socket.emit('msg', 'estou conectado: ' + socket.id);
});

socket.on('msg', function (msg) {
    $("#msgs").append('<br>' + msg);
    console.log('outro usuario: ', msg);
    console.log(msg.x);
});


document.addEventListener('keydown', press);

function press(e) {
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
        up = true
    }
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
        right = true
    }
    if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
        down = true
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
        left = true
    }
}

document.addEventListener('keyup', release);

function release(e) {
    if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */) {
        up = false
    }
    if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
        right = false
    }
    if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
        down = false
    }
    if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */) {
        left = false
    }
}

function gameLoop() {
    var div = document.querySelector('div');

    if (up) {
        posAtual.y = posAtual.y - 10
    }
    if (right) {
        posAtual.x = posAtual.x + 10
    }
    if (down) {
        posAtual.y = posAtual.y + 10
    }
    if (left) {
        posAtual.x = posAtual.x - 10
    }
    div.style.left = posAtual.x + 'px';
    div.style.top = posAtual.y + 'px';
    window.requestAnimationFrame(gameLoop);
    //verificar posição anterior para não repitir envios iguais

    //Verificar se a posição atual é diferente da anterior, caso forem iguais o envio é omitido ao servidor
    if (posAnterior && (posAtual.x !== posAnterior.x || posAtual.y !== posAnterior.y)) {
        //Emitir ao servidor a posição atual do jogador

        console.log('POS ANTERIOR: ', posAnterior, 'POS ATUAL: ', posAtual);
        socket.emit('movimento', posAtual);
    }

    posAnterior.x = posAtual.x;
    posAnterior.y = posAtual.y;

}

window.requestAnimationFrame(gameLoop);

// console.log($(window).height());
// console.log($(window).width());