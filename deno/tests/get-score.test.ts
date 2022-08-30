import { assertEquals } from "asserts";
import { getScore } from "../game/get-score.ts";
import { getInitialGameState } from "../game/initial-game-state.ts";

Deno.test("get empty score from initial state", () => {
  const gs = getInitialGameState();
  assertEquals(getScore(gs), { black: 0, white: 0 });
});

Deno.test("get accurate score", () => {
  const gs = getInitialGameState();
  const blackScore = 7;
  gs.boardBlack[0] = 7 - blackScore;
  gs.boardBlack[gs.boardBlack.length - 1] = blackScore;
  const whiteScore = 4;
  gs.boardWhite[0] = 7 - whiteScore;
  gs.boardWhite[gs.boardWhite.length - 1] = whiteScore;
  assertEquals(getScore(gs), { black: blackScore, white: whiteScore });
});
