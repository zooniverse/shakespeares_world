'use strict';

var _ = require('lodash');
var moment = require('moment');

require('./transcribe.module.js')
    .factory('ClassificationFactory', ClassificationFactory);

// @ngInject
function ClassificationFactory($q, AnnotationsFactory, appConfig, localStorageService, SubjectsFactory, zooAPI, zooAPIProject) {

    var factory;

    if (localStorageService.get('classificationsToSubmit') === null) {
        localStorageService.set('classificationsToSubmit', []);
    }

    factory = {
        submitBlank: submitBlank,
        submitComplete: submitComplete,
        submitIncomplete: submitIncomplete
    };

    return factory;

    function _createNewClassification() {
        var classification = {
            metadata: {
                user_agent: appConfig.appTitle,
                user_language: 'en_GB',
                started_at: SubjectsFactory.current.data.started_at,
                finished_at: moment().format()
            },
            links: {
                subjects: [SubjectsFactory.current.data.id]
            },
            annotations: []
        };
        return zooAPIProject.get()
            .then(function (project) {
                classification.links.project = project.id;
                classification.links.workflow = project.links.workflows[0];
                return zooAPI.type('workflows').get(classification.links.workflow);
            })
            .then(function (workflow) {
                classification.metadata.workflow_version = workflow.version;
                return classification;
            });
    }

    function _submitToApi(newClassification) {

        var rejectedClassifications = [];

        localStorageService.set('classificationsToSubmit', localStorageService.get('classificationsToSubmit').concat([newClassification]));

        // We reduce over our list of classifications (which now includes the new
        // classification), and save any failed ones back again. The technique is
        // explained at http://taoofcode.net/promise-anti-patterns/#the-collection-kerfuffle:8f173b15e2d19515fdc8ce931ae539c0
        //
        // We could do this in parallel, but this is a non-blocking process and
        // we don't need the time savings that the additional load would cause.
        //
        // Note $q.when() - with Q, we'd use the basic constructor Q(), but the
        // Angular implementation (`$q()`) requires a resolver function we
        // don't need.
        localStorageService.get('classificationsToSubmit').reduce(function (promise, newClassification) {
            return promise.then(function (response) {
                var classification = zooAPI.type('lassifications').create(newClassification);
                return classification.save()
                    .then(function (response) {
                        console.log('Classification saved', response.id);
                    }, function (error) {
                        console.log('Error submitting classification:', error);
                        rejectedClassifications.push(newClassification);
                    });
            });
        }, $q.when()).then(function () {
            localStorageService.set('classificationsToSubmit', rejectedClassifications);
        });

    }

    function submitBlank() {
        return _createNewClassification()
            .then(function addBlankData(classification) {
                classification.annotations.push({
                    task: 'T0',
                    value: true
                });
                return classification;
            })
            .then(_submitToApi);
    }

    function submitComplete() {
        return _createNewClassification()
            .then(function addCompleteData(classification) {
                classification.annotations.push({
                    task: 'T0',
                    value: false
                });
                classification.annotations.push({
                    task: 'T2',
                    value: _.clone(AnnotationsFactory.list(), true)
                });
                classification.annotations.push({
                    task: 'T3',
                    value: true
                });
                return classification;
            })
            .then(_submitToApi);
    }

    function submitIncomplete() {
        return _createNewClassification()
            .then(function addIncompleteData(classification) {
                classification.annotations.push({
                    task: 'T0',
                    value: false
                });
                classification.annotations.push({
                    task: 'T2',
                    value: _.clone(AnnotationsFactory.list(), true)
                });
                classification.annotations.push({
                    task: 'T3',
                    value: false
                });
                return classification;
            })
            .then(_submitToApi);
    }

}
