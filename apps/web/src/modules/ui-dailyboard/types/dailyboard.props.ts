import { DailyboardEntity, DailyboardCardEntity } from "@/src/modules/ui-dailyboard/types/dailyboard.entity";
import { Layout } from "../../layout/types/layout.types";

export interface DailyboardRootProps extends DailyboardEntity {
    layout: Layout
}

export interface DailyboardCardContainerProps {
    cards: DailyboardCardEntity[];
}

export interface DailyboardCardProps extends DailyboardCardEntity {
    
}