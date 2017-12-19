import { StyleSheet } from "react-native";

import {
    getUniversalFont,
    centerChildren,
    gutter,
    white,
    windowWidth,
} from "styles/index";

export default StyleSheet.create({
    container: {
        paddingTop: 60,
    },
    player: {
        marginBottom: 20,
        flexDirection: `row`,
        alignItems: `center`,
    },
});
