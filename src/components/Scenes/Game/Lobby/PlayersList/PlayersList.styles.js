import { StyleSheet } from 'react-native';

import { getUniversalFont, white, openSans, gutter } from 'styles';

export default StyleSheet.create({
    container: {
    },
    player: {
        flexDirection: `row`,
        alignItems: `center`,
        borderBottomWidth: 1,
        borderBottomColor: white,
        paddingTop: gutter / 2,
        paddingBottom: gutter / 2,
    },
    userIcon: {
        width: gutter * 2,
        height: gutter * 2,
        marginRight: gutter,
    },
    name: {
        ...getUniversalFont(1),
        color: white,
        fontFamily: openSans.bold
    },
});
