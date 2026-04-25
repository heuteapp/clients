import { BoardCardContent } from "../../d-board/types/board.types";
import { GridSpan } from "../../d-core/types/common";

export type BoardCardItemViewState = {
    content: BoardCardContent;
    isFrontFace: boolean;
    cardSpan?: GridSpan;
    cellStep?: number;
}