module.exports = function(app, io) {

	var extend = require('node.extend');

	/**
	 * Seat model
	 * This is used to store a player's seat in a given room
	 *
	 * @param options
	 * @constructor
	 */
	function Card(type) {
		this.type = type;
	}

	return Card;

};