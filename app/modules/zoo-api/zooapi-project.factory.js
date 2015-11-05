'use strict';

require('./zooapi.module.js')
    .factory('zooAPIProject', zooAPIProject);

// @ngInject
function zooAPIProject($q, localStorageService, zooAPIConfig, zooAPI) {

    var factory;
    var _data;

    factory = {
        get: get
    };

    return factory;

    function _getFromPanoptes() {
        return zooAPI.type('projects').get(zooAPIConfig.project_id)
            .then(function (response) {
                _data = response;
                return response;
            });
    }

    function get() {
        return (_data) ? $q.when(_data) : _getFromPanoptes();
    }
}
