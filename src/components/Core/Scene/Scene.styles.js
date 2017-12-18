import { StyleSheet } from "react-native";

import {
    windowHeight,
    windowWidth,
    statusBarHeight
} from "styles";

export default StyleSheet.create({
    container: {
        position: `relative`,
        paddingTop: statusBarHeight
    },
    bg: {
        position: `absolute`,
        left: 0,
        top: 0,
        width: windowWidth,
        height: windowHeight,
        resizeMode: `cover`,
    },
});
