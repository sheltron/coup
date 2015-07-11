// Load required libraries
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var extend = require('node.extend');

// Globals
require(__dirname + '/config/globals.js')(app, __dirname + '/public');

// Routes
require(__dirname + '/config/routes.js')(app, __dirname + '/public');

// Load in models
var User = require(__dirname + '/models/user.js')(app, io);
var Room = require(__dirname + '/models/room.js')(app, io);

var users = [];
var rooms = [];

var ceagon = new User({
	name:   'Ceagon',
	wins:   1,
	played: 2
});

var sheltron = new User({
	name:   'Sheltron',
	wins:   1,
	played: 2
});

var room = new Room();
room.addUser([ceagon, sheltron]);
room.newGame();
room.dealHand();

//room.message(function(room) {
//	return 'Room created -> ' + room.users.length + ' users in room\n\tUsers: ' + JSON.stringify(room.users);
//});

io.on('connection', function(socket) {
	var user = null;

	socket.on('user login', function(username) {
		user = new User({
			name: username
		});

		users.push(user);
		socket.emit('update rooms', rooms);

		console.log('User logged in (' + username + ')');

		return true;
	});

	socket.on('create room', function(roomName) {
		var room = new Room({
			name: roomName
		});

		room.addUser(user);

		rooms.push(room);

		socket.emit('update rooms', rooms);

		console.log('Room created (' + roomName + ')');
	});

	socket.on('enter room', function(id) {
		console.log('User (' + user.name + ') is entering room #' + id);
	});

	//socket.emit('update cards', room.seats[0].cards);

	socket.on('disconnect', function() {
		var username = '';

		for(var u in users) {
			if(users[u] === user) {
				username = users[u].name;
				delete users[u];
				break;
			}
		}

		console.log('User disconnected (' + username + ')');
	});

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});