/**
 * Created by sergey on 15.11.15.
 */
(function () {

    'use strict';

    module.exports = function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                templateUrl: 'shell.html'
            })
            .state('app.landing', {
                url: '/',
                templateUrl: 'landing.html'
            })
            .state('app.catalog', {
                url: '/home',
                templateUrl: 'catalog.html'
            })
            .state('app.item', {
                url: '/item/:id',
                templateUrl: 'detail.html'
            });


        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});

        $urlRouterProvider.otherwise('/');
    };

}());