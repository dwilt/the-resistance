import { StyleSheet, Platform } from 'react-native';

import {
    gutter,
    getUniversalFont,
    white,
    lighterGray,
    darkGray,
    baseFontSize,
    minTouchSize,
    centerChildren,
    black,
    openSans,
} from 'styles';

export default StyleSheet.create({
    label: {
        ...getUniversalFont(1, 1.2),
        paddingLeft: gutter,
        paddingRight: gutter,
        marginBottom: gutter / 2,
        color: white,
        textAlign: `center`,
        fontFamily: openSans.bold,
    },
    inputsContainer: {
        flexDirection: `row`,
    },
    input: {
        ...getUniversalFont(1.5, 1),
        height: minTouchSize - 2,
        width: minTouchSize - 2,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 5,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: black,
        fontFamily: openSans.extraBold,
        textAlign: `center`,
    },
});
