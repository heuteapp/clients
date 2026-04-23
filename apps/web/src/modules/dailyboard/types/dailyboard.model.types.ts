import { BoardCardModel, BoardCardModelData, BoardModel, BoardModelData } from "../../board/types/board.model.types";
import { DailyboardBase, DailyboardCardBase } from "./dailyboard.base.types";

export interface DailyboardModel extends DailyboardBase, BoardModel {
    cards: DailyboardCardModel[];
}

export interface DailyboardCardModel extends DailyboardCardBase, BoardCardModel {
    
}

export type DailyboardModelData<TBase extends DailyboardModel = DailyboardModel> = BoardModelData<TBase>

export type DailyboardCardModelData<TBase extends DailyboardCardModel = DailyboardCardModel> = BoardCardModelData<TBase>;