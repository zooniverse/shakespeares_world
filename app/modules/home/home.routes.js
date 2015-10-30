'use strict';

require('./home.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {

    $stateProvider
        .state('Home', {
            parent: 'Base',
            url: '/',
            title: 'Home',
            views: {
                'main': {
                    controller: 'GenreListController as vm',
                    templateUrl: 'home/home.html'
                }
            }
        })
        .state('GenreDetail', {
            parent: 'Base',
            title: 'About the genre',
            url: '/:genreId',
            views: {
                'main': {
                    controller: 'GenreDetailController as vm',
                    templateUrl: 'home/genre-detail.html'
                }
            }
        });
}
