'use strict';

require('./marking-tools.module.js')
    .factory('ToolsFactory', ToolsFactory);

var _ = require('lodash');

// @ngInject
function ToolsFactory($rootScope, textTool, graphicTool, cropTool, localStorageService) {

    var factory;

    factory = {
        text: new Tool(textTool),
        graphic: new Tool(graphicTool),
        crop: new Tool(cropTool)
    };

    return factory;

    function Tool(toolFactory) {
        this.name = toolFactory.name;
        this.active = false;
        this.disabled = anonymUser();
        this.toggle = toggle;
        this.markingTool = toolFactory;
        this._activate = _activate;
        this._deactivate = _deactivate;

        function toggle() {
            if (this.active) {
                this._deactivate();
            } else {
                _.forOwn(factory, function (tool) {
                    if (tool.active) {
                        tool._deactivate();
                    }
                });
                this._activate();
            }
        }

        function _activate() {
            this.active = true;
            this.markingTool.activate();
        }

        function _deactivate() {
            this.active = false;
            this.markingTool.deactivate();
        }

        function anonymUser() {
            var user = localStorageService.get('user');
            if (!user) {
                return true;
            } else {
                return false
            }

        }
    }

}
