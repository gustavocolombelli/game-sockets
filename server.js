var express = require('express');
var app = express();

var jogadores = {};

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const porta = 80;
const ip = "10.35.12.143";

let contadorMovimentos=0;

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

io.on('connection', (socket) => {
    console.log('novo cliente conectado', socket.id);

    socket.on('msg', (msg) => {
        console.log('---', contadorMovimentos++);
        console.log(msg, socket.id);
        msg.id = socket.id;
        socket.broadcast.emit('msg', msg);
    });

});

http.listen(porta, ip, function () {
    console.log('Ouvindo na porta:' + porta)
});