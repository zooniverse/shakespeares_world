'use strict';

require('./transcribe.module.js')
    .directive('transcribeToolbar', transcribeToolbar);

// TODO: check if I can replace link with a controller inheriting parent scope

// @ngInject
function transcribeToolbar(SubjectsFactory, ToolsFactory) {
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
        vm.metadata = SubjectsFactory.current.data.metadata;
        vm.author = !vm.metadata.Author ? 'N.A.' : vm.metadata.Author;
        vm.genre = !vm.metadata.Genre ? 'N.A.' : vm.metadata.Genre;
        vm.original = !vm.metadata.LunaURL ? 'N.A.' : vm.metadata.LunaURL;
        vm.title = !vm.metadata.Title ? 'N.A.' : vm.metadata.Title;
        console.log('CURRENT', vm.metadata)
    }
}
