'use strict';

require('./favorites.module.js')
    .directive('favoriteSubject', favoriteSubject);

// @ngInject
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

    function favoriteSubjectLink(scope, element) {
        console.log('favoriteSubjectLink: ', scope.data)
    }
}

// @ngInject
function FavoriteSubjectController(FavoritesFactory) {
    var vm = this;
    //I know scope isnot defined... How do I get the data from the controller?
    vm.data = scope.data;
    vm.delete = FavoritesFactory.remove();
    vm.src = scope.data.locations[0]['image/jpeg'];
    vm.title = scope.data.metadata.title
    console.log('FavoriteSubjectController: ', vm.data)
}
