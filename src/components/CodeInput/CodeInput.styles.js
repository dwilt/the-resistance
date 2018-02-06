import { StyleSheet } from "react-native";

import {
    gutter,
    getUniversalFont,
    white,
    minTouchSize,
    black,
    openSans,
    centerChildren,
} from "styles";

export default StyleSheet.create({
    container: {
        ...centerChildren(true),
    },
    label: {
        ...getUniversalFont(1.4, 1.2),
        marginBottom: gutter / 2,
        color: white,
        textAlign: `center`,
        fontFamily: openSans.bold,
    },
    inputsContainer: {
        flexDirection: `row`,
    },
    input: {
        ...getUniversalFont(1.5, 1),
        height: minTouchSize - 2,
        width: minTouchSize - 2,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 5,
        backgroundColor: white,
        borderWidth: 1,
        borderColor: black,
        fontFamily: openSans.extraBold,
        textAlign: `center`,
    },
});
