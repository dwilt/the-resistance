import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    getUniversalFont,
} from '/styles';

export default StyleSheet.create({
    container: {
        padding: gutter,
    },
    title: {
        ...getUniversalFont(1.2, 1.2),
        marginBottom: gutter,
    },
    text: {
        ...getUniversalFont(1, 1.2),
    },
});
