/**
 * Created by sergey on 15.11.15.
 *
 */

(function () {

    'use strict';

    var entityService = require('../services/entityService');

    module.exports = function ($scope, $stateParams) {

        console.log('Catalog controller started');
        console.log('$stateParams', $stateParams);

        var vm = this;

        vm.currentPage = 1;
        vm.nextPage = vm.currentPage + 2;
        vm.slidesLoaded = false;
        vm.newSlides = [];

        var addItems = function(data, index) {
            while (data.length) {
                vm.slides[index] = {};
                vm.slides[index].index = index;
                vm.slides[index].items = data.splice(0, 8);
                index = index + 1;
            }
        };

        if($stateParams.phrase) {
            var index = 0;
            if($stateParams.phrase === 'today') {
                entityService.getEntitiesByPhrase('today').then(function(data){
                    vm.slides = [];
                    addItems(data, index);
                    $scope.$apply();
                });
            } else {
                if($stateParams.phrase === 'yesterday') {
                    entityService.getEntitiesByPhrase('yesterday').then(function(data) {
                        vm.slides = [];
                        addItems(data, index);
                        $scope.$apply();
                    });
                } else {
                    if($stateParams.phrase === 'lastweek') {
                        entityService.getEntitiesByPhrase('today').then(function(data) {
                            vm.slides = [];
                            addItems(data, index);
                            $scope.$apply();
                        });
                    } else {
                        if($stateParams.phrase === 'month') {
                            entityService.getEntitiesByPhrase('today').then(function(data) {
                                vm.slides = [];
                                addItems(data, index);
                                $scope.$apply();
                            });
                        }
                    }
                }
            }
        } else {
            if ($stateParams.query) {
                entityService.getEntitiesByQuery($stateParams.query).then(function(data){
                    var index = 0;
                    vm.slides = [];
                    addItems(data, index);
                    $scope.$apply();
                });
            } else {
                if ($stateParams.datetime) {
                    var to = $stateParams.datetime;
                    var tempTo = new Date(to).getTime();
                    var tempFrom = 90 * 24 * 60 * 60 * 1000;
                    var from = new Date(tempTo - tempFrom);
                    entityService.getEntitiesByDatetime(from.toISOString(), to.toISOString()).then(function(data){
                        var index = 0;
                        vm.slides = [];
                        addItems(data, index);
                        $scope.$apply();
                    });
                } else {
                    entityService.getEntitiesByRange(vm.currentPage - 1, vm.nextPage - 1).then(function (data) {
                        //console.log('data', data);
                        vm.slides = [];

                        var index = 0;

                        addItems(data, index);


                        //console.log(vm.slides);
                        vm.currentPage = vm.currentPage + 2;
                        vm.nextPage = vm.currentPage + 2;

                        $scope.$apply();
                    });
                }
            }
        }

        vm.slidesToScroll = 4;
        vm.slidesToShow = 4;

        vm.extendGallery = function () {
            console.log('extend gallery!');

            entityService.getEntitiesByRange(vm.currentPage - 1, vm.nextPage - 1).then(function (data) {


                vm.newSlides = data;
                var index = vm.slides.length;
                console.log('vm.slides.length', vm.slides.length);
                addItems(data, index);

                vm.currentPage = vm.currentPage + 2;
                vm.nextPage = vm.currentPage + 2;

                console.log(vm.slides);
                $scope.$apply();
            });
        };

        // var originatorEv;
        // vm.openMenu = function($mdOpenMenu, ev) {
        //     originatorEv = ev;
        //     $mdOpenMenu(ev);
        // };
        $scope.myDate = new Date();
        $scope.onlyWeekendsPredicate = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }

    }
}());