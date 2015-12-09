'use strict';

var _ = require('lodash');

require('./transcribe.module.js')
    .factory('PreferencesFactory', PreferencesFactory);

// @ngInject
function PreferencesFactory($q, appConfig, CribsheetFactory, localStorageService, SubjectsFactory, zooAPI, zooAPIProject, zooAPIConfig, zooAPIPreferences) {

    var factory;
    var _snippets;

    _snippets = localStorageService.get('snippets');

    factory = {

        savePreferences: _updatePreference
    };

    return factory;

    function _updatePreference(snippet) {
        var _newSnippet = snippet;
        var _preferences = {};
        var user = localStorageService.get('user');
        return zooAPI.type('project_preferences').get({
                'project_id': zooAPIConfig.project_id,
                'user_id': user.id
            })
            .then(function (projectPrefs) {
                _preferences = projectPrefs[0];
                console.log('LENGTH', Object.keys(_preferences.preferences).length)
                if (Object.keys(_preferences.preferences).length == 0) {
                    console.log('EMPTY')
                    _preferences.update({
                        'preferences': {
                            'cribsheet': _newSnippet
                        }
                    });
                    _preferences.save();
                    console.log('Preference', _preferences)
                } else {
                    var allSnippets = _snippets.concat([_newSnippet]);
                    console.log('NOT-EMPTY')
                    console.log('ALL SNIPPETS', allSnippets)
                    _preferences.update({
                        'preferences': {
                            'cribsheet': allSnippets
                        }
                    });
                    _preferences.save();
                    console.log('Preference', _preferences)
                }
            });

    }

    function deleteSnippet(snippet) {
        CribsheetFactory.destroy(snippet);


    }

}
