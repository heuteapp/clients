import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";
import { StoredDailyboardModel, StoredDailyboardCardModel } from "@/src/heute-store/types/dailyboard.types";
import { DailyboardCardContent } from "../../dailyboard/types/dailyboard.model.types";
import { GridSpan } from "../../shared/types/common";

export interface DailyboardRootProps {
    data: StoredDailyboardModel;
}

export interface DailyboardCardContainerProps {
    cards: StoredDailyboardCardModel[];
}

export interface DailyboardCardItemProps {
    data: StoredDailyboardCardModel;
}

export interface DailyboardCardDisplayProps {
    state: {
        content: DailyboardCardContent;
        isFrontFace: boolean;
        cardSpan?: GridSpan;
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
        title?: (content: DailyboardCardContent) => React.ReactNode;
        frontFace?: (content: DailyboardCardContent) => React.ReactNode;
        backFace?: (content: DailyboardCardContent) => React.ReactNode;
    },
}

//

export interface DailyboardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredDailyboardModel | null;
    children: React.ReactNode;
}