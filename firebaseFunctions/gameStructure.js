export const gameStates = {
    LOBBY: `LOBBY`,
    BUILD_MISSION_TEAM: `BUILD_MISSION_TEAM`,
    MISSION_TEAM_VOTE: `MISSION_TEAM_VOTE`,
    MISSION_TEAM_VOTE_OUTCOME: `MISSION_TEAM_VOTE_OUTCOME`,
    CONDUCT_MISSION: `CONDUCT_MISSION`,
    MISSION_OUTCOME: `MISSION_OUTCOME`,
    COMPLETED: `COMPLETED`,
};

export const victoryTypes = {
    ALLIES_COMPLETED_MISSIONS: `ALLIES_COMPLETED_MISSIONS`,
    SPIES_COMPLETED_MISSIONS: `SPIES_COMPLETED_MISSIONS`,
    SPIES_PREVENTED_MISSION_TEAM: `SPIES_PREVENTED_MISSION_TEAM`,
};

export function didMissionFail({ roundCount, totalPlayers, failedVotes }) {
    return (roundCount === 4 && totalPlayers > 7 && failedVotes > 1) || !!failedVotes;
}

export const singleMissionFailedMissionTeamsLimit = 5;

export const totalRounds = 5;

export function getSpyCount(totalPlayers) {
    const map = {
        5: 2,
        6: 2,
        7: 3,
        8: 3,
        9: 3,
        10: 4,
    };

    return map[totalPlayers];
}

export function getMissionMembersCount(roundNumber, totalPlayers) {
    const map = {
        1: {
            5: 2,
            6: 2,
            7: 2,
            8: 3,
            9: 3,
            10: 3,
        },
        2: {
            5: 3,
            6: 3,
            7: 3,
            8: 4,
            9: 4,
            10: 4,
        },
        3: {
            5: 2,
            6: 4,
            7: 3,
            8: 4,
            9: 4,
            10: 4,
        },
        4: {
            5: 3,
            6: 3,
            7: 4,
            8: 5,
            9: 5,
            10: 5,
        },
        5: {
            5: 3,
            6: 4,
            7: 4,
            8: 5,
            9: 5,
            10: 5,
        },
    };

    return map[roundNumber][totalPlayers];
}
