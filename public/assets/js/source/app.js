/**
 * Main app script
 */
"use strict";

(function($, socket) {

	socket.on('chat message', function(msg) {
		var messages = $('#messages');

		$(messages).append($('<li/>').text(msg));

		$(messages).stop().animate({
			scrollTop: $('#messages').get(0).scrollHeight
		});
	});

	socket.on('update cards', function(cards) {
		$('#cards').empty();

		$.each(cards, function(c, card) {
			var div = $('<div/>').addClass('card')
				.addClass(card.type)
				.appendTo('#cards');

			$('<span/>').text(card.type)
				.appendTo(div);
		});
	});

	$(document).ready(function() {
		$('form').submit(function(event) {
			event.preventDefault();

			var m = $('#m');

			if($(m).val() !== '') {
				socket.emit('chat message', $('#m').val());

				$(m).val('');
			}

			return false;
		});
	});

})(jQuery, io());