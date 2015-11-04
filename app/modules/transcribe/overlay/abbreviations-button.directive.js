'use strict';

require('./overlay.module.js')
    .directive('abbreviationsButton', abbreviationsButton);

// @ngInject
function abbreviationsButton($sce) {
    var directive = {
        link: keypadButtonLink,
        replace: true,
        scope: {
            data: '='
        },
        templateUrl: 'overlay/abbreviations-button.html'
    };
    return directive;

    function keypadButtonLink(scope) {
        scope.html = $sce.trustAsHtml(scope.data.name);
        scope.popoverTemplate = 'overlay/popover.html';
        var image = new Image();
        image.src = scope.data.imgPath;
    }
}
