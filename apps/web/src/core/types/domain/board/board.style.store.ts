import { BoardCardStyle, BoardStyle } from "./board.style";
import { LayoutSectionStyle, LayoutStyle } from "../layout/layout.style";

export type BoardStyleStore = BoardStyleState & {
    setState: (state: BoardStyleState) => void
} & BoardStyleActions;

export type BoardStyleState = {
    board: BoardStyle | null
    cards: BoardCardStyle[]
    layout: LayoutStyle | null
    sections: LayoutSectionStyle[]
}

export type BoardStyleActions = {

}