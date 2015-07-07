'use strict';

var angular = require('angular');

require('./overlay.module.js')
    .directive('keypadSlide', keypadSlide);

// @ngInject
function keypadSlide(hotkeys, overlayConfig) {
    var directive = {
        link: keypadSlideLink,
        controller: ['$scope', '$element', keypadSlideController],
        replace: true,
        scope: true,
        templateUrl: 'overlay/keypad-slide.html'
    };
    return directive;

    function keypadSlideController($scope, $element) {
        $scope.data = {};
        var textarea = document.querySelector('textarea');
        //.find('textarea').first();
        $scope.abbreviations = overlayConfig.abbrKeys;
        $scope.tags = overlayConfig.teiTags;
        var vm = this;
        vm.tag = teiTag;

        function teiTag(tagText) {
            alert('ALERT')
            console.log('called TeiTag');
            var startTag = '[' + tagText + ']';
            var endTag = '[/' + tagText + ']';

            var start = textarea.prop('selectionStart');
            var end = textarea.prop('selectionEnd');
            var text = textarea.val();
            var textBefore = text.substring(0, start);
            var textInBetween;
            var textAfter;

            if (start === end) {
                textAfter = text.substring(start, text.length);
                textarea.val(textBefore + startTag + endTag + textAfter);
            } else {
                textInBetween = text.substring(start, end);
                textAfter = text.substring(end, text.length);
                textarea.val(textBefore + startTag + textInBetween + endTag + textAfter);
            }
            getFocus();
        }

        function getFocus() {
            textarea[0].focus();
        }

    }

    function keypadSlideLink(scope, elem, attrs, dialog) {

        scope.tag = dialog.tag;

        scope.$on('event:toggle', function () {
            elem.animate({
                width: 'toggle'
            });
        });
    }
}
