import { StyleSheet, Platform } from "react-native";

import {
    gutter,
    getUniversalFont,
    white,
    baseFontSize,
    minTouchSize,
    black,
} from "styles";

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
        lineHeight: baseFontSize * 1.2,
    },
    textContainer: {
        backgroundColor: white,
        borderColor: black,
        borderWidth: 1,
        alignItems: `center`,
        flexDirection: `row`,
        borderRadius: 5,
    },
});
