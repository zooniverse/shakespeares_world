'use strict';

var overlayConfig = {

    teiTags: [
        {
            name: 'Insertion',
            tag: 'ins'
            },
        {
            name: 'Deletion',
            tag: 'del'
            },
        {
            name: 'Unclear, unsure',
            tag: 'unclear'
            },
        {
            name: 'Expansion',
            tag: 'ex'
            }
        ],
    abbrKeys: [
        {
            name: 'a<sup>o</sup>',
            tag: 'anno'
            },
        {
            name: 'esq.',
            tag: 'esquire',
            imgPath: '/images/keypad/esquire.png'
            },
        {
            name: 'ex<sup>t</sup>, exaite',
            tag: 'examinant'
            },
        {
            name: 'Ho:, hono<sup>ble</sup>',
            tag: 'honorable'
            },
        {
            name: 'Imp, inp',
            tag: 'imprimis'
            },
        {
            name: 'Itm, it',
            tag: 'item'
            },
        {
            name: 'La:, La<sup>p</sup>',
            tag: 'lady'
            },
        {
            name: 'M<sup>r</sup>',
            tag: 'mister'
            },
        {
            name: 'M<sup>rs</sup>, M<sup>ris</sup>',
            tag: 'mistress'
            },
        {
            name: 'o<sup>r</sup>',
            tag: 'our'
            },
        {
            name: 'p<sup>d</sup>',
            tag: 'paid'
            },
        {
            name: 's<sup>r</sup>',
            tag: 'sir'
            },
        {
            name: 'w<sup>ch</sup>',
            tag: 'which'
            },
        {
            name: 'w<sup>th</sup>, w<sup>t</sup>',
            tag: 'with'
            },
        {
            name: 'y<sup>e</sup>',
            tag: 'the'
            },
        {
            name: 'y<sup>t</sup>',
            tag: 'That'
            },
        {
            name: 'yo<sup>r</sup>, y<sup>r</sup>',
            tag: 'your'
            },
        {
            name: '-m<sup>t</sup>',
            tag: '-ment'
            }

        ]
};

module.exports = {
    constants: overlayConfig
};
