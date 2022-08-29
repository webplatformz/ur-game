import { assertEquals } from "asserts";
import { getStartingPlayerBoard } from "../game/player-board.ts";

Deno.test('player board should have 15 fields', () => {
    assertEquals(getStartingPlayerBoard().length, 15);
});

Deno.test('playeyr board should be empty with only 7 tokens in the start field', () => {
    const [first, ...rest] = getStartingPlayerBoard();
    assertEquals(first, 7);
    assertEquals(rest.reduce((acc, val) => acc + val, 0), 0);
});