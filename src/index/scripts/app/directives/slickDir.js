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
				var	gallery = $('.gallery-slick');

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
				// var swipeCounter = 0;
				// gallery.on('swipe', function(event, slick, direction) {
				// 	if (direction == 'left') {
				// 		swipeCounter -= 1;
				// 	}
				// 	else if (direction == 'right') {
				// 		swipeCounter += 1;
				// 	}
				// 	if (swipeCounter == 2 || swipeCounter == -2) {
				// 		swipeCounter = 0;
				// 		callBackFun();
				// 	}
				// });
				var carEl = document.getElementsByClassName('ang-carousel')[0],
					startM = 0,
					moveLth = 0,
					slideBase = 3,
					swipeCounter = 0;
				carEl.addEventListener('mousedown', function(e) {
					startM = e.clientX;
					carEl.onmousedown = function() {return false};
					document.onselectstart = function() { return false };
					carEl.ondragstart = function() { return false };
					carEl.onmousemove = mouseMoveCar;
				});
				carEl.addEventListener('mouseup', mouseUpCar);
				
				function mouseMoveCar (e) {
					moveLth = startM - e.clientX;
				};
				function mouseUpCar () {
					if (moveLth > 104) {
						swipeCounter = swipeCounter + 1;
						console.log('move right');
					}
					else if (swipeCounter != 0 && moveLth < -104) {
						swipeCounter = swipeCounter - 1;
						console.log('move leftt');
					};
					if (swipeCounter == slideBase) {
						swipeCallBack();
						slideBase += 3;
					};
					console.log(swipeCounter);
					carEl.onmousemove = null;
					document.onselectstart = null;
					carEl.ondragstart = null;
					carEl.onmousedown = null;
				};

				function swipeCallBack () {
					callBackFun();
				};

				function callBackFun() {
					console.log('second slide');
					scope.callback(); // - это колбек для закачки новых данных
				}
			}
		}
	}
}());
