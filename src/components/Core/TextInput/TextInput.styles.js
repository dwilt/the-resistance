import { StyleSheet, Platform } from "react-native";

import {
    gutter,
    getUniversalFont,
    white,
    lighterGray,
    darkGray,
    baseFontSize,
    minTouchSize,
    centerChildren,
    black,
    openSans
} from "styles";

const inputFontSize = baseFontSize;
export const toggleIconSize = gutter * 1.5;
export const toggleIconColor = darkGray;

export default StyleSheet.create({
    container: {
        marginBottom: gutter,
    },
    input: {
        flex: 1,
        height: minTouchSize - 2,
        paddingTop: gutter,
        paddingBottom: gutter,
        paddingLeft: gutter,
        paddingRight: gutter,
        ...getUniversalFont(),
        ...Platform.select({
            android: {
                textAlignVertical: `top`,
            },
        }),
    },
    multilineInput: {
        lineHeight: inputFontSize * 1.2,
    },
    label: {
        ...getUniversalFont(1, 1.2),
        paddingLeft: gutter,
        paddingRight: gutter,
        marginBottom: gutter / 2,
        color: white,
        textAlign: `center`,
        fontFamily: openSans.bold
    },
    textContainer: {
        backgroundColor: white,
        borderColor: black,
        borderWidth: 1,
        alignItems: `center`,
        flexDirection: `row`,
        borderRadius: 5,
    },
    passwordToggle: {
        ...centerChildren(true),
        width: minTouchSize,
        height: minTouchSize,
    },
});
