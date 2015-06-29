'use strict';

var angular = require('angular');

require('./overlay.module.js')
    .directive('transcribeDialog', transcribeDialog);

function keypad($rootScope, hotkeys){

    var directive = {
        link: keypadLink,



    }

}
