module.exports = function(app, io) {

	var extend = require('node.extend');
	var Seat = require(__dirname + '/seat.js')(app, io);
	var Card = require(__dirname + '/card.js')(app, io);

	/**
	 * Room model
	 *
	 * @param options
	 * @constructor
	 */
	function Room(options) {
		options = extend({
			users: [],
			seats: [],
			deck:  []
		}, options);

		this.users = options.users;
		this.seats = options.seats;
		this.deck = options.deck;

		/**
		 * Generate a fresh deck
		 *
		 * @returns {Array}
		 */
		this.freshDeck = function(options) {
			options = extend({
				numberOfCards: 3,
				types:         global.cardTypes
			}, options);

			var deck = [];

			for(var j = 0; j < options.numberOfCards; j++) {
				for(var t in options.types) {
					deck.push(new Card(options.types[t]));
				}
			}

			return deck;
		};

		/**
		 * Add a user / multiple users to the room
		 *
		 * @param user
		 */
		this.addUser = this.addUsers = function(user) {
			// If user is an array...
			if(typeof user.length !== 'undefined') {
				for(var i in user) {
					this.addUser(user[i]);
				}
			}
			// Else, assume user is an object
			else {
				this.users.push(user);
				this.addSeat(new Seat({user: user}));
			}
		};

		/**
		 * Add a seat / multiple seats to the room
		 *
		 * @param seat
		 */
		this.addSeat = function(seat) {
			// If seat is an array...
			if(typeof seat.length !== 'undefined') {
				for(var i in seat) {
					this.addSeat(seat[i]);
				}
			}
			// Else, assume seat is an object
			else {
				this.seats.push(seat);
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
			}
			else if(typeof msg === 'function') {
				io.emit('chat message', msg(this));
			}
		};

		/**
		 * Shuffle deck
		 */
		this.shuffleDeck = function() {
			this.deck.sort(function() {
				return .5 - Math.random();
			});
		};

		/**
		 * Deal 2 cards out to each seat
		 */
		this.dealHand = function() {
			this.shuffleDeck();

			// 2 cards per seat
			for(var j = 0; j < 2; j++) {
				for(var s in this.seats) {
					this.dealTopCard(this.seats[s]);
				}
			}
		};

		/**
		 * Deal the top card to the specified seat
		 *
		 * @param seat
		 */
		this.dealTopCard = function(seat) {
			seat.cards.push(this.deck[this.deck.length - 1]);

			this.deck.pop();
		};

		/**
		 * Create a new game
		 */
		this.newGame = function() {
			this.deck = this.freshDeck();
		};
	}

	return Room;

};