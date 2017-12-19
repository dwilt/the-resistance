import { StyleSheet } from 'react-native';

import { getUniversalFont, white, openSans, gutter } from 'styles';

export default StyleSheet.create({
    title: {
        ...getUniversalFont(1),
        color: white,
        textAlign: `center`,
        marginBottom: gutter / 2,
    },
    leader: {
        ...getUniversalFont(1.5),
        fontFamily: openSans.bold,
        color: white,
        textAlign: `center`,
    },
});
