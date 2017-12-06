import { StyleSheet } from "react-native";

import {
    getUniversalFont,
    white,
    gutter,
    centerChildren,
    fullscreen,
    minTouchSize
} from "../../../styles";

export default StyleSheet.create({
    container: {
        position: `relative`
    },
    loader: {
        ...centerChildren(),
        ...fullscreen
    },
    textContainer: {
        ...centerChildren(),
        marginLeft: gutter,
        marginRight: gutter,
        marginBottom: gutter,
        height: minTouchSize,
        paddingTop: gutter,
        paddingBottom: gutter,
        paddingLeft: gutter * 2,
        paddingRight: gutter * 2,
        borderRadius: 2
    },
    tealTextContainer: {
        backgroundColor: `blue`
    },
    darkTealTextContainer: {
        backgroundColor: `green`
    },
    disabled: {
        opacity: 0.5
    },
    hiddenText: {
        opacity: 0
    },
    text: {
        ...getUniversalFont(1.2),
        color: white,
        fontWeight: `bold`,
        textAlign: `center`
    }
});
