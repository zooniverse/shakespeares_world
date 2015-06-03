'use strict';

require('./subjects.module.js')
    .factory('subjectsFactory', subjectsFactory);

// @ngInject
function subjectsFactory($q, $timeout, localStorageService, zooAPI, zooAPIProject) {

    if (localStorageService.get('subjects') === null) {
        localStorageService.set('subjects', {
            page: 1,
            queue: [],
            viewed: []
        });
    }

    var factory;
    var _subjects = localStorageService.get('subjects');

    factory = {
        get: get,
        advance: advance
    };

    return factory;

    function advance() {

    }

    function get() {
        var deferred = $q.defer();

        if (_subjects.queue[0]) {
            deferred.resolve(_subjects.queue[0]);
        } else {
            _populateQueue().then(function () {
                deferred.resolve(_subjects.queue[0]);
            });
        }

        return deferred.promise;
    }

    function _populateQueue() {
        var deferred = $q.defer();

        zooAPIProject.get()
            .then(function (project) {
                return zooAPI.type('subjects').get({
                    page: _subjects.page,
                    sort: 'cellect',
                    workflow_id: project.links.workflows[0]
                });
            })
            .then(function (newSubjects) {
                _subjects.queue = _subjects.queue.concat(newSubjects);
                deferred.resolve();
            });

        return deferred.promise;
    }

}
