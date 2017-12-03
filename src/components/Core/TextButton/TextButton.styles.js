import {
    StyleSheet,
} from 'react-native';

import {
    gutter,
    centerChildren,
    minTouchSize,
    blue,
} from '/styles';

export default StyleSheet.create({
    button: {
        ...centerChildren(),
        minHeight: minTouchSize,
        paddingLeft: gutter,
        paddingRight: gutter,
    },
    text: {
        color: blue,
    },
});
