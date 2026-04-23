import { BoardCardContent, BoardCardPlacement } from "@/src/modules/d-board/types/board.types";
import { GridSpan } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

//

export type DraftCardInput =
  | DraftCardCreatingPlacingRequestInput;

export type DraftCardCreatingPlacingRequestInput = { size: GridSpan, content: BoardCardContent };

//

export type CardCreatePlaceInput = { size: GridSpan; content: BoardCardContent; };

export type CardCreatePlacePayload = { categoryPath: string; date: YYMMDDDate; placement: BoardCardPlacement };