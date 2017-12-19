import { StyleSheet } from 'react-native';

import { getUniversalFont, white, openSans, gutter } from 'styles';

export default StyleSheet.create({
    container: {
    },
    player: {
        flexDirection: `row`,
        alignItems: `center`,
        paddingBottom: gutter * 0.75,
    },
    userIcon: {
        width: gutter * 1.5,
        height: gutter * 1.5,
        marginRight: gutter,
    },
    name: {
        ...getUniversalFont(1),
        color: white,
        fontFamily: openSans.bold
    },
});
