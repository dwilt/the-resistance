import {
    StyleSheet,
} from 'react-native';

import {
    lato,
   gutter,
    getUniversalFont,
    darkGray,
} from '/styles';

const keyWidth = gutter;

export default StyleSheet.create({
    tiers: {
        marginTop: gutter,
    },
    tier: {
        marginBottom: gutter / 2,
    },
    tierContent: {
        flexDirection: `row`,
        alignItems: `center`,
    },
    tierCost: {
        fontFamily: lato.bold,
    },
    tierDescriptionContainer: {
        flex: 1,
        flexDirection: `row`,
        flexWrap: `wrap`,
    },
    tierDescription: {
        ...getUniversalFont(0.8, 1.3),
        color: darkGray,
    },
    tierKey: {
        width: keyWidth,
        height: keyWidth,
        borderRadius: 2,
        marginRight: gutter / 2,
    },
});
