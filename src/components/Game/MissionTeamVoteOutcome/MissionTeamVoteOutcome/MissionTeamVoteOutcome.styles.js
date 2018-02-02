import { StyleSheet } from 'react-native';

import {
    centerChildren,
    yellowTitle,
    yellow,
    getUniversalFont,
    openSans,
    gutter,
    subtitle,
} from 'styles';

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
    innerContent: {
        ...centerChildren(true),
        flex: 1,
    },
    resultTitle: {
        ...getUniversalFont(3),
        color: yellow,
        fontFamily: openSans.boldItalic,
        marginBottom: gutter,
    },
    cards: {
        flexDirection: `row`,
        marginBottom: gutter,
    },
    firstCard: {
        marginRight: gutter * 2,
    },
    voteNumber: {
        ...getUniversalFont(3, 1.1),
        fontFamily: openSans.boldItalic,
        textAlign: `center`,
        marginTop: gutter / 2,
    },
    majorityVoteNumber: {
        color: yellow,
    },
});
