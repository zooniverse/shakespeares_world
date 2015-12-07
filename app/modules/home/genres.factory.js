'use strict';

var _ = require('lodash');

require('./home.module.js')
    .factory('GenresFactory', GenresFactory);

// @ngInject
function GenresFactory($q, zooAPIConfig, zooAPI) {

    var factory;
    var _genres;

    factory = {
        getData: getData,
        list: list
    };

    return factory;

    function getData() {
        return zooAPI.type('subject_sets').get({
            'workflow_id': zooAPIConfig.workflow_id,
            // 'metadata.genreId': genre.genreId,
            // 'page_size': 150
        }).then(function (sets) {
            console.log('sets', sets)
            _genres = sets;
            return _genres;
        }, function (response) {
            console.error('Error getting genres', response);
        });
    }

    function list(genre) {
        return _genres;
    }

}
