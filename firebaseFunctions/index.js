const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

async function joinGame(userId, gameCode) {
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
        return Promise.reject(`No open game exists with that code`);
    }
}

exports.createGame = functions.https.onRequest(async (req, res) => {
    const { userId } = req.query;
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

    res.type("json").send({
        gameCode,
        gameId
    });
});

exports.joinGame = functions.https.onRequest(async (req, res) => {
    const { gameCode, userId } = req.query;

    try {
        const gameId = await joinGame(userId, parseInt(gameCode));

        res.type(`json`).send({
            gameId
        });
    } catch (error) {
        res
            .type(`json`)
            .status(404)
            .send({
                message: error
            });
    }
});

exports.quitGame = functions.https.onRequest(async (req, res) => {
    const { gameId, userId } = req.query;

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

            res.send({
                success: true
            });
        } else {
            res
                .type(`json`)
                .status(404)
                .send({
                    message: `Player (${userId}) doesn't exist in this game`
                });
        }
    } else {
        res
            .type(`json`)
            .status(404)
            .send({
                message: `This game doesn't exist`
            });
    }
});
