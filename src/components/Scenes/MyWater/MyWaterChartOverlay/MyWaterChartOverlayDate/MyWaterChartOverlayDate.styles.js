import {
    StyleSheet,
} from 'react-native';

import {
    getUniversalFont,
    darkGray,
    gutter,
} from '/styles';

export default StyleSheet.create({
    date: {
        ...getUniversalFont(1.4, 1.6),
        color: darkGray,
        marginBottom: gutter / 2,
    },
});
