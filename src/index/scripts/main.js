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
        'slick'
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
    app.controller('galleryController', ['$scope', require('./app/controllers/galleryController')]);
    app.controller('detailController', ['$scope', require('./app/controllers/detailController')]);

    app.directive('slickDir', [require('./app/directives/slickDir')]);

    require('./app/templates.min.js');

}());