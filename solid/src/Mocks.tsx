import { Component } from "solid-js";
import {
  boardBlack,
  BoardConfiguration,
  GameState,
  load,
  update,
} from "./game/game";

const mockBoardConfig: BoardConfiguration = [
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

const mockInitialGameState: GameState = {
  boardBlack: [7, ...Array(mockBoardConfig.length - 1).fill(0)],
  boardWhite: [7, ...Array(mockBoardConfig.length - 1).fill(0)],
  isFinished: false,
  currentPlayer: "white",
};

const simulateMove = () => {
  const blackCopy = [...boardBlack()];
  const tokenIdx = blackCopy.findIndex((token) => token > 0);

  if (tokenIdx === blackCopy.length - 1) return;

  blackCopy[tokenIdx] = blackCopy[tokenIdx] - 1;
  blackCopy[tokenIdx + 1] = blackCopy[tokenIdx + 1] + 1;

  update({ ...mockInitialGameState, boardBlack: blackCopy });
};

export const Mocks: Component = () => {
  load(mockBoardConfig, mockInitialGameState);

  return <button onClick={simulateMove}>Update board</button>;
};
