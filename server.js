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
var Seat = require(__dirname + '/models/seat.js')(app, io);
var Card = require(__dirname + '/models/card.js')(app, io);

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

console.log(room.seats);

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