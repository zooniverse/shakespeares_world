'use strict';

var _ = require('lodash');

require('./transcribe.module.js')
    .factory('PreferencesFactory', PreferencesFactory);

// @ngInject
function PreferencesFactory($q, AnnotationsFactory, appConfig, SubjectsFactory, zooAPI, zooAPIProject, zooAPIPreferences) {

    var factory;

    factory = {

    };

    return factory;

    function _updatePreference() {
        var preference = {
            metadata: {
                user_agent: appConfig.appTitle,
                user_language: 'en_GB'
            },
            links: {
                subjects: [SubjectsFactory.current.data.id]
            },
            snippets: []
        };
        return zooAPIPreferences.get();
    }

    function _submitToApi() {
        // get preference object, update and save
        var preference = zooAPIPreferences.get();
        preference.update = _updatePreference();
        return preference.save();
    }
}
