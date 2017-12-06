const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

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

    res.type("json").send({
        gameCode
    });
});

exports.joinGame = functions.https.onRequest(async (req, res) => {
    const { gameCode, userId } = req.query;

    const { docs } = await admin
        .firestore()
        .collection(`games`)
        .where(`gameCode`, `==`, parseInt(gameCode))
        .where(`state`, `==`, `OPEN`)
        .get();

    if (docs.length) {
        const game = docs[0];
        const gameId = game.id;

        await game.ref.collection(`players`).add({
            userId
        });

        res.type(`json`).send({
            gameId
        });
    } else {
        res
            .type(`json`)
            .status(404)
            .send({
                message: `No open game exists with that code`
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
            .where(`userId`, `==`, userId)
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
                    message: `This player doesn't exist in this game`
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
