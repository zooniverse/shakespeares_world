'use strict';

var angular = require('angular');

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
        scope.$on('event:toggle', function () {
            elem.animate({
                width: 'toggle'
            });
        });
        var image = new Image();
        console.log(scope.vm.samples)
        image.src = scope.vm.samples[0].imgPath;
        console.log('path', image.src)
    }
}

// @ngInject
function alphabetSampleController($scope, overlayConfig) {
    var vm = this;
    vm.samples = overlayConfig.samples;

}
