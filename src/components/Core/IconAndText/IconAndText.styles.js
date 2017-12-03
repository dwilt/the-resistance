import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    darkGray,
    getUniversalFont,
} from '/styles';

export const iconSize = gutter * 2.5;
export const iconColor = darkGray;

export default StyleSheet.create({
    container: {
        padding: gutter * 2,
        paddingTop: gutter,
    },
    textContainer: {
        marginTop: gutter,
    },
    text: {
        ...getUniversalFont(1, 1.4),
        color: darkGray,
        textAlign: `center`,
    },
});
