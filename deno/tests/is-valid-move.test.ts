import { assertEquals } from "asserts";
import { isValidMove } from "../game/is-valid-move.ts";
import { getContextWithBoards } from "./test-helper.ts";

Deno.test("is valid move from start onto an empty field", () => {
  const ctx = getContextWithBoards();
  assertEquals(isValidMove(ctx, 2, 2), true);
});

Deno.test("is valid move onto an empty field in the battle zone", () => {
  const ctx = getContextWithBoards();
  ctx.boardDark[3] = 1;
  assertEquals(isValidMove(ctx, 7, 4), true);
});

Deno.test("is valid move onto an unsafe field occupied by the opponent", () => {
  const ctx = getContextWithBoards();
  ctx.boardDark[3] = 1;
  ctx.boardLight[7] = 1;
  assertEquals(isValidMove(ctx, 7, 4), true);
});

Deno.test("is valid if reached the end", () => {
  const ctx = getContextWithBoards();
  ctx.boardDark[13] = 1;
  assertEquals(isValidMove(ctx, 15, 2), true);
});

Deno.test("is invalid for an occupied battle zone field that is safe", () => {
  const ctx = getContextWithBoards();
  ctx.boardDark[6] = 1;
  ctx.boardLight[8] = 1;
  assertEquals(isValidMove(ctx, 8, 2), false);
});

Deno.test("is invalid if field is at capacity", () => {
  const ctx = getContextWithBoards();
  ctx.boardDark[2] = 1;
  assertEquals(isValidMove(ctx, 2, 2), false);
});

Deno.test("is invalid if dice value if invalid", () => {
  const ctx = getContextWithBoards();
  assertEquals(isValidMove(ctx, 0, -2), false);
  assertEquals(isValidMove(ctx, 8, 8), false);
});

Deno.test("is invalid for a dice value of zero", () => {
  const ctx = getContextWithBoards();
  assertEquals(isValidMove(ctx, 3, 0), false);
});

Deno.test("is invalid if target is outside board", () => {
  const ctx = getContextWithBoards();
  assertEquals(isValidMove(ctx, 20, 1), false);
});
