'use strict';
var jsPDF = require('jspdf-browserify');

require('./modals.module.js')
    .controller('TranscribeNextController', TranscribeNextController);

// @ngInject
function TranscribeNextController($modalInstance, ClassificationFactory, AnnotationsFactory, SubjectsFactory) {
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
                    subject: 'Transcriptions'
                });
                doc.setTextColor(18, 18, 18);
                doc.setFont('times');
                doc.setFontSize(12);
                if (annotations[i].type !== '   graphic') {
                    doc.text(10, 20 + (2 * i * 10), 'Type: ' + annotations[i].type + '\n' + 'Text: ' + annotations[i].text);
                } else {
                    doc.text(10, 20 + (2 * i * 10), 'Type: ' + annotations[i].type + '\n' + 'Tag: ' + annotations[i].tag);
                }
            }
            doc.save('Subject-' + SubjectsFactory.current.data.id + '.pdf');
        } else {
            alert('No transcription found');
        }
    }
}
