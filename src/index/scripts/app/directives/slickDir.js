(function () {
	'use strict';

	module.exports = function () {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var windowWth = window.innerWidth;
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
					}
			}
		}
	}
}());
