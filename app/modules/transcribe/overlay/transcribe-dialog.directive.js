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
function transcribeDialogController($rootScope, $scope, $compile, $element, $timeout, AnnotationsFactory, hotkeys, MarkingSurfaceFactory, overlayConfig) {
    var vm = this;
    var userInput = document.getElementById('#userInput');
    vm.abbreviations = overlayConfig.abbrKeys;
    vm.active = false;
    vm.close = closeDialog;
    vm.data = {};
    vm.keyPress = onKeydown;
    vm.html = addHtml;
    vm.open = openDialog;
    vm.saveAndClose = saveAndCloseDialog;
    vm.surround = surroundSelection;
    vm.tags = overlayConfig.teiTags;
    vm.title = '';
    vm.transcription = '';
    $rootScope.$on('annotation:delete', function (event, deleted) {
        if (vm.data && vm.data.$$hashKey && deleted.$$hashKey === vm.data.$$hashKey) {
            closeDialog();
        }
    });

    function surroundSelection(tag) {
        var tagNode = document.createElement(tag),
            sel = window.getSelection();
        if (window.getSelection) {
            if (sel.rangeCount) {
                var range = sel.getRangeAt(0).cloneRange();
                var c = document.createTextNode('\u200B');
                range.surroundContents(tagNode);
                range.collapse(false);
                range.insertNode(c);
                range.selectNode(c);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    function addHtml(html) {
        var c = document.createTextNode('\u200B'),
            prevSel = window.getSelection(),
            prevRange = prevSel.rangeCount ? prevSel.getRangeAt(0) : null,
            sel,
            range;
        if (window.getSelection) {
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
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        };

        function insertZWS(range) {
            range.collapse(false);
            range.insertNode(c);
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
        vm.title = (vm.data.type === 'marginalia') ? 'Transcribe marginalia' : 'Transcribe text';
        $timeout(getFocus);
    }

    function onKeydown(event) {
        console.log(event.which);
        if (event.which === 13) { // enter key
            event.preventDefault();
            saveAndCloseDialog();
        }
    }

    function saveAndCloseDialog() {
        if (vm.transcription !== vm.data.text) {
            if (vm.data.type === 'marginalia') {
                vm.data.text = '<sw-label>' + vm.transcription + '</sw-label>';
            } else {
                vm.data.text = vm.transcription;
            }
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
