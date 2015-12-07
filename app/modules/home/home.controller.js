'use strict';

require('./home.module.js')
    .controller('HomeController', HomeController);

// @ngInject
function HomeController($scope, GenresFactory) {
    var vm = this;

    GenresFactory.getData()
        .then(function () {
            $scope.$apply(function () {
                vm.genres = GenresFactory.list();
            });
        });

}
