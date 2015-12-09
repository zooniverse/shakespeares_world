'use strict';

module.exports = require('angular')
    .module('app.auth', [
        'app.zooapi',
        'app.transcribe.cribsheet'
    ]);
