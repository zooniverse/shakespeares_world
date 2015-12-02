'use strict';

require('./favourites.module.js')
    .factory('FavouritesFactory', FavouritesFactory);

// @ngInject
function FavouritesFactory($q, localStorageService, zooAPI, zooAPIConfig) {

    var factory;

    factory = {
        addToFavourites: _upsertFavourites
    };

    //_getFavourites()

    return factory;

    function _getFavourites() {
        var user = localStorageService.get('user');
        return zooAPI.type('project_preferences').get({
                'project_id': zooAPIConfig.project_id,
                'user_id': user.id
            })
            .then(function (preferences) {
                console.log(preferences)

            });
    }

    function _upsertFavourites(subjectId) {
        _getFavourites()
            .then(function (preferences) {
                var _preferences = preferences[0].preferences;
                var _fav = _preferences.favourites;
                console.log('LENGTH', Object.keys(_fav).length)
                console.log('LENGTH', _fav.length)
                if (Object.keys(_preferences.favourites).length == 0) {
                    console.log('EMPTY')
                    preferences[0].update({
                        'preferences': {
                            'favourites': subjectId
                        }
                    });
                    _preferences.save();

                } else {
                    console.log('NOT-EMPTY')
                    preferences[0].update({
                        'preferences': {
                            'favourites': _fav.push(subjectId)
                        }
                    });
                    _preferences.save();
                }
            })
    }

}
