'use strict';

var _ = require('lodash');

require('./transcribe.module.js')
    .factory('PreferencesFactory', PreferencesFactory);

// @ngInject
function PreferencesFactory($q, appConfig, SubjectsFactory, zooAPI, zooAPIProject, zooAPIPreferences) {

    var factory;

    factory = {

        submitPreferences: submitToApi
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
        return zooAPIProject.get()
            .then(function (project) {
                classification.links.project = project.id;
                classification.links.workflow = project.links.workflows[0];
                return zooAPI.type('workflows').get(classification.links.workflow);
            })
            .then(function (workflow) {
                classification.metadata.workflow_version = workflow.version;
                return classification;
            });
    }

    function submitToApi() {
        // get preference object, update and save
        var preference = zooAPIPreferences.get();
        preference.update = _updatePreference();
        return preference.save();
    }
}
