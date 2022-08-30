import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { moveToTargetIdx } from "../game/move.ts";
import { GameState } from "../shared/models/game-state.model.ts";

const initialGameState: GameState = {
  type: "gamestate",
  boardBlack: getNewPlayerBoard(),
  boardWhite: getNewPlayerBoard(),
  isFinished: false,
  currentPlayer: "black",
};

function getStateWithBoards(boardBlack?: number[], boardWhite?: number[]) {
  return {
    ...initialGameState,
    ...(boardBlack != null && { boardBlack: boardBlack }),
    ...(boardWhite != null && { boardWhite: boardWhite }),
  };
}

function getNewPlayerBoard() {
  const board = Array(16).fill(0);
  board[0] = 7;
  board[board.length - 1] = 7;
  return board;
}

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
  currentPlayerBoard[currentTokenIdx] = 1

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
  currentPlayerBoard[currentTokenIdx] = 1

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
  currentPlayerBoard[currentTokenIdx] = 1

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


