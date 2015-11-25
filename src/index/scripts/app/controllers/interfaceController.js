/**
 * Created by sergey on 21.11.15.
 */

(function(){

    'use strict';

    module.exports = function($scope, $state, $location) {

        var vm = this;

        console.log('Interface controller initialized...');

        vm.searchMate = function(){
            console.log('Searching...');
            $state.go('app.gallery', {query: vm.searchQuery}, {reload: true});
        };

        vm.filterByDate = function() {
            console.log('filterByDate', vm.filterDate);
            $state.go('app.gallery', {datetime: vm.filterDate}, {reload: true});
        };
        vm.itemGoBack = function () {
            $state.go('app.gallery', {reload: true});
        };
        vm.url;
        window.onhashchange = function () {
            vm.url = $location.path().search('/item/');
            $scope.$apply();
        };
        window.onload = function () {
            vm.url = $location.path().search('/item/');
        };
    }
}());