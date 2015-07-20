'use strict';

var appInfo = require('../../package.json');

var appConfig = {
    appTitle: 'Shakespeare\'s World',
    appDescription: 'Quisque laoreet, lectus et consectetur molestie, felis mi dignissim magna, at condimentum ipsum nisl id quam. Ut laoreet, ipsum mattis blandit feugiat, leo est sagittis dolor, ac luctus est leo id ex.'
};

// @ngInject
function routes($locationProvider) {
    $locationProvider.html5Mode(false);
}

// @ngInject
function localStorage(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix(appConfig.appTitle + '-' + appInfo.version);
}

module.exports = {
    constants: appConfig,
    routes: routes,
    localStorage: localStorage
};
