'use strict';

var overlayConfig = require('./overlay.config.js')

// A module for context menus, editing windows etc
module.exports = require('angular')
    .module('app.transcribe.overlay', [])
    .constant('overlayConfig', overlayConfig.constants);
