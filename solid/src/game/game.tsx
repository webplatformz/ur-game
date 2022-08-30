import { batch, createSignal } from "solid-js";
import { GameState } from "../../../deno/shared/models/game-state.model";

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

export const updateGame = (gameState: GameState) => {
  batch(() => {
    setBoardBlack(gameState.boardBlack);
    setBoardWhite(gameState.boardWhite);
    setCurrentPlayer(gameState.currentPlayer);
    setIsFinished(gameState.isFinished);
    setBoardConfig(gameState.boardConfig);
  });
};

export { boardBlack, boardConfig, boardWhite, currentPlayer, isFinished };
