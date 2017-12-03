import {
    StyleSheet,
} from 'react-native';

import {
    getUniversalFont,
    gutter,
    darkGray,
    minTouchSize,
} from '/styles';

export default StyleSheet.create({
    container: {
        paddingBottom: minTouchSize + (gutter * 2),
    },
    instructions: {
        ...getUniversalFont(1, 1.2),
        padding: gutter,
        marginTop: gutter,
        color: darkGray,
    },
});
