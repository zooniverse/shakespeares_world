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
        if (SubjectsFactory.current) {
            vm.metadata = SubjectsFactory.current.data.metadata;
            vm.author = vm.metadata.Author;
            vm.genre = vm.metadata.Genre;
            vm.original = vm.metadata['Luna URL'];
            vm.catalogue = vm.metadata['Hamnet URL'];
            vm.title = vm.metadata.Title;
        }
    }
}
