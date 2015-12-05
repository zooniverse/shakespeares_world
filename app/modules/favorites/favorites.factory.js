'use strict';

var _ = require('lodash');

require('./favorites.module.js')
    .factory('FavoritesFactory', FavoritesFactory);

// @ngInject
function FavoritesFactory($q, authFactory, SubjectsFactory, zooAPI, zooAPIConfig) {

    var factory,
        favorited,
        projectID = zooAPIConfig.project_id,
        subjectID = SubjectsFactory.current.data.id,
        user = authFactory.getUser();

    factory = {
        list: list,
        remove: remove,
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

    function add(subject) {
        console.log('ADD', subject);
        list().then(function (collection) {
            collection.addLink('subjects', [subject]);
            console.log('ADD:collection: ', collection);
            favorited = true;
        });
    }

    function remove(subject) {
        console.log('REMOVE', subject);
        list().then(function (collection) {
            collection.removeLink('subjects', [subject]);
            console.log('REMOVE:collection: ', collection);
            favorited = false;
        });
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
                        remove(subjectID);
                    } else {
                        add(subjectID);
                        //                        console.log('ADD', subjectID);
                        //                        favorites[0].addLink('subjects', [subjectID]);
                        //                        favorited = true;
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
                return collection[0];
            })
    }

}
