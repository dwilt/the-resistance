import { StyleSheet } from "react-native";

import {
    openSans,
    yellow,
    getUniversalFont,
    gutter,
    centerChildren,
    subtitle,
    yellowTitle,
} from "styles";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    title: {
        ...yellowTitle,
    },
    subtitle: {
        ...subtitle,
    },
    playerCard: {
        ...centerChildren(),
        flexDirection: `row`,
        marginBottom: gutter * 2,
    },
    winTitle: {
        ...getUniversalFont(3),
        fontFamily: openSans.extraBoldItalic,
        color: yellow,
        textAlign: `center`,
    },
    spiesText: {
        ...getUniversalFont(1.4, 1.4),
        fontFamily: openSans.bold,
        textAlign: `center`,
        paddingLeft: gutter,
        paddingRight: gutter,
    },
});
