'use strict';

require('./zooapi.module.js')
    .factory('zooAPI', zooAPI);

var Panoptes = require('panoptes-client');

// @ngInject
function zooAPI(zooAPIConfig) {

    var _client;

    _client = new Panoptes({
        appID: zooAPIConfig.app_id,
        //https://github.com/zooniverse/Panoptes-Front-End/blob/master/app/api/config.coffee#L4
        host: 'https://panoptes.zooniverse.org'
    });

    return _client.api;

}
