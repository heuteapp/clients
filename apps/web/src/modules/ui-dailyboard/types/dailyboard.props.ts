import { StoredDailyboardData, StoredDailyboardCardData } from "@/src/heute-store/types/dailyboard.types";

export interface DailyboardRootProps {
    data: StoredDailyboardData;
}

export interface DailyboardCardContainerProps {
    cards: StoredDailyboardCardData[];
}

export interface DailyboardCardProps {
    data: StoredDailyboardCardData;
}

//

export interface DailyboardProviderProps {
    dataSource: StoredDailyboardData | null;
    children: React.ReactNode;
}