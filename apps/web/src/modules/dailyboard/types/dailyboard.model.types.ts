import { BoardCardModel, BoardModel } from "../../board/types/board.model.types";
import { DailyboardBase, DailyboardCardBase } from "./dailyboard.base.types";

export interface DailyboardModel extends DailyboardBase, BoardModel {
    cards: DailyboardCardModel[];
}

export interface DailyboardCardModel extends DailyboardCardBase, BoardCardModel {
    
}

export type DailyboardModelData = Omit<DailyboardModel, "cards">;

export type DailyboardCardModelData = Omit<DailyboardCardModel, "">;