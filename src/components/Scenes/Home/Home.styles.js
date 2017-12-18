import { StyleSheet } from "react-native";

import {
    getUniversalFont,
    centerChildren,
    gutter,
    white,
    windowWidth,
    darkGray,
} from "styles";

export default StyleSheet.create({
    container: {
        paddingTop: 60,
        backgroundColor: white,
    },
    join: {
        borderBottomWidth: 1,
        borderBottomColor: darkGray,
        paddingBottom: gutter * 2,
        marginBottom: gutter * 2,
    },
});
