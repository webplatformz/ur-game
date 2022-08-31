import { assertEquals } from "asserts";
import { getPossibleTargetFields, moveToTargetIdx } from "../game/move.ts";
import { getNewPlayerBoard } from "../game/player-board.ts";
import { getContextWithBoards } from "./test-helper.ts";

Deno.test("should move current player token from start to first field", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const gameContext = getContextWithBoards(currentPlayerBoard);
  const startFieldIdx = 0;
  const targetFieldIdx = 1;
  const diceValue = 1;

  assertEquals(gameContext.boardDark[startFieldIdx], 7);
  assertEquals(gameContext.boardDark[targetFieldIdx], 0);

  const updatedContext = moveToTargetIdx(
    gameContext,
    targetFieldIdx,
    diceValue,
  );

  assertEquals(updatedContext.boardDark[startFieldIdx], 6);
  assertEquals(updatedContext.boardDark[targetFieldIdx], 1);
});

Deno.test("should move current player token from start to first field and not kill oponent on same safe field", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const opponentPlayerBoard = getNewPlayerBoard();

  const startFieldIdx = 0;
  const targetFieldIdx = 1;
  opponentPlayerBoard[targetFieldIdx] = 1;

  const diceValue = 1;
  const gameContext = getContextWithBoards(
    currentPlayerBoard,
    opponentPlayerBoard,
  );

  assertEquals(gameContext.boardDark[startFieldIdx], 7);
  assertEquals(gameContext.boardDark[targetFieldIdx], 0);
  assertEquals(gameContext.boardLight[targetFieldIdx], 1);

  const updatedContext = moveToTargetIdx(
    gameContext,
    targetFieldIdx,
    diceValue,
  );

  assertEquals(updatedContext.boardDark[startFieldIdx], 6);
  assertEquals(updatedContext.boardDark[targetFieldIdx], 1);
  assertEquals(updatedContext.boardLight[targetFieldIdx], 1);
});

Deno.test("should move current player token to occupied enemey field and kill", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const currentTokenIdx = 3;
  currentPlayerBoard[currentTokenIdx] = 1;

  const opponentPlayerBoard = getNewPlayerBoard();
  const targetFieldIdx = 5;
  opponentPlayerBoard[targetFieldIdx] = 1;

  const diceValue = 2;
  const gameContext = getContextWithBoards(
    currentPlayerBoard,
    opponentPlayerBoard,
  );

  assertEquals(gameContext.boardDark[currentTokenIdx], 1);
  assertEquals(gameContext.boardDark[targetFieldIdx], 0);
  assertEquals(gameContext.boardLight[targetFieldIdx], 1);

  const updatedContext = moveToTargetIdx(
    gameContext,
    targetFieldIdx,
    diceValue,
  );

  assertEquals(updatedContext.boardDark[currentTokenIdx], 0);
  assertEquals(updatedContext.boardDark[targetFieldIdx], 1);
  assertEquals(updatedContext.boardLight[targetFieldIdx], 0);
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
  const gameContext = getContextWithBoards(
    currentPlayerBoard,
    opponentPlayerBoard,
  );

  assertEquals(gameContext.boardDark[currentTokenIdx], 1);
  assertEquals(gameContext.boardDark[targetFieldIdx], 0);
  assertEquals(gameContext.boardLight[targetFieldIdx], 0);
  assertEquals(gameContext.boardLight[opponentTokenIdx], 1);

  const updatedContext = moveToTargetIdx(
    gameContext,
    targetFieldIdx,
    diceValue,
  );

  assertEquals(updatedContext.boardDark[currentTokenIdx], 0);
  assertEquals(updatedContext.boardDark[targetFieldIdx], 1);
  assertEquals(updatedContext.boardLight[targetFieldIdx], 0);
  assertEquals(updatedContext.boardLight[opponentTokenIdx], 1);
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
  const gameContext = getContextWithBoards(
    currentPlayerBoard,
    opponentPlayerBoard,
  );

  assertEquals(gameContext.boardDark[currentTokenIdx], 1);
  assertEquals(gameContext.boardDark[targetFieldIdx], 0);
  assertEquals(gameContext.boardLight[targetFieldIdx], 0);
  assertEquals(gameContext.boardLight[opponentTokenIdx], 1);

  const updatedContext = moveToTargetIdx(
    gameContext,
    targetFieldIdx,
    diceValue,
  );

  assertEquals(updatedContext.boardDark[currentTokenIdx], 0);
  assertEquals(updatedContext.boardDark[targetFieldIdx], 1);
  assertEquals(updatedContext.boardLight[targetFieldIdx], 0);
  assertEquals(updatedContext.boardLight[opponentTokenIdx], 1);
});

Deno.test("should switch player after move", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const gameContext = getContextWithBoards(currentPlayerBoard);
  const targetFieldIdx = 1;
  const diceValue = 1;

  assertEquals(gameContext.currentPlayer, "dark");
  const updatedContext = moveToTargetIdx(
    gameContext,
    targetFieldIdx,
    diceValue,
  );

  assertEquals(updatedContext.currentPlayer, "light");
});

Deno.test("should not switch player after moving to roll again field", () => {
  const currentPlayerBoard = getNewPlayerBoard();
  const gameContext = getContextWithBoards(currentPlayerBoard);
  const targetFieldIdx = 8;
  const diceValue = 1;

  assertEquals(gameContext.currentPlayer, "dark");
  const updatedContext = moveToTargetIdx(
    gameContext,
    targetFieldIdx,
    diceValue,
  );

  assertEquals(updatedContext.currentPlayer, "dark");
});

Deno.test("should return movable fields for initial board", () => {
  const gameContext = getContextWithBoards();
  const diceValue = 3;

  const possibleTargets = getPossibleTargetFields(gameContext, diceValue);

  assertEquals(possibleTargets, [3]);
});

Deno.test("should return movable fields for distributed tokens", () => {
  const gameContext = getContextWithBoards();
  gameContext.boardDark[4] = 1;
  gameContext.boardDark[8] = 1;
  const diceValue = 3;

  const possibleTargets = getPossibleTargetFields(gameContext, diceValue);

  assertEquals(possibleTargets, [3, 7, 11]);
});

Deno.test("should return end field as movable target", () => {
  const gameContext = getContextWithBoards();
  gameContext.boardDark[14] = 1;
  const diceValue = 1;

  const possibleTargets = getPossibleTargetFields(gameContext, diceValue);

  assertEquals(possibleTargets, [1, 15]);
});

Deno.test("should return empty targets if no move possible", () => {
  const gameContext = getContextWithBoards();
  gameContext.boardDark[0] = 0;
  gameContext.boardDark[7] = 1;
  gameContext.boardLight[8] = 1;
  const diceValue = 1;

  const possibleTargets = getPossibleTargetFields(gameContext, diceValue);

  assertEquals(possibleTargets, []);
});

Deno.test("should return occupied target", () => {
  const gameContext = getContextWithBoards();
  gameContext.boardDark[0] = 0;
  gameContext.boardDark[6] = 1;
  gameContext.boardLight[7] = 1;
  const diceValue = 1;

  const possibleTargets = getPossibleTargetFields(gameContext, diceValue);

  assertEquals(possibleTargets, [7]);
});
