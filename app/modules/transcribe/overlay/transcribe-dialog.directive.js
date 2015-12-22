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
            var constant = 15; // Used to give some space from the annotation

            var position = {
                left: group.offset.left + (group.width / 2),
                top: group.offset.top - (overlay.offset.top - constant)
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
function transcribeDialogController($rootScope, $scope, $compile, $element, $timeout, AnnotationsFactory, hotkeys, MarkingSurfaceFactory, overlayConfig) {
    var vm = this;
    var userInput = document.getElementById('#transcribeInput');
    vm.abbreviations = overlayConfig.abbrKeys;
    vm.active = false;
    vm.close = closeDialog;
    vm.data = {};
    vm.keyPress = onKeydown;
    vm.html = addHtml;
    vm.open = openDialog;
    vm.saveAndClose = saveAndCloseDialog;
    vm.addTag = addTag;
    vm.tags = overlayConfig.teiTags;
    vm.title = '';
    vm.transcription = '';
    $rootScope.$on('annotation:delete', function (event, deleted) {
        if (vm.data && vm.data.$$hashKey && deleted.$$hashKey === vm.data.$$hashKey) {
            closeDialog();
        }
    });

    // Adds a type tag to the transcription input. Surrounds the selected text
    // with the tag passed in, does nothing if there's no text selected.
    function addTag(tag) {
        if (window.getSelection) {
            var selection = window.getSelection();
            if (selection.focusOffset !== selection.anchorOffset) {
                var range = selection.getRangeAt(0).cloneRange();
                range.surroundContents(document.createElement(tag));
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    function addHtml(html) {
        if (window.getSelection) {

            var prevSel = window.getSelection();
            var prevRange = prevSel.rangeCount ? prevSel.getRangeAt(0) : null;
            var sel;
            var range;

            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                var frag = document.createDocumentFragment(),
                    node,
                    lastNode;
                range = sel.getRangeAt(0);
                var appendToEnd = !angular.equals(range, prevRange);
                range.deleteContents();
                var el = document.createElement('div');
                el.innerHTML = html;

                $compile(el)($scope);

                while (node = el.firstChild) {
                    lastNode = frag.appendChild(node);
                    insertZWS(range);

                }
                if (appendToEnd) {
                    userInput.appendChild(frag);
                    insertZWS(range);

                } else {
                    range.insertNode(frag);
                    insertZWS(range);

                }
                // Preserve the selection
                // to focus after input
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type !== 'Control') {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }

        function insertZWS(range) {
            range.collapse(false);
            range.insertNode(document.createTextNode('\u200B'));
            range.collapse(false);
        }
    }

    function closeDialog() {
        MarkingSurfaceFactory.enable();
        vm.active = false;
        hotkeys.del('esc');
    }

    function getFocus() {
        userInput.focus();
    }

    function openDialog(data) {
        MarkingSurfaceFactory.disable();
        vm.active = true;
        vm.data = data.annotation;
        vm.transcription = data.annotation.text;
        vm.title = 'Transcribe text';
        $timeout(getFocus);
    }

    function onKeydown(event) {
        if (event.which === 13) { // enter key
            event.preventDefault();
            saveAndCloseDialog();
        }
    }

    function saveAndCloseDialog() {
        if (vm.transcription !== vm.data.text) {
            vm.data.text = vm.transcription;
            AnnotationsFactory.checkVariants(vm.data);
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
    };
}
