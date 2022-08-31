import { Component } from "solid-js";
import { boardDark, updateGame } from "./game/game";
import { Field } from "../../deno/shared/models/field.model";
import { GameContext } from "@shared-models/game-context.model";

const mockBoardConfig: Field[] = [
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

const mockBoard = [7, ...Array(mockBoardConfig.length - 1).fill(0)];

const mockInitialGameState: GameContext = {
  boardDark: mockBoard,
  boardLight: mockBoard,
  isFinished: false,
  currentPlayer: "light",
  boardConfig: mockBoardConfig,
};

const simulateMove = () => {
  const blackCopy = [...boardDark()];
  const tokenIdx = blackCopy.findIndex((token) => token > 0);

  if (tokenIdx === blackCopy.length - 1) return;

  blackCopy[tokenIdx] = blackCopy[tokenIdx] - 1;
  blackCopy[tokenIdx + 1] = blackCopy[tokenIdx + 1] + 1;

  updateGame({ ...mockInitialGameState, boardDark: blackCopy });

  debugger;
};

export const Mocks: Component = () => {
  updateGame(mockInitialGameState);

  return <button onClick={simulateMove}>Update board</button>;
};
