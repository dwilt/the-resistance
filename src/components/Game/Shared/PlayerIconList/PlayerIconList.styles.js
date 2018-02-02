import { StyleSheet } from 'react-native';

import { getUniversalFont, centerChildren, gutter } from 'styles';

export default StyleSheet.create({
    container: {
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `flex-start`,
    },
    playerContainer: {
        ...centerChildren(true),
        marginLeft: gutter / 2,
    },
    firstPlayerContainer: {
        marginLeft: 0,
    },
    offsetPlayerContainer: {
        marginTop: gutter,
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: gutter / 2,
    },
    name: {
        ...getUniversalFont(0.8),
        textAlign: `center`,
    },
});
