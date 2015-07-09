var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var extend = require('node.extend');

var User = require(__dirname + '/models/user.js');
var Room = require(__dirname + '/models/room.js');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	var ceagon = new User({
		name: 'Ceagon',
		wins: 4,
		played: 5
	});

	var room = new Room({
		users: [ceagon]
	});

	room.message(function(room) {
		console.log(room);
		// return self.users.length + ' users in room';
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});