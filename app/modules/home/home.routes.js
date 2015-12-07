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
                    controller: 'HomeController as vm',
                    templateUrl: 'home/home.html'
                }
            }
        });
}
