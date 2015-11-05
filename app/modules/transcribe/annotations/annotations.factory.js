'use strict';

var _ = require('lodash');

require('./annotations.module.js')
    .factory('AnnotationsFactory', AnnotationsFactory);

// @ngInject
function AnnotationsFactory(localStorageService, $http) {

    var factory;
    var _annotations;

    if (localStorageService.get('annotations') === null) {
        localStorageService.set('annotations', []);
    }

    _annotations = localStorageService.get('annotations');

    factory = {
        destroy: destroy,
        list: list,
        reset: reset,
        upsert: upsert,
        updateCache: updateCache
    };

    return factory;

    // TODO: fix so that it only removes a point if it's passed an annotation;
    // a blank / undefined object will wipe everything lololol
    function destroy(annotation) {
        _.remove(_annotations, annotation);
        updateCache();
        return _annotations;
    }

    function list() {
        return _annotations;
    }

    function reset() {
        _annotations.length = 0;
        updateCache();
        return _annotations;
    }

    // Update if an annotation exists, create if it doesn't
    function upsert(annotation) {
        var inCollection = _.find(_annotations, {
            $$hashKey: annotation.$$hashKey
        });
        if (inCollection) {
            inCollection = _.extend(inCollection, annotation);
        } else {
            _annotations.push(annotation);
        }
        checkVariants(annotation);
        updateCache();
        return annotation;
    }


    function checkVariants(annotation) {
        var lemmas = annotation.text.split(' ');
        var results = [];
        for (var i = 0; i < lemmas.length; ++i) {
            var urlLemmas = encodeURIComponent(lemmas[i]).toLowerCase();
            results.push(urlLemmas);
            $http({
                method: 'GET',
                url: 'https://static.zooniverse.org/www.shakespearesworld.org/variants/' + results[i] + '.txt'
            }).then(function successCallback(response) {
                console.log('Success: ', response.status)
            }, function errorCallback(response) {
                //var url = response.config.url;
                //var words = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
                _.extend(annotation, {
                    variants: lemmas[i]
                });
                console.log('Annotation: ', annotation);
                console.log('Words: ', lemmas[i]);
            })
        }
    }


    function updateCache() {
        var annotations = _.reject(_annotations, {
            complete: false
        });
        localStorageService.set('annotations', annotations);
    }

}
