import { DailyboardBase, DailyboardCardBase } from "@/src/modules/dailyboard/types/dailyboard.base.types";
import { StoredItem, UserBasedStoreState } from "./store.types";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export interface DailyboardBaseState<
    TDailyboardSource extends DailyboardBaseSource,
    TDailyboardCardSource extends DailyboardCardBaseSource,
    TDailyboardItem extends StoredDailyboardItem<TDailyboardCardItem>,
    TDailyboardItemContent extends StoredDailyboardItemContent,
    TDailyboardCardItem extends StoredDailyboardCardItem,
    TDailyboardCardItemContent extends StoredDailyboardCardItemContent
> extends UserBasedStoreState<TDailyboardItemContent> {
    cardById: Record<string, TDailyboardCardItemContent>;

    loadMeDailyboard: (dailyboard: TDailyboardSource) => void;
    loadUserDailyboard: (user: string, dailyboard: TDailyboardSource) => void;

    getMeDailyboard: (categoryPath: string, date: YYMMDDDate) => TDailyboardItem | null;
    getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => TDailyboardItem | null;

    getMeDailyboardCard: (categoryPath: string, date: YYMMDDDate, cardKey: string) => TDailyboardCardItem | null;
    getUserDailyboardCard: (user: string, categoryPath: string, date: YYMMDDDate, cardKey: string) => TDailyboardCardItem | null;

    addCard: (categoryPath: string, date: YYMMDDDate, card: TDailyboardCardSource) => void;
    updateCard: (categoryPath: string, date: YYMMDDDate, cardKey: string, cardUpdates: (draft: TDailyboardCardItemContent) => void) => void;
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

export type StoredDailyboardItemContent = Omit<StoredDailyboardItem, "cards">;

export type StoredDailyboardCardItemContent = StoredDailyboardCardItem;

//

import { DailyboardModel, DailyboardCardModel } from "@/src/modules/dailyboard/types/dailyboard.model.types";

export interface DailyboardDataState extends DailyboardBaseState<
    DailyboardDataSource,
    DailyboardCardDataSource,
    StoredDailyboardData,
    StoredDailyboardDataContent,
    StoredDailyboardCardData,
    StoredDailyboardCardDataContent
> {

}

export type DailyboardDataSource = DailyboardModel;

export type DailyboardCardDataSource = DailyboardCardModel;

export interface StoredDailyboardData<
    TDailyboardCard extends StoredDailyboardCardData = StoredDailyboardCardData
> extends StoredDailyboardItem<TDailyboardCard>, DailyboardModel {
    cards: TDailyboardCard[];
}

export interface StoredDailyboardCardData extends StoredDailyboardCardItem, DailyboardCardModel {

}

export type StoredDailyboardDataContent = Omit<StoredDailyboardData, "cards">;

export type StoredDailyboardCardDataContent = StoredDailyboardCardData;