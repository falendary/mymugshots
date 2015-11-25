/**
 * Created by sergey on 15.11.15.
 *
 */


(function(){

    'use strict';

    var app = angular.module('app', [
        'ngSanitize',
        'ngAnimate',
        'ngMaterial',
        'ui.router',
        'angular-carousel'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', require('./app/router')]);

    app.run([function(){
        console.log('app started');

        var resizeFonts = function (event) {
            document.body.style.fontSize = window.innerWidth / 192 + "px";
            //console.log(document.body.style.fontSize);
        };

        window.addEventListener('resize', resizeFonts);
        window.addEventListener('load', resizeFonts);

    }]);

    app.controller('shellController', ['$scope', require('./app/controllers/shellController')]);
    app.controller('landingController', ['$scope', require('./app/controllers/landingController')]);
    app.controller('galleryController', ['$scope', '$stateParams',  require('./app/controllers/galleryController')]);
    app.controller('detailController', ['$scope', '$stateParams', require('./app/controllers/detailController')]);
    app.controller('interfaceController', ['$scope', '$state', require('./app/controllers/interfaceController')]);

    app.directive('slickDir', ['$state', require('./app/directives/slickDir')]);
    app.directive('dropMenu', [require('./app/directives/dropMenu')]);

    require('./app/templates.min.js');

}());