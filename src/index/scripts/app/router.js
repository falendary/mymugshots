/**
 * Created by sergey on 15.11.15.
 */
(function () {

    'use strict';

    module.exports = function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: 'landing.html'
            })
            .state('app', {
                url: '',
                abstract: true,
                templateUrl: 'interface.html'
            })
            .state('app.gallery', {
                url: '/home/{pageNumber}',
                templateUrl: 'gallery.html',
                reloadOnSearch: false,
                params: {
                    pageNumber: null,
                    phrase: null,
                    query: null,
                    datetime: null
                }
            })
            .state('app.item', {
                url: '/item/:id',
                templateUrl: 'detail.html'
            });


        //$locationProvider.html5Mode({
        //    enabled: true
        //});

        $urlRouterProvider.otherwise('/');
    };

}());