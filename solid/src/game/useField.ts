import { boardConfig, boards } from "./game";

export type FieldOwner = "opponent" | "battle" | "player";
export type TokenOwner = Exclude<FieldOwner, "battle">;
type FieldToken = { count: number; owner: TokenOwner };

export const useField = (idx: number, owner: FieldOwner) => {
  const tokenCount = () => {
    const { boardPlayer, boardOpponent } = boards();

    const countPlayer = boardPlayer[idx] ?? 0;
    const countOpponent = boardOpponent[idx] ?? 0;

    if (owner === "player") return countPlayer;
    if (owner === "opponent") return countOpponent;

    const battleCount = countPlayer + countOpponent;
    return battleCount;
  };

  const tokenOwner = () => {
    const { boardPlayer } = boards();

    const countPlayer = boardPlayer[idx] ?? 0;

    if (owner !== "battle") return owner;

    return countPlayer > 0 ? "player" : "opponent";
  };

  const token = (): FieldToken => {
    const { boardPlayer, boardOpponent } = boards();

    const countPlayer = boardPlayer[idx] ?? 0;
    const countOpponent = boardOpponent[idx] ?? 0;

    if (owner === "player") return { count: countPlayer, owner };
    if (owner === "opponent") return { count: countOpponent, owner };

    const battleCount = countPlayer + countOpponent;
    const battleOwner = countPlayer > 0 ? "player" : "opponent";
    return { count: battleCount, owner: battleOwner };
  };

  const config = () => boardConfig()[idx];

  return { token, config, tokenCount, tokenOwner };
};
