import {
    StyleSheet,
} from 'react-native';

import {
    getUniversalFont,
    darkGray,
    gutter,
    minTouchSize,
} from '/styles';

export const extraScrollHeight = minTouchSize;

export default StyleSheet.create({
    container: {},
    instructions: {
        ...getUniversalFont(1, 1.2),
        padding: gutter,
        marginTop: gutter,
        color: darkGray,
    },
});
