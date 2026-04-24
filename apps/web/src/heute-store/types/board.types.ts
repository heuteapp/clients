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
    TBoardCard extends StoredBoardCardItem = StoredBoardCardItem
> extends StoredItem, BoardBase {
    cards: TBoardCard[];
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
    TBoardCard extends StoredBoardCardModel = StoredBoardCardModel
> extends StoredBoardItem<TBoardCard>, BoardModel {
    cards: TBoardCard[];
}

export interface StoredBoardCardModel extends StoredBoardCardItem, BoardCardModel {

}

export type StoredBoardModelData<TBase extends StoredBoardModel = StoredBoardModel> = StoredBoardItemData<TBase>

export type StoredBoardCardModelData<TBase extends StoredBoardCardModel = StoredBoardCardModel> = StoredBoardCardItemData<TBase>;

//

import { DailyboardBase, DailyboardCardBase } from "@/src/modules/d-board/types/board.base.types";

export interface DailyboardBaseState extends BoardBaseState<
    DailyboardBaseSource,
    DailyboardCardBaseSource,
    StoredDailyboardItem,
    StoredDailyboardItemData,
    StoredDailyboardCardItem,
    StoredDailyboardCardItemData
> {

}

export type DailyboardBaseSource = DailyboardBase;

export type DailyboardCardBaseSource = DailyboardCardBase;

export interface StoredDailyboardItem<
    TDailyboardCard extends StoredDailyboardCardItem = StoredDailyboardCardItem
> extends StoredBoardItem<TDailyboardCard>, DailyboardBase {
    cards: TDailyboardCard[];
}

export interface StoredDailyboardCardItem extends StoredBoardCardItem, DailyboardCardBase {

}

export type StoredDailyboardItemData<TBase extends StoredDailyboardItem = StoredDailyboardItem> = StoredBoardItemData<TBase>

export type StoredDailyboardCardItemData<TBase extends StoredDailyboardCardItem = StoredDailyboardCardItem> = StoredBoardCardItemData<TBase>;

//

import { DailyboardModel, DailyboardCardModel} from "@/src/modules/d-board/types/board.model.types";

export interface DailyboardModelState extends BoardBaseState<
    DailyboardModelSource,
    DailyboardCardModelSource,
    StoredDailyboardItem,
    StoredDailyboardItemData,
    StoredDailyboardCardItem,
    StoredDailyboardCardItemData
> {

}

export type DailyboardModelSource = DailyboardModel;

export type DailyboardCardModelSource = DailyboardCardModel;

export interface StoredDailyboardModel<
    TDailyboardCard extends StoredDailyboardCardModel = StoredDailyboardCardModel
> extends StoredBoardItem<TDailyboardCard>, DailyboardModel {
    cards: TDailyboardCard[];
}

export interface StoredDailyboardCardModel extends StoredBoardCardItem, DailyboardCardModel {

}

export type StoredDailyboardModelData<TBase extends StoredDailyboardModel = StoredDailyboardModel> = StoredBoardItemData<TBase>

export type StoredDailyboardCardModelData<TBase extends StoredDailyboardCardModel = StoredDailyboardCardModel> = StoredBoardCardItemData<TBase>;
