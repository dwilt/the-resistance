import { StyleSheet } from 'react-native';

import { centerChildren, gutter, fullscreen } from 'styles';

const logoWidth = 275;

export default StyleSheet.create({
    container: {
        justifyContent: `center`,
        flex: 1,
        padding: gutter,
    },
    logoContainer: {
        ...centerChildren(),
        marginBottom: gutter * 2,
    },
    logo: {
        width: logoWidth,
        height: logoWidth * 0.207272727,
    },
    cardsContainer: {
        ...centerChildren(),
        flexDirection: `row`,
        marginBottom: gutter * 3,
    },
    spyCard: {
        marginLeft: gutter,
    },
    joinGameOverlay: {
        ...fullscreen,
        ...centerChildren(true),
        backgroundColor: `rgba(0, 0, 0, .9)`,
    },
    join: {},
    joinCodeInput: {
        ...centerChildren(),
        marginBottom: gutter,
    },
});
