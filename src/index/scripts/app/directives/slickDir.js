(function () {
	'use strict';

	module.exports = function () {
		return {
			restrict: 'AE',
			scope: {
				callback: '&'
			},
			link: function (scope, elem, attrs) {
				var windowWth = window.innerWidth;
				var gallery = $('.gallery-slick');

				if (windowWth >= 1200) {
					gallery.attr('slides-to-show', 4);
					gallery.attr('slides-to-scroll', 4);
				}
				else if (windowWth < 1200) {
					if (windowWth < 768) {
						gallery.attr('slides-to-show', 2);
						gallery.attr('slides-to-scroll', 2);
					}
					else {
						gallery.attr('slides-to-show', 2);
						gallery.attr('slides-to-scroll', 2);
					}
				}
				var swipeCounter = 0;
				gallery.on('swipe', function(event, slick, direction) {
					if (direction == 'left') {
						swipeCounter -= 1;
					}
					else if (direction == 'right') {
						swipeCounter += 1;
					}
					if (swipeCounter == 2 || swipeCounter == -2) {
						swipeCounter = 0;
						callBackFun();
					}
				});
				function callBackFun() {
					console.log('second slide');
					scope.callback(); // - это колбек для закачки новых данных
				}
			}
		}
	}
}());
