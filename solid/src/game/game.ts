import { DiceRoll } from "@shared-models/dice-roll.model";
import { GameContext } from "@shared-models/game-context.model";
import { batch, createSignal } from "solid-js";
import { sendMessage } from "../connection/connection";
import { playerColor } from "../connection/session";

const [boardDark, setBoardDark] = createSignal<GameContext["boardDark"]>([]);
const [boardLight, setBoardLight] = createSignal<GameContext["boardLight"]>([]);
const [currentPlayer, setCurrentPlayer] = createSignal<
  GameContext["currentPlayer"]
>("dark");
const [isFinished, setIsFinished] = createSignal<boolean>(
  false,
);
const [boardConfig, setBoardConfig] = createSignal<GameContext["boardConfig"]>(
  [],
);
const [diceRoll, loadDiceRoll] = createSignal<DiceRoll["values"]>(
  [0, 0, 0, 0],
);

export const boards = () => {
  return playerColor() === "light"
    ? { boardPlayer: boardLight(), boardOpponent: boardDark() }
    : { boardPlayer: boardDark(), boardOpponent: boardLight() };
}

export const updateGame = (gameContext: GameContext) => {
  batch(() => {
    setBoardDark(gameContext.boardDark);
    setBoardLight(gameContext.boardLight);
    setCurrentPlayer(gameContext.currentPlayer);
    setIsFinished(gameContext.state === 'finished');
    setBoardConfig(gameContext.boardConfig);
  });
};

export const roll = () => {
  sendMessage({ type: "roll" });
};

export {
  boardDark,
  boardConfig,
  boardLight,
  currentPlayer,
  diceRoll,
  isFinished,
  loadDiceRoll,
};
