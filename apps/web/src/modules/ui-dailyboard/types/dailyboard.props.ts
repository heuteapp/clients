import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";
import { StoredBoardModel, StoredBoardCardModel } from "@/src/heute-store/types/board.types";
import { BoardCardContent } from "@/src/modules/d-board/types/board.types";
import { GridSpan } from "../../d-shared/types/common";

export interface DailyboardRootProps {
    data: StoredBoardModel;
}

export interface DailyboardCardContainerProps {
    cards: StoredBoardCardModel[];
}

export interface DailyboardCardItemProps {
    data: StoredBoardCardModel;
}

export interface DailyboardCardDisplayProps {
    state: {
        content: BoardCardContent;
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
        title?: (content: BoardCardContent) => React.ReactNode;
        frontFace?: (content: BoardCardContent) => React.ReactNode;
        backFace?: (content: BoardCardContent) => React.ReactNode;
    },
}

//

export interface DailyboardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredBoardModel | null;
    children: React.ReactNode;
}