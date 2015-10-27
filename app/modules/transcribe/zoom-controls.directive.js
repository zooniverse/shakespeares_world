'use strict';

require('./transcribe.module.js')
    .directive('zoomControls', zoomControls);

// @ngInject
function zoomControls() {
    var directive = {
        bindToController: true,
        controller: ZoomControlsController,
        controllerAs: 'vm',
        replace: true,
        restrict: 'A',
        scope: true
            //templateUrl: 'transcribe/zoom-controls.html'
    };
    return directive;
}

// @ngInject
function ZoomControlsController($interval, MarkingSurfaceFactory) {
    var vm = this;
    var promise;
    vm.zoomStart = zoomStart;
    vm.zoomStop = zoomStop;

    function zoomStart(direction, $event) {
        if ($event.button === 0) {
            MarkingSurfaceFactory[direction]();
            promise = $interval(function () {
                MarkingSurfaceFactory[direction]();
            }, 150);
        }
    }

    function zoomStop() {
        $interval.cancel(promise);
    }
}
