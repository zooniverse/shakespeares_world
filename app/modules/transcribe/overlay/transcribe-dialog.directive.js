'use strict';

var angular = require('angular');
var Draggabilly = require('draggabilly');

require('./overlay.module.js')
    .directive('transcribeDialog', transcribeDialog);

// @ngInject
function transcribeDialog() {
    var directive = {
        link: transcribeDialogLink,
        controllerAs: 'vm',
        controller: transcribeDialogController,
        replace: true,
        scope: true,
        templateUrl: 'overlay/transcribe-dialog.html'
    };
    return directive;

    // @ngInject
    function transcribeDialogLink(scope, element, attrs, dialog) {
        // Setup
        scope.close = dialog.close;
        scope.saveAndClose = dialog.saveAndClose;
        scope.tag = dialog.tag;
        new Draggabilly(element[0], {
            containment: '.overlay',
            handle: '.heading'
        });
        // Events
        scope.$on('transcribeDialog:open', openDialog);
        scope.$on('annotation:delete', closeDialogAfterDelete);


        // Methods
        function closeDialogAfterDelete(event, deleted) {
            if (scope.data && scope.data.$$hashKey && deleted.$$hashKey === scope.data.$$hashKey) {
                dialog.close();
            }
        }

        function openDialog(event, data) {
            dialog.open(data);
            positionDialog(event, data);
        }

        function positionDialog(event, data) {
            // Make sure that the dialog is positioned in a sensible place each
            // time it's opened. We always use the left and top values, as
            // that's what Dragabilly uses to determine position.
            var overlay = getDimensions(angular.element('.overlay').first());
            var group = getDimensions(data.element);
            var dialog = getDimensions(element);
            var constant = 10; // Used to give some space from the annotation

            var position = {
                left: (group.offset.left + (group.width / 2)) - (dialog.width / 2),
                top: group.offset.top - overlay.offset.top
            };

            var inTopHalf = (group.offset.top + group.height) < (overlay.height / 2) + overlay.offset.top;
            if (inTopHalf) {
                position.top = position.top + group.height + constant;
            } else {
                position.top = position.top - group.height - dialog.height - constant;
            }

            // Sanity check - is it off the screen?
            if (position.left < 0) {
                position.left = constant;
            } else if ((position.left + dialog.width) > overlay.width) {
                position.left = overlay.width - dialog.width - constant;
            }
            scope.position = position;
        }
    }
}
// @ngInject
function transcribeDialogController($rootScope, $scope, $element, $timeout, AnnotationsFactory, hotkeys, MarkingSurfaceFactory, overlayConfig) {
    var vm = this;
    var textarea = $element.find('textarea').first();
    vm.active = false;
    vm.data = {};
    vm.transcription = '';
    vm.keypad = toggleKeypad;
    vm.close = closeDialog;
    vm.open = openDialog;
    vm.saveAndClose = saveAndCloseDialog;

    function toggleKeypad() {
        $rootScope.$broadcast('event:toggle');
    }

    function closeDialog() {
        MarkingSurfaceFactory.enable();
        vm.active = false;
        hotkeys.del('esc');
        $rootScope.$broadcast('event:close');
    }

    function getFocus() {
        textarea[0].focus();
    }

    function openDialog(data) {
        MarkingSurfaceFactory.disable();
        vm.active = true;
        vm.data = data.annotation;
        vm.transcription = data.annotation.text;
        hotkeys.add({
            allowIn: ['TEXTAREA'],
            callback: closeDialog,
            combo: 'esc'
        });
        $timeout(getFocus);
    }

    function saveAndCloseDialog() {
        if (vm.transcription !== vm.data.text) {
            vm.data.text = vm.transcription;
            AnnotationsFactory.upsert(vm.data);
        }
        closeDialog();
    }
}


// Utility function to derive dimensions and offsets for dialog positioning,
// using getBoundingClientRect for SVG compatibility.
function getDimensions(element) {
    if (!element.jquery) {
        element = angular.element(element);
    }
    return {
        offset: element.offset(),
        height: element[0].getBoundingClientRect().height,
        width: element[0].getBoundingClientRect().width
    }
}
