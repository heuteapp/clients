import { BoardCardContent } from "@/src/modules/d-board/types/board.types";
import { RichViewProps } from "../../ui-base/types/props.types";
import { BoardCardItemViewState } from "./view.types";

export interface BoardCardItemViewProps extends RichViewProps<
    BoardCardItemViewState, 
    "title" | "frontFace" | "backFace",
    BoardCardContent> {
}