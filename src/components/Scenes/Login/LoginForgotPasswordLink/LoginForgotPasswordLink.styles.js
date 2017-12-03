import {
    StyleSheet,
} from 'react-native';

import {
    getUniversalFont,
    gutter,
} from '/styles';

export default StyleSheet.create({
    container: {
        justifyContent: `flex-start`,
        marginBottom: gutter,
    },
    text: {
        ...getUniversalFont(0.8),
    },
});
