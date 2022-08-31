import { DiceRoll } from "@shared-models/dice-roll.model";
import { GameContext } from "@shared-models/game-context.model";
import { batch, createSignal } from "solid-js";
import { sendMessage } from "../connection/connection";
import { playerColor } from "../connection/session";
import {Move} from '@shared-models/move.model';

const [boardDark, setBoardDark] = createSignal<GameContext["boardDark"]>([]);
const [boardLight, setBoardLight] = createSignal<GameContext["boardLight"]>([]);
const [currentPlayer, setCurrentPlayer] =
  createSignal<GameContext["currentPlayer"]>("dark");
const [isFinished, setIsFinished] = createSignal<boolean>(false);
const [boardConfig, setBoardConfig] = createSignal<GameContext["boardConfig"]>(
  []
);
const [diceRoll, loadDiceRoll] = createSignal<DiceRoll["values"]>([0, 0, 0, 0]);
const [gameState, setGameState] = createSignal<GameContext["state"]>("initial");
const [currentValidTargets, setCurrentValidTargets] = createSignal<GameContext['currentValidTargets']>([]);

const isItPlayersTurn = () => currentPlayer() === playerColor();

export const boards = () => {
  return playerColor() === "light"
    ? { boardPlayer: boardLight(), boardOpponent: boardDark() }
    : { boardPlayer: boardDark(), boardOpponent: boardLight() };
};

export const updateGame = (gameContext: GameContext) => {
  batch(() => {
    setBoardDark(gameContext.boardDark);
    setBoardLight(gameContext.boardLight);
    setCurrentPlayer(gameContext.currentPlayer);
    setIsFinished(gameContext.state === "finished");
    setBoardConfig(gameContext.boardConfig);
    loadDiceRoll(gameContext.currentDiceRoll);
    setGameState(gameContext.state);
    setCurrentValidTargets(gameContext.currentValidTargets);
  });
};

export const roll = () => {
  sendMessage({ type: "roll" });
};

export const move = (targetIdx: Move['targetIdx']) => {
  sendMessage({ type: 'move', targetIdx })
}

export {
  boardDark,
  boardConfig,
  boardLight,
  currentPlayer,
  diceRoll,
  isFinished,
  gameState,
  isItPlayersTurn,
  currentValidTargets,
};
