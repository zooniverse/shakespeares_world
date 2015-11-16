'use strict';

var _ = require('lodash');
var Hammer = require('hammerjs');

require('./cribsheet.module.js')
    .directive('cropSnippet', cropSnippet);

// @ngInject
function cropSnippet($rootScope, CribsheetFactory) {
    var directive = {
        link: cropSnippetLink,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'cribsheet/crop.html',
    };
    return directive;

    function cropSnippetLink(scope, element) {

        // Setup
        var hammerElement;
        hammerElement = new Hammer(element[0]);
        // Events
        hammerElement.on('tap', openContextMenu);
        scope.$on('$destroy', $destroy);
        openCropDialog();

        // Methods
        function $destroy() {
            hammerElement.destroy();
            var data = _.clone(scope.data, true);
            $rootScope.$broadcast('snippet:delete', data);
        }

        function openContextMenu(event) {
            var contextMenuData = {
                event: event,
                menuOptions: [{
                    name: 'Delete',
                    action: _.partial(CribsheetFactory.destroy, scope.data)
                        }]
            };
            $rootScope.$broadcast('contextMenu:open', contextMenuData);
        }

        function openCropDialog() {

            $rootScope.$broadcast('cropDialog:open', {
                snippet: scope.data,
                element: element
            });
        }

    }

}
