'use strict';

require('./favorites.module.js')
    .factory('FavoritesFactory', FavoritesFactory);

// @ngInject
function FavoritesFactory($q, localStorageService, SubjectsFactory, zooAPI, zooAPIConfig) {

    var factory;
    var favorited = false;
    var projectID = zooAPIConfig.project_id;
    var subjectID = SubjectsFactory.current.data.id;

    factory = {
        toggleFavs: toggleFavorites
    };

    return factory;

    function _createFavorites() {
        console.log('_createFavorites');
        var display_name = 'Favorites ShaxWorld',
            subjects = [subjectID],
            favorite = true,
            links = {
                subjects
            },
            collection = {
                favorite, display_name, links
            };
        zooAPI.type('collections').create(collection).save()
            .then(function (collection) {
                favorited = true;
                console.log('_createFavorites: COLLECTION', collection);
            })
    }

    function _getSubjectInCollection(favorites) {
        console.log('_getSubjectInCollection:');
        if (favorites) {
            console.log(favorites);
            console.log(subjectID);
            //favorites.get('subjects', subjectID)
            zooAPI.type('subjects').get(subjectID)
                .then(function (subject) {
                    console.log('_getSubjectInCollection: SUBJECT', subject);
                    subject ? favorited = true : null;
                });
        }
    }

    function getFavorites() {
        console.log('getFavorites');
        var user = localStorageService.get('user');
        return zooAPI.type('collections').get({
                'project_id': projectID,
                'favorite': true,
                'owner': user.id
            })
            .then(function (favorites) {
                var _favs = favorites ? favorites : null;
                console.log('FAVS: ', _favs);
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
