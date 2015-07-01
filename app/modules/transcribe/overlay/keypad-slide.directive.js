'use strict';

var angular = require('angular');
var animate = require('angular-animate');

require('./overlay.module.js')
    .directive('keypadSlide', keypadSlide);

// @ngInject
function keypadSlide() {
    var directive = {
        replace: true,
        scope: true,
        templateUrl: 'overlay/keypad-slide.html',
        link: overlayConfigLink
    };
    return directive;

    function overlayConfigLink(scope, element, attrs) {
        scope.$on('visible', function (event) {
            console.log('event received')
        });
    }

}
