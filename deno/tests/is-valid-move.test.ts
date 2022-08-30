import { assertEquals } from "asserts";
import { isValidMove } from "../game/is-valid-move.ts";
import { getStateWithBoards } from "./test-helper.ts";

Deno.test('is valid move from start onto an empty field', () => {
    const gs = getStateWithBoards();
    assertEquals(isValidMove(gs, 2, 2), true)
});

Deno.test('is valid move onto an empty field in the battle zone', () => {
    const gs = getStateWithBoards();
    gs.boardBlack[3] = 1;
    assertEquals(isValidMove(gs, 7, 4), true);
});

Deno.test('is valid move onto an unsafe field occupied by the opponent', () => {
    const gs = getStateWithBoards();
    gs.boardBlack[3] = 1;
    gs.boardWhite[7] = 1;
    assertEquals(isValidMove(gs, 7, 4), true);
});

Deno.test('is valid if reached the end', () => {
    const gs = getStateWithBoards();
    gs.boardBlack[13] = 1;
    assertEquals(isValidMove(gs, 15, 2), true);
});

Deno.test('is invalid for an occupied battle zone field that is safe', () => {
    const gs = getStateWithBoards();
    gs.boardBlack[6] = 1;
    gs.boardWhite[8] = 1;
    assertEquals(isValidMove(gs, 8, 2), false);
});

Deno.test('is invalid if field is at capacity', () => {
    const gs = getStateWithBoards();
    gs.boardBlack[2] = 1;
    assertEquals(isValidMove(gs, 2, 2), false);
});

Deno.test('is invalid if dice value if invalid', () => {
    const gs = getStateWithBoards();
    assertEquals(isValidMove(gs, 0, -2), false);
    assertEquals(isValidMove(gs, 8, 8), false);
});
