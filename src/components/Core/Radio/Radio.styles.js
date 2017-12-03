import {
    StyleSheet,
} from 'react-native';

import {
    centerChildren,
    gutter,
    minTouchSize,
    darkGray,
    white,
    black,
} from '/styles';

export default StyleSheet.create({
    container: {
        backgroundColor: white,
        marginBottom: gutter,
        padding: gutter,
    },
    label: {
        color: black,
        marginBottom: gutter / 2,
    },
    optionsContainer: {
        flexDirection: `row`,
    },
    button: {
        ...centerChildren(true),
        minWidth: minTouchSize,
        minHeight: minTouchSize,
        borderTopColor: darkGray,
        borderTopWidth: 1,
        borderBottomColor: darkGray,
        borderBottomWidth: 1,
        borderRightColor: darkGray,
        borderRightWidth: 1,
        flex: 1,
    },
    firstButton: {
        borderLeftColor: darkGray,
        borderLeftWidth: 1,
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
    },
    lastButton: {
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
    },
    selectedButton: {
        backgroundColor: darkGray,
    },
    buttonLabel: {
        color: darkGray,
    },
    selectedButtonLabel: {
        color: white,
    },
});
