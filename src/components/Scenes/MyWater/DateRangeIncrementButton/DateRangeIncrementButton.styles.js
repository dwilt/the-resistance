import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    gutter,
    minTouchSize,
} from '/styles';

export const arrowSize = gutter;

export default StyleSheet.create({
    disabledContainer: {
        opacity: 0.2,
    },
    button: {
        ...centerChildren(),
        width: minTouchSize,
        height: minTouchSize,
    },
});
