import { StyleSheet } from "react-native";

import { getUniversalFont, openSans, yellow } from "styles";

export default StyleSheet.create({
    title: {
        ...getUniversalFont(1.4),
        fontFamily: openSans.bold,
        textAlign: `center`,
    },
    count: {
        ...getUniversalFont(6, 1.2),
        color: yellow,
        fontFamily: openSans.bold,
        textAlign: `center`,
    },
});
