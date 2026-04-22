import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";
import { StoredDailyboardData, StoredDailyboardCardData } from "@/src/heute-store/types/dailyboard.types";
import { DailyboardCardMaterial } from "../../dailyboard/types/dailyboard.data.types";

export interface DailyboardRootProps {
    data: StoredDailyboardData;
}

export interface DailyboardCardContainerProps {
    cards: StoredDailyboardCardData[];
}

export interface DailyboardCardItemProps {
    data: StoredDailyboardCardData;
}

export interface DailyboardCardDisplayProps {
    state: {
        content: DailyboardCardMaterial;
        isFrontFace: boolean;
        colSpan?: number;
        rowSpan?: number;
        cellStep?: number;
    },
    ref?: React.RefObject<HTMLDivElement | null>;
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
        title?: (content: DailyboardCardMaterial) => React.ReactNode;
        frontFace?: (content: DailyboardCardMaterial) => React.ReactNode;
        backFace?: (content: DailyboardCardMaterial) => React.ReactNode;
    },
}

//

export interface DailyboardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredDailyboardData | null;
    children: React.ReactNode;
}