import { DailyboardBase, DailyboardBaseData, DailyboardCardBase, DailyboardCardBaseData } from "@/src/modules/d-board/types/board.base.types";
import { StoredItem, UserBasedStoreState } from "./store.types";
import { YYMMDDDate } from "@/src/modules/d-shared/types/date.types";

export interface DailyboardBaseState<
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemData extends StoredDailyboardItemData,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemData extends StoredDailyboardCardItemData
> extends UserBasedStoreState<TDailyboardItemData> {
    cardById: Record<string, TDailyboardCardItemData>;

    loadMeDailyboard: (dailyboard: TDailyboardSource) => void;
    loadUserDailyboard: (user: string, dailyboard: TDailyboardSource) => void;

    getMeDailyboard: (categoryPath: string, date: YYMMDDDate) => TDailyboardItem | null;
    getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => TDailyboardItem | null;

    getMeDailyboardCard: (categoryPath: string, date: YYMMDDDate, cardKey: string) => TDailyboardCardItem | null;
    getUserDailyboardCard: (user: string, categoryPath: string, date: YYMMDDDate, cardKey: string) => TDailyboardCardItem | null;

    addCard: (categoryPath: string, date: YYMMDDDate, card: TDailyboardCardSource) => void;
    updateCard: (categoryPath: string, date: YYMMDDDate, cardKey: string, cardUpdates: (draft: TDailyboardCardItemData) => void) => void;
    removeCard: (categoryPath: string,  date: YYMMDDDate, cardName: string) => void;
}

export type DailyboardBaseSource = DailyboardBase;

export type DailyboardCardBaseSource = DailyboardCardBase;

export interface StoredDailyboardItem<
    TDailyboardCard extends StoredDailyboardCardItem = StoredDailyboardCardItem
> extends StoredItem, DailyboardBase {
    cards: TDailyboardCard[];
}

export interface StoredDailyboardCardItem extends StoredItem, DailyboardCardBase {
    dailyboardId: () => string;
}

export type StoredDailyboardItemData<TBase extends StoredDailyboardItem = StoredDailyboardItem> = DailyboardBaseData<TBase>

export type StoredDailyboardCardItemData<TBase extends StoredDailyboardCardItem = StoredDailyboardCardItem> = DailyboardCardBaseData<TBase>;

//

import { DailyboardModel, DailyboardCardModel } from "@/src/modules/d-board/types/board.model.types";

export interface DailyboardModelState extends DailyboardBaseState<
    DailyboardModelSource,
    DailyboardCardModelSource,
    StoredDailyboardModel,
    StoredDailyboardModelData,
    StoredDailyboardCardModel,
    StoredDailyboardCardModelData
> {

}

export type DailyboardModelSource = DailyboardModel;

export type DailyboardCardModelSource = DailyboardCardModel;

export interface StoredDailyboardModel<
    TDailyboardCard extends StoredDailyboardCardModel = StoredDailyboardCardModel
> extends StoredDailyboardItem<TDailyboardCard>, DailyboardModel {
    cards: TDailyboardCard[];
}

export interface StoredDailyboardCardModel extends StoredDailyboardCardItem, DailyboardCardModel {

}

export type StoredDailyboardModelData<TBase extends StoredDailyboardModel = StoredDailyboardModel> = StoredDailyboardItemData<TBase>

export type StoredDailyboardCardModelData<TBase extends StoredDailyboardCardModel = StoredDailyboardCardModel> = StoredDailyboardCardItemData<TBase>;