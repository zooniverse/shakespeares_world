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
            tag: 'anno',
            imgPath: '/images/keypad/anno.png'
            },
        {
            name: 'esq.',
            tag: 'esquire',
            imgPath: '/images/keypad/esquire.png'
            },
        {
            name: 'ex<sup>t</sup>, exaite',
            tag: 'examinant',
            imgPath: '/images/keypad/examinant.png'
            },
        {
            name: 'Ho:, hono<sup>ble</sup>',
            tag: 'honorable',
            imgPath: '/images/keypad/honorable.png'
            },
        {
            name: 'Imp, inp',
            tag: 'inprimis',
            imgPath: '/images/keypad/inprimis.png'
            },
        {
            name: 'Itm, it',
            tag: 'item',
            imgPath: '/images/keypad/item.png'
            },
        {
            name: 'La:, La<sup>p</sup>',
            tag: 'lady',
            imgPath: '/images/keypad/lady.png'
            },
        {
            name: 'M<sup>r</sup>',
            tag: 'mister',
            imgPath: '/images/keypad/mister.png'
            },
        {
            name: 'M<sup>rs</sup>, M<sup>ris</sup>',
            tag: 'mistress',
            imgPath: '/images/keypad/mistress.png'
            },
        {
            name: 'o<sup>r</sup>',
            tag: 'our',
            imgPath: '/images/keypad/our.png'
            },
        {
            name: 'p<sup>d</sup>',
            tag: 'paid',
            imgPath: '/images/keypad/paid.png'
            },
        {
            name: 's<sup>r</sup>',
            tag: 'sir',
            imgPath: '/images/keypad/sir.png'
            },
        {
            name: 'w<sup>ch</sup>',
            tag: 'which',
            imgPath: '/images/keypad/which.png'
            },
        {
            name: 'w<sup>th</sup>, w<sup>t</sup>',
            tag: 'with',
            imgPath: '/images/keypad/with.png'
            },
        {
            name: 'y<sup>e</sup>',
            tag: 'the',
            imgPath: '/images/keypad/the.png'
            },
        {
            name: 'y<sup>t</sup>',
            tag: 'that',
            imgPath: '/images/keypad/that.png'
            },
        {
            name: 'yo<sup>r</sup>, y<sup>r</sup>',
            tag: 'your',
            imgPath: '/images/keypad/your.png'
            },
        {
            name: '-m<sup>t</sup>',
            tag: '-ment',
            imgPath: '/images/keypad/ment-suf.png'
            }

        ]
};

module.exports = {
    constants: overlayConfig
};
