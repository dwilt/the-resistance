export const setCastVoteAction = (castVote) => ({
    type: `SET_CONDUCT_MISSION_CAST_VOTE`,
    payload: {
        castVote,
    },
});

export const passMissionAction = () => setCastVoteAction(true);

export const failMissionAction = () => setCastVoteAction(false);
