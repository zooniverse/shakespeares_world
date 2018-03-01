'use strict';

require('./auth.module.js')
    .factory('authFactory', authFactory);

var OAuth = require('panoptes-client/lib/oauth');

// @ngInject
function authFactory($location, $rootScope, AnnotationsFactory, zooAPI, CribsheetFactory) {

    var factory;

    var _user = {};

    OAuth.checkCurrent()
        .then(function (user) {
            if (user) {
                _setUserData();
            }
            return user;
        })
        .then(function(user) {
            return zooAPI.beforeEveryRequest = _checkUserAndToken(user);
        });

    factory = {
        signIn: signIn,
        signOut: signOut,
        getUser: getUser
    };

    return factory;


    function getUser() {
        return (_user.id) ? _user : false;
    }

    function _setUserData() {
        return zooAPI.type('me').get()
            .then(function (response) {
                var response = response[0];
                _user.id = response.id;
                _user.display_name = response.display_name;
                return response.get('avatar');
            })
            .then(function (response) {
                var response = response[0];
                _user.avatar = (response.src) ? response.src : null;
                return _user;
            }, function(error) {
                console.info('No avatar found for', _user.id);
                return _user;
            })
            .then(function (user) {
                $rootScope.$broadcast('auth:loginChange', user);
                return user;
            })
            .then(CribsheetFactory.$getData)
            .catch(function (error) {
                console.error('Something\'s gone wrong with getting the user data', error);
            });
    }

    function signIn() {
        OAuth.signIn($location.absUrl())
    }

    function signOut() {
        _user = {};
        $rootScope.$broadcast('auth:loginChange');
        OAuth.signOut();
    }

    function _checkUserAndToken(user) {
        return OAuth.checkBearerToken()
            .then(function (token) {
                console.log('>>>>>>> just for testing, user and token', user, token);
                // The Panoptes client doesn't return an error but just null
                // when it can't refresh the token.
                if (user && token === null) {
                    // We are logged in but don't have a token any more.
                    // Need to save any unsaved work and redirect to Panoptes for a new token.
                    alert('Your session is expired. Press OK to save your work and start a new one.')
                    AnnotationsFactory.updateCache();
                    OAuth.signIn($location.absUrl());
                }
                console.log('Token refreshed: ', token);
            })
    }

}
