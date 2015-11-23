'use strict';

var _ = require('lodash');

require('./cribsheet.module.js')
    .factory('CribsheetFactory', CribsheetFactory);

// @ngInject
function CribsheetFactory(localStorageService, $http, SubjectsFactory) {

    var factory;
    var _snippets;

    if (localStorageService.get('snippets') === null) {
        localStorageService.set('snippets', []);
    }

    _snippets = localStorageService.get('snippets');

    factory = {
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
        _.remove(_snippets, snippet);
        updateCache();
        return _snippets;
    }

    function list() {
        return _snippets;
    }

    function reset() {
        _snippets.length = 0;
        updateCache();
        return _snippets;
    }

    // Update if an snippet exists, create if it doesn't
    function upsert(snippet) {
        //Temporarily filtering by height/width to get round dupe issue
        if (snippet.width !== '0' && snippet.height !== '0') {
            var inCollection = _.find(_snippets, {
                $$hashKey: snippet.$$hashKey
            });
            if (inCollection) {
                inCollection = _.extend(inCollection, snippet);
            } else {
                _snippets.push(snippet);
            }
            updateCache();
        }
        return snippet;
    }

    function updateCache() {
        var snippets = _.reject(_snippets, {
            complete: false
        });
        localStorageService.set('snippets', snippets);
    }

    function addCropUrl(snippet) {
        var subjects = localStorageService.get('subjects');
        var cropServer = 'https://imgproc.zooniverse.org/crop?';
        var location = subjects.current.locations[0]['image/jpeg'];
        var snippets = list();
        var striplocation = location.substr(location.indexOf('://') + 3);
        snippets.forEach(function (el) {
            var cropUrl = cropServer + 'w=' + el.width + '&h=' + el.height + '&x=' + el.x + '&y=' + el.y + '&u=' + striplocation;

            upsert(_.extend(snippet, {
                url: cropUrl
            }));

        });
        return snippet;
    }
}
