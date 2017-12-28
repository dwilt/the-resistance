import { StyleSheet } from 'react-native';

import {
    getUniversalFont,
    gutter,
    openSans,
    blackOverlay,
    yellow,
} from 'styles';

const subtitleFont = {
    ...getUniversalFont(1.2, 1.4),
    fontFamily: openSans.bold,
};

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
    subtitleContainer: {
        padding: gutter,
        paddingTop: 0,
    },
    subtitle: {
        ...subtitleFont,
        textAlign: `center`,
    },
    missionMembersCount: {
        ...subtitleFont,
        color: yellow,
    },
    identityOverlay: {
        ...blackOverlay,
    },
    confirmButton: {
        margin: gutter,
    },
});
