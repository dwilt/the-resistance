import {
    StyleSheet,
} from 'react-native';

import {
    minTouchSize,
    centerChildren,
    gutter,
    green,
    white,
    darkGray,
} from '/styles';

export const buttonSize = 14;
export const buttonIconColor = green;

export default StyleSheet.create({
    container: {
        padding: gutter,
        paddingTop: gutter / 2,
        paddingBottom: gutter / 2,
        backgroundColor: white,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
    },
    label: {
        color: darkGray,
        flex: 1,
    },
    button: {
        ...centerChildren(true),
        borderRadius: 2,
        backgroundColor: `transparent`,
        minWidth: minTouchSize,
        minHeight: minTouchSize,
    },
    disabledButton: {
        opacity: 0.2,
    },
    inputContainer: {
        flexDirection: `row`,
    },
    textContainer: {
        height: minTouchSize,
        alignItems: `center`,
        justifyContent: `center`,
        marginLeft: gutter / 2,
        marginRight: gutter / 2,
    },
    text: {
        textAlign: `center`,
    },
});
