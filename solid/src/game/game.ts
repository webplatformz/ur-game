import { batch, createSignal } from "solid-js";
import { GameState } from "../../../deno/shared/models/game-state.model";
import { DiceRoll } from "../../../deno/shared/models/dice-roll.model";
import { sendMessage } from "../connection/connection";

const [sessionId, setSessionId] = createSignal<string>();
const [boardBlack, setBoardBlack] = createSignal<GameState["boardBlack"]>([]);
const [boardWhite, setBoardWhite] = createSignal<GameState["boardWhite"]>([]);
const [currentPlayer, setCurrentPlayer] = createSignal<
  GameState["currentPlayer"]
>("white");
const [isFinished, setIsFinished] = createSignal<GameState["isFinished"]>(
  false,
);
const [boardConfig, setBoardConfig] = createSignal<GameState["boardConfig"]>(
  [],
);
const [diceRoll, loadDiceRoll] = createSignal<DiceRoll["values"]>(
  [],
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
  sessionId,
  setSessionId
};
