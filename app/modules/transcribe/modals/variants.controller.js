'use strict';

require('./modals.module.js')
    .controller('VariantsController', VariantsController);

// @ngInject
function VariantsController($modalInstance) {
    var vm = this;
    vm.close = close;

    function close(result) {
        $modalInstance.close(result);
    }
}
