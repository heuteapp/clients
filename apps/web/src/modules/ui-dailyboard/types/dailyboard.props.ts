import { StoredDailyboardData, StoredDailyboardCardData } from "@/src/heute-store/types/dailyboard.types";

export interface DailyboardRootProps {
    data: StoredDailyboardData;
}

export interface DailyboardCardContainerProps {
    cards: StoredDailyboardCardData[];
}

export interface DailyboardCardViewProps {
    data: StoredDailyboardCardData;
}

export interface DailyboardCardRootProps {
    ref: React.RefObject<HTMLDivElement | null>;
    className?: {
        body?: string[];
        title?: string[];
        face?: string[];
    },
    data: StoredDailyboardCardData;
}

//

export interface DailyboardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredDailyboardData | null;
    children: React.ReactNode;
}