'use strict';

var appInfo = require('../../package.json');

var appConfig = {
    appTitle: 'Shakespeare\'s World',
    appDescription: 'Transcribe handwritten documents by Shakespeare\'s contemporaries and help us understand his life and times. Along the way you\'ll find words that have yet to be recorded in the authoritative Oxford English Dictionary, and which will eventually be added to this important resource.',
    app_id: (function () {
        var APP_IDS = {
            staging: '20e59774007cc12f7c90d720060ba9b838a349198c469c519f0f6798782979e6',
            production: '2abed6ac014d4a8416a1f578de922600451a10c759dfeab6c9f0edbeb91c8f88',
        };
        return APP_IDS[process.env.NODE_ENV] || APP_IDS.staging;
    })(),
    graphqlEndpoint: 'https://caesar.zooniverse.org/graphql',
};

// @ngInject
function localStorage(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix(appConfig.appTitle + '-' + appInfo.version);
}

module.exports = {
    constants: appConfig,
    localStorage: localStorage
};
