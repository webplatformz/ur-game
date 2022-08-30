import { assertEquals } from "asserts";
import { isFinished } from "../game/is-finished.ts";
import { getStateWithBoards } from "./test-helper.ts";

Deno.test('is finished true', () => {
  const gs = getStateWithBoards();
  gs.boardBlack[0] = 0;
  gs.boardBlack[gs.boardBlack.length - 1] = 7;
  assertEquals(isFinished(gs), true);
});

Deno.test('is finished false', () => {
  const gs = getStateWithBoards();
  assertEquals(isFinished(gs), false);
});
