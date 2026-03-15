import { BoardThemeValue } from "./board.theme";

export type BoardStyleStore = BoardStyleState & {
    setState: (state: BoardStyleState) => void
} & BoardStyleActions;

export type BoardStyleState = BoardThemeValue;

export type BoardStyleActions = {

}