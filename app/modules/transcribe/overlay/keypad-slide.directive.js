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
        $scope.dynamicPopover = {
            templateUrl: 'keypad-img.html'
        };

        function preLoad() {
            function loadImage(src) {
                return $q(function (resolve, reject) {
                    var image = new Image();
                    image.onload = function () {
                        resolve(image);
                    };
                    image.src = src;
                    image.onerror = function (e) {
                        reject(e);
                    };
                })
            }
            var promises = $scope.abbreviations.map(function (imgObj) {
                return loadImage(imgObj.imgPath);
            });
            return $q.all(promises).then(function (results) {
                $scope.results = results;
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
        scope.$watch('results', function (newVal, oldVal) {
            console.log(newVal, oldVal);
            if (!newVal) return;
            elem.append(newVal)
        });
    }
}
