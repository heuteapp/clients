import { StoredDailyboardData, StoredDailyboardCardData } from "@/src/heute-store/types/dailyboard.types";
import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";

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
    isFrontFace: boolean;
    className?: {
        body?: string[];
        title?: string[];
        frontFace?: string[];
        backFace?: string[];
    },
    sx?: {
        body?: SxProps<Theme>;
        title?: SxProps<Theme>;
        frontFace?: SxProps<Theme>;
        backFace?: SxProps<Theme>;
    },
    render?: {
        title?: (data: StoredDailyboardCardData) => React.ReactNode;
        frontFace?: (data: StoredDailyboardCardData) => React.ReactNode;
        backFace?: (data: StoredDailyboardCardData) => React.ReactNode;
    },
}

//

export interface DailyboardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredDailyboardData | null;
    children: React.ReactNode;
}