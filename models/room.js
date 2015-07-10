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
		 * Add a single user to the room
		 *
		 * @param user
		 */
		this.addUser = function(user) {
			this.users.push(user);
		};

		/**
		 * Add multiple users to the room
		 * @param users
		 */
		this.addUsers = function(users) {
			for(var i in users) {
				if(users.hasOwnProperty(i)) {
					this.addUser(users[i]);
				}
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