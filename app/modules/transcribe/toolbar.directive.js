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
        var current = SubjectsFactory.current.data.id,
            vm = scope.vm;
        vm.tools = ToolsFactory;
        scope.$watch(function () {
            vm.metadata = SubjectsFactory.current.data.metadata;
            return current
        });
    }
}
