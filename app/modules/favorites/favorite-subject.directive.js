'use strict';

require('./favorites.module.js')
    .directive('favoriteSubject', favoriteSubject);

function favoriteSubject() {
    var directive = {
        link: favoriteSubjectLink,
        controllerAs: 'vm',
        controller: FavoriteSubjectController,
        replace: true,
        scope: {
            data: '='
        },
        templateUrl: 'favorites.html'
    };
    return directive;

    function favoriteSubjectLink(scope, element, attrs) {
        console.log('favoriteSubjectLin: ', scope.data)
    }
}

// @ngInject
function FavoriteSubjectController(FavoritesFactory) {
    var vm = this;
    vm.data = scope.data;
    vm.delete = FavoritesFactory.remove();
    console.log('favoriteDIR-CONTROLLER: ', vm.data)
}
