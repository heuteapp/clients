import { DailyboardCardMaterial } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridSize } from "@/src/modules/shared/types/common";

//

export type DraftCardInput =
  | DraftCardCreatingPlacingRequestInput;

export type DraftCardCreatingPlacingRequestInput = { size: GridSize, content: DailyboardCardMaterial };

//

export type CardCreatePlaceInput = {  
    size: GridSize 
    content: DailyboardCardMaterial; 
};