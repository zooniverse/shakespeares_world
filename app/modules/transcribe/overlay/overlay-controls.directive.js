'use strict';

require('./overlay.module.js')
    .directive('overlayControls', overlayControls);

// @ngInject
function overlayControls($interval, localStorageService, MarkingSurfaceFactory, $rootScope, FavoritesFactory, SubjectsFactory) {
    var directive = {
        link: overlayControlsLink,
        replace: true,
        restrict: 'A',
        templateUrl: 'overlay/overlay-controls.html'
    };
    return directive;

    function overlayControlsLink(scope) {
        var promise,
            vm = scope.vm;
        vm.alphabet = alphabetToggle;
        vm.centre = MarkingSurfaceFactory.resizeAndCentre;
        vm.toggleFav = toggleFavorites;
        vm.rotate = MarkingSurfaceFactory.rotate;
        vm.zoomStart = zoomStart;
        vm.zoomStop = zoomStop;

        function toggleFavorites() {
            var user = localStorageService.get('user');
            if (!user) {
                alert('You need to login to use this feature')
            } else {
                FavoritesFactory.toggleFavs()
                    .then(function (response) {
                        console.log('overlayControlsLink:RESPONSE', response);
                        return response;
                    })
            }
        }

        function alphabetToggle() {
            $rootScope.$broadcast('event:toggle');
        }

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
