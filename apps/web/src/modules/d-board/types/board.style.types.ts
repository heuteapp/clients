import { BoxStyle } from "@/src/modules/d-shared/types/style";
import { BoardBase, BoardBaseData, BoardCardBase, BoardCardBaseData } from "./board.base.types";

export interface BoardStyle extends BoardBase {
    box: BoxStyle;
    cards: BoardCardStyle[];
}

export interface BoardCardStyle extends BoardCardBase {
    box: BoxStyle;
}

export type BoardStyleData<TBase extends BoardStyle = BoardStyle> = BoardBaseData<TBase>

export type BoardCardStyleData<TBase extends BoardCardStyle = BoardCardStyle> = BoardCardBaseData<TBase>