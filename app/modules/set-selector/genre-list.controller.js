'use strict';

require('./set-selector.module.js')
    .controller('GenreListController', GenreListController);

// @ngInject
function GenreListController($state, GenreFactory) {
    var vm = this;
    vm.genres = GenreFactory.list();
    vm.go = go;

    function go(genre) {
        $state.go('GenreDetail', {
            genreId: genre.genreId
        });
    }
}
