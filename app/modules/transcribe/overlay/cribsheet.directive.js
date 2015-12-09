'use strict';

require('./overlay.module.js')
    .directive('cribsheet', cribsheet);

// @ngInject
function cribsheet(authFactory) {
    var directive = {
        controllerAs: 'vm',
        controller: CribsheetController,
        link: cribsheetLink,
        replace: true,
        scope: true,
        templateUrl: 'overlay/cribsheet.html'

    };
    return directive;

    function cribsheetLink(scope, elem) {
        scope.$on('event:toggleCribsheet', function () {
            if (!authFactory.getUser()) {
                alert('You need to login to use the cribsheet');
            } else {
                elem.animate({
                    width: 'toggle'
                });
            }
        });
    }
}

// @ngInject
function CribsheetController($scope, CribsheetFactory) {
    var vm = this;

    vm.destroy = destroySnippet;

    $scope.$watch(CribsheetFactory.list, function () {
        vm.snippets = CribsheetFactory.list();
    });

    function destroySnippet(snippet) {
        CribsheetFactory.destroy(snippet);
    }
}
