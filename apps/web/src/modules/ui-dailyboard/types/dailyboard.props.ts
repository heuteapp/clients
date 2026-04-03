import { DailyboardEntity, DailyboardCardEntity } from "@/src/modules/ui-dailyboard/types/dailyboard.entity";
import { StoredLayoutResult } from "@/src/heute-store/types/layout.types";
import { StoredDailyboardCard, StoredDailyboardResult } from "@/src/heute-store/types/dailyboard.types";

export interface DailyboardRootProps extends DailyboardEntity {
    data: StoredDailyboardResult;
    layout: StoredLayoutResult;
}

export interface DailyboardCardContainerProps {
    cards: StoredDailyboardCard[];
}

export interface DailyboardCardProps extends DailyboardCardEntity {
    data: StoredDailyboardCard;
}