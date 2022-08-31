import {boardConfig, boards} from "./game";

export type FieldOwner = "opponent" | "battle" | "player";

export const useField = (idx: number, owner: FieldOwner) => {
  const tokenCount = () => {

    const {boardOpponent, boardPlayer} = boards()
    const countOpponent = boardOpponent[idx] ?? 0;
    const countPlayer = boardPlayer[idx] ?? 0;

    if (owner === "player") return countPlayer;
    if (owner === "opponent") return countOpponent;

    return countOpponent + countPlayer;
  };

  const config = () => boardConfig()[idx];

  return { tokenCount, config };
};
