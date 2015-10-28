'use strict';

require('./transcribe.module.js')
    .directive('transcribeToolbar', transcribeToolbar);

// TODO: check if I can replace link with a controller inheriting parent scope

// @ngInject
function transcribeToolbar(MarkingSurfaceFactory, ToolsFactory, $interval) {
    var directive = {
        link: transcribeToolbarLink,
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: 'transcribe/toolbar.html'
    };
    return directive;

    function transcribeToolbarLink(scope) {
        var vm = scope.vm;
        var promise;
        vm.rotate = MarkingSurfaceFactory.rotate;
        vm.centre = MarkingSurfaceFactory.resizeAndCentre;
        vm.tools = ToolsFactory;
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
}
