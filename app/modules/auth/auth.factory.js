'use strict';

require('./auth.module.js')
    .factory('authFactory', authFactory);

var oauth = require('panoptes-client').oauth;

// @ngInject
function authFactory($interval, $timeout, $location, $window, localStorageService, ModalsFactory, zooAPI, zooAPIConfig, CribsheetFactory, $rootScope) {

    var factory;

    var _user = {};

    oauth.checkCurrent()
      .then(_setUserData);

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
                $rootScope.$broadcast('auth:loginChange', _user);
                return _user;
            })
            .then(CribsheetFactory.$getData)
            .catch(function (error) {
                console.error('somethings wrong', error)
            });
    }

    function signIn() {
        oauth.signIn($location.absUrl())
    }

    function signOut() {
        _user = {};
        $rootScope.$broadcast('auth:loginChange');
        oauth.signOut();
    }

}
