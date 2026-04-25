import { RichViewProps } from "../../ui-base/types/props.types";
import { BoardCardItemViewState } from "./view.types";

export interface BoardCardItemViewProps extends RichViewProps<
    BoardCardItemViewState, 
    "title" | "frontFace" | "backFace"> {
}