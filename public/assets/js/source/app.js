/**
 * Main app script
 */
"use strict";

(function($, socket) {

	socket.on('chat message', function(msg) {
		var messages = $('#messages');

		$(messages).append($('<li/>').text(msg));

		$(messages).stop().animate({
			scrollTop: $(messages).get(0).scrollHeight
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

	socket.on('update rooms', function(rooms) {
		$('#rooms ul').empty();

		$.each(rooms, function(r, room) {
			var li = $('<li/>').appendTo('#rooms ul');

			var a = $('<a/>').text(room.name)
				.attr('href', '#!room=' + r)
				.bind('click', function(event) {
					event.preventDefault();

					socket.emit('join room', r);

					$('#rooms').fadeOut(function() {
						$('#room').fadeIn();
					});
				})
				.appendTo(li);

			$('<span/>').text(room.seats.length + ' players')
				.appendTo(a);
		});
	});

	$(document).ready(function() {
		$('#login form').bind('submit', function(event) {
			event.preventDefault();

			socket.emit('user login', $('#login input[name="username"]').val());

			$('#login').fadeOut(function() {
				$('#rooms').fadeIn();
			});

			return false;
		});

		$('#rooms form').bind('submit', function(event) {
			event.preventDefault();

			socket.emit('create room', $('#rooms input[name="room-name"]').val());

			return false;
		});

		$('#chatroom form').bind('submit', function(event) {
			event.preventDefault();

			var m = $('#chatroom input[name="message"]');

			if($(m).val() !== '') {
				socket.emit('chat message', $(m).val());

				$(m).val('');
			}

			return false;
		});

		$('#room-actions [data-room-action="deal"]').on('click', function() {
			socket.emit('deal', $(this).attr('data-room-id'))
		});
	});

})(jQuery, io());