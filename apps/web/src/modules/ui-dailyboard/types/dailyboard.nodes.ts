import { UINode, UIRootNode } from "@/src/modules/ui-base/types/ui.types";
import { DailyboardRootProps, DailyboardCardViewProps, DailyboardCardContainerProps } from "./dailyboard.props";

export interface DailyboardRootNode extends UIRootNode {
    ref: React.RefObject<HTMLDivElement | null>
    props?: DailyboardRootProps
    cardContainer?: DailyboardCardContainerNode
}

export interface DailyboardCardContainerNode extends UINode {
    props?: DailyboardCardContainerProps; 
    cards: Map<string, DailyboardCardNode>
}

export interface DailyboardCardNode extends UINode {
    props?: DailyboardCardViewProps; 
}