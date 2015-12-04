'use strict';

require('./favorites.module.js')
    .controller('FavoritesController', FavoritesController);

// @ngInject
function FavoritesController(FavoritesFactory) {
    var vm = this;
    vm.favorites = getFavSubjects();

    function getFavSubjects() {
        console.log('CONTROLLER: getFavSubjects')
        return FavoritesFactory.list()
            .then(function (collection) {
                var favSubjects = collection[0].links.subjects;
                console.log('FavoritesController: ', favSubjects);
                return favSubjects;
            })
    }


}
