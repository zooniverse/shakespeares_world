'use strict';

var appInfo = require('../../package.json');

var appConfig = {
    appTitle: 'Shakespeare\'s World',
    appDescription: 'Nam nisl tellus, ultrices a mattis sit amet, ullamcorper ut mi. Morbi eu ligula feugiat, tempus purus sed, consectetur augue. Duis ipsum nibh, interdum at ultricies sit amet, congue accumsan arcu. Nulla quis risus massa. Suspendisse tempus augue velit, in varius lacus vulputate id. Quisque laoreet, lectus et consectetur molestie, felis mi dignissim magna, at condimentum ipsum nisl id quam. Ut laoreet, ipsum mattis blandit feugiat, leo est sagittis dolor, ac luctus est leo id ex.'
};

// @ngInject
function routes($locationProvider) {
    $locationProvider.html5Mode(true);
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
