import { assertEquals } from "asserts";
import { isFinished } from "../game/is-finished.ts";
import { getContextWithBoards } from "./test-helper.ts";

Deno.test("is finished true", () => {
  const ctx = getContextWithBoards();
  ctx.boardDark[0] = 0;
  ctx.boardDark[ctx.boardDark.length - 1] = 7;
  assertEquals(isFinished(ctx), true);
});

Deno.test("is finished false", () => {
  const ctx = getContextWithBoards();
  assertEquals(isFinished(ctx), false);
});
