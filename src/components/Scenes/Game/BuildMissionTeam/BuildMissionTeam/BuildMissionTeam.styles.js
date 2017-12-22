import { StyleSheet } from 'react-native';

import { getUniversalFont, gutter, openSans, blackOverlay } from 'styles';

export default StyleSheet.create({
    container: {},
    leaderInstructionsContainer: {
        padding: gutter,
    },
    leaderInstructionsTextContainer: {
        textAlign: `center`,
    },
    leaderInstructions: {
        ...getUniversalFont(1.2, 1.4),
    },
    missionMembersCount: {
        fontFamily: openSans.bold,
    },
    playerIdentityReveal: {
        ...blackOverlay,
    },
});
