import { boardConfig, boards } from "./game";

export type FieldOwner = "opponent" | "battle" | "player";
export type TokenOwner = Exclude<FieldOwner, "battle">;

export const useField = (idx: number, owner: FieldOwner) => {
  const tokenCount = () => {
    const { boardPlayer, boardOpponent } = boards();

    const countPlayer = boardPlayer[idx] ?? 0;
    const countOpponent = boardOpponent[idx] ?? 0;

    if (owner === "player") return countPlayer;
    if (owner === "opponent") return countOpponent;

    return countPlayer + countOpponent;
  };

  const tokenOwner = (): TokenOwner | null => {
    if (owner !== "battle") return owner;

    const { boardPlayer, boardOpponent } = boards();
    const countPlayer = boardPlayer[idx] ?? 0;
    const countOpponent = boardOpponent[idx] ?? 0;

    if (countPlayer > 0) return "player";
    if (countOpponent > 0) return "opponent";

    return null;
  };

  const config = () => boardConfig()[idx];

  return { config, tokenCount, tokenOwner };
};
