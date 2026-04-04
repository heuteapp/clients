import { Dailyboard, DailyboardCardData, DailyboardData } from "@/src/modules/dailyboard/types/dailyboard.types";
import { StoredItem, UserBasedStoreState } from "./store.types";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export interface DailyboardState extends UserBasedStoreState<StoredDailyboard> {
    cardById: Record<string, StoredDailyboardCard>;

    loadMeDailyboard: (categoryPath: string, dailyboard: Dailyboard) => void;
    loadUserDailyboard: (user: string, categoryPath: string, dailyboard: Dailyboard) => void;

    getMeDailyboard: (categoryPath: string, date: YYMMDDDate) => StoredDailyboardRoot | null;
    getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => StoredDailyboardRoot | null;
}

export interface StoredDailyboard extends StoredItem, DailyboardData {
    categoryId: () => string;
}

export interface StoredDailyboardRoot extends StoredDailyboard {
    cards: StoredDailyboardCard[];
}

export interface StoredDailyboardCard extends StoredItem, DailyboardCardData {
    dailyboardId: () => string;
}