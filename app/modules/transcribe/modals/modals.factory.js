'use strict';

require('./modals.module.js')
    .factory('ModalsFactory', ModalsFactory);

// @ngInject
function ModalsFactory($modal, ModalsConstants) {

    var factory;

    factory = {
        openExpired: openExpired,
        openNext: openNext,
        openTutorial: openTutorial,
        openTalk: openTalk,
        openVariants: openVariants
    };

    return factory;

    function openExpired() {
        return $modal.open(ModalsConstants.expired);
    }

    function openNext() {
        return $modal.open(ModalsConstants.next);
    }

    function openTalk() {
        return $modal.open(ModalsConstants.talk);
    }

    function openTutorial() {
        return $modal.open(ModalsConstants.tutorial);
    }

    function openVariants() {
        return $modal.open(ModalsConstants.variants);
    }

}
