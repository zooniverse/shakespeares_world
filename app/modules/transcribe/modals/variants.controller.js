'use strict';

require('./modals.module.js')
    .controller('VariantsController', VariantsController);

// @ngInject
function VariantsController($modalInstance, AnnotationsFactory) {
    var vm = this;
    vm.close = close;
    vm.data = AnnotationsFactory.list();
    vm.variants = getVariants;

    function close(result) {
        $modalInstance.close(result);
    }

    function getVariants() {

    }


}
