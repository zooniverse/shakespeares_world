'use strict';

require('./home.module.js')
    .factory('GenresFactory', GenresFactory);

// @ngInject
function GenresFactory($q, zooAPIConfig, zooAPI) {

    var factory;
    var _genres = [];

    factory = {
        getData: getData,
        list: list
    };

    return factory;

    function getData() {
        return zooAPI.type('subject_sets').get({
            workflow_id: zooAPIConfig.workflow_id,
        }).then(function (sets) {
            _genres = sets;
            return _genres;
        }, function (response) {
            console.error('Error getting genres', response);
        });
    }

    function list() {
        return _genres;
    }

}
