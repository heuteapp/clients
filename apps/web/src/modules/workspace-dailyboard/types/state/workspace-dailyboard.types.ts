import { DailyboardCardMaterial, DailyboardCardPlacement } from "@/src/modules/dailyboard/types/dailyboard.data.types";
import { GridSpan } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

//

export type DraftCardInput =
  | DraftCardCreatingPlacingRequestInput;

export type DraftCardCreatingPlacingRequestInput = { size: GridSpan, content: DailyboardCardMaterial };

//

export type CardCreatePlaceInput = { size: GridSpan; content: DailyboardCardMaterial; };

export type CardCreatePlacePayload = { categoryPath: string; date: YYMMDDDate; placement: DailyboardCardPlacement };