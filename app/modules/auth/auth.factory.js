'use strict';

require('./auth.module.js')
    .factory('authFactory', authFactory);

var oauth = require('panoptes-client').oauth;

// @ngInject
function authFactory($interval, $timeout, $location, $window, localStorageService, ModalsFactory, zooAPI, zooAPIConfig, CribsheetFactory, $rootScope) {

    var factory;

    // if (localStorageService.get('user') === null) {
    //     localStorageService.set('user', null);
    // }

    // if (localStorageService.get('auth') === null) {
    //     localStorageService.set('auth', null);
    // } else {
    //     var auth = localStorageService.get('auth');
    //     if (0 < (Math.floor(Date.now() / 1000) - auth.token_start) < auth.expires_in) {
    //         _setToken(auth.access_token);
    //         _startTimer();
    //         _setUserData();
    //     } else {
    //         signOut();
    //     }
    // }

    var _user = {};

    // localStorage.setItem('panoptesClientOAuth_redirectUri', $location.absUrl());

    oauth.checkCurrent()
      .then(_setUserData);

    factory = {
        signIn: signIn,
        signOut: signOut,
        getUser: getUser
    };

    return factory;


    function getUser() {
        console.log('giving back user')
        return (_user.id) ? _user : false;
    }

    function _setUserData() {
        console.log('getting user data')
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
            })
            .then(function () {
                console.log(_user);
                return _user;
            })


            //         .then(function (response) {
            //             response = response[0];
            //             if (response.src) {
            //                 _user.avatar = response.src;
            //             }
            //         })
            //         .then(function () {

            //             return CribsheetFactory.$getData(user);
            //         });
            // }, function (error) {
            //     console.warn('Error logging in', error);
            // });
    }

    function signIn() {
        oauth.signIn($location.absUrl())
    }

    function signOut() {
        _user = {};
        oauth.signOut();
    }

}
