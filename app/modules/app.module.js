'use strict';

var angular = require('angular');
var bulk = require('bulk-require');
var oauth = require('panoptes-client').oauth;

// Angular modules
var appConfig = require('./app.config.js');
require('angular-bootstrap-npm');
require('angular-hotkeys');
require('angular-local-storage');
require('angular-sanitize');
require('angular-ui-router');

// App modules
bulk(__dirname, ['./**/!(app.module).js']);

// Create and bootstrap application
angular.element(document).ready(function () {
    oauth.init(appConfig.constants.app_id)
        .then(startApp, function (error) { console.error('Error starting the app', error)});
});

function startApp() {
    console.log('starting')
    var requires = [
        // Angular modules
        'ui.router',
        'ui.bootstrap',
        'LocalStorageModule',
        'cfp.hotkeys',
        // App modules
        'app.core',
        'app.guide',
        'app.home',
        'app.static',
        'app.404',
        'app.layout',
        'app.transcribe',
        'app.zooapi'
    ];

    // Mount on window for testing
    window.app = angular
        .module('app', requires)
        .constant('appConfig', appConfig.constants)
        .config(appConfig.localStorage);

    angular.bootstrap(document, ['app'], {
        strictDi: true
    });

}
