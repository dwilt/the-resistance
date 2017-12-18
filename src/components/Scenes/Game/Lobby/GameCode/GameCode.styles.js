import { StyleSheet } from 'react-native';

import { getUniversalFont, white, openSans, gutter } from 'styles';

export default StyleSheet.create({
    container: {
        paddingTop: gutter,
        paddingBottom: gutter,
    },
    title: {
        ...getUniversalFont(1.5),
        color: white,
        textAlign: `center`,
        marginBottom: gutter / 2,
    },
    code: {
        ...getUniversalFont(1.5),
        fontFamily: openSans.bold,
        color: white,
        textAlign: `center`,
    },
});
