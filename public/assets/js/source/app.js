/**
 * Main app script
 */
"use strict";

(function($, socket) {

	$('form').submit(function(event) {
		event.preventDefault();

		if($('#m').val() !== '') {
			socket.emit('chat message', $('#m').val());
			$('#m').val('');

			$('#messages').stop().animate({
				scrollTop: $('#messages').get(0).scrollHeight
			});
		}

		return false;
	});

	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').text(msg));
	});

	$(document).ready(function() {
	});

})(jQuery, io());