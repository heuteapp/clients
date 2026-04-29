import { ViewProps, ViewRootProps } from "../../t-core/types/props.types";
import { BoardViewSchema } from "./view.types";

export interface BoardRootViewProps extends ViewRootProps<"board", BoardViewSchema> {
    
}

export interface BoardCardContainerViewProps extends ViewProps<"board-card-container", BoardViewSchema> {
    
}

export interface BoardCardItemViewProps extends ViewProps<"board-card-item", BoardViewSchema> {
    
}