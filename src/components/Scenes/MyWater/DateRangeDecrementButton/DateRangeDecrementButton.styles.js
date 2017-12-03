import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    minTouchSize,
    gutter,
} from '/styles';

export const arrowSize = gutter;

export default StyleSheet.create({
    button: {
        ...centerChildren(),
        width: minTouchSize,
        height: minTouchSize,
    },
});
