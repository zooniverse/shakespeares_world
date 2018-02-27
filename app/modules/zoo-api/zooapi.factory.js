'use strict';

require('./zooapi.module.js')
    .factory('zooAPI', zooAPI);

var ApiClient = require('panoptes-client/lib/api-client');
var oauth = require('panoptes-client/lib/oauth')
// @ngInject
function zooAPI(AnnotationsFactory, $location) {
    ApiClient.beforeEveryRequest = function() {
        return oauth.checkBearerToken()
            .then(function (token) {
                console.log('Token refreshed: ', token);
            })
            .catch(function (error) {
                console.log('Failed to refresh token: ', error);
                AnnotationsFactory.updateCache();
                oauth.signIn($location.absUrl());
            })
    }
    // There's only a version of this project on production, so rather than
    // defer to the client we manually override the API root.
    // Panoptes.apiClient.root = 'https://www.zooniverse.org/api';

    return ApiClient;

}
