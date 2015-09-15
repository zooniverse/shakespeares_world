'use strict';

var _ = require('lodash');
var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('graphicAnnotation', graphicAnnotation);

// @ngInject
function graphicAnnotation($rootScope, AnnotationsFactory) {
    var directive = {
        link: graphicAnnotationLink,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/graphic.html',
    };
    return directive;

    function graphicAnnotationLink(scope, element) {

        // Setup
        var hammerElement;
        hammerElement = new Hammer(element[0]);
        // Events
        hammerElement.on('tap', openContextMenu);
        scope.$on('$destroy', $destroy);
        // if tag is undefined open dialog
        if (!scope.data.tag) {
            openGraphicDialog();
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

            if (scope.data.type === 'graphic') {
                contextMenuData.menuOptions.unshift({
                    name: 'Edit',
                    action: openGraphicDialog
                });
            }
            $rootScope.$broadcast('contextMenu:open', contextMenuData);
        }

        function openGraphicDialog() {
            $rootScope.$broadcast('graphicDialog:open', {
                annotation: scope.data,
                element: element
            });
        }

    }

}
