'use strict';

require('./overlay.module.js')
    .directive('alphabetSample', alphabetSample);

// @ngInject
function alphabetSample() {
    var directive = {
        controllerAs: 'vm',
        controller: alphabetSampleController,
        link: alphabetSampleLink,
        replace: true,
        scope: true,
        templateUrl: 'overlay/alphabet-sample.html'
    };
    return directive;

    function alphabetSampleLink(scope, elem) {
        scope.$on('event:toggleAlphabet', function () {
            elem.animate({
                width: 'toggle'
            });
        });
        var image = new Image();
        image.src = scope.vm.samples[0].imgPath;
    }
}

// @ngInject
function alphabetSampleController($scope, overlayConfig) {
    var vm = this;
    vm.samples = overlayConfig.samples;
}
