import { StyleSheet } from 'react-native';

import { gutter, getUniversalFont } from 'styles/index';

export default StyleSheet.create({
    container: {
        marginTop: gutter * 2,
    },
    players: {
        marginTop: gutter * 2,
        marginBottom: gutter * 2,
    },
    title: {
        ...getUniversalFont(1.5),
    },
    waitingForHost: {
        textAlign: `center`,
    },
    startGameButton: {
        paddingLeft: gutter,
        paddingRight: gutter,
    },
});
