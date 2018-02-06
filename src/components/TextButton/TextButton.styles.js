import { StyleSheet } from 'react-native';

import { gutter, centerChildren, minTouchSize, teal, openSans } from 'styles';

export default StyleSheet.create({
    button: {
        ...centerChildren(),
        minHeight: minTouchSize,
        paddingLeft: gutter,
        paddingRight: gutter,
    },
    textContainer: {
        borderBottomWidth: 1,
        borderBottomColor: teal,
    },
    text: {
        fontFamily: openSans.bold,
        color: teal,
    },
});
