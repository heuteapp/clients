import { DailyboardCardContent, DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.model.types";
import { GridSpan } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

//

export type DraftCardInput =
  | DraftCardCreatingPlacingRequestInput;

export type DraftCardCreatingPlacingRequestInput = { size: GridSpan, content: DailyboardCardContent };

//

export type CardCreatePlaceInput = { size: GridSpan; content: DailyboardCardContent; };

export type CardCreatePlacePayload = { categoryPath: string; date: YYMMDDDate; placement: DailyboardCardPlacement };