import { DailyboardCardMaterial } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridSize } from "@/src/modules/shared/types/common";

export type CardCreatePlaceInput = {  
    content: DailyboardCardMaterial; 
    cardSize: GridSize 
};