import { StoredDailyboardCard, StoredDailyboardRoot } from "@/src/heute-store/types/dailyboard.types";

export interface DailyboardRootProps {
    data: StoredDailyboardRoot;
}

export interface DailyboardCardContainerProps {
    cards: StoredDailyboardCard[];
}

export interface DailyboardCardProps {
    data: StoredDailyboardCard;
}

//

export interface DailyboardProviderProps {
    source: StoredDailyboardRoot | null;
    children: React.ReactNode;
}