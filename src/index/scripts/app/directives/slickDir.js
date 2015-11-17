(function () {
	'use strict'

	module.exports = function () {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var windowWth = window.innerWidth;
					// slickEl1 = document.getElementById('slick-el1'),
					// slickEl2 = document.getElementById('slick-el2'),
					// slickEl3 = document.getElementById('slick-el3'),
					// slickPar = slickEl1.parentNode,
					// clSlickEl1 = slickEl1.cloneNode(true),
					// clSlickEl2 = slickEl2.cloneNode(true),
					// clSlickEl3 = slickEl3.cloneNode(true);
					// slickEl1.parentNode.removeChild(slickEl1);
					// slickEl2.parentNode.removeChild(slickEl2);
					// slickEl3.parentNode.removeChild(slickEl3);
					if (windowWth >= 1200) {
						attrs.slidesToShow = '4';
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
						};
					};
				// window.addEventListener('resize', function() {
				// 	var windowWthre = window.innerWidth;
				// 		// slickEl = document.getElementById('slick-el'),
				// 		// slickElPar = slickEl.parentElement;
				// 	if (windowWthre >= 1200) {
				// 		// slickEl.setAttribute('slides-to-show', '4');
				// 		// slickEl.setAttribute('slides-to-scroll', '4');
				// 		attrs.slidesToShow = '3';
				// 		attrs.slidesToScroll = '3';
				// 		var slickEl2 = slickEl.cloneNode(true);
				// 		slickEl.parentNode.removeChild(slickEl);
				// 		slickElPar.appendChild(slickEl2);
				// 		console.log(slickEl.getAttribute('slidesToScroll'));
				// 	}
				// 	else if (768 <= windowWthre < 1200) {
				// 		// slickEl.setAttribute('slides-to-show', '3');
				// 		// slickEl.setAttribute('slides-to-scroll', '3');
				// 		attrs.slidesToShow = '3';
				// 		attrs.slidesToScroll = '3';
				// 		var slickEl2 = slickEl.cloneNode(true);
				// 		slickEl.parentNode.removeChild(slickEl);
				// 		slickElPar.appendChild(slickEl2);
				// 		console.log('md', slickEl.getAttribute('slidesToScroll'));
				// 	}
				// 	else {
				// 		slickEl.setAttribute('slidesToShow', '2');
				// 		slickEl.setAttribute('slidesToScroll', '2');
				// 		console.log('large', slickEl.getAttribute('slidesToScroll'));
				// 	}
				// });
			}
		}
	}
}());
