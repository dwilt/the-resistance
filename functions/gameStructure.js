"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpyCount = getSpyCount;
exports.getMissionMembersCount = getMissionMembersCount;
exports.totalRounds = exports.gameStates = void 0;
const gameStates = {
  LOBBY: `LOBBY`,
  PLAYER_REVEAL: `PLAYER_REVEAL`,
  LEADER_ASSEMBLE_TEAM: `LEADER_ASSEMBLE_TEAM`,
  MISSION_TEAM_VOTE: `MISSION_TEAM_VOTE`,
  CONDUCT_MISSION: `CONDUCT_MISSION`,
  COMPLETED: `COMPLETED`
};
exports.gameStates = gameStates;
const totalRounds = 5;
exports.totalRounds = totalRounds;

function getSpyCount(totalPlayers) {
  const map = {
    5: 2,
    6: 2,
    7: 3,
    8: 3,
    9: 3,
    10: 4
  };
  return map[totalPlayers];
}

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