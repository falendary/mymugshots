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
                if (document.body.clientWidth > 1024) {
                    console.log('desktop');
                    console.log('vm.slides[index - 1]', vm.slides[index - 1]);
                    console.log('vm.slides', vm.slides);
                    if(vm.slides[index - 1] && vm.slides[index - 1].items.length < 8) {
                        var itemsToFill = 8 - vm.slides[index - 1].items.length;
                        vm.slides[index - 1].items.concat(data.splice(0, itemsToFill));
                    } else {
                        vm.slides[index].items = data.splice(0, 8);
                    }
                    console.log(vm.slides[index].items);
                } else {
                    if (document.body.clientWidth > 800) {
                        console.log('pad');
                        vm.slides[index].items = data.splice(0, 6);
                    } else {
                        console.log('mobile');
                        vm.slides[index].items = data.splice(0, 4);
                    }
                }
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
                        entityService.getEntitiesByPhrase('lastweek').then(function(data) {
                            vm.slides = [];
                            addItems(data, index);
                            $scope.$apply();
                        });
                    } else {
                        if($stateParams.phrase === 'month') {
                            entityService.getEntitiesByPhrase('month').then(function(data) {
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

            entityService.getEntitiesByRange(vm.currentPage, vm.nextPage).then(function (data) {


                vm.newSlides = data;
                var index = vm.slides.length - 1;
                console.log('vm.slides.length', vm.slides.length);
                addItems(data, index);

                vm.currentPage = vm.currentPage + 2;
                vm.nextPage = vm.currentPage + 2;

                console.log(vm.slides);
                $scope.$apply();
            });
        };

        $scope.onlyWeekendsPredicate = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }

    }
}());