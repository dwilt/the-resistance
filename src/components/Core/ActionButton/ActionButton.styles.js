import { StyleSheet } from 'react-native';

import {
    getUniversalFont,
    white,
    gutter,
    centerChildren,
    fullscreen,
    minTouchSize,
    yellow,
    teal,
    openSans,
} from 'styles';

export default StyleSheet.create({
    container: {
        position: `relative`,
    },
    loader: {
        ...centerChildren(),
        ...fullscreen,
    },
    textContainer: {
        ...centerChildren(),
        marginBottom: gutter,
        height: minTouchSize,
        paddingTop: gutter,
        paddingBottom: gutter,
        paddingLeft: gutter * 2,
        paddingRight: gutter * 2,
        borderRadius: 5,
    },
    yellowContainer: {
        backgroundColor: yellow,
    },
    tealContainer: {
        backgroundColor: teal,
    },
    disabled: {
        opacity: 0.5,
    },
    hiddenText: {
        opacity: 0,
    },
    text: {
        ...getUniversalFont(1.4, 1.4),
        color: white,
        textAlign: `center`,
        fontFamily: openSans.bold,
    },
});
