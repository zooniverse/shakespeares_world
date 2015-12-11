'use strict';

require('./modals.module.js')
    .controller('SnippetController', SnippetController);

// @ngInject
function SnippetController($modalInstance, $scope, CribsheetFactory, data, hotkeys) {

    data = CribsheetFactory.addUrl(data);

    var vm = this;
    vm.close = close;
    vm.snippet = data;

    function close() {
        $modalInstance.close();
    }

    function save() {
        CribsheetFactory.upsert(vm.snippet);
        close();
    }

    hotkeys.bindTo($scope)
        .add({
            combo: 'enter',
            description: 'Save snippet',
            callback: save
        })

    //    function onKeydown(event) {
    //        if (event.which === 13) { // enter key
    //            event.preventDefault();
    //            save();
    //        }
    //    }
}
