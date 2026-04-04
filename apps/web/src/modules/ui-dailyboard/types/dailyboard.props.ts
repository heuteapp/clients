import { DailyboardEntity, DailyboardCardEntity } from "@/src/modules/ui-dailyboard/types/dailyboard.entity";
import { StoredLayoutRoot } from "@/src/heute-store/types/layout.types";
import { StoredDailyboardCard, StoredDailyboardRoot } from "@/src/heute-store/types/dailyboard.types";

export interface DailyboardRootProps extends DailyboardEntity {
    data: StoredDailyboardRoot;
    layout: StoredLayoutRoot;
}

export interface DailyboardCardContainerProps {
    cards: StoredDailyboardCard[];
}

export interface DailyboardCardProps extends DailyboardCardEntity {
    data: StoredDailyboardCard;
}