import {createSignal} from "solid-js";

type NavigationState =
    | "LOGGED_OUT"
    | "IN_MENU_SCREEN"
    | "IN_QUICKMATCH_PRE_GAME_LOBBY"
    | "IN_PRIVATE_PRE_GAME_LOBBY"
    | "IN_GAME";

export const [navigationState, setNavigationState] = createSignal<NavigationState>('IN_MENU_SCREEN');

export function navigateToGameIfNecessary() {
    if(navigationState() !== 'IN_GAME') {
        setNavigationState('IN_GAME');
    }
}
