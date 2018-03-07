'use strict';

require('./transcribe.module.js')
    .controller('TranscribeController', TranscribeController);

// @ngInject
function TranscribeController($stateParams, $modal, $scope, $window, AnnotationsFactory, AggregationsFactory, CribsheetFactory, ModalsFactory, localStorageService, SubjectsFactory) {
    // Setup controller
    var vm = this;
    vm.loading = SubjectsFactory.loading;
    vm.subject = SubjectsFactory.current;
    vm.$loadNext = loadNext;
    vm.$variantsAndNext = variantsFeedback;
    vm.$openTutorial = openTutorial;

    // Watchers
    $scope.$watch(getLoadingStatus, setLoadingStatus);

    // Init
    activate();

    // Functions / methods
    function activate() {
        if (localStorageService.get('viewedTutorial') === null) {
            localStorageService.set('viewedTutorial', true);
            openTutorial();
        }
        loadSubject()
            .then(function () {
                vm.annotations = AnnotationsFactory.list();
            });
    }

    function getLoadingStatus() {
        return SubjectsFactory.loading;
    }

    function loadAggregations() {
        return AggregationsFactory.$getData()
            .then(function () {
                vm.aggregations = AggregationsFactory.list();
            });
    }

    function variantsFeedback() {
        var annotations = AnnotationsFactory.list();
        var vArray = [];
        annotations.forEach(function (el) {
            if (el.type === 'text' && el.variants) {
                vArray.push(el.variants);
            }
        });
        if (vArray.length) {
            var variantsModal = ModalsFactory.openVariants();
            variantsModal.result.then(function () {
                loadNext();
            })
        } else {
            loadNext();
        }
    }


    function loadNext() {
        var modal1 = ModalsFactory.openNext();
        modal1.result
            .then(function () {
                var modal2 = ModalsFactory.openTalk();
                modal2.result
                    .then(function () {
                        AnnotationsFactory.reset();
                        SubjectsFactory.$advanceQueue()
                            .then(loadSubject);
                    });
            })
    }

    function loadSubject() {
        return SubjectsFactory.$getData($stateParams.subjectSet)
            .then(subjectLoaded)
            .then(loadAggregations)
            .catch(handleErrors);
    }

    function openTutorial() {
        ModalsFactory.openTutorial();
    }

    function setLoadingStatus() {
        vm.loading = SubjectsFactory.loading;
    }

    function subjectLoaded() {
        vm.subject = SubjectsFactory.current;
    }

    function handleErrors(result) {
        return Promise.reject(new Error('Error loading subject'));
    }
}
