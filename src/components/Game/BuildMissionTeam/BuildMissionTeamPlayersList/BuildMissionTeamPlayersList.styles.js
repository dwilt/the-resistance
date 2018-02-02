import { StyleSheet } from 'react-native';

import { getUniversalFont, white, openSans, gutter, yellow } from 'styles';

export default StyleSheet.create({
    title: {
        ...getUniversalFont(1),
        color: white,
        textAlign: `center`,
        marginBottom: gutter / 4,
        fontFamily: openSans.bold,
    },
    code: {
        ...getUniversalFont(1.5),
        fontFamily: openSans.bold,
        color: yellow,
        textAlign: `center`,
    },
});
