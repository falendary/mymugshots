/**
 * Created by sergey on 15.11.15.
 *
 */

(function () {

    'use strict';

    var entityService = require('../services/entityService');

    module.exports = function ($scope) {

        console.log('Catalog controller started');

        var vm = this;

        vm.currentPage = 1;
        vm.nextPage = vm.currentPage + 2;
        vm.slidesLoaded = false;
        vm.newSlides = [];

        entityService.getEntitiesByRange(vm.currentPage - 1, vm.nextPage - 1).then(function (data) {
            console.log('data', data);
            vm.slides = [];

            var index = 0;
            while (data.length) {
                vm.slides[index] = {};
                vm.slides[index].index = index;
                vm.slides[index].items = data.splice(0, 8);
                index = index + 1;
            }

            console.log(vm.slides);
            vm.currentPage = vm.currentPage + 2;
            vm.nextPage = vm.currentPage + 2;

            $scope.$apply();
        });

        vm.slidesToScroll = 4;
        vm.slidesToShow = 4;

        vm.extendGallery = function () {
            console.log('extend gallery!');

            entityService.getEntitiesByRange(vm.currentPage - 1, vm.nextPage - 1).then(function (data) {


                vm.newSlides = data;
                var index = vm.slides.length;
                console.log('vm.slides.length', vm.slides.length);
                while (data.length) {
                    vm.slides[index] = {};
                    vm.slides[index].index = index;
                    vm.slides[index].items = data.splice(0, 8);
                    index = index + 1;
                }

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