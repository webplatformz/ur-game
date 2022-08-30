import { GameState } from "../../../deno/shared/models/game-state.model";
import { boardBlack, boardConfig, boardWhite } from "./game";

export type FieldOwner = GameState["currentPlayer"] | "battle";

export const useField = (idx: number, owner: FieldOwner) => {
  const tokenCount = () => {
    const countBlack = boardBlack()[idx] ?? 0;
    const countWhite = boardWhite()[idx] ?? 0;

    if (owner === "white") return countWhite;
    if (owner === "black") return countBlack;

    return countBlack + countWhite;
  };

  const config = () => boardConfig()[idx];

  return { tokenCount, config };
};
