'use strict';

var angular = require('angular');

require('./overlay.module.js')
    .directive('contentEditable', contentEditable);

// @ngInject
function contentEditable() {
    var directive = {
        link: contentEditableLink,
        require: '?ngModel'
    };
    return directive;
    // @ngInject
    function contentEditableLink(scope, element, attrs, ngModel) {
        console.log('ng-model: ', ngModel);
        if (!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function () {
            element.html(ngModel.$viewValue || '');
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function () {
            scope.$evalAsync(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
            var html = element.html();
            // When we clear the content editable the browser leaves a <br> behind
            // we strip this out
            if (html == '<br>') {
                html = '';
            }
            ngModel.$setViewValue(html);
        }
    }
}
