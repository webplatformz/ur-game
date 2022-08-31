import { DiceRoll } from "@shared-models/dice-roll.model";
import { GameState } from "@shared-models/game-state.model";
import { batch, createSignal } from "solid-js";
import { sendMessage } from "../connection/connection";

const [boardBlack, setBoardBlack] = createSignal<GameState["boardBlack"]>([]);
const [boardWhite, setBoardWhite] = createSignal<GameState["boardWhite"]>([]);
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
    setBoardBlack(gameState.boardBlack);
    setBoardWhite(gameState.boardWhite);
    setCurrentPlayer(gameState.currentPlayer);
    setIsFinished(gameState.isFinished);
    setBoardConfig(gameState.boardConfig);
  });
};

export const roll = () => {
  sendMessage({ type: "roll" });
};

export {
  boardBlack,
  boardConfig,
  boardWhite,
  currentPlayer,
  diceRoll,
  isFinished,
  loadDiceRoll,
};
