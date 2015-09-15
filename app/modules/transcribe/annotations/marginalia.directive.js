'use strict';

var _ = require('lodash');
var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('marginaliaAnnotation', marginaliaAnnotation);

// @ngInject
function marginaliaAnnotation($rootScope, AnnotationsFactory) {
    var directive = {
        link: marginaliaAnnotationLink,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/marginalia.html',
    };
    return directive;

    function marginaliaAnnotationLink(scope, element) {

        // Setup
        var hammerElement;
        hammerElement = new Hammer(element[0]);
        // Events
        hammerElement.on('tap', openContextMenu);
        scope.$on('$destroy', $destroy);
        // if text is undefined open dialog
        if (!scope.data.text) {
            openTranscribeDialog();
        }

        // Methods
        function $destroy() {
            hammerElement.destroy();
            var data = _.clone(scope.data, true);
            $rootScope.$broadcast('annotation:delete', data);
        }

        function openContextMenu(event) {
            var contextMenuData = {
                event: event,
                menuOptions: [{
                    name: 'Delete',
                    action: _.partial(AnnotationsFactory.destroy, scope.data)
                        }]
            };

            if (scope.data.type === 'marginalia') {
                contextMenuData.menuOptions.unshift({
                    name: 'Edit',
                    action: openTranscribeDialog
                });
            }
            $rootScope.$broadcast('contextMenu:open', contextMenuData);
        }

        function openTranscribeDialog() {

            $rootScope.$broadcast('transcribeDialog:open', {
                annotation: scope.data,
                element: element
            });
        }

    }

}
