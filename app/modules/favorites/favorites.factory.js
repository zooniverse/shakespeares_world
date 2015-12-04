'use strict';

var _ = require('lodash');

require('./favorites.module.js')
    .factory('FavoritesFactory', FavoritesFactory);

// @ngInject
function FavoritesFactory($q, localStorageService, SubjectsFactory, zooAPI, zooAPIConfig) {

    var factory,
        favorited,
        projectID = zooAPIConfig.project_id,
        subjectID = localStorageService.get('subjects').current.id,
        user = localStorageService.get('user');

    factory = {
        list: list,
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
                favorited = true;
                console.log('_createFavoriteCollection', collection);
            })
    }

    function _isSubjectInCollection(favorites) {
        var favSubjects = favorites[0].links.subjects;
        console.log('_isSubjectInCollection: FAVSUBJECTS: ', favorites[0].links.subjects);
        if (favSubjects.length > 0) {
            _.some(favSubjects, function (id) {
                return favorited = id === subjectID;
            });
            console.log('_isSubjectInCollection:FAVORITED', favorited);
            return favorited;
        }
    }

    function toggleFavorites() {
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
                    _isSubjectInCollection(_favs);
                    if (favorited) {
                        console.log('REMOVE', subjectID);
                        favorites[0].removeLink('subjects', [subjectID]);
                        favorited = false;
                    } else {
                        console.log('ADD', subjectID);
                        favorites[0].addLink('subjects', [subjectID]);
                        favorited = true;
                    }
                }
                console.log('getFavorites:FAVORITED: ', favorited);
                return favorited;
            });
    }

    function list() {
        return zooAPI.type('collections').get({
                'project_id': projectID,
                'favorite': true,
                'owner': user.login
            })
            .then(function (collection) {
                var favSubjects = collection[0].links.subjects;
                console.log('FAVFACTORY:Collection: ', favSubjects);
                return favSubjects;
            })
    }

}
