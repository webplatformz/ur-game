import { DiceRoll } from "@shared-models/dice-roll.model";
import { GameState } from "@shared-models/game-state.model";
import { batch, createSignal } from "solid-js";
import { sendMessage } from "../connection/connection";

const [boardDark, setBoardDark] = createSignal<GameState["boardDark"]>([]);
const [boardLight, setBoardLight] = createSignal<GameState["boardLight"]>([]);
const [currentPlayer, setCurrentPlayer] = createSignal<
  GameState["currentPlayer"]
>("dark");
const [isFinished, setIsFinished] = createSignal<GameState["isFinished"]>(
  false,
);
const [boardConfig, setBoardConfig] = createSignal<GameState["boardConfig"]>(
  [],
);
const [diceRoll, loadDiceRoll] = createSignal<DiceRoll["values"]>(
  [0, 0, 0, 0],
);

export const updateGame = (gameState: GameState) => {
  batch(() => {
    setBoardDark(gameState.boardDark);
    setBoardLight(gameState.boardLight);
    setCurrentPlayer(gameState.currentPlayer);
    setIsFinished(gameState.isFinished);
    setBoardConfig(gameState.boardConfig);
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
