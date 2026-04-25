import { Theme } from "@emotion/react";
import { SxProps } from "@mui/system";
import { BoardCardContent } from "@/src/modules/d-board/types/board.types";
import { GridSpan } from "../../d-core/types/common";

export interface DisplayBoardCardItemProps {
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