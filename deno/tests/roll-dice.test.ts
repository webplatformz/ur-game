import { assertAlmostEquals, assertEquals } from "asserts";
import { rollDice } from "../game/roll-dice.ts";

Deno.test("roll dice returns array with 4 items", () => {
  assertEquals(rollDice().length, 4);
});

Deno.test("roll dice returns four numbers either zero or one", () => {
  new Array(20).fill(null).forEach(() => {
    assertEquals(
      rollDice().map((die) =>
        Number.isInteger(die) && (die === 0 || die === 1)
      ),
      [true, true, true, true],
    );
  });
});

Deno.test("roll dice sums up to a value between zero and four", () => {
  new Array(20).fill(null).forEach(() => {
    assertAlmostEquals(
      rollDice().reduce((acc, val) => acc + val, 0 as number),
      2,
      2,
    );
  });
});

Deno.test("roll dice should have the correct probablities", () => {
  const runs = 1000000;
  const stats = new Array(runs).fill(null)
    .map(rollDice)
    .map((dice) => dice.reduce((acc, val) => acc + val, 0 as number))
    .reduce((acc, val) => {
      acc[val]++;
      return acc;
    }, [0, 0, 0, 0, 0])
    .map((val) => val / runs * 100);
  assertAlmostEquals(stats[0], 6.25, 0.5);
  assertAlmostEquals(stats[1], 25, 0.5);
  assertAlmostEquals(stats[2], 37.5, 0.5);
  assertAlmostEquals(stats[3], 25, 0.5);
  assertAlmostEquals(stats[4], 6.25, 0.5);
});
