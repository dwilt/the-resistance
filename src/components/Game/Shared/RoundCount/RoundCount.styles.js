import { StyleSheet } from 'react-native';

import {
    getUniversalFont,
    openSans,
    gutter,
    centerChildren,
    teal,
    yellow,
    red,
    darkGray,
} from 'styles/index';

export default StyleSheet.create({
    container: {
        marginLeft: gutter,
        marginRight: gutter,
        marginTop: gutter / 2,
        paddingTop: gutter / 2,
        borderTopWidth: 1,
        borderTopColor: darkGray,
        flexDirection: `row`,
    },
    numberContainer: {
        ...centerChildren(true),
        flex: 1,
        paddingTop: gutter / 4,
        paddingLeft: gutter,
        paddingRight: gutter,
        borderRightWidth: 1,
        borderRightColor: darkGray,
    },
    lastNumberContainer: {
        borderRightWidth: 0,
    },
    number: {
        ...getUniversalFont(2, 1.2),
        fontFamily: openSans.extraBold,
    },
    numberText: {
        ...getUniversalFont(0.9, 1.1),
        fontFamily: openSans.extraBold,
        textAlign: `center`,
    },
    passedNumber: {
        color: teal,
    },
    roundNumber: {
        color: yellow,
    },
    failedNumber: {
        color: red,
    },
});
