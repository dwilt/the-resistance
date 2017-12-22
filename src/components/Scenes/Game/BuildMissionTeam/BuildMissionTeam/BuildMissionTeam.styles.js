import { StyleSheet } from 'react-native';

import {
    getUniversalFont,
    gutter,
    openSans,
    blackOverlay,
    yellow,
} from 'styles';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    title: {
        ...getUniversalFont(1.5, 1),
        color: yellow,
        fontFamily: openSans.bold,
        textAlign: `center`,
        marginBottom: gutter / 2,
    },
    leaderInstructionsContainer: {
        marginBottom: gutter,
        paddingLeft: gutter,
        paddingRight: gutter,
    },
    leaderInstructionsTextContainer: {
        textAlign: `center`,
    },
    leaderInstructions: {
        ...getUniversalFont(1.2, 1.4),
        fontFamily: openSans.bold,
    },
    missionMembersCount: {
        fontFamily: openSans.bold,
        color: yellow,
    },
    playerIdentityReveal: {
        ...blackOverlay,
    },
    confirmButton: {
        margin: gutter,
    },
});
