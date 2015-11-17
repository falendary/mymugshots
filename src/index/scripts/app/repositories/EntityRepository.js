/**
 * Created by sergey on 17.11.15.
 *
 */

(function(){

    var remotehost = '';
    var baseUrl = '';

    var getEntitiesByRange = function(min, max) {
        return fetch().then(function(data){
            return data.json();
        })
    };

    var getEntitiesByRangeDev = function(min, max) {
        return fetch(min + '-' + max + '.json').then(function(data){
            return data.json();
        })
    };


    module.exports = {
        getEntitiesByRange: getEntitiesByRange,
        getEntitiesByRangeDev: getEntitiesByRangeDev
    }

}());