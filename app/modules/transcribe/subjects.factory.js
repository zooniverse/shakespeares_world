'use strict';

var _ = require('lodash');
var moment = require('moment');

require('./transcribe.module.js')
    .factory('SubjectsFactory', SubjectsFactory);

// @ngInject
function SubjectsFactory($q, AnnotationsFactory, localStorageService, zooAPI, zooAPIConfig, zooAPIProject) {

    if (localStorageService.get('subjects') === null) {
        localStorageService.set('subjects', {
            current: null,
            viewed: []
        });
    }

    var factory;
    var _annotations = localStorageService.get('annotations');
    var _data = localStorageService.get('subjects');
    var _queue = [];
    var _subjectSet = null;

    factory = {
        $advanceQueue: advanceQueue,
        $getData: getData,
        current: null,
        loading: false
    };

    return factory;

    function advanceQueue() {
        factory.loading = true;
        if (_data.current) {
            _data.viewed.push(_data.current);
            _data.current = null;
            _updateStorage();
        }
        if (!_queue.length) {
            return  _getSubjectSetId()
                .then(_populateQueue)
                .then(_setCurrent);
        } else {
            return $q.when(_setCurrent());
        }
    }

    function getData(subjectSet) {
        factory.loading = true;
        _subjectSet = subjectSet;
        if (_isAnnotatedSubjectEqualToCurrent()) {
            return _doYouWantToChangeSubject();
        } else {
            localStorageService.set('annotations', []);
            _queue.length = 0;
            return advanceQueue()
                .then(_createSubject);
        }
    }

    function _askConfirmation() {
        var answer = confirm("You have unsaved work!\nPress OK if you want a new subject; this will delete all your unsaved work.\nPress Cancel to reload the subject you were previously working on and restore your unsaved work.");
        return answer;
    }

    function _createSubject() {
        factory.current = {
            data: _data.current,
            image: false
        };
        return $q.when(factory.current.data)
            .then(_loadImage);
    }

    function _doYouWantToChangeSubject() {
        if (_askConfirmation()) {
            deleteAnnotations();
            _queue.length = 0;
            return advanceQueue()
                .then(_createSubject);
        }
        else {
            return _createSubject();
        }
    }

    function _getSubjectSetId() {
        if (_subjectSet) {
          return Promise.resolve(_subjectSet);
        } else {
          return _getRandomWorkflowAssociatedSubjectSets()
        }
    }

    function _isAnnotatedSubjectEqualToCurrent() {
        var found = false;
        _annotations.forEach(function(element) {
            if (element.subject === _data.current.id) {
                found = true;
            }
        });
        return found;
    }

    function deleteAnnotations() {
        _annotations.forEach(function(element) {
            AnnotationsFactory.destroy(element);
        });
    }

    function _getRandomWorkflowAssociatedSubjectSets() {
        return zooAPI.type('workflows').get(zooAPIConfig.workflow_id)
            .then(function(wf) {
                var randomSet = _.sample(wf.links.subject_sets)
                return randomSet
            })
            .catch(function(error) {
                console.log('Error fetching active subject sets', error)
            })
    }

    function _loadImage() {
        var deferred = $q.defer();
        factory.current.image = new Image();
        factory.current.image.src = factory.current.data.locations[0]['image/jpeg'];
        factory.current.image.onload = function () {
            factory.loading = false;
            deferred.resolve();
        };
        return deferred.promise;
    }

    function _populateQueue(subjectSetId) {
        return zooAPIProject.get()
            .then(function (project) {
                return zooAPI.get('/subjects/queued', {
                    workflow_id: zooAPIConfig.workflow_id,
                    // Get a random set if one isn't specified already
                    subject_set_id: subjectSetId
                });
            })
            .then(function (subjects) {
                if (subjects.length) {
                    _queue = _queue.concat(subjects);
                    return _queue;
                } else {
                    factory.loading = false;
                    return $q.reject('outOfData');
                }
            });
    }

    function _setCurrent() {
        var randonIndex = Math.floor(Math.random() * _queue.length);
        _data.current = _queue.splice(randonIndex, 1)[0];
        _data.current.started_at = moment().format();
        _updateStorage();
    }

    function _updateStorage() {
        localStorageService.set('subjects', _data);
    }

}
