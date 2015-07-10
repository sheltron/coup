var extend = require('node.extend');

module.exports = function(app, io) {
	/**
	 * User model
	 *
	 * @param options
	 * @constructor
	 */
	function User(options) {
		options = extend({
			name:       'Anonymous',
			wins:       0,
			played:     0,
			timeOnline: 0
		}, options);

		this.name = options.name;
		this.wins = options.wins;
		this.played = options.played;
		this.timeOnline = options.timeOnline;

		/**
		 * Adds this user a room
		 *
		 * @param room
		 */
		this.joinRoom = function(room) {
			room.addUser(this);
		};
	}

	return User;
};