import { DailyboardEntity, DailyboardCardEntity } from "@/src/modules/ui-dailyboard/types/dailyboard.entity";
import { StoredDailyboardCard, StoredDailyboardRoot } from "@/src/heute-store/types/dailyboard.types";

export interface DailyboardRootProps extends DailyboardEntity {
    data: StoredDailyboardRoot;
}

export interface DailyboardCardContainerProps {
    cards: StoredDailyboardCard[];
}

export interface DailyboardCardProps extends DailyboardCardEntity {
    data: StoredDailyboardCard;
}

//

export interface DailyboardProviderProps {
    source: StoredDailyboardRoot | null;
    children: React.ReactNode;
}