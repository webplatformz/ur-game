import { assertEquals } from "asserts";
import { getScore } from "../game/get-score.ts";
import { getInitialGameState } from "../game/initial-game-state.ts";

Deno.test("get empty score from initial state", () => {
  const gs = getInitialGameState();
  assertEquals(getScore(gs), { dark: 0, light: 0 });
});

Deno.test("get accurate score", () => {
  const gs = getInitialGameState();
  const darkScore = 7;
  gs.boardDark[0] = 7 - darkScore;
  gs.boardDark[gs.boardDark.length - 1] = darkScore;
  const lightScore = 4;
  gs.boardLight[0] = 7 - lightScore;
  gs.boardLight[gs.boardLight.length - 1] = lightScore;
  assertEquals(getScore(gs), { dark: darkScore, light: lightScore });
});
