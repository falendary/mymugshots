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

            if (getCookie('recentlyItems')) {
                vm.recentlyItems = JSON.parse(getCookie('recentlyItems'));
                console.log('vm.recentlyItems', vm.recentlyItems);
                for (var i = 0; i < vm.recentlyItems.length; i = i + 1) {
                    vm.recentlyItems[i].booking_datetime = new Date(vm.recentlyItems[i].booking_datetime);
                }
                $scope.$apply();

                if (!containsObject(vm.entity, vm.recentlyItems)) {
                    if (vm.recentlyItems.length === 6) {
                        vm.recentlyItems.splice(5, 1);
                    }
                    vm.recentlyItems.unshift(vm.entity);
                }
                setCookie('recentlyItems', JSON.stringify(vm.recentlyItems), 30);
            } else {
                setCookie('recentlyItems', JSON.stringify([{booking_datetime: vm.entity.booking_datetime,
                    first_name: vm.entity.first_name,
                    booking_id: vm.entity.booking_id,
                    image_url: vm.entity.image_url
                }]), 30);
            }

        });

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
        }

        function deleteAllCookies() {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }

        function containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i].booking_id === obj.booking_id) {
                    return true;
                }
            }

            return false;
        }

    }

}());