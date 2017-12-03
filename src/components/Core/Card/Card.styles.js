import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    gutter,
    getUniversalFont,
    grayBlue,
    darkGray,
    lato,
} from '/styles';

export const iconSize = gutter * 2;
export const iconColor = darkGray;

export default StyleSheet.create({
    container: {
        flexDirection: `row`,
        backgroundColor: `white`,
        borderRadius: 4,
        padding: gutter,
    },
    noSubtitleContainer: {
        alignItems: `center`,
    },
    iconContainer: {
        ...centerChildren(true),
        width: gutter * 3,
        height: gutter * 3,
        marginRight: gutter,
    },
    content: {
        width: 0,
        flex: 1,
    },
    title: {
        ...getUniversalFont(),
        color: darkGray,
        fontFamily: lato.bold,
    },
    subtitle: {
        ...getUniversalFont(0.9, 1.2),
        marginTop: gutter / 4,
        color: grayBlue,
    },
});
