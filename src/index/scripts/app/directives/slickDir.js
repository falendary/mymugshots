(function () {
	'use strict';

	module.exports = function () {
		return {
			restrict: 'A',
			scope: {
				callback: '&'
			},
			link: function (scope, elem, attrs) {
				var carEl = document.getElementsByClassName('ang-carousel')[0],
					startM = 0,
					moveLth = 0,
					slideBase = 2,
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
						slideBase += 2;
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
				};
			}
		}
	}
}());
