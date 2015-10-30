'use strict';

require('./home.module.js')
    .controller('GenreDetailController', GenreDetailController);

// @ngInject
function GenreDetailController($scope, $state, $stateParams, $timeout, GenresFactory) {
    var vm = this;
    vm.go = go;
    vm.loading = true;

    GenresFactory.detail($stateParams.genreId)
        .then(function (genre) {
            $timeout(function () {
                vm.genre = genre;
                vm.moreGenres = GenresFactory.list(3);
                vm.loading = false;
            });
        });

    function go(genre) {
        $state.go('GenreDetail', {
            genreId: genre.genreId
        });
    }
}
