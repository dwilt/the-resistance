import { StyleSheet } from "react-native";

import { getUniversalFont } from "../../../styles";

export default StyleSheet.create({
    text: {
        ...getUniversalFont(),
        color: `black`
    }
});
