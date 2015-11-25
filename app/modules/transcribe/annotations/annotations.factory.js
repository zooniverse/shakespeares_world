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
        checkVariants: checkVariants,
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
        //Temporarily filtering by height/width to get round dupe issue
        if (annotation.width !== '0' && annotation.height !== '0') {
            var inCollection = _.find(_annotations, {
                $$hashKey: annotation.$$hashKey
            });
            if (inCollection) {
                inCollection = _.extend(inCollection, annotation);
            } else {

                _annotations.push(annotation);
            }
            updateCache();
        }
        return annotation;
    }


    function checkVariants(annotation) {
        //splits string by whitespace (different encodings)
        var lemmas = annotation.text.split(/\s|&nbsp;/g);
        var oedVars = [];
        for (var i = 0; i < lemmas.length; ++i) {
            //uri encode, remove all <> tags, remove
            var urlLemmas = encodeURIComponent(lemmas[i].replace(/<[^>]*>/g, '').replace(/[^\w\s]|_/g, '').replace(/\d+/g, '').toLowerCase());
            $http({
                method: 'GET',
                url: 'https://static.zooniverse.org/www.shakespearesworld.org/variants/' + urlLemmas + '.txt'
            }).then(function success(response) {}, function error(response) {
                var url = response.config.url;
                var words = decodeURIComponent(url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf(".")));
                oedVars.push(words);
                upsert(_.extend(annotation, {
                    variants: oedVars
                }));
            })
        }
        return annotation;
    }

    function updateCache() {
        var annotations = _.reject(_annotations, {
            complete: false
        });
        localStorageService.set('annotations', annotations);
    }

}
