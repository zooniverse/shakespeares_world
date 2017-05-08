'use strict';

var _ = require('lodash');
var angular = require('angular');
var Hammer = require('hammerjs');

require('./marking-tools.module.js')
    .factory('textTool', textTool);

// @ngInject
function textTool($rootScope, $timeout, AnnotationsFactory, MarkingSurfaceFactory, SubjectsFactory) {

    var factory;
    var _panzoom;
    var _enabled;

    factory = {
        name: 'text',
        activate: activate,
        deactivate: deactivate
    };

    return factory;

    function activate() {
        _panzoom = new Hammer(document.querySelectorAll('.pan-zoom')[0]);
        _panzoom.on('tap', _clickHandler);
        _enabled = true;
    }

    function deactivate() {
        var incomplete = _isLastAnnotationIncomplete();
        if (incomplete) {
            AnnotationsFactory.destroy(incomplete);
        }
        _panzoom.off('tap', _clickHandler);
    }

    function _clickHandler(event) {
        if (_enabled && event.target.nodeName === 'image') {
            var incomplete = _isLastAnnotationIncomplete();
            if (incomplete) {
                _endLine(event, incomplete);
            } else {
                _startLine(event);
            }
        }
    }

    function _disable() {
        _enabled = false;
    }

    function _enable() {
        function setEnabled() {
            _enabled = true;
        }
        $timeout(setEnabled);
    }

    function _endLine(event, annotation) {
        var point = MarkingSurfaceFactory.getPoint(event);
        AnnotationsFactory.upsert(_.extend(annotation, {
            complete: true,
            endPoint: {
                x: point.x,
                y: point.y
            }
        }));
        $rootScope.$apply();
    }

    function _isLastAnnotationIncomplete() {
        var last = _.filter(AnnotationsFactory.list(), {
            type: 'text'
        }).slice(-1)[0];
        return (_.isUndefined(last) || last.complete) ? false : last;
    }

    function _startLine(event) {
        console.log('SubjectsFactory.current.id', SubjectsFactory.current.data.id)
        var point = MarkingSurfaceFactory.getPoint(event);
        AnnotationsFactory.upsert({
            subject: SubjectsFactory.current.data.id,
            type: 'text',
            complete: false,
            startPoint: {
                x: point.x,
                y: point.y
            }
        });
        $rootScope.$digest();
    }

}
