export function createCommaSentenceFromArray(arr = []) {
    return arr.reduce(
        (currentText, item, i) =>
            i === arr.length - 1
                ? `${currentText} and ${item}.`
                : `${currentText} ${item}, `,
        ``,
    );
}
