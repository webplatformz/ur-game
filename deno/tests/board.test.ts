import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { getBoardConfig } from "../game/board.ts";

Deno.test("should have field index same as board index", () => {
  const boardConfig = getBoardConfig();
  boardConfig.forEach((field, idx) => assertEquals(field.idx, idx));
});

Deno.test("should show roll dices again on special fields", () => {
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

Deno.test("should have safe zones", () => {
  const boardConfig = getBoardConfig();
  const safeZoneFields = [0, 1, 2, 3, 4, 8, 13, 14, 15];
  boardConfig.forEach((field) => {
    if(safeZoneFields.includes(field.idx)){
        assertEquals(field.isSafe, true);
    }else{
        assertEquals(field.isSafe, false);
    }
  });
});

Deno.test("should have battlefield zones", () => {
  const boardConfig = getBoardConfig();
  const battlefieldFields = [5, 6, 7, 8, 9, 10, 11, 12];
  boardConfig.forEach((field) => {
    if(battlefieldFields.includes(field.idx)){
        assertEquals(field.isBattleField, true);
    }else{
        assertEquals(field.isBattleField, false);
    }
  });
});

Deno.test("should have correct field capacity", () => {
  const boardConfig = getBoardConfig();
  boardConfig.forEach((field) => {
    if(field.idx === 0 || field.idx === 15){
        assertEquals(field.capacity, 7);
    }else{
        assertEquals(field.capacity, 1);
    }
  });
});
