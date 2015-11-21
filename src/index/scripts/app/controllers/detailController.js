/**
 * Created by sergey on 15.11.15.
 *
 */


(function(){

    'use strict';

    var entityService = require('../services/entityService');

    module.exports = function($scope, $stateParams) {

        console.log('Detail controller started');

        var vm = this;

        vm.entityId = $stateParams.id;


        entityService.getEntityById(vm.entityId).then(function(data){

            vm.entity = data;

            console.log('vm.entity', vm.entity);
            vm.entity.booking_datetime = new Date(vm.entity.booking_datetime).getTime();

            $scope.$apply();

        });
    }

}());