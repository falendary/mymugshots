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
        for (var i = 1; i <= 9; i = i + 2) {
            var s = i + 1;
            vm.items.push({
                title1: 'Image title #' + i,
                photo1: 'index/content/img/person' + i + '.jpg',
                date1: i + '/11/2015',
                title2: 'Image title #' + s,
                photo2: 'index/content/img/person' + s + '.jpg',
                date2: s + '/11/2015'
            })
        }
    }

}());