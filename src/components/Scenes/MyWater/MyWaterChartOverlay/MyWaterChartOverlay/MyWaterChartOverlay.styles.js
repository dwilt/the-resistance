import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    white,
    shadow,
    windowWidth,
    black,
} from '/styles';

import tinycolor from 'tinycolor2';

export default StyleSheet.create({
    container: {
        flexDirection:`row`,
        justifyContent: `center`,
        alignItems: `flex-start`,
        position: `absolute`,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 5,
        backgroundColor: tinycolor(black).setAlpha(0.4),
    },
    content: {
        ...shadow,
        marginTop: gutter * 4,
        shadowOpacity: 0.3,
        padding: gutter,
        backgroundColor: white,
        borderRadius: 4,
        width: windowWidth - (gutter * 2),
    },
});
