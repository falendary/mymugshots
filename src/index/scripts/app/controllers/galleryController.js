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

        entityService.getEntitiesByRangeDev(0, 2).then(function (data) {
            console.log('data', data);
            vm.slides = [];

            var index = 0;
            while (data.length) {
                vm.slides[index] = {};
                vm.slides[index].items = data.splice(0, 2);
                index = index + 1;
            }

            console.log(vm.slides);

            $scope.$apply();
        });

        vm.slidesToScroll = 4;
        vm.slidesToShow = 4;

        // var originatorEv;
        // vm.openMenu = function($mdOpenMenu, ev) {
        //     originatorEv = ev;
        //     $mdOpenMenu(ev);
        // };
        $scope.myDate = new Date();
        $scope.onlyWeekendsPredicate = function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }

    }
}());