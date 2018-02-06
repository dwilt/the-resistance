import { StyleSheet } from 'react-native';

import { windowWidth, gutter, openSans } from 'styles';

export default StyleSheet.create({
    container: {},
    players: {
        paddingLeft: gutter,
        paddingRight: gutter,
        marginTop: gutter,
        marginBottom: gutter,
    },
    wrapPlayers: {
        flexDirection: `row`,
        flexWrap: `wrap`,
    },
    player: {
        width: (windowWidth - gutter * 2) / 2,
        marginBottom: gutter / 2,
        flexDirection: `row`,
        alignItems: `center`,
    },
    leaderPlayer: {
        marginBottom: gutter,
    },
    switchContainer: {
        marginRight: gutter / 2,
    },
    playerName: {
        paddingRight: gutter,
    },
    boldName: {
        fontFamily: openSans.bold,
    },
});
