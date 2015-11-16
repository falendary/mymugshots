/**
 * Created by sergey on 15.11.15.
 *
 */

(function(){

    'use strict';

    module.exports = function($scope) {

        console.log('Catalog controller started');

        var vm = this;

        vm.items = [];
        for (var i = 1; i <= 8; i = i + 1) {
            vm.items.push({
                title: 'Image title #' + i,
                photo: 'index/content/img/person' + i + '.jpg',
                date: i + '/11/2015'
            })
        }
    }

}());