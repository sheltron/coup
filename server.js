var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var extend = require('node.extend');

app.use('/assets', express.static(__dirname + '/public/assets'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

var User = require(__dirname + '/models/user.js');
var Room = require(__dirname + '/models/room.js');

var ceagon = new User({
	name:   'Ceagon',
	wins:   4,
	played: 5
});

var room = new Room();
room.addUsers([ceagon]);

room.message(function(room) {
	return 'Room created -> ' + room.users.length + ' users in room\n\tUsers: ' + JSON.stringify(room.users);
});

io.on('connection', function(socket) {
	console.log('a user connected');

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});