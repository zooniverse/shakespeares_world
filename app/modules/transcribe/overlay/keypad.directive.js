'use strict';

var angular = require('angular');

require('./overlay.module.js')
    .directive('keypadSlide', keypadSlide);

function keypadSlide($rootScope, hotkeys, overlayConfig) {

    var directive = {
        link: keypadLink,
        controller: ['$scope', '$element', keypadSlideController],
        replace: true,
        scope: true,
        templateUrl: 'overlay/keypad.html'
    };
    return directive;

    function keypadSlideController($scope, $element) {

        $scope.active = false;
        $scope.data = {};
        $scope.transcription = '';
        $scope.buttons = overlayConfig.abbrKeys;
        var textarea = $element.find('textarea').first();
        var vm = this;
    }




}
