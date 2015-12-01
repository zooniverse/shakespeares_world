'use strict';

require('./header.module.js')
    .directive('appHeader', appHeader);

function appHeader() {
    var directive = {
        restrict: 'A',
        replace: true,
        templateUrl: 'header/header.html',
        controller: HeaderController,
        controllerAs: 'vm'
    };
    return directive;
}

// @ngInject
function HeaderController($scope, authFactory) {
    var vm = this;
    // TODO: reset this on resize
    vm.headerCollapse = true;

    $scope.$watch(authFactory, function () {
        vm.user = authFactory.getUser();
    })

    vm.links = [
        {
            label: 'Home',
            state: 'Home'
        },
        {
            label: 'About',
            state: 'About'
        },
        {
            label: 'Team',
            state: 'Team'
        },
        {
            label: 'Guide',
            state: 'GuideBase'
        }
    ];
}
