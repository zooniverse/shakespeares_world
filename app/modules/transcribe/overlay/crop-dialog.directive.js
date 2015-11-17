'use strict';

var angular = require('angular');
var Draggabilly = require('draggabilly');

require('./overlay.module.js')
    .directive('cropDialog', cropDialog);

// @ngInject
function cropDialog() {
    var directive = {
        link: cropDialogLink,
        controllerAs: 'vm',
        controller: cropDialogController,
        replace: true,
        scope: true,
        templateUrl: 'overlay/crop-dialog.html'
    };
    return directive;

    // @ngInject
    function cropDialogLink(scope, element, attrs, dialog) {
        // Setup
        scope.close = dialog.close;
        scope.saveAndClose = dialog.saveAndClose;
        new Draggabilly(element[0], {
            containment: '.overlay',
            handle: '.heading'
        });
        // Events
        scope.$on('cropDialog:open', openDialog);
        // Methods
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
            if (position.top < 0) {
                position.top = constant;
            } else if ((position.top + dialog.height) > overlay.height) {
                position.top = overlay.height - dialog.height - constant;
            }
            scope.position = position;
        }
    }
}

// @ngInject
function cropDialogController($rootScope, CribsheetFactory, hotkeys, MarkingSurfaceFactory, $timeout) {
    var vm = this;
    var userInput = document.getElementById('#userInput');
    vm.active = false;
    vm.data = {};
    vm.close = closeDialog;
    vm.keyPress = onKeydown;
    vm.open = openDialog;
    vm.name = '';
    vm.saveAndClose = saveAndCloseDialog;
    $rootScope.$on('snippet:delete', function (event, deleted) {
        if (vm.data && vm.data.$$hashKey && deleted.$$hashKey === vm.data.$$hashKey) {
            closeDialog();
        }
    });

    function closeDialog() {
        MarkingSurfaceFactory.enable();
        vm.active = false;
        hotkeys.del('esc');
        $rootScope.$broadcast('event:close');
    }

    function getFocus() {
        userInput.focus();
    }

    function openDialog(data) {
        MarkingSurfaceFactory.disable();
        vm.active = true;
        vm.data = data.snippet;
        vm.name = data.snippet.name;
        hotkeys.add({
            callback: closeDialog,
            combo: 'esc'
        });
        CribsheetFactory.addUrl(vm.data);
        vm.src = vm.data.url;

        $timeout(getFocus);
    }

    function onKeydown(event) {
        if (event.which === 13) { // enter key
            event.preventDefault();
            saveAndCloseDialog();
        }
    }

    function saveAndCloseDialog() {
        if (vm.name !== vm.data.name) {
            vm.data.name = vm.name;
            CribsheetFactory.addUrl(vm.data);
            CribsheetFactory.upsert(vm.data);
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
