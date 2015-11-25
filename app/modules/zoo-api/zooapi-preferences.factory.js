'use strict';

require('./zooapi.module.js')
    .factory('zooAPIPreferences', zooAPIPreferences);

// @ngInject
function zooAPIPreferences($q, localStorageService, zooAPIConfig, zooAPI) {

    var factory;
    var _data;

    factory = {
        get: get
    };

    return factory;

    function _getPreferences() {
        var user = localStorageService.get('user');
        return zooAPI.type('project_preferences').get({
                'project_id': zooAPIConfig.project_id,
                'user_id': user.id
            })
            .then(function (response) {
                var _preferences = response[0].preferences
                console.log('PREFERENCES', _preferences)
                _data = _preferences;
                return _preferences;
            });
    }

    function get() {
        return (_data) ? $q.when(_data) : _getPreferences();
    }
}
