'use strict';

var annotationsConfig = require('./annotations.config.js');

module.exports = require('angular')
    .module('app.transcribe.annotations', [])
    .constant('annotationsConfig', annotationsConfig.constants);
