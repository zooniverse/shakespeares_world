'use strict';

var _ = require('lodash');

require('./favorites.module.js')
    .factory('FavoritesFactory', FavoritesFactory);

// @ngInject
function FavoritesFactory($q, localStorageService, SubjectsFactory, zooAPI, zooAPIConfig) {

    var factory;
    var favorited;
    var projectID = zooAPIConfig.project_id;
    var subjectID = SubjectsFactory.current.data.id;
    var user = localStorageService.get('user');

    factory = {
        favorited: false,
        toggleFavs: toggleFavorites
    };

    return factory;

    function _createFavoriteCollection() {
        var collection = {
            'favorite': true,
            'display_name': 'Favorites ShaxWorld',
            'links': {
                'subjects': [subjectID],
                'projects': [projectID]
            }
        };
        zooAPI.type('collections').create(collection).save()
            .then(function (collection) {
                factory.favorited = true;
                console.log('_createFavoriteCollection', collection);
            })
    }

    function _getSubjectInCollection(favorites) {
        var favSubjects = favorites[0].links.subjects;
        console.log('_getSubjectInCollection: FAVSUBJECTS: ', favorites[0].links.subjects);
        if (favSubjects.length > 0) {
            _.some(favSubjects, function (id) {
                return factory.favorited = id === subjectID;
            });
            console.log('FAVORITED', factory.favorited);
            return factory.favorited;
        }
    }

    function getFavorites() {
        return zooAPI.type('collections').get({
                'project_id': projectID,
                'favorite': true,
                'owner': user.login
            })
            .then(function (favorites) {
                var _favs = favorites ? favorites : null;
                if (!_favs) {
                    _createFavoriteCollection();
                } else {
                    _getSubjectInCollection(_favs);
                    if (factory.favorited) {
                        console.log('REMOVE', subjectID);
                        favorites[0].removeLink('subjects', [subjectID])
                    } else {
                        console.log('ADD', subjectID);
                        favorites[0].addLink('subjects', [subjectID]);
                    }
                }
            });
    }

    function toggleFavorites() {
        console.log('toggleFavorites');
        getFavorites();
    }

}
