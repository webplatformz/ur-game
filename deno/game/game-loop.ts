import { getScore } from "./get-score.ts";
import { getInitialGameState } from "./initial-game-state.ts";
import { isFinished } from "./is-finished.ts";
import { isValidMove } from "./is-valid-move.ts";
import { moveToTargetIdx } from "./move.ts";
import { diceRollSum, rollDice } from "./roll-dice.ts";

export async function gameLoop() {
  let gameState = getInitialGameState();
  while (!gameState.isFinished) {
    try {
      sendToBothPlayers(gameState);
      await waitForPlayerAction("roll", null);
      const diceRoll = rollDice();
      sendToBothPlayers(diceRoll);
      const moveTarget = await waitForPlayerAction("move", 5);
      const diceSum = diceRollSum(diceRoll);
      if (isValidMove(gameState, moveTarget, diceSum)) {
        gameState = moveToTargetIdx(gameState, moveTarget, diceSum);
      }
      gameState.isFinished = isFinished(gameState);
    } catch (err) {
      console.error(err.message);
      continue;
    }
    sendToBothPlayers(getScore(gameState));
  }
}

// temporary mock functions

function sendToBothPlayers(message: any) {
  console.log("this should be sent over ws:", message);
}

function waitForPlayerAction<T>(action: string, value: T): Promise<T> {
  console.log("waiting for:", action);
  return new Promise((resolve) => setTimeout(() => resolve(value), 10000));
}
