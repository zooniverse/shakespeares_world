'use strict';

var _ = require('lodash');

require('./cribsheet.module.js')
    .factory('CribsheetFactory', CribsheetFactory);

// @ngInject
function CribsheetFactory(localStorageService, SubjectsFactory) {

    var factory;
    var _snippets;

    if (localStorageService.get('snippets') === null) {
        localStorageService.set('snippets', []);
    }

    _snippets = localStorageService.get('snippets');

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

    function getData() {

    }

    // Update if an snippet exists, create if it doesn't
    function upsert(snippet) {
        var inCollection = _.find(_snippets, {
            $$hashKey: snippet.$$hashKey
        });
        if (inCollection) {
            inCollection = _.extend(inCollection, snippet);
        } else {
            _snippets.push(snippet);
        }
        updateCache();
        return snippet;
    }

    function updateCache() {
        var snippets = _.reject(_snippets, {
            complete: false
        });
        localStorageService.set('snippets', snippets);
    }

    function addCropUrl(snippet) {
        // Data structures should be immutable, so we'll return a new object.
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
}
