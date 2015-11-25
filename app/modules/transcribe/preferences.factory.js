'use strict';

var _ = require('lodash');

require('./transcribe.module.js')
    .factory('PreferencesFactory', PreferencesFactory);

// @ngInject
function PreferencesFactory($q, appConfig, localStorageService, SubjectsFactory, zooAPI, zooAPIProject, zooAPIConfig, zooAPIPreferences) {

    var factory;
    var _snippets;

    _snippets = localStorageService.get('snippets');

    factory = {

        savePreferences: _updatePreference
    };

    return factory;

    function _updatePreference(snippets) {
        var _snippets = snippets;
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
                            'cribsheet': _snippets
                        }
                    });
                    _preferences.save();
                } else {
                    console.log('NOT-EMPTY')
                    _preferences.update({
                        'preferences': {
                            'cribsheet': _snippets
                        }
                    });
                    _preferences.save();
                }
                //updateCache();
            });
    }

    //   var set;
    //zooAPI.type('subject_sets').get('id').then(function (r) {set = r; });
    //set.update({ metadata: { genre: 'whatever'} });
    //set.save();

    function updateCache() {
        var snippets = _.reject(_snippets, {
            complete: false
        });
        localStorageService.set('snippets', snippets);
        console.log('SNIPPETS', snippets);
    }
}
