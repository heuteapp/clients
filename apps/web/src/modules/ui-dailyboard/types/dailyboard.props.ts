import { DailyboardEntity, DailyboardCardEntity } from "@/src/modules/ui-dailyboard/types/dailyboard.entity";
import { StoredLayoutResult } from "@/src/heute-store/types/layout.types";
import { StoredDailyboardResult } from "@/src/heute-store/types/dailyboard.types";

export interface DailyboardRootProps extends DailyboardEntity {
    data: StoredDailyboardResult;
    layout: StoredLayoutResult;
}

export interface DailyboardCardContainerProps {
    cards: DailyboardCardEntity[];
}

export interface DailyboardCardProps extends DailyboardCardEntity {
    
}