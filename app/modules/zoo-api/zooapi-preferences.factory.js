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
        console.log('User', user.id);
        console.log('Preferences: ', zooAPI.type('project_preferences').get({
            'project_id': zooAPIConfig.project_id,
            'user_id': user.id
        }))
        return zooAPI.type('projects_preferences').get({
                'project_id': zooAPIConfig.project_id,
                'user_id': user.id
            })
            .then(function (response) {
                console.log('Preferences: ', response)
                _data = response;
                return response;
            });
    }

    function get() {
        return (_data) ? $q.when(_data) : _getPreferences();
    }
}
