/**
 * Main app script
 */
var revealSection;

(function($) {
	"use strict";

	$(document).ready(function() {
		/**
		 * Parallax scrolling
		 */
		var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)

		if(!isMobile && $(window).innerWidth() > 768) {
			//$('.parallax').addClass('background-fixed');

			$(window).stellar({
				horizontalScrolling: false,
				responsive:          true
			});
		}

		/**
		 * Mobile menu
		 */
		var mobileMenu = $('<a/>').attr('href', '#')
			.addClass('mobile-menu')
			.appendTo('#header .col-lg-2')
			.bind('click', function(event) {
				event.preventDefault();

				if(!$(this).hasClass('active')) {
					$(this).addClass('active');
					$('#primary-nav').addClass('active');
					$('#primary-nav .menu-item-has-children').removeClass('active');
				}
				else {
					$(this).removeClass('active');
					$('#primary-nav').removeClass('active');
				}
			});

		$('<span/>').appendTo(mobileMenu)
			.text('Open Menu');

		$('#primary-nav .menu-item-has-children').bind('click', function(event) {
			if($(window).innerWidth() < 1200 && !$(this).hasClass('active')) {
				event.preventDefault();
				$(this).addClass('active');
			}
		});

		/**
		 * GAP Hype 3 hooks
		 */
		var reveal = $('.gap-reveal').clone()
			.insertAfter($('#gaphtml5_hype_container'));

		var revealSections = [
			$('.icon-box-shortcode', reveal).eq(0),
			$('.icon-box-shortcode', reveal).eq(1),
			$('.icon-box-shortcode', reveal).eq(2),
		];

		$('.icon-box-shortcode', reveal).fadeTo(0, 0);
		$(reveal).slideUp(0);

		revealSection = function(i) {
			if(i > 0) {
				$(reveal).slideDown(250);

				for(var a = 0; a < revealSections.length; a++) {
					if(a < i) {
						revealSections[a].stop().fadeTo(250, 1);
					}
					else {
						revealSections[a].stop().fadeTo(250, 0);
					}
				}
			}
			else {
				$(reveal).slideUp(250);
				$('.icon-box-shortcode', reveal).stop().fadeTo(250, 0);
			}
		};
	});

})(jQuery);