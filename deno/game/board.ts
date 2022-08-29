import { Field } from "../shared/models/field.model.ts";

const boardConfig: Field[] = [
  {
    idx: 0,
    isSafe: true,
    isBattleField: false,
    canThrowAgain: false,
    capacity: 7,
  },
  {
    idx: 1,
    isSafe: true,
    isBattleField: false,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 2,
    isSafe: true,
    isBattleField: false,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 3,
    isSafe: true,
    isBattleField: false,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 4,
    isSafe: true,
    isBattleField: false,
    canThrowAgain: true,
    capacity: 1,
  },
  {
    idx: 5,
    isSafe: false,
    isBattleField: true,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 6,
    isSafe: false,
    isBattleField: true,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 7,
    isSafe: false,
    isBattleField: true,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 8,
    isSafe: true,
    isBattleField: true,
    canThrowAgain: true,
    capacity: 1,
  },
  {
    idx: 9,
    isSafe: false,
    isBattleField: true,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 10,
    isSafe: false,
    isBattleField: true,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 11,
    isSafe: false,
    isBattleField: true,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 12,
    isSafe: false,
    isBattleField: true,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 13,
    isSafe: true,
    isBattleField: false,
    canThrowAgain: false,
    capacity: 1,
  },
  {
    idx: 14,
    isSafe: true,
    isBattleField: false,
    canThrowAgain: true,
    capacity: 1,
  },
  {
    idx: 15,
    isSafe: true,
    isBattleField: false,
    canThrowAgain: false,
    capacity: 7,
  },
];

export function getBoardConfig() {
  return boardConfig;
}
