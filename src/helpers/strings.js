export function createCommaSentenceFromArray(arr = []) {
    return arr.reduce((currentText, item, i) => {
        let newText = currentText;

        if (i === 0) {
            newText += item;
        }
        if (i === arr.length - 1) {
            newText += ` and ${item}`;
        } else if (arr.length > 2 && i > 0) {
            newText += `, ${item},`;
        }

        return newText;
    }, ``);
}
