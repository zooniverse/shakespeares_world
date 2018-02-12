'use strict';

require('./zooapi.module.js')
    .factory('zooAPI', zooAPI);

var ApiClient = require('panoptes-client/lib/api-client');
var OAuth = require('panoptes-client/lib/oauth')
// @ngInject
function zooAPI($rootScope, zooAPIConfig) {
    ApiClient.beforeEveryRequest = function() {
        return OAuth.checkBearerToken()
            .then(function (token) {
                console.log('Token refreshed: ', token);
            })
            .catch(function (error) {
                console.log('Failed to refresh token: ', error);
                alert('Your session has finished. Please save your work and login again.')
                $rootScope.$broadcast('auth:loginChange');
                OAuth.signOut();
            })
    }
    // There's only a version of this project on production, so rather than
    // defer to the client we manually override the API root.
    // Panoptes.apiClient.root = 'https://www.zooniverse.org/api';

    return ApiClient;

}
