'use strict';

var overlayConfig = {
    abbrKeys: [
        {
            name: 'w<sup>ch</sup>',
            tag: 'which',
            imgPath: 'images/keypad/which.png'
            },
        {
            name: 'w<sup>th</sup>, w<sup>t</sup>',
            tag: 'with',
            imgPath: 'images/keypad/with.png'
            },
        {
            name: 'y<sup>e</sup>',
            tag: 'the',
            imgPath: 'images/keypad/the.png'
            },

        {
            name: 'y<sup>t</sup>',
            tag: 'that',
            imgPath: 'images/keypad/that.png'
            },
        {
            name: 'yo<sup>r</sup>, y<sup>r</sup>',
            tag: 'your',
            imgPath: 'images/keypad/your.png'
            },
        {
            name: 'Ma<sup>tie</sup>',
            tag: 'maiestie',
            imgPath: 'images/keypad/majesty.png'
            },
        {
            name: 'Wor<sup>ll</sup>',
            tag: 'worshipfull',
            imgPath: 'images/keypad/worshipful.png'
            },
        {
            name: 'La:, La<sup>p</sup>',
            tag: 'lady',
            imgPath: 'images/keypad/lady.png'
            },
        {
            name: 'L:, L<sup>p</sup>',
            tag: 'lord',
            imgPath: 'images/keypad/lord.png'
            },
        {
            name: 's<sup>r</sup>',
            tag: 'sir',
            imgPath: 'images/keypad/sir.png'
            },
        {
            name: 'o<sup>r</sup>',
            tag: 'our',
            imgPath: 'images/keypad/our.png'
            },
        {
            name: 'ex<sup>t</sup>, exaite',
            tag: 'examinant',
            imgPath: 'images/keypad/examinant.png'
            },
        {
            name: 'Itm, it',
            tag: 'item',
            imgPath: 'images/keypad/item.png'
            },
        {
            name: 'lre',
            tag: 'letter',
            imgPath: 'images/keypad/letter.png'
            },
        {
            name: 'Ho:, hono<sup>ble</sup>',
            tag: 'honorable',
            imgPath: 'images/keypad/honorable.png'
            },
        {
            name: 'esq.',
            tag: 'esquire',
            imgPath: 'images/keypad/esquire.png'
            },
        {
            name: '-m<sup>t</sup>',
            tag: '-ment',
            imgPath: 'images/keypad/ment-suf.png'
            },
        {
            name: 'p<sup>d</sup>',
            tag: 'paid',
            imgPath: 'images/keypad/paid.png'
            },
        {
            name: 'a<sup>o</sup>',
            tag: 'anno',
            imgPath: 'images/keypad/anno.png'
            }
        ],
    teiTags: [
        {
            name: 'Expansion',
            tag: 'ex'
            },
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
            name: 'Sup',
            tag: 'sup'
            }
        ],

    graphics: {
        bookplate: {
            name: 'Bookplate',
            tag: '<graphic>bookplate<graphic/>'
        },
        booksellerLibrary: {
            name: 'Bookseller/Library Code',
            tag: '<graphic>bookseller-library-code<graphic/>'

        },
        bookOwnerStamp: {
            name: 'Book Owner Stamp',
            tag: '<graphic>book-owner-stamp<graphic/>'

        },
        coatOfArms: {
            name: 'Coat of Arms',
            tag: '<graphic>coat-of-arms<graphic/>'

        },
        illustration: {
            name: 'Illustration',
            tag: '<graphic>illustration<graphic/>'
        },
        initial: {
            name: 'Inhabited initial',
            tag: '<graphic>inhabited-initial<graphic/>'
        },
        map: {
            name: 'Map',
            tag: '<graphic>map<graphic/>'
        },
        manicule: {
            name: 'Manicule',
            tag: '<graphic>manicule<graphic/>'
        },
        treQuatrefoil: {
            name: 'Trefoil/Quatrefoil',
            tag: '<graphic>trefoil-quatrefoil<graphic/>'
        }
    }
};

module.exports = {
    constants: overlayConfig
};
