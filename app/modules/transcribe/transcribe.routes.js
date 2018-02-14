'use strict';

require('./transcribe.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {
    $stateProvider
        .state('TranscribeSubjectSet', {
            url: '/classify/:subjectSet',
            title: 'Transcribe',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'transcribe/classify.html',
                    controller: 'TranscribeController as vm'
                }
            },
            params: {
                hideHook: true,
                smallFooter: true
            }
        })
        .state('Transcribe', {
            url: '/classify',
            title: 'Transcribe',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'transcribe/classify.html',
                    controller: 'TranscribeController as vm'
                }
            },
            params: {
                hideHook: true,
                smallFooter: true
            }
        });

}
