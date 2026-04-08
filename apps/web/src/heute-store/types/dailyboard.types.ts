import { DailyboardBase, DailyboardCardBase } from "@/src/modules/dailyboard/types/dailyboard.base.types";
import { StoredItem, UserBasedStoreState } from "./store.types";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export interface DailyboardBaseState<
    TDailyboardSource extends DailyboardBaseSource,
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

import { DailyboardData, DailyboardCardData } from "@/src/modules/dailyboard/types/dailyboard.data.types";

export interface DailyboardDataState extends DailyboardBaseState<
    DailyboardDataSource,
    StoredDailyboardData,
    StoredDailyboardDataContent,
    StoredDailyboardCardData,
    StoredDailyboardCardDataContent
> {

}

export type DailyboardDataSource = DailyboardData;

export type DailyboardCardDataSource = DailyboardCardData;

export interface StoredDailyboardData<
    TDailyboardCard extends StoredDailyboardCardData = StoredDailyboardCardData
> extends StoredDailyboardItem<TDailyboardCard>, DailyboardData {
    cards: TDailyboardCard[];
}

export interface StoredDailyboardCardData extends StoredDailyboardCardItem, DailyboardCardData {

}

export type StoredDailyboardDataContent = Omit<StoredDailyboardData, "cards">;

export type StoredDailyboardCardDataContent = StoredDailyboardCardData;