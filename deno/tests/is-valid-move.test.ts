import { assertEquals } from "asserts";
import { getBoardConfig } from "../game/board.ts";
import { isValidMove } from "../game/is-valid-move.ts";
import { getStartingPlayerBoard } from "../game/player-board.ts";
import { GameState } from "../shared/models/game-state.model.ts";

function getGameState(): GameState {
    return {
        type: 'gamestate',
        boardConfig: getBoardConfig(),
        isFinished: false,
        boardBlack: getStartingPlayerBoard(),
        boardWhite: getStartingPlayerBoard(),
        currentPlayer: 'white'
    };
}

Deno.test('is valid move from start onto an empty field', () => {
    const gs = getGameState();
    assertEquals(isValidMove(gs, 2, 2), true)
});

Deno.test('is valid move onto an empty field in the battle zone', () => {
    const gs = getGameState();
    gs.boardWhite[3] = 1;
    assertEquals(isValidMove(gs, 7, 4), true);
});

Deno.test('is valid move onto an unsafe field occupied by the opponent', () => {
    const gs = getGameState();
    gs.boardWhite[3] = 1;
    gs.boardBlack[7] = 1;
    assertEquals(isValidMove(gs, 7, 4), true);
});

Deno.test('is valid if reached the end', () => {
    const gs = getGameState();
    gs.boardWhite[13] = 1;
    assertEquals(isValidMove(gs, 15, 2), true);
});

Deno.test('is invalid for an occupied battle zone field that is safe', () => {
    const gs = getGameState();
    gs.boardWhite[6] = 1;
    gs.boardBlack[8] = 1;
    assertEquals(isValidMove(gs, 8, 2), false);
});

Deno.test('is invalid if field is at capacity', () => {
    const gs = getGameState();
    gs.boardWhite[2] = 1;
    assertEquals(isValidMove(gs, 2, 2), false);
});

Deno.test('is invalid if dice value if invalid', () => {
    const gs = getGameState();
    assertEquals(isValidMove(gs, 0, -2), false);
    assertEquals(isValidMove(gs, 8, 8), false);
});
