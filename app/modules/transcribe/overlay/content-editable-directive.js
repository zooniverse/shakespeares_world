'use strict';

require('./overlay.module.js')
    .directive('contentEditable', contentEditable);

function contentEditable() {
    var directive = {
        link: contentEditableLink,
        restrict: 'A',
        require: '?ngModel'
    };
    return directive;

    function contentEditableLink(scope, element, attrs, ngModel) {
        if (!ngModel) {
            return; // do nothing if no ng-model
        }

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
            // Strips <br> if browser leaves it behind
            if (html === '<br>') {
                html = '';
            }
            ngModel.$setViewValue(html);
        }
    }
}
