/**
 * Created by sergey on 17.11.15.
 *
 */

(function () {

    var remotehost = 'http://352mugshots.com/';
    var baseUrl = 'api/V1/';

    var getEntitiesByRange = function (min, max) {
        return fetch(remotehost + baseUrl + 'inmates/4/' + min + '-' + max, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        }).then(function (data) {
            return data.json();
        })
    };

    var getEntityById = function (id) {
        return fetch(remotehost + baseUrl + 'inmate/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (data) {
            return data.json();
        })
    };

    var getEntitiesByRangeDev = function (min, max) {
        return fetch(min + '-' + max + '.json').then(function (data) {
            return data.json();
        })
    };


    module.exports = {
        getEntitiesByRange: getEntitiesByRange,
        getEntitiesByRangeDev: getEntitiesByRangeDev
    }

}());