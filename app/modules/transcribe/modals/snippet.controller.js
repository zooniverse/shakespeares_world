'use strict';

require('./modals.module.js')
    .controller('SnippetController', SnippetController);

// @ngInject
function SnippetController($modalInstance, $scope, CribsheetFactory, data, $timeout) {

    var vm = this;
    vm.close = close;
    vm.save = save;
    vm.snippet = CribsheetFactory.addUrl(data);

    function close() {
        $modalInstance.close();
    }

    function save() {
        CribsheetFactory.upsert(vm.snippet);
        close();
    }

    $timeout(function () {
        document.getElementById('user-input').focus();
    }, 100);

}
