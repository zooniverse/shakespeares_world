'use strict';

require('./transcribe.module.js')
    .directive('transcribeToolbar', transcribeToolbar);

// @ngInject
function transcribeToolbar($timeout, localStorageService, SubjectsFactory, ToolsFactory) {
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
        vm.tools = ToolsFactory;
        scope.$watch(function () {
            return SubjectsFactory.current;
        }, function () {
            if (SubjectsFactory.current && SubjectsFactory.current.data) {
                vm.metadata = SubjectsFactory.current.data.metadata;
            }
        });
    }
}
