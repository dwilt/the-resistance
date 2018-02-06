import { StyleSheet } from "react-native";

import { yellowTitle, subtitle, gutter, blackOverlay, yellow } from "styles";

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
    missionMembersCount: {
        ...subtitle,
        color: yellow,
    },
    identityOverlay: {
        ...blackOverlay,
    },
    confirmButton: {
        margin: gutter,
    },
});
