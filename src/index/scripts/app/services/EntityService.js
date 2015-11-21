/**
 * Created by sergey on 17.11.15.
 */

(function(){

    var entityRepository = require('../repositories/EntityRepository');

    var getEntitiesByRange = function(min, max) {
        return entityRepository.getEntitiesByRange(min, max);
    };

    var getEntitiesByRangeDev = function(min, max) {
        return entityRepository.getEntitiesByRangeDev(min, max);
    };

    var getEntityById = function(id) {
        return entityRepository.getEntityById(id);
    };

    var getEntitiesByPhrase = function(phrase) {
        return entityRepository.getEntitiesByPhrase(phrase);
    };

    var getEntitiesByQuery = function(query) {
        return entityRepository.getEntitiesByQuery(query);
    };

    var getEntitiesByDatetime = function(from, to) {
        return entityRepository.getEntitiesByDatetime(from, to);
    };

    module.exports = {
        getEntitiesByRange: getEntitiesByRange,
        getEntitiesByRangeDev: getEntitiesByRangeDev,
        getEntityById: getEntityById,
        getEntitiesByPhrase: getEntitiesByPhrase,
        getEntitiesByQuery: getEntitiesByQuery,
        getEntitiesByDatetime: getEntitiesByDatetime
    }

}());