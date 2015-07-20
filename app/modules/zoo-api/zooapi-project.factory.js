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
        var cache = localStorageService.get('project');
        if (cache) {
            return $q.when(cache);
        } else {
            return zooAPI.type('projects').get({
                    slug: zooAPIConfig.slug
                })
                .then(function (response) {
                    localStorageService.set('project', response[0]);
                    return response[0];
                });
        }
    }
}
