/**
 * Created by sergey on 17.11.15.
 */

(function(){

    var entityService = require('../repositories/EntityRepository');

    var getEntitiesByRange = function(min, max) {
        return entityService.getEntitiesByRange(min, max);
    };

    var getEntitiesByRangeDev = function(min, max) {
        return entityService.getEntitiesByRangeDev(min, max);
    };

    module.exports = {
        getEntitiesByRange: getEntitiesByRange,
        getEntitiesByRangeDev: getEntitiesByRangeDev
    }

}());