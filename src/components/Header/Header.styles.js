import { StyleSheet } from 'react-native';

import { getUniversalFont, gutter } from 'styles';

const iconSize = gutter * 1.5;

export default StyleSheet.create({
    container: {
        paddingLeft: gutter,
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
