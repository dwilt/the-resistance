import { StyleSheet } from 'react-native';

import {
    gutter,
    yellowTitle,
    subtitle,
    windowWidth,
    getUniversalFont,
    openSans,
} from 'styles';

const voteButtonWidth = (windowWidth - gutter * 2.5) / 2;

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
    voteButtons: {
        flexDirection: `row`,
        paddingLeft: gutter,
        paddingRight: gutter,
        marginTop: gutter * 2,
    },
    rejectButton: {
        width: voteButtonWidth,
        marginRight: gutter / 2,
    },
    approveButton: {
        width: voteButtonWidth,
    },
    submitButton: {
        paddingLeft: gutter,
        paddingRight: gutter,
    },
    submittedVoteContainer: {
        marginTop: gutter * 2,
        marginBottom: gutter,
    },
    submittedVote: {
        ...getUniversalFont(1.4),
        fontFamily: openSans.bold,
        textAlign: `center`,
    },
    revealVotesButton: {
        padding: gutter,
    },
});
