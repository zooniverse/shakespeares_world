'use strict';

var _ = require('lodash');
var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('imageAnnotation', imageAnnotation);

// @ngInject
function imageAnnotation($rootScope, AnnotationsFactory) {
    var directive = {
        link: imageAnnotationLink,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/image.html',
    };
    return directive;

    // @ngInject
    function imageAnnotationLink(scope, element) {

        // Setup
        var hammerElement;
        hammerElement = new Hammer(element[0]);
        // Events
        hammerElement.on('tap', openContextMenu);
        scope.$on('$destroy', $destroy);
        console.log(scope.data.tag);
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

            if (scope.data.type === 'image') {
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
