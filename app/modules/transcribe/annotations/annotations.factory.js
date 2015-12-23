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

    // Our main annotation store. We refer to this, rather than its
    // localStorage counterpart, as we're filtering what we save their to
    // complete transcriptions only.
    _annotations = localStorageService.get('annotations');

    factory = {
        checkVariants: checkVariants,
        clear: clear,
        destroy: destroy,
        list: list,
        upsert: upsert
    };

    return factory;

    // Remove all annotations for a given subject (called once we change subject)
    function clear(subjectId) {
        delete _annotations[subjectId];
        _updateLocalStorage();
    }

    // Delete a single annotation
    function destroy(annotation) {
        if (annotation) {
            _.remove(list(), annotation);
            _updateLocalStorage();
        }
        return _annotations;
    }

    // Return a list of annotations for the current subject
    function list() {
        var currentSubjectAnnotations = _annotations[SubjectsFactory.current.data.id];
        if (_.isUndefined(currentSubjectAnnotations)) {
            currentSubjectAnnotations = [];
            _updateLocalStorage();
        }
        return currentSubjectAnnotations;
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

    // Save the current annotations list to localStorage, excluding incompletes
    function _updateLocalStorage() {
        var cleanedAnnotations = _.mapValues(_annotations, function (subjectAnnotations) {
            return _.reject(subjectAnnotations, { complete: false });
        });
        localStorageService.set('annotations', cleanedAnnotations);
    }

}
