import { ViewProps, ViewRootProps } from "../../t-view/types/view.types";
import { BoardViewSchema } from "./view.types";

export type BoardRootViewProps = ViewRootProps<BoardViewSchema>;

export type BoardCardContainerViewProps = ViewProps<"card-container", BoardViewSchema>;

export type BoardCardItemViewProps = ViewProps<"card-item", BoardViewSchema>;