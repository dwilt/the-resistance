import { StyleSheet } from 'react-native';

import {
    yellowTitle,
    subtitle,
    voteButtons,
    voteButtonsApprove,
    voteButtonsReject,
} from 'styles';
import { getUniversalFont, gutter, openSans } from '../../../../../styles';

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
});
