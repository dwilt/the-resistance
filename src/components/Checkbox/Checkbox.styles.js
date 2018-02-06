import { StyleSheet } from "react-native";

import {
    gutter,
    getUniversalFont,
    white,
    openSans,
    centerChildren,
    yellow,
} from "styles";

export const checkColor = yellow;
export const checkSize = gutter * 2;

export default StyleSheet.create({
    container: {
        ...centerChildren(),
    },
    box: {
        ...centerChildren(),
        backgroundColor: white,
        width: gutter * 3,
        height: gutter * 3,
        borderColor: `#979797`,
        borderWidth: 2,
        borderRadius: 2,
        position: `relative`,
    },
    check: {
        ...centerChildren(true),
    },
    label: {
        ...getUniversalFont(1.2, 1.2),
        width: 0,
        flex: 1,
        paddingLeft: gutter,
        paddingRight: gutter,
        marginBottom: gutter / 2,
        color: white,
        fontFamily: openSans.bold,
    },
});
