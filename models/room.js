var extend = require('node.extend');

module.exports = function(app, io) {
	/**
	 * Room model
	 *
	 * @param options
	 * @constructor
	 */
	function Room(options) {
		options = extend({
			users: []
		}, options);

		this.users = options.users;

		/**
		 * Add a user / multiple users to a room
		 *
		 * @param user
		 */
		this.addUser = this.addUsers = function(user) {
			// If user is an array...
			if(typeof user.length !== 'undefined') {
				for(var i in user) {
					if(user.hasOwnProperty(i)) {
						this.addUser(user[i]);
					}
				}
			}
			// Else, assume user is a singleton
			else {
				this.users.push(user);
			}
		};

		/**
		 * Send message to users in room
		 *
		 * @param msg
		 */
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
	}

	return Room;
};