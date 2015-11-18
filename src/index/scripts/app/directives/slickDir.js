(function () {
	'use strict';

	module.exports = function () {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var windowWth = window.innerWidth,
					slickEl = document.querySelectorAll('.gallery-carousel slick')[0];
				if (windowWth >= 1200) {
					attrs.slidesToShow = '4'; // Cv
					attrs.slidesToScroll = '4';
				}
				else if (windowWth < 1200) {
					if (windowWth < 768) {
						attrs.slidesToShow = '2';
						attrs.slidesToScroll = '2';
					}
					else {
						attrs.slidesToShow = '3';
						attrs.slidesToScroll = '3';
					}
				};
				var swipeCounter = 0;
				$('.gallery-slick').on('swipe', function(event, slick, direction) {
					if (direction == 'left') {
						swipeCounter -= 1;
					}
					else if (direction == 'right') {
						swipeCounter += 1;
					};
					if (swipeCounter == 3 || swipeCounter == -3) {
						swipeCounter = 0;
						callBackFun();
					}
				});
				function callBackFun() {
					console.log('Third slide');
				};
				window.onresize = resizeFun;			
			}
		}
	}
}());
