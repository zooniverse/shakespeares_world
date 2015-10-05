'use strict';

var overlayConfig = {
    abbrKeys: [
        {
            html: 'w<i>hi</i>ch',
            imgPath: 'images/keypad/which.png',
            name: 'w<sup>ch</sup>',
            tag: 'w<ex>hi</ex><sl>ch</sl>',
            title: 'Which'
            },
        {
            html: 'w<i>hi</i>ch',
            imgPath: 'images/keypad/with.png',
            name: 'w<sup>th</sup>, w<sup>t</sup>',
            tag: 'w<ex>i</ex><sl>th</sl>',
            title: 'With'
            },
        {
            html: '<i>th</i>e',
            imgPath: 'images/keypad/the.png',
            name: 'y<sup>e</sup>',
            tag: '<brev-y>th</brev-y><sl>e</sl>',
            title: 'The'
            },
        {
            html: '<i>th</i>at',
            imgPath: 'images/keypad/that.png',
            name: 'y<sup>t</sup>',
            tag: '<brev-y>th</brev-y><ex>a</ex><sl>t</sl>',
            title: 'That'
            },
        {
            html: '<i>th</i>em',
            imgPath: 'images/keypad/them.png',
            name: 'y<sup>m</sup>',
            tag: '<brev-y>th</brev-y><ex>e</ex><sl>m</sl>',
            title: 'Them'
            },
        {
            html: 'y<i>uo</i>r',
            imgPath: 'images/keypad/your.png',
            name: 'yo<sup>r</sup>, y<sup>r</sup>',
            tag: 'y<ex>ou</ex><sl>r</sl>',
            title: 'Your'
            },
        {
            html: 'Ma<i>ies</i>tie',
            imgPath: 'images/keypad/majesty.png',
            name: 'Ma<sup>tie</sup>',
            tag: 'Ma<ex>ies</ex><sl>tie</sl>',
            title: 'Maiestie'
            },
        {
            html: 'Wor<i>shipfu</i>ll',
            imgPath: 'images/keypad/worshipful.png',
            name: 'Wor<sup>ll</sup>',
            tag: 'Wor<ex>shipfu</ex><sl>ll</sl>',
            title: 'Worshipfull'
            },
        {
            html: 'La<i>dy</i>',
            imgPath: 'images/keypad/lady.png',
            name: 'La:, La<sup>p</sup>',
            tag: 'La<ex>dy</ex>',
            title: 'Lady'
            },
        {
            html: 'L<i>ord</i>',
            imgPath: 'images/keypad/lord.png',
            name: 'L:, L<sup>p</sup>',
            tag: 'L<ex>ord</ex>',
            title: 'Lord'
            },
        {
            html: 'S<i>i</i>r',
            imgPath: 'images/keypad/sir.png',
            name: 'S<sup>r</sup>',
            tag: 'S<ex>i</ex><sl>r</sl>',
            title: 'Sir'
            },
        {
            html: 'O<i>u</i>r',
            imgPath: 'images/keypad/our.png',
            name: 'o<sup>r</sup>',
            tag: 'o<ex>u</ex><sl>r</sl>',
            title: 'Our'
            },
        {
            html: 'Exa<i>m</i>i<i>nan</i>te',
            imgPath: 'images/keypad/examinant.png',
            name: 'Ex<sup>t</sup>, Exaite',
            tag: 'Exa<ex>m</ex>i<ex>nan</ex>te',
            title: 'Examinante'
            },
        {
            html: 'It<i>e</i>m',
            imgPath: 'images/keypad/item.png',
            name: 'Itm, it',
            tag: 'It<ex>e</ex>m',
            title: 'Item'
            },
        {
            html: 'l<i>ett</i>re',
            imgPath: 'images/keypad/letter.png',
            name: 'lre',
            tag: 'l<ex>ett</ex>re',
            title: 'Lettre'
            },
        {
            html: 'Ho<i>norable</i>',
            imgPath: 'images/keypad/honorable.png',
            name: 'Ho:, hono<sup>ble</sup>',
            tag: 'Ho<ex>norable</ex>',
            title: 'Honorable'
            },
        {
            html: 'Esq<i>uire</i>',
            imgPath: 'images/keypad/esquire.png',
            name: 'esq.',
            tag: 'Esq<ex>uire</ex>',
            title: 'Esquire'
            },
        {
            html: '<i>es</i>',
            imgPath: 'images/keypad/graph-es.png',
            name: 'es',
            tag: '<brev-es>es</brev-es>',
            title: 'Brev-es'
            },
        {
            html: 'm<i>en</i>t',
            imgPath: 'images/keypad/ment-suf.png',
            name: 'm<sup>t</sup>',
            tag: 'm<ex>en</ex><sl>t</sl>',
            title: 'Ment'
            },
        {
            html: 'p<i>ai</i>d',
            imgPath: 'images/keypad/paid.png',
            name: 'p<sup>d</sup>',
            tag: 'p<ex>ai</ex><sl>d</sl>',
            title: 'Paid'
            },
        {
            html: 'A<i>nn</i><sl>o</sl>',
            imgPath: 'images/keypad/anno.png',
            name: 'A<sup>o</sup>',
            tag: 'A<ex>nn</ex><sl>o</sl>',
            title: 'Anno'
            }
        ],
    teiTags: [
        {
            name: 'Expansion',
            tag: 'sw-ex'
            },
        {
            name: 'Insertion',
            tag: 'sw-ins'
            },
        {
            name: 'Deletion',
            tag: 'sw-del'
            },
        {
            name: 'Unclear',
            tag: 'sw-unclear'
            },
        {
            name: 'Superscript',
            tag: 'sw-sup'
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
        flourish: {
            name: 'Flourish',
            tag: '<graphic>flourish<graphic/>'
        },
        illustration: {
            name: 'Illustration',
            tag: '<graphic>illustration<graphic/>'
        },
        initial: {
            name: 'Decorated initial',
            tag: '<graphic>decorated-initial<graphic/>'
        },
        line: {
            name: 'Line',
            tag: '<graphic>line<graphic/>'
        },
        manicule: {
            name: 'Manicule',
            tag: '<graphic>manicule<graphic/>'
        },
        seal: {
            name: 'Seal',
            tag: '<graphic>seal<graphic/>'
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
