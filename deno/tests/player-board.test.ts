import { assertEquals } from "asserts";
import { getNewPlayerBoard } from "../game/player-board.ts";

Deno.test("player board should have 16 fields", () => {
  assertEquals(getNewPlayerBoard().length, 16);
});

Deno.test("player board should be empty with only 7 tokens in the start field", () => {
  const [first, ...rest] = getNewPlayerBoard();
  assertEquals(first, 7);
  assertEquals(rest.reduce((acc, val) => acc + val, 0), 0);
});
