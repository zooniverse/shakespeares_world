'use strict';

require('./favourites.module.js')
    .factory('FavouritesFactory', FavouritesFactory);

// @ngInject
function FavouritesFactory($q, localStorageService, zooAPI, zooAPIProject) {

    var factory;

    factory = {
    };

    return factory;

}
