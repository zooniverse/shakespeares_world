'use strict';

require('./zooapi.module.js')
    .factory('zooAPIProject', zooAPIProject);

// @ngInject
function zooAPIProject($q, localStorageService, zooAPIConfig, zooAPI) {

    var factory;

    factory = {
        get: get
    };

    return factory;

    function get() {
        return zooAPI.type('projects').get(zooAPIConfig.project_id)
            .then(function (response) {
                return response;
            });
    }
}
