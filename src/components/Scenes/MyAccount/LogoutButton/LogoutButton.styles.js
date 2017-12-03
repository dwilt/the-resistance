import {
    StyleSheet,
} from 'react-native';

import {
    getUniversalFont,
    darkGray,
    gutter,
} from '/styles';

export const iconColor = darkGray;
export const iconSize = gutter * 1.5;

export default StyleSheet.create({
    container: {
        flexDirection: `row`,
        alignItems: `center`,
        marginLeft: gutter * 2,
        marginBottom: gutter,
    },
    text: {
        ...getUniversalFont(),
        color: darkGray,
        marginTop: 3,
        marginLeft: gutter / 2,
    },
});
