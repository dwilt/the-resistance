import { StyleSheet } from "react-native";

import {
    gutter,
    getUniversalFont,
} from "styles";

export default StyleSheet.create({
    players: {
        padding: gutter,
    },
    title: {
        ...getUniversalFont(1.5),
    },
    waitingForHost: {
        textAlign: `center`
    }
});
