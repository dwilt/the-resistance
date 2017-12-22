import { StyleSheet } from 'react-native';

import { getUniversalFont, gutter } from 'styles';

export default StyleSheet.create({
    container: {
        padding: gutter,
    },
    title: {
        ...getUniversalFont(1.5),
    },
});
