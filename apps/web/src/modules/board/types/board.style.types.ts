import { BoxStyle } from "@/src/modules/shared/types/style";
import { BoardBase, BoardCardBase } from "./board.base.types";

export interface BoardStyle extends BoardBase {
    box: BoxStyle;
    cards: BoardCardStyle[];
}

export interface BoardCardStyle extends BoardCardBase {
    box: BoxStyle;
}

export type BoardStyleData = Omit<BoardStyle, "cards">;

export type BoardCardStyleData = Omit<BoardCardStyle, "">;