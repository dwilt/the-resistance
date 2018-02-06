import { StyleSheet } from 'react-native';

import { yellowTitle, gutter, getUniversalFont } from 'styles';

export default StyleSheet.create({
    container: {
        justifyContent: `center`,
        flex: 1,
        padding: gutter,
    },
    title: {
        ...yellowTitle,
        marginBottom: gutter / 4,
    },
    subtitle: {
        ...getUniversalFont(1, 1.2),
        textAlign: `center`,
        marginBottom: gutter,
    },
});
