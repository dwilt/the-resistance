export const setCastVoteAction = (castVote) => ({
    type: `SET_MISSION_TEAM_VOTE_CAST_VOTE`,
    payload: {
        castVote,
    },
});

export const approveProposedMissionTeamAction = () => setCastVoteAction(true);

export const rejectProposedMissionTeamAction = () => setCastVoteAction(false);
