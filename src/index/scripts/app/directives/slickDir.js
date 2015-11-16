(function () {
	'use strict'

	module.exports = function () {
		return {
			restrict: 'AE',
			link: function (scope, elem, attrs) {
				if (window.width() < 993) {
					attrs.slides-to-scroll.setAttribute('3');
					attr.slides-to-show.setAttribute('3');
				}				
			}
		}
	}
}());
