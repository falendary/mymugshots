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
        'ui.router'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', require('./app/router')]);

    app.run([function(){
        console.log('app started');
    }]);

    app.controller('shellController', ['$scope', require('./app/controllers/shellController')]);
    app.controller('landingController', ['$scope', require('./app/controllers/landingController')]);
    app.controller('catalogController', ['$scope', require('./app/controllers/catalogController')]);
    app.controller('detailController', ['$scope', require('./app/controllers/detailController')]);

    require('./app/templates.min.js');

}());