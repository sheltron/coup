var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var extend = require('node.extend');

/**
 * Room model
 *
 * @param {object} options
 */
module.exports = function(options) {
	options = extend({
		users: []
	}, options);

	this.users = options.users;

	this.addUser = function(user) {
		this.users.push(user);
	};

	this.addUsers = function(users) {
		for(var i in users) {
			if(users.hasOwnProperty(i)) {
				this.addUser(users[i]);
			}
		}
	};

	this.message = function(msg) {
		if(typeof msg === 'string') {
			io.emit('chat message', msg);
			console.log(msg);
		}
		else if(typeof msg === 'function') {
			io.emit('chat message', msg(this));
			console.log(msg(this));
		}
	};
};