'use strict';

var angular = require('angular');

require('./overlay.module.js')
    .directive('keypadSlide', keypadSlide);

// @ngInject
function keypadSlide(hotkeys, overlayConfig) {
    var directive = {
        link: keypadSlideLink,
        controller: ['$scope', '$element', '$sce', keypadSlideController],
        replace: true,
        scope: true,
        templateUrl: 'overlay/keypad-slide.html'
    };
    return directive;

    function keypadSlideController($scope, $element, $sce) {
        $scope.abbreviations = overlayConfig.abbrKeys;
        $scope.tags = overlayConfig.teiTags;
        var textarea = angular.element('textarea').first();

        $scope.toTrustedHTML = function (html) {
            return $sce.trustAsHtml(html);
        }
        $scope.addTag = function (tagText) {
            var startTag = '<' + tagText + '>';
            var endTag = '</' + tagText + '>';
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
            var pos = startTag.length + text.length;
            console.log(pos);
            textarea.caret(pos);
        }
    }

    function keypadSlideLink(scope, elem, attrs, dialog) {
        //  scope.tag = dialog.tag;
        scope.$on('event:toggle', function () {
            elem.animate({
                width: 'toggle'
            });
        });
    }
}
