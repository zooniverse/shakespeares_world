'use strict';

var _ = require('lodash');
var angular = require('angular');
var Hammer = require('hammerjs');

require('./marking-tools.module.js')
    .factory('graphicTool', graphicTool);

// @ngInject
function graphicTool($rootScope, $timeout, AnnotationsFactory, MarkingSurfaceFactory) {

    var factory;
    var _enabled;
    var _hammer;
    var _origin;
    var _rect;
    var _subject;

    factory = {
        name: 'graphic',
        activate: activate,
        deactivate: deactivate
    };

    return factory;

    function activate() {
        _hammer = new Hammer(document.querySelectorAll('.pan-zoom')[0]);

        if (_.isUndefined(_rect)) {
            _rect = angular.element(document.createElementNS(MarkingSurfaceFactory.svg[0].namespaceURI, 'rect'))
                .attr('class', 'graphic-annotation -temp')
                .appendTo(document.querySelectorAll('.graphic-annotations'));
        }

        _hammer.get('pan').set({
            direction: Hammer.DIRECTION_ALL,
            threshold: 0
        });
        _hammer.on('panstart', _startRect);
        _enable();
        MarkingSurfaceFactory.disable();
    }

    function deactivate() {
        _hammer.destroy();
        MarkingSurfaceFactory.enable();
    }

    function _checkOutOfBounds() {
        // Out of bounds - left
        if (_rect.attr('x') < 0) {
            _rect.attr('x', 0);
            _rect.attr('width', _origin.x);
        }

        // Out of bounds - right
        if (_rect.attr('width') > (_subject.width - _rect.attr('x'))) {
            _rect.attr('width', _subject.width - _rect.attr('x'));
        }

        // Out of bounds - top
        if (_rect.attr('y') < 0) {
            _rect.attr('y', 0);
            _rect.attr('height', _origin.y);
        }

        // Out of bounds - bottom
        if (_rect.attr('height') > (_subject.height - _rect.attr('y'))) {
            _rect.attr('height', _subject.height - _rect.attr('y'));
        }
    }

    function _disable() {
        $timeout(function () {
            _enabled = false;
        });
    }

    function _drawRect(event) {
        var newPoint = _getPoint(event);
        _rect.attr('x', (_origin.x < newPoint.x) ? _origin.x : newPoint.x);
        _rect.attr('y', (_origin.y < newPoint.y) ? _origin.y : newPoint.y);
        _rect.attr('width', (_origin.x < newPoint.x) ? newPoint.x - _rect.attr('x') : _origin.x - newPoint.x);
        _rect.attr('height', (_origin.y < newPoint.y) ? newPoint.y - _rect.attr('y') : _origin.y - newPoint.y);
        _checkOutOfBounds();
    }

    function _enable() {
        $timeout(function () {
            _enabled = true;
        });
    }

    function _endRect() {
        _hammer.off('panmove', _drawRect);
        _hammer.off('panend', _endRect);
<<<<<<< HEAD
=======

>>>>>>> master
        AnnotationsFactory.upsert({
            type: 'graphic',
            x: _rect.attr('x'),
            y: _rect.attr('y'),
            width: _rect.attr('width'),
            height: _rect.attr('height')
        });
        _rect.attr({
            width: 0,
            height: 0
        });
        $rootScope.$digest();
    }

    function _getPoint(event) {
        return MarkingSurfaceFactory.getPoint(event.srcEvent);
    }

    function _startRect(event) {

        if (_enabled && event.target.nodeName === 'image') {
            _hammer.on('panmove', _drawRect);
            _hammer.on('panend', _endRect);
            _origin = _getPoint(event);
            _rect.attr(_origin);
<<<<<<< HEAD
            //Not sure if this should be changed to
            //document.querySelector('.subject') for IE
            _subject = MarkingSurfaceFactory.svg.find('.subject').first()[0].getBBox();
=======
            //native document.querySelector get the first matching element
            //which achieves the same as JQuery .first()
            _subject = document.querySelector('.subject').getBBox();
>>>>>>> master
        }
    }
}
