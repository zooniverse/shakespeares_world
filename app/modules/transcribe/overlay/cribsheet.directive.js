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

    function cribsheetLink(scope, elem, attrs) {
        scope.$on('event:toggleCribsheet', function () {
            elem.animate({
                width: 'toggle'
            });
        });
    }
}

// @ngInject
function cribsheetController($scope, CribsheetFactory) {
    var vm = this;
    vm.snippets = CribsheetFactory.list();
}
