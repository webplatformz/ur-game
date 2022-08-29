export function getStartingPlayerBoard(): number[] {
  const board = new Array(15).fill(0);
  board[0] = 7;
  return board;
}
