'use strict';

require('./favorites.module.js')
    .controller('FavoritesController', FavoritesController);

// @ngInject
function FavoritesController($q, FavoritesFactory, zooAPI) {
    var vm = this;
    vm.favorites = getFavSubjects();

    function getFavSubjects() {
        console.log('FavoritesController');
        return FavoritesFactory.list()
            .then(function (collection) {
                var favorites = collection.links.subjects;
                var promises = favorites.map(function (id) {
                    return zooAPI.type('subjects').get(id);
                });
                console.log('FavoritesController: PROMISES', promises)
                return $q.all(promises);
            });
    }
}
