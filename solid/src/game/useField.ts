import { GameState } from "@shared-models/game-state.model";
import { boardDark, boardConfig, boardLight } from "./game";

export type FieldOwner = GameState["currentPlayer"] | "battle";

export const useField = (idx: number, owner: FieldOwner) => {
  const tokenCount = () => {
    const countDark = boardDark()[idx] ?? 0;
    const countLight = boardLight()[idx] ?? 0;

    if (owner === "light") return countLight;
    if (owner === "dark") return countDark;

    return countDark + countLight;
  };

  const config = () => boardConfig()[idx];

  return { tokenCount, config };
};
