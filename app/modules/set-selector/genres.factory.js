'use strict';

var _ = require('lodash');

require('./set-selector.module.js')
    .factory('GenresFactory', GenresFactory);

// @ngInject
function GenresFactory($q, GenreListConstants, localStorageService, zooAPIConfig, zooAPI) {

    if (localStorageService.get('genreSets') === null) {
        localStorageService.set('genreSets', {});
    }

    var factory;
    var _genres = _.filter(GenreListConstants, {
        active: true
    });
    var _genreSets = localStorageService.get('genreSets');

    factory = {
        detail: detail,
        list: list
    };

    return factory;

    function _getSets(genre) {
        return zooAPI.type('subject_sets').get({
            'workflow_id': zooAPIConfig.workflow_id,
            'metadata.genreId': genre.genreId,
            'page_size': 150
        }).then(function (sets) {
            genre.sets = sets;
            _genreSets[genre.genreId] = sets;
            localStorageService.set('genreSets', _genreSets);
            return genre;
        }, function (response) {
            console.error('Error getting sets', response);
            return genre;
        });
    }

    function detail(genreId) {
        var genre = _.find(_genres, {
            genreId: genreId
        });
        if (_genreSets[genreId]) {
            genre.sets = _genreSets[genreId];
            _getSets(genre);
            return $q.when(genre);
        } else {
            return _getSets(genre);
        }
    }

    function list(listLength) {
        return (listLength) ? _.sample(_genres, listLength) : _genres;
    }

}
