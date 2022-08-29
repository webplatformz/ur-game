import { customAlphabet } from "./deps.ts";

const generator = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);

export function generateSessionId(): string {
  return generator();
}
