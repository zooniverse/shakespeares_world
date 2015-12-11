'use strict';

require('./modals.module.js')
    .controller('SnippetController', SnippetController);

// @ngInject
function SnippetController($modalInstance, CribsheetFactory, data) {

    data = CribsheetFactory.addUrl(data);

    var vm = this;
    vm.close = close;
    vm.keyPress = onKeydown;
    vm.snippet = data;

    function close() {
        $modalInstance.close();
    }

    function save() {
        CribsheetFactory.upsert(vm.snippet);
        close();
    }

    function onKeydown(event) {
        if (event.which === 13) { // enter key
            event.preventDefault();
            save();
        }
    }
}
