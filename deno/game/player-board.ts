export function getNewPlayerBoard(): number[] {
  const board = new Array(16).fill(0);
  board[0] = 7;
  return board;
}
