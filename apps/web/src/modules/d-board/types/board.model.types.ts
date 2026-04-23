import { BoardBase, BoardBaseData, BoardCardBase, BoardCardBaseData } from "./board.base.types";
import { BoardCardContent, BoardCardPlacement } from "./board.types";

export interface BoardModel extends BoardBase {
    cards: BoardCardModel[];
}

export interface BoardCardModel extends BoardCardBase {
    content: BoardCardContent;
    placement: BoardCardPlacement | null;
}

export type BoardModelData<TBase extends BoardModel = BoardModel> = BoardBaseData<TBase>

export type BoardCardModelData<TBase extends BoardCardModel = BoardCardModel> = BoardCardBaseData<TBase>