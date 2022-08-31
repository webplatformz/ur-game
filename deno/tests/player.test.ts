import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { getNextPlayer } from "../game/player.ts";

Deno.test("should switch player for normal fields", () => {
  const currentPlayer = "dark";
  const normalFields = [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 15];

  normalFields.forEach((targetFieldIdx) => {
    const nextPlayer = getNextPlayer(currentPlayer, targetFieldIdx);
    assertEquals(nextPlayer, "light");
  });
});

Deno.test("should not switch player for roll again fields", () => {
  const currentPlayer = "dark";
  const rollAgainFieldIdx = [4, 8, 14];

  rollAgainFieldIdx.forEach((targetFieldIdx) => {
    const nextPlayer = getNextPlayer(currentPlayer, targetFieldIdx);
    assertEquals(nextPlayer, "dark");
  });
});
