import { getRandomElementsFromArray } from "./helpers";
import { spyCount } from "./gameStructure";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

export const joinGameErrors = {
    GAME_DOES_NOT_EXIST: {
        code: `GAME_DOES_NOT_EXIST`,
        message: `No open game exists with that code`
    }
};

export async function joinGame(userId, gameCode) {
    const { docs: gameDocs } = await admin
        .firestore()
        .collection(`games`)
        .where(`gameCode`, `==`, parseInt(gameCode))
        .where(`state`, `==`, `OPEN`)
        .get();

    if (gameDocs.length) {
        const game = gameDocs[0];
        const gameId = game.id;

        const { docs: existingUserDoc } = await game.ref
            .collection(`players`)
            .where(`id`, `==`, userId)
            .get();

        // if the user isn't already in the game, add them
        if (!existingUserDoc.length) {
            const userDoc = await admin
                .firestore()
                .collection(`users`)
                .doc(userId)
                .get();

            const { name } = userDoc.data();

            await game.ref.collection(`players`).add({
                name,
                id: userId
            });
        }

        return gameId;
    } else {
        // TODO: Track/log this error somehow
        return Promise.reject(joinGameErrors.GAME_DOES_NOT_EXIST);
    }
}

export const quitGameErrors = {
    PLAYER_DOES_NOT_EXIST: {
        code: `PLAYER_DOES_NOT_EXIST`,
        message: `Player doesn't exist in this game`
    },
    GAME_DOES_NOT_EXIST: {
        code: `GAME_DOES_NOT_EXIST`,
        message: `This game doesn't exist`
    }
};

export async function quitGame(userId, gameId) {
    const gameDoc = await admin
        .firestore()
        .collection(`games`)
        .doc(gameId)
        .get();

    if (gameDoc.exists) {
        const playerQuerySnapshot = await gameDoc.ref
            .collection(`players`)
            .where(`id`, `==`, userId)
            .get();

        if (playerQuerySnapshot.docs.length) {
            const player = playerQuerySnapshot.docs[0];

            await player.ref.delete();

            // check if player was last player in game - if so, delete game
            // not returning because this is a server-job and client shouldn't wait for it to complete
            gameDoc.ref
                .collection(`players`)
                .get()
                .then(allPlayersQuerySnapshot => {
                    if (!allPlayersQuerySnapshot.docs.length) {
                        return gameDoc.ref.delete();
                    }
                });
        } else {
            // TODO: Track/log this error somehow
            return Promise.reject(quitGameErrors.PLAYER_DOES_NOT_EXIST);
        }
    } else {
        // TODO: Track/log this error somehow
        return Promise.reject(quitGameErrors.GAME_DOES_NOT_EXIST);
    }
}

export const createGameErrors = {
    CANNOT_CREATE_GAME: {
        code: `CANNOT_CREATE_GAME`,
        message: `Shit. We're having trouble creating a game at the moment.`
    }
};

export async function createGame(userId) {
    try {
        const gameCode = Math.floor(Math.random() * 900000) + 100000;

        const newGame = {
            gameCode,
            host: userId,
            state: `OPEN`
        };

        await admin
            .firestore()
            .collection(`games`)
            .add(newGame);

        const gameId = await joinGame(userId, gameCode);

        return {
            gameCode,
            gameId
        };
    } catch (e) {
        // TODO: Track/log this error somehow
        return Promise.reject(createGameErrors.CANNOT_CREATE_GAME);
    }
}

export const startGameErrors = {
    CANNOT_START_GAME: {
        code: `CANNOT_START_GAME`,
        message: `Shit. We're having trouble starting the game at the moment.`
    }
};

export async function startGame(gameId) {
    const [playersSnapshot] = await Promise.all([
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .collection(`players`)
            .get(),
        admin
            .firestore()
            .collection(`games`)
            .doc(gameId)
            .update({
                state: `STARTED`
            })
    ]);

    const totalSpies = spyCount[playersSnapshot.docs.length];

    const spies = getRandomElementsFromArray(playersSnapshot.docs, totalSpies);

    return Promise.all(
        playersSnapshot.docs.map(doc =>
            doc.ref.update({
                isSpy: spies.indexOf(doc) !== -1
            })
        )
    );
}
