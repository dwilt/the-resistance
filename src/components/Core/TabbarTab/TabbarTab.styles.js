import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    darkGray,
    blue,
    getUniversalFont,
    lato,
} from '/styles';

export const iconSize = gutter * 1.25;
export const inactiveIconColor = darkGray;
export const activeIconColor = blue;

export default StyleSheet.create({
    label: {
        ...getUniversalFont(0.8),
        marginTop: gutter / 2,
        color: darkGray,
        fontFamily: lato.regular,
    },
    activeLabel: {
        color: blue,
    },
});
