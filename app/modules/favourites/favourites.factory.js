'use strict';

require('./favourites.module.js')
    .factory('FavouritesFactory', FavouritesFactory);

// @ngInject
function FavouritesFactory($q, localStorageService, zooAPI, zooAPIProject) {

    var factory;

    factory = {
    };

    _getFavourites()

    return factory;

    function _getFavourites() {
        return zooAPIProject.get()
            .then(function (project) {
                return zooAPI.type('project_preferences').get(project.id);
            })
            .then(function (preferences) {
                console.log(preferences)
            });
    }

    _getFavourites()

}
