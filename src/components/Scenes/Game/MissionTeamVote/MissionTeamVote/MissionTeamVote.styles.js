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
        padding: gutter,
    },
    title: {
        ...getUniversalFont(1.5),
    },
});
