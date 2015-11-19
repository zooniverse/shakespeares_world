'use strict';

require('./overlay.module.js')
    .directive('cribsheet', cribsheet);

// @ngInject
function cribsheet(localStorageService) {
    var directive = {
        controllerAs: 'vm',
        controller: cribsheetController,
        link: cribsheetLink,
        replace: true,
        scope: true,
        templateUrl: 'overlay/cribsheet.html'

    };
    return directive;

    function cribsheetLink(scope, elem) {
        scope.$on('event:toggleCribsheet', function () {
            var user = localStorageService.get('user');
            if (!user) {
                alert('You need to login to use the cribsheet')
            } else {
                elem.animate({
                    width: 'toggle'
                });
            }

        });
    }
}

// @ngInject
function cribsheetController($scope, CribsheetFactory) {
    var vm = this;
    vm.snippets = CribsheetFactory.list();
}
