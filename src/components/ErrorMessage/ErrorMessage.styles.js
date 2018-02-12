import { StyleSheet } from 'react-native';

import { gutter, openSans, getUniversalFont, red } from 'styles';

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: red,
        padding: gutter,
        marginBottom: gutter,
    },
    error: {
        ...getUniversalFont(1.2, 1.2),
        fontFamily: openSans.bold,
        textAlign: `center`,
        color: red,
    },
});
