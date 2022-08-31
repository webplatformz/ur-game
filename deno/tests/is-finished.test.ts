import { assertEquals } from "asserts";
import { isFinished } from "../game/is-finished.ts";
import { getStateWithBoards } from "./test-helper.ts";

Deno.test("is finished true", () => {
  const gs = getStateWithBoards();
  gs.boardDark[0] = 0;
  gs.boardDark[gs.boardDark.length - 1] = 7;
  assertEquals(isFinished(gs), true);
});

Deno.test("is finished false", () => {
  const gs = getStateWithBoards();
  assertEquals(isFinished(gs), false);
});
