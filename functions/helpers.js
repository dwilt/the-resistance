"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomElementsFromArray = getRandomElementsFromArray;

function getRandomElementsFromArray(array, numberOfElements = 1) {
  const elements = [];

  function getRandomElement(arr) {
    if (elements.length < numberOfElements) {
      const index = Math.floor(Math.random() * arr.length);
      const element = arr.splice(index, 1)[0];
      elements.push(element);
      return getRandomElement(arr);
    } else {
      return elements;
    }
  }

  return getRandomElement([...array]);
}