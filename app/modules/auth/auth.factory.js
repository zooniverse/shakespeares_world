'use strict';

require('./auth.module.js')
    .factory('authFactory', authFactory);

var PanoptesClient = require('panoptes-client');

// @ngInject
function authFactory($interval, $timeout, $location, $window, localStorageService, ModalsFactory, zooAPI, zooAPIConfig, CribsheetFactory, $rootScope) {

    var factory;

    var _user = {};

    PanoptesClient.oauth.checkCurrent()
      .then(function (user) {
        if (user) {
            _setUserData();
        }
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
                console.error('Something\'s gone very wrong with getting the user data', error);
            });
    }

    function signIn() {
        PanoptesClient.oauth.signIn($location.absUrl())
    }

    function signOut() {
        _user = {};
        $rootScope.$broadcast('auth:loginChange');
        PanoptesClient.oauth.signOut();
    }

}
