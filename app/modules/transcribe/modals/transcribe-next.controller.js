'use strict';
var jsPDF = require('jspdf-browserify');

require('./modals.module.js')
    .controller('TranscribeNextController', TranscribeNextController);

// @ngInject
function TranscribeNextController($modalInstance, ClassificationFactory, AnnotationsFactory, SubjectsFactory) {
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
        var annotations = AnnotationsFactory.list();

        if (annotations.length > 0) {

            // Set up the jsPDF document
            var doc = new jsPDF('p', 'mm');
            doc.setProperties({
                title: 'Your transcriptions',
                subject: 'Transcriptions',
            });
            doc.setTextColor(18, 18, 18);
            doc.setFontSize(12);

            // We use a monospace font to ensure we our text wraps in a
            // consistent way. Unfortunately, there's a bug in jsPDF that
            // prevents it working on localhost, use terminal instead
            // for testing: https://github.com/MrRio/jsPDF/issues/509
            doc.setFont('courier');

            // We need to break up each transcription into separate lines, in
            // order to make them wrap. By reducing over them, instead of
            // looping, we can create an array of text strings and let jsPDF
            // handle line height.
            var text = annotations.reduce(function (strings, annotation) {
                var type = annotation.type;
                var content = doc.splitTextToSize(titleCase(type) + ': '
                    + annotation[type], 100);

                strings.push('Type: ' + type);
                strings = strings.concat(content);
                strings.push('\n');

                return strings;
            }, []);

            doc.text(10, 20, text);
            doc.save('Subject-' + SubjectsFactory.current.data.id + '.pdf');
        } else {
            alert('No transcription found');
        }

    }
}

function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
