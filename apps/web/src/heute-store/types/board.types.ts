import { BoardBase, BoardBaseData, BoardCardBase, BoardCardBaseData } from "@/src/modules/d-board/types/board.base.types";
import { StoredItem, UserBasedStoreState } from "./store.types";
import { YYMMDDDate } from "@/src/modules/d-shared/types/date.types";

export interface BoardBaseState<
    TBoardSource extends BoardBaseSource,
    TBoardCardSource extends BoardCardBaseSource,
    TBoardItem extends StoredBoardItem<TBoardCardItem>,
    TBoardItemData extends StoredBoardItemData,
    TBoardCardItem extends StoredBoardCardItem,
    TBoardCardItemData extends StoredBoardCardItemData
> extends UserBasedStoreState<TBoardItemData> {
    cardById: Record<string, TBoardCardItemData>;

    loadMeDailyboard: (dailyboard: TBoardSource) => void;
    loadUserDailyboard: (user: string, dailyboard: TBoardSource) => void;

    getMeDailyboard: (categoryPath: string, date: YYMMDDDate) => TBoardItem | null;
    getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => TBoardItem | null;

    getMeDailyboardCard: (categoryPath: string, date: YYMMDDDate, cardKey: string) => TBoardCardItem | null;
    getUserDailyboardCard: (user: string, categoryPath: string, date: YYMMDDDate, cardKey: string) => TBoardCardItem | null;

    addCard: (categoryPath: string, date: YYMMDDDate, card: TBoardCardSource) => void;
    updateCard: (categoryPath: string, date: YYMMDDDate, cardKey: string, cardUpdates: (draft: TBoardCardItemData) => void) => void;
    removeCard: (categoryPath: string,  date: YYMMDDDate, cardName: string) => void;
}

export type BoardBaseSource = BoardBase;

export type BoardCardBaseSource = BoardCardBase;

export interface StoredBoardItem<
    TDailyboardCard extends StoredBoardCardItem = StoredBoardCardItem
> extends StoredItem, BoardBase {
    cards: TDailyboardCard[];
}

export interface StoredBoardCardItem extends StoredItem, BoardCardBase {
    dailyboardId: () => string;
}

export type StoredBoardItemData<TBase extends StoredBoardItem = StoredBoardItem> = BoardBaseData<TBase>

export type StoredBoardCardItemData<TBase extends StoredBoardCardItem = StoredBoardCardItem> = BoardCardBaseData<TBase>;

//

import { BoardModel, BoardCardModel } from "@/src/modules/d-board/types/board.model.types";

export interface BoardModelState extends BoardBaseState<
    BoardModelSource,
    BoardCardModelSource,
    StoredBoardModel,
    StoredBoardModelData,
    StoredBoardCardModel,
    StoredBoardCardModelData
> {

}

export type BoardModelSource = BoardModel;

export type BoardCardModelSource = BoardCardModel;

export interface StoredBoardModel<
    TDailyboardCard extends StoredBoardCardModel = StoredBoardCardModel
> extends StoredBoardItem<TDailyboardCard>, BoardModel {
    cards: TDailyboardCard[];
}

export interface StoredBoardCardModel extends StoredBoardCardItem, BoardCardModel {

}

export type StoredBoardModelData<TBase extends StoredBoardModel = StoredBoardModel> = StoredBoardItemData<TBase>

export type StoredBoardCardModelData<TBase extends StoredBoardCardModel = StoredBoardCardModel> = StoredBoardCardItemData<TBase>;