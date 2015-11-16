(function () {
	'use strict'

	module.exports = function () {
		return {
			restrict: 'AE',
			link: function (scope, elem, attrs) {
				var slickDiv = document.getElementsByClassName('slick-div')[0];
				// slickDiv.slick({
				// 	infinite: true,
				// 	slidesToShow: 4,
				// 	slidesToScroll: 2
				// })
				console.log(elem, 'hellow guys');
			}
		}
	}
})
