import { StyleSheet } from "react-native";

import { getUniversalFont, white, openSans } from "styles";

export default StyleSheet.create({
    text: {
        ...getUniversalFont(),
        fontFamily: openSans.regular,
        color: white,
        backgroundColor: `transparent`,
    },
});
