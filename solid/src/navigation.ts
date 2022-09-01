import { createSignal } from "solid-js";

type NavigationState =
  | "LOGGED_OUT"
  | "IN_MENU_SCREEN"
  | "IN_QUICKMATCH_PRE_GAME_LOBBY"
  | "IN_PRIVATE_PRE_GAME_LOBBY"
  | "IN_GAME"
  | "IN_GAME_OVER";

export const [navigationState, setNavigationState] = createSignal<
  NavigationState
>("IN_MENU_SCREEN");

export function navigateToGameIfNecessary() {
  if (navigationState() !== "IN_GAME") {
    setNavigationState("IN_GAME");
  }
}

export function navigateToMenu() {
  setNavigationState("IN_MENU_SCREEN");
}

export function navigateToGameOver() {
  setNavigationState("IN_GAME_OVER");
}
