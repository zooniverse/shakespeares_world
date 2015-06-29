'use strict';

var overlayConfig = {

    teiTags: [
        {
            name: 'Insertion',
            tag: 'insertion'
            },
        {
            name: 'Deletion',
            tag: 'deletion'
            },
        {
            name: 'Illegible',
            tag: 'illegible'
            },
        {
            name: 'Foreign Language',
            tag: 'foreign'
            }
        ],
    abbrKeys: [
        {
            name: 'Anno',
            tag: 'Anno'
            },
        {
            name: 'Esquire',
            tag: 'Esquire'
            },
        {
            name: 'Examinant',
            tag: 'Examinant'
            },
        {
            name: 'Honorable',
            tag: 'Honorable'
            }
        ]
};

module.exports = {
    constants: overlayConfig
};
