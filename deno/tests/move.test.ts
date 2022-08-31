import { assertEquals } from "asserts";
import { getPossibleTargetFields, moveToTargetIdx } from "../game/move.ts";
import { getNewPlayerBoard } from "../game/player-board.ts";
import { getStateWithBoards } from "./test-helper.ts";

Deno.test("should move current player token from start to first field", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const gameState = getStateWithBoards(currentPlayerBoard);
  const startFieldIdx = 0;
  const targetFieldIdx = 1;
  const diceValue = 1;

  assertEquals(gameState.boardBlack[startFieldIdx], 7);
  assertEquals(gameState.boardBlack[targetFieldIdx], 0);

  const updatedState = moveToTargetIdx(gameState, targetFieldIdx, diceValue);

  assertEquals(updatedState.boardBlack[startFieldIdx], 6);
  assertEquals(updatedState.boardBlack[targetFieldIdx], 1);
});

Deno.test("should move current player token from start to first field and not kill oponent on same safe field", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const opponentPlayerBoard = getNewPlayerBoard();

  const startFieldIdx = 0;
  const targetFieldIdx = 1;
  opponentPlayerBoard[targetFieldIdx] = 1;

  const diceValue = 1;
  const gameState = getStateWithBoards(currentPlayerBoard, opponentPlayerBoard);

  assertEquals(gameState.boardBlack[startFieldIdx], 7);
  assertEquals(gameState.boardBlack[targetFieldIdx], 0);
  assertEquals(gameState.boardWhite[targetFieldIdx], 1);

  const updatedState = moveToTargetIdx(gameState, targetFieldIdx, diceValue);

  assertEquals(updatedState.boardBlack[startFieldIdx], 6);
  assertEquals(updatedState.boardBlack[targetFieldIdx], 1);
  assertEquals(updatedState.boardWhite[targetFieldIdx], 1);
});

Deno.test("should move current player token to occupied enemey field and kill", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const currentTokenIdx = 3;
  currentPlayerBoard[currentTokenIdx] = 1;

  const opponentPlayerBoard = getNewPlayerBoard();
  const targetFieldIdx = 5;
  opponentPlayerBoard[targetFieldIdx] = 1;

  const diceValue = 2;
  const gameState = getStateWithBoards(currentPlayerBoard, opponentPlayerBoard);

  assertEquals(gameState.boardBlack[currentTokenIdx], 1);
  assertEquals(gameState.boardBlack[targetFieldIdx], 0);
  assertEquals(gameState.boardWhite[targetFieldIdx], 1);

  const updatedState = moveToTargetIdx(gameState, targetFieldIdx, diceValue);

  assertEquals(updatedState.boardBlack[currentTokenIdx], 0);
  assertEquals(updatedState.boardBlack[targetFieldIdx], 1);
  assertEquals(updatedState.boardWhite[targetFieldIdx], 0);
});

Deno.test("should move past opponent player token", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const currentTokenIdx = 3;
  currentPlayerBoard[currentTokenIdx] = 1;

  const opponentPlayerBoard = getNewPlayerBoard();
  const opponentTokenIdx = 5;
  opponentPlayerBoard[opponentTokenIdx] = 1;

  const targetFieldIdx = 7;
  const diceValue = 4;
  const gameState = getStateWithBoards(currentPlayerBoard, opponentPlayerBoard);

  assertEquals(gameState.boardBlack[currentTokenIdx], 1);
  assertEquals(gameState.boardBlack[targetFieldIdx], 0);
  assertEquals(gameState.boardWhite[targetFieldIdx], 0);
  assertEquals(gameState.boardWhite[opponentTokenIdx], 1);

  const updatedState = moveToTargetIdx(gameState, targetFieldIdx, diceValue);

  assertEquals(updatedState.boardBlack[currentTokenIdx], 0);
  assertEquals(updatedState.boardBlack[targetFieldIdx], 1);
  assertEquals(updatedState.boardWhite[targetFieldIdx], 0);
  assertEquals(updatedState.boardWhite[opponentTokenIdx], 1);
});

Deno.test("should not past opponent player token", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const currentTokenIdx = 3;
  currentPlayerBoard[currentTokenIdx] = 1;

  const opponentPlayerBoard = getNewPlayerBoard();
  const opponentTokenIdx = 5;
  opponentPlayerBoard[opponentTokenIdx] = 1;

  const targetFieldIdx = 7;
  const diceValue = 4;
  const gameState = getStateWithBoards(currentPlayerBoard, opponentPlayerBoard);

  assertEquals(gameState.boardBlack[currentTokenIdx], 1);
  assertEquals(gameState.boardBlack[targetFieldIdx], 0);
  assertEquals(gameState.boardWhite[targetFieldIdx], 0);
  assertEquals(gameState.boardWhite[opponentTokenIdx], 1);

  const updatedState = moveToTargetIdx(gameState, targetFieldIdx, diceValue);

  assertEquals(updatedState.boardBlack[currentTokenIdx], 0);
  assertEquals(updatedState.boardBlack[targetFieldIdx], 1);
  assertEquals(updatedState.boardWhite[targetFieldIdx], 0);
  assertEquals(updatedState.boardWhite[opponentTokenIdx], 1);
});

Deno.test("should switch player after move", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const gameState = getStateWithBoards(currentPlayerBoard);
  const targetFieldIdx = 1;
  const diceValue = 1;

  assertEquals(gameState.currentPlayer, "dark");
  const updatedState = moveToTargetIdx(gameState, targetFieldIdx, diceValue);

  assertEquals(updatedState.currentPlayer, "light");
});

Deno.test("should not switch player after moving to roll again field", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const gameState = getStateWithBoards(currentPlayerBoard);
  const targetFieldIdx = 8;
  const diceValue = 1;

  assertEquals(gameState.currentPlayer, "dark");
  const updatedState = moveToTargetIdx(gameState, targetFieldIdx, diceValue);

  assertEquals(updatedState.currentPlayer, "dark");
});

Deno.test("should return movable fields for initial board", () => {
  const gameState = getStateWithBoards();
  const diceValue = 3;

  const possibleTargets = getPossibleTargetFields(gameState, diceValue);

  assertEquals(possibleTargets, [3]);
});

Deno.test("should return movable fields for distributed tokens", () => {
  const gameState = getStateWithBoards();
  gameState.boardBlack[4] = 1;
  gameState.boardBlack[8] = 1;
  const diceValue = 3;

  const possibleTargets = getPossibleTargetFields(gameState, diceValue);

  assertEquals(possibleTargets, [3, 7, 11]);
});

Deno.test("should return end field as movable target", () => {
  const gameState = getStateWithBoards();
  gameState.boardBlack[14] = 1;
  const diceValue = 1;

  const possibleTargets = getPossibleTargetFields(gameState, diceValue);

  assertEquals(possibleTargets, [1, 15]);
});

Deno.test("should return empty targets if no move possible", () => {
  const gameState = getStateWithBoards();
  gameState.boardBlack[0] = 0;
  gameState.boardBlack[7] = 1;
  gameState.boardWhite[8] = 1;
  const diceValue = 1;

  const possibleTargets = getPossibleTargetFields(gameState, diceValue);

  assertEquals(possibleTargets, []);
});

Deno.test("should return occupied target", () => {
  const gameState = getStateWithBoards();
  gameState.boardBlack[0] = 0;
  gameState.boardBlack[6] = 1;
  gameState.boardWhite[7] = 1;
  const diceValue = 1;

  const possibleTargets = getPossibleTargetFields(gameState, diceValue);

  assertEquals(possibleTargets, [7]);
});
