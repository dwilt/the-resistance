import { StyleSheet } from "react-native";

import {
    openSans,
    teal,
    getUniversalFont,
    gutter,
    centerChildren,
} from "styles";

export default StyleSheet.create({
    container: {
        ...centerChildren(),
        padding: gutter,
    },
    textContainer: {
        borderBottomColor: teal,
        borderBottomWidth: 1,
    },
    text: {
        ...getUniversalFont(1.2),
        fontFamily: openSans.bold,
        color: teal,
        textAlign: `center`,
    },
});
