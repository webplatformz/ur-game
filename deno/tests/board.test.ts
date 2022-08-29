import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { getBoardConfig } from "../game/board.ts";

Deno.test("is field index same as board index", () => {
  const boardConfig = getBoardConfig();
  boardConfig.forEach((field, idx) => assertEquals(field.idx, idx));
});

Deno.test("can roll dices again on special fields", () => {
  const boardConfig = getBoardConfig();
  const specialFieldIndeces = [4, 8, 14];
  boardConfig.forEach((field) => {
    if(specialFieldIndeces.includes(field.idx)){
        assertEquals(field.canThrowAgain, true);
    }else{
        assertEquals(field.canThrowAgain, false);
    }
  });
});

Deno.test("has safe zones", () => {
  const boardConfig = getBoardConfig();
  const safeZoneFields = [0, 1, 2, 3, 4, 8, 13, 14, 15];
  boardConfig.forEach((field) => {
    if(safeZoneFields.includes(field.idx)){
        assertEquals(field.isSafe, true);
    }else{
        assertEquals(field.isSafe, false);
        assertEquals(field.isBattleField, true);
    }
  });
});
