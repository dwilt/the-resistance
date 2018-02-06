import { StyleSheet } from 'react-native';

import {
    openSans,
    gutter,
    windowWidth,
    yellow,
    white,
    getUniversalFont,
} from 'styles';

const playerWidth = (windowWidth - gutter * 3) / 2;

export default StyleSheet.create({
    container: {
        flexDirection: `row`,
        flexWrap: `wrap`,
        paddingLeft: gutter / 2,
        paddingRight: gutter / 2,
        marginBottom: gutter,
    },
    player: {
        width: playerWidth,
        marginBottom: gutter / 2,
        marginLeft: gutter / 2,
        marginRight: gutter / 2,
        flexDirection: `row`,
        alignItems: `flex-end`,
        borderWidth: 1,
        borderColor: white,
        borderRadius: 2,
        padding: gutter / 2,
    },
    selectedPlayer: {
        borderColor: yellow,
    },
    disabledPlayer: {
        opacity: 0.5,
    },
    underlinePlayer: {
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: gutter / 2,
        marginBottom: 0,
    },
    userIcon: {
        width: gutter * 1.25,
        height: gutter * 1.25,
        marginRight: gutter,
    },
    playerName: {
        ...getUniversalFont(1.2, 1),
        color: white,
    },
    selectedPlayerName: {
        color: yellow,
        fontFamily: openSans.bold,
    },
});
