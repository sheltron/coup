var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var extend = require('node.extend');

/**
 * User model
 *
 * @param {object} options
 */
module.exports = function(options) {
	options = extend({
		name:   'Anonymous',
		wins:   0,
		played: 0
	}, options);

	this.name = options.name;
	this.wins = options.wins;
	this.played = options.played;
};