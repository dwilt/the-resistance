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
        const querySnapshot = await gameDoc.ref
            .collection(`players`)
            .where(`id`, `==`, userId)
            .get();

        if (querySnapshot.docs.length) {
            const player = querySnapshot.docs[0];

            await player.ref.delete();
        } else {
            return Promise.reject(quitGameErrors.PLAYER_DOES_NOT_EXIST);
        }
    } else {
        return Promise.reject(quitGameErrors.GAME_DOES_NOT_EXIST);
    }
}

export async function createGame(userId) {
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
}
