import { assertEquals } from "asserts";
import { getScore } from "../game/get-score.ts";
import { getInitialGameContext } from "../game/get-initial-game-context.ts";

Deno.test("get empty score from initial context", () => {
  const ctx = getInitialGameContext();
  assertEquals(getScore(ctx), { dark: 0, light: 0 });
});

Deno.test("get accurate score", () => {
  const ctx = getInitialGameContext();
  const darkScore = 7;
  ctx.boardDark[0] = 7 - darkScore;
  ctx.boardDark[ctx.boardDark.length - 1] = darkScore;
  const lightScore = 4;
  ctx.boardLight[0] = 7 - lightScore;
  ctx.boardLight[ctx.boardLight.length - 1] = lightScore;
  assertEquals(getScore(ctx), { dark: darkScore, light: lightScore });
});
