'use strict';

require('./home.module.js')
    .controller('GenreListController', GenreListController);

// @ngInject
function GenreListController($state, GenresFactory) {
    var vm = this;
    vm.genres = GenresFactory.list();
    vm.go = go;

    function go(genre) {
        $state.go('GenreDetail', {
            genreId: genre.genreId
        });
    }
}
