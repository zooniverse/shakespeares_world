'use strict';

var appInfo = require('../../package.json');

var appConfig = {
    appTitle: 'Shakespeare\'s World',
    appDescription: 'Transcribe handwritten documents by Shakespeare\'s contemporaries and help us understand his life and times. Along the way you\'ll find words that have yet to be recorded in the authoritative Oxford English Dictionary, and which will eventually be added to this important resource.'
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
