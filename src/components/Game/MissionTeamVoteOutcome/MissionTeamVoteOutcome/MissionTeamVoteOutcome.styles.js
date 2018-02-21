import { StyleSheet } from 'react-native';

import {
    centerChildren,
    yellowTitle,
    yellow,
    getUniversalFont,
    openSans,
    gutter,
    subtitle,
    windowWidth,
} from 'styles';

const stampWidth = windowWidth - gutter * 4;
const stampHeight = stampWidth * 0.450920245;

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        ...centerChildren(true),
        flex: 1,
    },
    playersListContainer: {
        position: `relative`,
        marginBottom: gutter,
        marginLeft: gutter * 2,
        marginRight: gutter * 2,
    },
    playersList: {
        ...centerChildren(),
        position: `absolute`,
        left: gutter,
        top: 0,
        right: gutter,
        bottom: 0,
        opacity: 0.3,
    },
    stamp: {
        resizeMode: `contain`,
        width: stampWidth,
        height: stampHeight,
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
