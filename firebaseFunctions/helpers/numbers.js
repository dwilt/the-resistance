export function getMajority(number) {
    return number % 2 === 0
        ? number / 2 + 1
        : Math.ceil(number / 2)
}
