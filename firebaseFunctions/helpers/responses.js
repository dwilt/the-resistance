export function sendSuccessfulResponse(res, payload) {
    res.type(`json`).send(
        payload || {
            success: true
        }
    );
}

export function handleError(res, error = {}, errors = {}) {
    console.log(`error`, error);

    const knownError = errors[error.code];
    const statusCode = knownError || 500;
    const resError = knownError
        ? error
        : {
            code: `STANDARD_ERROR`,
            message: `Fuck. There was some kind of unexpected error and we're not sure why. But we're on it!`
        };

    res
        .type(`json`)
        .status(statusCode)
        .send(resError);
}