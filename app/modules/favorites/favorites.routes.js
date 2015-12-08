'use strict';

require('./favorites.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('Favorites', {
            parent: 'Base',
            url: '/favorites',
            views: {
                'main': {
                    templateUrl: 'favorites/favorites.html',
                    controller: 'FavoritesController as vm'
                }
            },
            params: {
                hideHook: true
            }
        });

}
