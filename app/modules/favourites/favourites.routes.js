'use strict';

require('./favourites.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('Favourites', {
            parent: 'Base',
            url: '/favourites',
            views: {
                'main': {
                    templateUrl: 'favourites/favourites.html',
                    controller: 'FavouritesController as vm'
                }
            },
            params: {
                hideHook: true
            }
        });

}
