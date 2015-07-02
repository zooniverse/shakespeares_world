'use strict';

var angular = require('angular');
var animate = require('angular-animate');

require('./overlay.module.js')
    .directive('keypadSlide', keypadSlide);

// @ngInject
function keypadSlide() {
    var directive = {
        link: overlayConfigLink,
        replace: true,
        scope: true,
        templateUrl: 'overlay/keypad-slide.html'

    };
    return directive;

    function overlayConfigLink(scope, elem, attrs) {
        scope.$on('event:toggle', function () {
            console.log('event received');
            //This is not the Angular way of doing it...
            elem.addClass('-visible');
        });
    }

}
