'use strict';
var jsPDF = require('jspdf-browserify');
var _ = require('lodash');


require('./modals.module.js')
    .controller('TranscribeNextController', TranscribeNextController);

// @ngInject
function TranscribeNextController($modalInstance, ClassificationFactory, AnnotationsFactory) {
    var annotations = AnnotationsFactory.list();
    var vm = this;
    vm.cancel = cancel;
    vm.viewAnnotations = viewAnnotations;
    vm.submitBlank = submitBlank;
    vm.submitComplete = submitComplete;
    vm.submitIncomplete = submitIncomplete;

    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function close(result) {
        $modalInstance.close(result);
    }

    function error(result) {
        console.log('oh noes', result);
    }

    function submitBlank() {
        return ClassificationFactory.submitBlank()
            .then(close, error);
    }

    function submitComplete() {
        return ClassificationFactory.submitComplete()
            .then(close, error);
    }

    function submitIncomplete() {
        return ClassificationFactory.submitIncomplete()
            .then(close, error);
    }

    function viewAnnotations() {
        if (annotations.length > 0) {
            var i, doc = new jsPDF('p', 'mm');
            for (i = 0; i < annotations.length; i++) {
                doc.setProperties({
                    title: 'Your transcriptions',
                    subject: 'transcriptions'
                });
                doc.setTextColor(255, 69, 0);
                doc.setFont('times');
                doc.setFontSize(12);
                doc.setLineWidth(10);
                doc.margins = 50;
                //ForEach is deprecated. Do it another way.
                //doc.splitTextToSize method may be useful here.
                annotations.forEach(function (annotation, a) {
                    if (annotation.type != 'graphic') {
                        doc.text(10, 20 + (2 * a * 10), 'Type: ' + annotation.type + '\n' + 'Text: ' + annotation.text);
                    } else {
                        doc.text(10, 20 + (2 * a * 10), 'Type: ' + annotation.type + '\n' + 'Tag: ' + annotation.tag);
                    }
                });
            }
            doc.output('datauri');
            //doc.save('AnnotationsTest.pdf');
        } else {
            alert('No transcription found');
        }
    }
}
