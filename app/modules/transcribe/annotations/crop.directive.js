'use strict';

var _ = require('lodash');
var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('cropAnnotation', cropAnnotation);

// @ngInject
function cropAnnotation($rootScope, AnnotationsFactory) {
    var directive = {
        link: cropAnnotationLink,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/crop.html',
    };
    return directive;

    function cropAnnotationLink(scope, element) {

        // Setup
        var hammerElement;
        hammerElement = new Hammer(element[0]);
        // Events
        hammerElement.on('tap', openContextMenu);
        scope.$on('$destroy', $destroy);
        // if text is undefined open dialog
        if (!scope.data.text) {
            openCropDialog();
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

            if (scope.data.type === 'crop') {
                contextMenuData.menuOptions.unshift({
                    name: 'Edit',
                    action: openCropDialog
                });
            }
            $rootScope.$broadcast('contextMenu:open', contextMenuData);
        }

        function openCropDialog() {

            $rootScope.$broadcast('cropDialog:open', {
                annotation: scope.data,
                element: element
            });
        }

    }

}
