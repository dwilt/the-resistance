"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMissionMembersCount = getMissionMembersCount;
exports.spyCount = void 0;
const spyCount = {
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 3,
  10: 4
};
exports.spyCount = spyCount;

function getMissionMembersCount(roundNumber, totalPlayers) {
  const map = {
    1: {
      5: 2,
      6: 2,
      7: 2,
      8: 3,
      9: 3,
      10: 3
    },
    2: {
      5: 3,
      6: 3,
      7: 3,
      8: 4,
      9: 4,
      10: 4
    },
    3: {
      5: 2,
      6: 4,
      7: 3,
      8: 4,
      9: 4,
      10: 4
    },
    4: {
      5: 3,
      6: 3,
      7: 4,
      8: 5,
      9: 5,
      10: 5
    },
    5: {
      5: 3,
      6: 4,
      7: 4,
      8: 5,
      9: 5,
      10: 5
    }
  };
  return map[roundNumber][totalPlayers];
}