'use strict';

require('./set-selector.module.js')
    .controller('GenreDetailController', GenreDetailController);

// @ngInject
function GenreDetailController($scope, $state, $stateParams, GenresFactory) {
    var vm = this;
    vm.go = go;
    vm.loading = true;

    GenresFactory.detail($stateParams.genreId)
        .then(function (genre) {
            vm.genre = genre;
            vm.moreGenres = GenresFactory.list(3);
            vm.loading = false;
            // TODO: fix this ugly business
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        });

    function go(genre) {
        $state.go('GenreDetail', {
            genreId: genre.genreId
        });
    }
}
