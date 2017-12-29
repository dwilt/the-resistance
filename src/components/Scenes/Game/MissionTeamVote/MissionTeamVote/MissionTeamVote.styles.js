import { StyleSheet } from 'react-native';

import {
    gutter,
    yellowTitle,
    subtitle,
    voteButtonsReject,
    voteButtonsApprove,
    voteButtons,
    getUniversalFont,
    openSans,
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
    voteButtons: {
        ...voteButtons,
    },
    rejectButton: {
        ...voteButtonsReject,
    },
    approveButton: {
        ...voteButtonsApprove,
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
