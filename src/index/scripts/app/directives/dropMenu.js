(function () {
	'use strict';

	module.exports = function () {
		return {
			restrict: 'A',
			scope: {
				callback: '&'
			},
			link: function (scope, elem, attrs) {
				var trigger = document.getElementsByClassName('menu-trig')[0],
					navFilter = document.getElementsByClassName('nav-filter')[0];
				trigger.addEventListener('click', function(){
					if (trigger.classList.contains('trigActive') == false) {
						trigger.classList.add('trigActive');
						navFilter.classList.remove('navFiltInactive');
						navFilter.classList.add('show-sm', 'navFiltActive');
					}
					else {
						trigger.classList.remove('trigActive');
						navFilter.classList.add('navFiltInactive');
						setTimeout(function() {
							navFilter.classList.remove('show-sm', 'navFiltActive');
						}, 400);
					}
				});
			}
		}
	}
}());