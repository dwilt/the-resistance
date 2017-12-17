import { gameStates } from "../gameStructure";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

export function addGame(newGame) {
    return admin
        .firestore()
        .collection(`games`)
        .add(newGame);
}

export async function getGame(gameId) {
    const doc = await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .get();

    return doc.data();
}

export async function updateGame(gameId, props) {
    await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .update(props);

    return getGame(gameId);
}

export async function deleteGame(gameId) {
    await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .delete();
}

export async function getPlayers(gameId) {
    const { docs } = await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .collection(`players`)
        .get();

    return docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function addPlayer(gameId, userId, name) {
    const newPlayer = await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .collection(`players`)
        .doc(userId);

    return newPlayer.set({
        name
    });
}

export async function updatePlayer(gameId, userId, props = {}) {
    return admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .collection(`players`)
        .doc(userId)
        .update(props);
}

export async function deletePlayer(gameId, playerId) {
    return admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .collection(`players`)
        .doc(playerId)
        .delete();
}

export async function getPlayer(gameId, userId) {
    return admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .collection(`players`)
        .doc(userId)
        .get();
}

export async function addCompletedMission(gameId, mission) {
    return admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .collection(`completedMissions`)
        .add(mission);
}

export async function getCompletedMissions(gameId) {
    const { docs } = await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .collection(`completedMissions`)
        .get();

    return docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function getUser(userId) {
    return admin
        .firestore()
        .collection(`users`)
        .doc(userId)
        .get();
}

export async function getOpenGameByCode(gameCode) {
    const { docs } = await admin
        .firestore()
        .collection(`games`)
        .where(`gameCode`, `==`, gameCode)
        // .where(`state`, `==`, gameStates.LOBBY)
        .get();

    return docs[0];
}
