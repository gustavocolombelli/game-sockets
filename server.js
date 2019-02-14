var express = require('express');
var app = express();

var jogadores = {};

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const porta = 80;
const ip = "10.35.12.143";


app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

io.on('connection', (socket) => {
    let contadorMovimentos = 0;
    console.log('[+++ novo cliente conectado +++] -->', socket.id);
    jogadores[socket.id] = {};

    socket.on('movimento', (movimento) => {

        jogadores[socket.id].x = movimento.x;
        jogadores[socket.id].y = movimento.y;

        console.log(contadorMovimentos++, jogadores[socket.id], socket.id);
        movimento.id = socket.id;
        socket.broadcast.emit('movimento', jogadores);
    });

    socket.on('disconnect', () => {
        console.log('[--- Jogador: ' + socket.id + ' desconectou ---]');
        delete jogadores[socket.id];
        io.emit('desconectou', socket.id);
    })

});

http.listen(porta, ip, function () {
    console.log('Ouvindo na porta:' + porta)
});