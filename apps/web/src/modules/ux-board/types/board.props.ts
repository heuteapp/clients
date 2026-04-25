import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";
import { BoardCardContent } from "@/src/modules/d-board/types/board.types";
import { GridSpan } from "../../d-core/types/common";

import { StoredBoardModel, StoredBoardCardModel } from "@/src/heute-store/types/board.types";

export interface BoardRootProps {
    data: StoredBoardModel;
}

export interface BoardCardContainerProps {
    cards: StoredBoardCardModel[];
}

export interface BoardCardItemProps {
    data: StoredBoardCardModel;
}

export interface BoardCardDisplayProps {
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

export interface BoardProviderProps {
    rootRef: React.RefObject<HTMLDivElement | null>;
    metricsId?: string;
    dataSource: StoredBoardModel | null;
    children: React.ReactNode;
}