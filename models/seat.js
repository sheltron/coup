module.exports = function(app, io) {
	var extend = require('node.extend');

	/**
	 * Seat model
	 * This is used to store a player's seat in a given room
	 *
	 * @param options
	 * @constructor
	 */
	function Seat(options) {
		options = extend({
			user:  null,
			cards: []
		}, options);

		this.user = options.user;
		this.cards = options.cards;
	}

	return Seat;

};