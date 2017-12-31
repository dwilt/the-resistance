import { Actions } from 'react-native-router-flux';

import {
    takeEvery,
    take,
    call,
    select,
    put,
    all,
    takeLatest,
} from 'redux-saga/effects';

import { buffers, eventChannel } from 'redux-saga';

import { db, fireFetch } from 'services';

import {
    userIdSelector,
    joinGameInputSelector,
    gameIdSelector,
    proposedMissionTeamSelector,
    approvesProposedMissionTeamSelector,
    passesMissionSelector,
} from 'selectors';

import { Game } from 'components';

export const setGameDataAction = (data) => ({
    type: `SET_GAME_DATA`,
    payload: {
        data,
    },
});

export const setGamePlayersAction = (players) => ({
    type: `SET_GAME_PLAYERS`,
    payload: {
        players,
    },
});

export const setGameCompletedMissionsAction = (completedMissions) => ({
    type: `SET_GAME_COMPLETED_MISSIONS`,
    payload: {
        completedMissions,
    },
});

export const setGameIdAction = (id) => ({
    type: `SET_GAME_ID`,
    payload: {
        id,
    },
});

export const joinGameAction = () => ({
    type: `JOIN_GAME`,
});

export const joiningGameAction = () => ({
    type: `JOINING_GAME`,
});

export const joinedGameAction = () => ({
    type: `JOINED_GAME`,
});

export const startGameAction = () => ({
    type: `START_GAME`,
});

export const confirmMissionTeamAction = () => ({
    type: `CONFIRM_MISSION_TEAM`,
});

export const confirmingMissionTeamAction = () => ({
    type: `CONFIRMING_MISSION_TEAM`,
});

export const confirmedMissionTeamAction = () => ({
    type: `CONFIRMED_MISSION_TEAM`,
});

export const confirmPlayerIdentityAction = () => ({
    type: `CONFIRM_PLAYER_IDENTITY_ACTION`,
});

export const revealProposedMissionTeamVoteAction = () => ({
    type: `REVEAL_PROPOSED_MISSION_TEAM_VOTE`,
});

export const revealingProposedMissionTeamVoteAction = () => ({
    type: `REVEALING_PROPOSED_MISSION_TEAM_VOTE`,
});

export const revealedProposedMissionTeamVoteAction = () => ({
    type: `REVEALED_PROPOSED_MISSION_TEAM_VOTE`,
});

export const toggleMissionTeamMemberAction = (userId, selected) => ({
    type: `TOGGLE_MISSION_MEMBER`,
    payload: {
        userId,
        selected,
    },
});

export const setProposedMissionTeamApprovalAction = (userId, approves) => ({
    type: `SET_PROPOSED_MISSION_TEAM_APPROVAL`,
    payload: {
        userId,
        approves,
    },
});

export const setMissionPassesAction = (userId, passes) => ({
    type: `SET_MISSION_PASSES`,
    payload: {
        userId,
        passes,
    },
});

export const setConfirmedPlayerIdentityAction = (userId) => ({
    type: `SET_CONFIRM_PLAYER_IDENTITY`,
    payload: {
        userId,
    },
});

export const submitProposedMissionTeamApprovalAction = () => ({
    type: `SUBMIT_PROPOSED_MISSION_TEAM_APPROVAL`,
});

export const retractProposedMissionTeamApprovalAction = () => ({
    type: `RETRACT_PROPOSED_MISSION_TEAM_APPROVAL`,
});

export const conductMissionAction = () => ({
    type: `CONDUCT_MISSION`,
});

export const conductingMissionAction = () => ({
    type: `CONDUCTING_MISSION`,
});

export const conductedMissionAction = () => ({
    type: `CONDUCTED_MISSION`,
});

export const selectNewLeaderAction = () => ({
    type: `SELECT_NEW_LEADER`,
});

export const submitMissionPass = () => ({
    type: `SUBMIT_MISSION_PASSES`,
});

export const startNextRoundAction = () => ({
    type: `START_NEXT_ROUND`,
});

export const startingNextRoundAction = () => ({
    type: `STARTING_NEXT_ROUND`,
});

export const startedNextRoundAction = () => ({
    type: `STARTED_NEXT_ROUND`,
});

export const createNewGameAction = () => ({
    type: `CREATE_NEW_GAME`,
});

export const createdNewGameAction = () => ({
    type: `CREATED_NEW_GAME`,
});

export const creatingNewGameAction = () => ({
    type: `CREATING_NEW_GAME`,
});

function createGameListenerChannel(id) {
    return eventChannel((emitter) => {
        db
            .collection(`games`)
            .doc(id)
            .onSnapshot((snapshot) => {
                const data = snapshot.data();

                if (data) {
                    emitter(data);
                }
            });

        return () => {};
    }, buffers.sliding(2));
}

function* watchGameData(id) {
    const gameChannel = yield call(createGameListenerChannel, id);

    while (true) {
        const data = yield take(gameChannel);

        yield put(setGameDataAction(data));
    }
}

function createPlayersListenerChannel(id) {
    return eventChannel((emitter) => {
        db
            .collection(`games`)
            .doc(id)
            .collection(`players`)
            .onSnapshot(({ docs }) => {
                const players = docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                emitter(players);
            });

        return () => {};
    }, buffers.sliding(2));
}

function* watchPlayers(id) {
    const playersChannel = yield call(createPlayersListenerChannel, id);

    while (true) {
        const players = yield take(playersChannel);

        yield put(setGamePlayersAction(players));
    }
}

function createCompletedMissionsListenerChannel(id) {
    return eventChannel((emitter) => {
        db
            .collection(`games`)
            .doc(id)
            .collection(`completedMissions`)
            .onSnapshot(({ docs }) => {
                const missions = docs.map((doc) => doc.data());

                emitter(missions);
            });

        return () => {};
    }, buffers.sliding(2));
}

function* watchCompletedMissions(id) {
    const completedMissionsChannel = yield call(
        createCompletedMissionsListenerChannel,
        id,
    );

    while (true) {
        const players = yield take(completedMissionsChannel);

        yield put(setGameCompletedMissionsAction(players));
    }
}

function* join({ id, data, players, completedMissions }) {
    yield put(setGameDataAction(data));
    yield put(setGameIdAction(id));
    yield put(setGamePlayersAction(players));
    yield put(setGameCompletedMissionsAction(completedMissions));

    Actions[Game.key]();

    yield all([
        call(watchGameData, id),
        call(watchPlayers, id),
        call(watchCompletedMissions, id),
    ]);
}

function* joinGame() {
    const userId = yield select(userIdSelector);
    const gameCode = yield select(joinGameInputSelector);

    yield put(joiningGameAction());

    const { id, data, players, completedMissions } = yield call(
        fireFetch,
        `joinGame`,
        {
            gameCode,
            userId,
        },
    );

    yield put(joinedGameAction());

    yield call(join, { id, data, players, completedMissions });
}

function* startGame() {
    const gameId = yield select(gameIdSelector);

    yield call(fireFetch, `startGame`, {
        gameId,
    });
}

function* confirmMissionTeam() {
    const gameId = yield select(gameIdSelector);

    yield put(confirmingMissionTeamAction());

    yield call(fireFetch, `confirmSelectedMissionTeam`, {
        gameId,
    });

    yield put(confirmedMissionTeamAction());
}

function* updateProposedMissionTeam() {
    const gameId = yield select(gameIdSelector);
    const team = yield select(proposedMissionTeamSelector);

    yield call(fireFetch, `updateProposedMissionTeam`, {
        gameId,
        team,
    });
}

function* confirmPlayerIdentity() {
    const gameId = yield select(gameIdSelector);
    const userId = yield select(userIdSelector);

    yield put(setConfirmedPlayerIdentityAction(userId));

    yield call(fireFetch, `confirmPlayerIdentity`, {
        gameId,
        userId,
    });
}

function* submitProposedMissionTeamApproval() {
    const userId = yield select(userIdSelector);
    const gameId = yield select(gameIdSelector);
    const approves = yield select(approvesProposedMissionTeamSelector);

    yield put(setProposedMissionTeamApprovalAction(userId, approves));

    yield call(fireFetch, `submitProposedMissionTeamApproval`, {
        userId,
        gameId,
        approves,
    });
}

function* retractProposedMissionTeamApproval() {
    const userId = yield select(userIdSelector);
    const gameId = yield select(gameIdSelector);

    yield put(setProposedMissionTeamApprovalAction(userId));

    yield call(fireFetch, `retractProposedMissionTeamApproval`, {
        userId,
        gameId,
    });
}

function* revealProposedMissionTeamVote() {
    const gameId = yield select(gameIdSelector);

    yield put(revealingProposedMissionTeamVoteAction());

    yield call(fireFetch, `revealProposedMissionTeamVote`, {
        gameId,
    });

    yield put(revealedProposedMissionTeamVoteAction());
}

function* conductMission() {
    const gameId = yield select(gameIdSelector);

    yield put(conductingMissionAction());

    yield call(fireFetch, `conductMission`, {
        gameId,
    });

    yield put(conductedMissionAction());
}

function* selectNewLeader() {
    const gameId = yield select(gameIdSelector);

    yield call(fireFetch, `buildNewMissionTeam`, {
        gameId,
    });
}

function* submitMissionPasses() {
    const gameId = yield select(gameIdSelector);
    const userId = yield select(userIdSelector);
    const passes = yield select(passesMissionSelector);

    yield put(setMissionPassesAction(userId, passes));

    yield call(fireFetch, `submitMissionPasses`, {
        gameId,
        userId,
        passes,
    });
}

function* startNextRound() {
    const gameId = yield select(gameIdSelector);

    yield put(startingNextRoundAction());

    yield call(fireFetch, `startNextRound`, {
        gameId,
    });

    yield put(startedNextRoundAction());
}

function* createNewGame() {
    const userId = yield select(userIdSelector);

    yield put(creatingNewGameAction());

    const { id, data, players } = yield call(fireFetch, `createGame`, {
        userId,
    });

    yield call(join, { id, data, players });

    yield put(createdNewGameAction());
}

export default function*() {
    yield takeEvery(joinGameAction().type, joinGame);
    yield takeEvery(startGameAction().type, startGame);
    yield takeEvery(confirmMissionTeamAction().type, confirmMissionTeam);
    yield takeEvery(confirmPlayerIdentityAction().type, confirmPlayerIdentity);
    yield takeEvery(
        revealProposedMissionTeamVoteAction().type,
        revealProposedMissionTeamVote,
    );

    yield takeEvery(
        submitProposedMissionTeamApprovalAction().type,
        submitProposedMissionTeamApproval,
    );

    yield takeEvery(
        retractProposedMissionTeamApprovalAction().type,
        retractProposedMissionTeamApproval,
    );

    yield takeEvery(conductMissionAction().type, conductMission);

    yield takeEvery(selectNewLeaderAction().type, selectNewLeader);

    yield takeLatest(
        toggleMissionTeamMemberAction().type,
        updateProposedMissionTeam,
    );

    yield takeEvery(submitMissionPass().type, submitMissionPasses);

    yield takeEvery(startNextRoundAction().type, startNextRound);

    yield takeEvery(createNewGameAction().type, createNewGame);
}
