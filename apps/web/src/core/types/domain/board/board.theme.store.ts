import { BoardThemeValue } from "./board.theme";

export type BoardThemeStore = BoardThemeState & {
    setState: (state: BoardThemeState) => void
} & BoardThemeActions;

export type BoardThemeState = BoardThemeValue;

export type BoardThemeActions = {

}