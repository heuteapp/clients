import { Dailyboard, DailyboardCardData, DailyboardData } from "@/src/modules/dailyboard/types/dailyboard.types";
import { StoredItem, UserBasedStoreState } from "./store.types";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export interface DailyboardState extends UserBasedStoreState<StoredDailyboard> {
    loadMeDailyboard: (dailyboard: Dailyboard) => void;
    loadUserDailyboard: (user: string, dailyboard: Dailyboard) => void;

    getMeDailyboard: (categoryPath: string, date: YYMMDDDate) => Dailyboard | null;
    getUserDailyboard: (user: string, categoryPath: string, date: YYMMDDDate) => Dailyboard | null;
}

export interface StoredDailyboard extends StoredItem, DailyboardData {
    
}

export interface StoredDailyboardCard extends StoredItem, DailyboardCardData {
    dailyboardId: () => string;
}