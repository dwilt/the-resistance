import { StyleSheet } from 'react-native';

import { minTouchSize, white, getUniversalFont, gutter } from 'styles';

const iconSize = gutter * 1.5;

export const menuIconSize = iconSize;
export const menuIconColor = white;

export default StyleSheet.create({
    container: {
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
    },
    username: {
        ...getUniversalFont(1.2),
    },
    icon: {
        width: iconSize,
        height: iconSize,
    },
});
