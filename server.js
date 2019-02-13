const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket)=>{
	console.log('novo cliente conectado', socket.id);
	socket.on('msg', (msg)=> {
        console.log(msg, socket.id);
        msg.id = socket.id;
		socket.broadcast.emit('msg', msg);
	})
});

http.listen(3000, function () {
	console.log('Ouvindo na porta 3000')
});