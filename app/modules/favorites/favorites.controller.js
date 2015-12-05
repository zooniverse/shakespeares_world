'use strict';

require('./favorites.module.js')
    .controller('FavoritesController', FavoritesController);

// @ngInject
function FavoritesController($q, FavoritesFactory, zooAPI) {
    var vm = this;
    vm.favorites = getFavSubjects();

    function getFavSubjects() {
        console.log('FavoritesController - getFavSubjects');
        return FavoritesFactory.list()
            .then(function (collection) {
                var favorites = collection.links.subjects;
                var promises = favorites.map(function (id) {
                    return zooAPI.type('subjects').get(id);
                });
                return $q.all(promises);
            }).then(function (subjects) {
                console.log('FavoritesController - SUBJECTS: ', subjects);
                var urls = subjects.map(function (subject) {
                    return subject.locations[0]['image/jpeg'];
                });
                console.log('URLS', urls);
                return url;
            }, function (error) {
                console.warn('FAIL!!: ', error)
            })
    }
}
