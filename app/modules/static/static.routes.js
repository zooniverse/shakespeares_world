'use strict';

require('./static.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {

    $stateProvider
        .state('About', {
            parent: 'Base',
            url: '/about',
            title: 'About',
            views: {
                'main': {
                    templateUrl: 'static/about.html'
                }
            }
        })
        .state('Team', {
            parent: 'Base',
            url: '/team',
            title: 'The Team',
            views: {
                'main': {
                    templateUrl: 'static/team.html'
                }
            }
        });

}
