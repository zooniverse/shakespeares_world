'use strict';

var _ = require('lodash');
var angular = require('angular');
var Hammer = require('hammerjs');

require('./marking-tools.module.js')
    .factory('cropTool', cropTool);

// @ngInject
function cropTool($rootScope, $timeout, CribsheetFactory, MarkingSurfaceFactory, ModalsFactory, SubjectsFactory) {

    var factory;
    var _enabled;
    var _hammer;
    var _origin;
    var _rect;
    var _subject;

    factory = {
        name: 'crop',
        activate: activate,
        deactivate: deactivate
    };

    return factory;

    function activate() {
        _hammer = new Hammer(MarkingSurfaceFactory.svg.find('.pan-zoom')[0]);
        _hammer.get('pan').set({
            direction: Hammer.DIRECTION_ALL,
            threshold: 0
        });
        _hammer.on('panstart', _startRect);
        _enable();
        MarkingSurfaceFactory.disable();
    }

    function deactivate() {
        console.log('snippet off')
        _hammer.destroy();
        MarkingSurfaceFactory.enable();
        _reset();
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
        var newPoint = MarkingSurfaceFactory.getPoint(event.srcEvent);
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
        var snippet = {
            original: {
                subject_id: SubjectsFactory.current.data.id,
                location: SubjectsFactory.current.image.src
            },
            x: _rect.attr('x'),
            y: _rect.attr('y'),
            width: _rect.attr('width'),
            height: _rect.attr('height')
        };
        ModalsFactory.saveSnippet(snippet);
        _reset();
    }

    function _reset() {
        if (_rect) {
            _rect.remove();
            _rect = undefined;
        }
    }

    function _startRect(event) {

        if (_.isUndefined(_rect)) {
            _rect = angular.element(document.createElementNS(MarkingSurfaceFactory.svg[0].namespaceURI, 'rect'))
                .attr('class', 'crop-snippet -temp')
                .appendTo(MarkingSurfaceFactory.svg.find('.rotate-container'));
        }

        if (_enabled && event.target.nodeName === 'image') {
            _hammer.on('panmove', _drawRect);
            _hammer.on('panend', _endRect);
            _origin = MarkingSurfaceFactory.getPoint(event.srcEvent);
            _rect.attr(_origin);
            //native document.querySelector get the first matching element
            //which achieves the same as JQuery .first()
            _subject = document.querySelector('.subject').getBBox();
        }
    }
}
