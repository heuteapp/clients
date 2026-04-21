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
    data: StoredDailyboardCardData;
    ref: React.RefObject<HTMLDivElement | null>;
    className?: {
        body?: string[];
        title?: string[];
        frontFace?: string[];
        backFace?: string[];
    },
    render?: {
        title?: (data: StoredDailyboardCardData) => React.ReactNode;
        frontFace?: (data: StoredDailyboardCardData) => React.ReactNode;
        backFace?: (data: StoredDailyboardCardData) => React.ReactNode;
    }
}

//

export interface DailyboardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredDailyboardData | null;
    children: React.ReactNode;
}