import { ViewProps } from "../../t-view/types/view.types";
import { BoardViewSchema } from "./view.types";

export interface BoardRootViewProps extends ViewProps<"board", BoardViewSchema> {
    
}

export interface BoardCardContainerViewProps extends ViewProps<"card-container", BoardViewSchema> {
    
}

export interface BoardCardItemViewProps extends ViewProps<"card-item", BoardViewSchema> {
    
}