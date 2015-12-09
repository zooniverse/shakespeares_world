'use strict';

var _ = require('lodash');

require('./cribsheet.module.js')
    .factory('CribsheetFactory', CribsheetFactory);

// @ngInject
function CribsheetFactory(localStorageService, SubjectsFactory, zooAPI, $q, zooAPIConfig) {

    var factory;
    var _preferences;
    var _snippets = [];

    factory = {
        $getData: getData,
        addUrl: addCropUrl,
        destroy: destroy,
        list: list,
        reset: reset,
        upsert: upsert,
        updateCache: updateCache
    };

    return factory;

    // TODO: fix so that it only removes a point if it's passed an annotation;
    // a blank / undefined object will wipe everything lololol
    function destroy(snippet) {
        _snippets = _.without(_snippets, snippet);
        updateCache();
        return _snippets;
    }

    function list() {
        return _snippets;
    }

    function reset() {
        _preferences = undefined;
        _snippets = [];
    }

    function getData(user) {
        return zooAPI.type('project_preferences').get({
            project_id: zooAPIConfig.project_id,
            user_id: user.id
        })
        .then(function (preferences) {
            if (preferences.length > 0) {
                return preferences;
            } else {
                var newPrefs = zooAPI.type('project_preferences').create({
                    project: zooAPIConfig.project_id
                });
                return newPrefs.save()
            }
        })
        .then(_setPreferences)
        .then(function () {
            _snippets = _preferences.preferences.cribsheet || [];
            return list();
        });

    }

    // Update if an snippet exists, create if it doesn't
    function upsert(newSnippet) {
        var clone = _.clone(_snippets);
        var match = _.findIndex(_snippets, {
            cropUrl: newSnippet.cropUrl
        });

        if (match > 0) {
            clone[match] = newSnippet;
        } else {
            clone.push(newSnippet);
        }

        _snippets = clone;
        updateCache();
        return newSnippet;
    }

    function updateCache() {
        _preferences.update({
            'preferences.cribsheet': _snippets
        });
        return _preferences.save();
    }

    function addCropUrl(snippet) {
        return _.extend({}, snippet, {
            cropUrl: [
                'https://imgproc.zooniverse.org/crop',
                '?w=', snippet.width,
                '&h=', snippet.height,
                '&x=', snippet.x,
                '&y=', snippet.y,
                '&u=', snippet.original.location.substr(snippet.original.location.indexOf('://') + 3)
            ].join('')
        });
    }

    // Helper functions
    function _setPreferences(apiResponse) {
        _preferences = apiResponse[0];
        return _preferences;
    }
}

