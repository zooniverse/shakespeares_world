'use strict';

require('./overlay.module.js')
    .directive('overlayControls', overlayControls);

// @ngInject
function overlayControls($interval, MarkingSurfaceFactory) {
    var directive = {
        link: overlayControlsLink,
        replace: true,
        restrict: 'A',
        templateUrl: 'overlay/overlay-controls.html'
    };
    return directive;

    function overlayControlsLink(scope) {
        var promise;
        var vm = scope.vm;
        vm.centre = MarkingSurfaceFactory.resizeAndCentre;
        vm.rotate = MarkingSurfaceFactory.rotate;
        vm.zoomStart = zoomStart;
        vm.zoomStop = zoomStop;

        function zoomStart(direction) {
            MarkingSurfaceFactory[direction]();
            promise = $interval(function () {
                MarkingSurfaceFactory[direction]();
            }, 150);
        }

        function zoomStop() {
            $interval.cancel(promise);
        }
    }
}
