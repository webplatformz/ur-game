import { createSignal } from "solid-js";
import { GameState as GameStateMessage } from "../../../deno/shared/models/game-state.model";
import { BoardConfiguration as BoardConfigurationMessage } from "../../../deno/shared/models/board-configuration.model";

export type GameState = Omit<GameStateMessage, "type">;
export type BoardConfiguration = BoardConfigurationMessage["fields"];

const [boardBlack, setBoardBlack] = createSignal<GameState["boardBlack"]>([]);
const [boardWhite, setBoardWhite] = createSignal<GameState["boardWhite"]>([]);
const [currentPlayer, setCurrentPlayer] = createSignal<
  GameState["currentPlayer"]
>("white");
const [isFinished, setIsFinished] = createSignal<GameState["isFinished"]>(
  false,
);
const [boardConfig, setBoardConfig] = createSignal<BoardConfiguration>([]);

export const update = (
  { boardBlack, boardWhite, currentPlayer, isFinished }: GameState,
) => {
  setBoardBlack(boardBlack);
  setBoardWhite(boardWhite);
  setCurrentPlayer(currentPlayer);
  setIsFinished(isFinished);
};

export const load = (config: BoardConfiguration, initialState: GameState) => {
  setBoardConfig(config);
  update(initialState);
};

export { boardBlack, boardConfig, boardWhite, currentPlayer, isFinished };
