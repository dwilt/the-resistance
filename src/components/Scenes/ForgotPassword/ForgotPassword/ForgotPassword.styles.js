import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    darkGray,
    getUniversalFont,
} from '/styles';

export default StyleSheet.create({
    instructions: {
        ...getUniversalFont(1, 1.2),
        padding: gutter,
        marginTop: gutter,
        color: darkGray,
    },
});
