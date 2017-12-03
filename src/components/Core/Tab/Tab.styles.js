import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    darkGray,
    getUniversalFont,
    lato,
    blue,
} from '/styles';

export default StyleSheet.create({
    container: {
        flexShrink: 0,
        padding: gutter / 1.5,
        borderBottomWidth: 3,
        borderBottomColor: `transparent`,
    },
    activeContainer: {
        borderBottomColor: blue,
    },
    text: {
        ...getUniversalFont(0.8),
        opacity: 0.6,
        color: darkGray,
        textAlign: `center`,
    },
    activeText: {
        opacity: 1,
        fontFamily: lato.black,
        color: blue,
    },
});
