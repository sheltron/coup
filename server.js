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

		rooms.push(room);

		socket.emit('update rooms', rooms);

		console.log('Room created (' + roomName + ')');
	});

	socket.on('join room', function(id) {
		rooms[id].addUser(user);

		console.log('User (' + user.name + ') joined room #' + id + ' (' + rooms[id].name + ')');
	});

	//socket.emit('update cards', room.seats[0].cards);

	socket.on('disconnect', function() {
		var username = '';

		for(var u in users) {
			if(users[u] === user) {
				username = users[u].name;

				for(var r = 0; r < rooms.length; r++) {
					rooms[r].removeUser(users[u]);
				}

				// Remove user
				users.splice(u, 1);

				console.log('User disconnected (' + username + ')');

				break;
			}
		}
	});

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});

	socket.on('deal', function(roomID) {
		rooms[roomID].freshDeck();
		rooms[roomID].shuffleAndDealHand();

		socket.emit('update cards', rooms[roomID].seats[0].cards);

		console.log('Room #' + roomID + ' redealt cards.');
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});