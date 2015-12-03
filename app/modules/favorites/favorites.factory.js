'use strict';

require('./favorites.module.js')
    .factory('FavoritesFactory', FavoritesFactory);

// @ngInject
function FavoritesFactory($q, localStorageService, SubjectsFactory, zooAPI, zooAPIConfig) {

    var factory;
    var favorited = false;
    var projectID = zooAPIConfig.project_id;
    var subjectID = SubjectsFactory.current.data.id;
    var user = localStorageService.get('user');

    factory = {
        toggleFavs: toggleFavorites
    };

    return factory;

    function _createFavorites() {
        console.log('_createFavorites');
        var collection = {
            'favorite': true,
            'display_name': 'Favorites ShaxWorld',
            'links': {
                'subjects': [subjectID],
                'project': projectID
            }
        };
        zooAPI.type('collections').create(collection).save()
            .then(function (collection) {
                favorited = true;
                console.log('_createFavorites: COLLECTION', collection);
            })
        console.log('SAVED');
    }

    function _getSubjectInCollection(favorites) {
        console.log('_getSubjectInCollection');
        if (favorites) {
            zooAPI.type('subjects').get(subjectID)
                .then(function (subject) {
                    console.log('_getSubjectInCollection: SUBJECT', subject.id);
                    subject.id ? favorited = true : null;
                });
        }
    }

    function getFavorites() {
        console.log('getFavorites');
        return zooAPI.type('collections').get({
                'project_id': projectID,
                'favorite': true,
                'owner': user.login
            })
            .then(function (favorites) {
                var _favs = favorites ? favorites : null;
                console.log('getFavorites: FAVS: ', _favs);
                return _getSubjectInCollection(_favs);
            });

    }

    function removeSubject() {
        console.log('removeSubject');
        getFavorites().then(function (favorites) {
            favorites.removeLink('subjects', [subjectID.toString()])
                .then(function (response) {
                    console.log('removeSubject: RESPONSE', response);
                    favorited = false;
                });
        });
    }

    function addSubject() {
        console.log('addSubject');
        getFavorites().then(function (favorites) {
            favorites.addLink('subjects', [subjectID.toString()])
                .then(function (response) {
                    console.log('addSubject: RESPONSE', response);
                    favorited = true;
                })
        });
    }

    function toggleFavorites() {
        console.log('toggleFavorites');
        getFavorites()
            .then(function (favorites) {
                console.log('toggleFavorites: FAVORITES:', favorites)
                if (!favorites) {
                    _createFavorites();
                } else if (favorited) {
                    removeSubject();
                } else {
                    addSubject();
                }
            });
    }

}
