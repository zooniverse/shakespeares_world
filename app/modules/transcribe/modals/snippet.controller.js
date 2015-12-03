'use strict';

require('./modals.module.js')
    .controller('SnippetController', SnippetController);

// @ngInject
function SnippetController($modalInstance, CribsheetFactory, data) {

    data = CribsheetFactory.addUrl(data);

    var vm = this;
    vm.close = close;
    vm.save = save;
    vm.snippet = data;

    function close() {
        $modalInstance.close();
    }

    function save() {
        CribsheetFactory.upsert(vm.snippet);
        close();
    }

}
