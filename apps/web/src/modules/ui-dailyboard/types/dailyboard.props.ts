import { DailyboardEntity, DailyboardCardEntity } from "@/src/modules/ui-dailyboard/types/dailyboard.entity";

export interface DailyboardRootProps extends DailyboardEntity {

}

export interface DailyboardCardContainerProps {
    cards: DailyboardCardEntity[];
}

export interface DailyboardCardProps extends DailyboardCardEntity {
    
}