'use strict';

require('./set-selector.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {
    $stateProvider
        .state('GenreList', {
            parent: 'Base',
            title: 'Choose an genre',
            url: '/genres',
            views: {
                'lower-header': {
                    controller: 'GenreListController as vm',
                    templateUrl: 'set-selector/genre-search.html'
                },
                'main': {
                    controller: 'GenreListController as vm',
                    templateUrl: 'set-selector/genre-list.html'
                }
            },
            params: {
                overlap: true
            }
        })
        .state('GenreDetail', {
            parent: 'Base',
            title: 'About the genre',
            url: '/genres/:genreId',
            views: {
                'main': {
                    controller: 'GenreDetailController as vm',
                    templateUrl: 'set-selector/genre-detail.html'
                }
            }
        });
}
