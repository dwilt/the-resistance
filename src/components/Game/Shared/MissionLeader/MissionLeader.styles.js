import { StyleSheet } from 'react-native';

import {
    getUniversalFont,
    white,
    openSans,
    gutter,
    centerChildren,
} from 'styles/index';

const iconWidth = 30;

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
    },
    title: {
        ...getUniversalFont(1),
        color: white,
        textAlign: `center`,
        fontFamily: openSans.light,
    },
    leader: {
        ...getUniversalFont(1.3),
        fontFamily: openSans.bold,
        color: white,
        textAlign: `center`,
        marginBottom: gutter / 4,
    },
    icon: {
        width: iconWidth,
        height: iconWidth * 1.414634146,
        marginBottom: gutter / 4,
    },
});
