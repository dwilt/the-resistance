import { StyleSheet } from "react-native";
import { blackOverlay, centerChildren, gutter } from "styles";

export default StyleSheet.create({
    container: {
        ...blackOverlay,
        paddingTop: gutter * 3,
    },
    joinCodeInput: {
        ...centerChildren(),
        marginBottom: gutter,
    },
});
