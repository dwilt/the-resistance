import {
    StyleSheet,
} from 'react-native';

import {
    getUniversalFont,
    darkBlue,
    blue,
    white,
    gutter,
    centerChildren,
    fullscreen,
} from '/src/styles/index';

const height = gutter * 2.5;

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
        minHeight: height - gutter,
        paddingTop: gutter,
        paddingBottom: gutter,
        paddingLeft: gutter * 2,
        paddingRight: gutter * 2,
        borderRadius: 2,
    },
    tealTextContainer: {
        backgroundColor: blue,
    },
    darkTealTextContainer: {
        backgroundColor: darkBlue,
    },
    disabled: {
        opacity: 0.5,
    },
    hiddenText: {
        opacity: 0,
    },
    text: {
        ...getUniversalFont(1.2),
        color: white,
        fontWeight: `bold`,
        textAlign: `center`,
    },
});
