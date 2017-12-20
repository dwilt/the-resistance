import { StyleSheet, Platform } from 'react-native';

import {
    gutter,
    getUniversalFont,
    white,
    baseFontSize,
    minTouchSize,
    black,
    openSans,
} from 'styles';

export default StyleSheet.create({
    container: {
        marginBottom: gutter,
    },
    input: {
        flex: 1,
        height: minTouchSize - 2,
        paddingTop: gutter,
        paddingBottom: gutter,
        paddingLeft: gutter,
        paddingRight: gutter,
        ...getUniversalFont(),
        ...Platform.select({
            android: {
                textAlignVertical: `top`,
            },
        }),
    },
    multilineInput: {
        lineHeight: baseFontSize * 1.2,
    },
    label: {
        ...getUniversalFont(1, 1.2),
        paddingLeft: gutter,
        paddingRight: gutter,
        marginBottom: gutter / 2,
        color: white,
        textAlign: `center`,
        fontFamily: openSans.bold,
    },
    textContainer: {
        backgroundColor: white,
        borderColor: black,
        borderWidth: 1,
        alignItems: `center`,
        flexDirection: `row`,
        borderRadius: 5,
    },
});
