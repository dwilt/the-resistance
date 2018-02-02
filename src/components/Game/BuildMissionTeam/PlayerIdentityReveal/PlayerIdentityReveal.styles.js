import { StyleSheet } from 'react-native';

import {
    getUniversalFont,
    centerChildren,
    gutter,
    yellow,
    openSans,
    windowWidth,
} from 'styles';

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
        flex: 1,
        padding: gutter,
    },
    innerContainer: {
        ...centerChildren(true),
    },
    title: {
        ...getUniversalFont(2),
        fontFamily: openSans.bold,
        color: yellow,
        marginBottom: gutter,
        textAlign: `center`,
    },
    subtitle: {
        ...getUniversalFont(1.2, 1.4),
        marginBottom: gutter * 2,
        textAlign: `center`,
        fontFamily: openSans.bold,
        maxWidth: windowWidth * 0.8,
        color: yellow,
    },
    spiesText: {
        ...getUniversalFont(1.2, 1.4),
        marginBottom: gutter * 2,
        textAlign: `center`,
        maxWidth: windowWidth * 0.8,
    },
    identityCard: {
        ...centerChildren(),
        marginBottom: gutter * 2,
    },
    aloneCheckbox: {
        marginBottom: gutter * 2,
    },
});
