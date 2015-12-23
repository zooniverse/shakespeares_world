'use strict';

var _ = require('lodash');

require('./annotations.module.js')
    .factory('AnnotationsFactory', AnnotationsFactory);

// @ngInject
function AnnotationsFactory(localStorageService, $http, SubjectsFactory) {

    var factory;
    var _annotations;

    if (!_.isPlainObject(localStorageService.get('annotations'))) {
        localStorageService.set('annotations', {});
    }

    _annotations = localStorageService.get('annotations');

    factory = {
        checkVariants: checkVariants,
        clear: clear,
        destroy: destroy,
        list: list,
        upsert: upsert
    };

    return factory;

    function clear(subjectId) {
        delete _annotations[subjectId];
        _updateLocalStorage();
    }

    // TODO: fix so that it only removes a point if it's passed an annotation;
    // a blank / undefined object will wipe everything lololol
    function destroy(annotation) {
        _.remove(list(), annotation);
        _updateLocalStorage();
        return _annotations;
    }

    function list() {
        if (_.isUndefined(_annotations[SubjectsFactory.current.data.id])) {
            _annotations[SubjectsFactory.current.data.id] = [];
            _updateLocalStorage();
        }
        return _annotations[SubjectsFactory.current.data.id];
    }

    // Update if an annotation exists, create if it doesn't
    function upsert(annotation) {
        var inCollection = _.find(list(), {
            $$hashKey: annotation.$$hashKey
        });
        if (inCollection) {
            inCollection = _.extend(inCollection, annotation);
        } else {
            list().push(annotation);
        }
        _updateLocalStorage();
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
            }).then(success, failure);

        }

        return annotation;

        function success(response) {}

        function failure(response) {
            var url = response.config.url;
            var words = decodeURIComponent(url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf(".")));
            oedVars.push(words);
            upsert(_.extend(annotation, {
                variants: oedVars
            }));
        }

    }

    function _updateLocalStorage() {
        var cleanedAnnotations = _.mapValues(_annotations, function (subjectAnnotations) {
            return _.reject(subjectAnnotations, { complete: false });
        });
        localStorageService.set('annotations', cleanedAnnotations);
    }

}
