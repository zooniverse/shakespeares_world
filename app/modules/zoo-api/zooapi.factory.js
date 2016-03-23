'use strict';

require('./zooapi.module.js')
    .factory('zooAPI', zooAPI);

var Panoptes = require('panoptes-client');

// @ngInject
function zooAPI(zooAPIConfig) {

    // There's only a version of this project on production, so rather than
    // defer to the client we manually override the API root.
    Panoptes.apiClient.root = 'https://www.zooniverse.org/api';

    return Panoptes.apiClient;

}
