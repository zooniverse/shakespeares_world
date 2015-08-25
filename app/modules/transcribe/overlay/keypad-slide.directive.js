'use strict';

var angular = require('angular');

require('./overlay.module.js')
    .directive('keypadSlide', keypadSlide);

// @ngInject
function keypadSlide(hotkeys, overlayConfig) {
    var directive = {
        link: keypadSlideLink,
        controller: ['$scope', '$q', '$element', '$sce', keypadSlideController],
        replace: true,
        scope: true,
        templateUrl: 'overlay/keypad-slide.html'
    };
    return directive;

    function keypadSlideController($scope, $q, $element, $sce) {
        $scope.dynamicPopover = {
            templateUrl: 'overlay/keypad-img-popover.html',
        };
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
            textarea.caret(startTag.length + text.length);
        }

        function preLoad() {
            var imageArray = [];
            var promises;
            for (var i = 0; i < $scope.abbreviations.length; i++) {
                imageArray[i] = new Image();
                imageArray[i].src = $scope.abbreviations[i].imgPath;
            };

            function resolvePromises(n) {
                return $q.when(n);
            }
            promises = imageArray.map(resolvePromises);
            $q.all(promises).then(function (results) {
                console.log('array promises resolved with', results);
            });
        }
        preLoad();
    }

    function keypadSlideLink(scope, elem, attrs) {
        scope.$on('event:toggle', function () {
            elem.animate({
                width: 'toggle'
            });
        });
        scope.$on('event:close', function () {
            if (elem.css('display') == 'block') {
                elem.animate({
                    width: 'toggle'
                });
            }
        });


    }
}
