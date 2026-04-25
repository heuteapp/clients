import { BoardCardContent } from "@/src/modules/d-board/types/board.types";
import { GridSpan } from "../../d-core/types/common";
import { RichViewProps } from "../../ui-base/types/props.types";

export interface BoardCardItemViewProps extends RichViewProps<
    BoardCardItemViewState, 
    "title" | "frontFace" | "backFace",
    BoardCardContent> {
}

export type BoardCardItemViewState = {
    content: BoardCardContent;
    isFrontFace: boolean;
    cardSpan?: GridSpan;
    cellStep?: number;
}