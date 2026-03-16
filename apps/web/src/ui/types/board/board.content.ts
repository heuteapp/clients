import { BoardContentActions, BoardContentValue } from "@/src/core/types/domain/board/board.content";

export type BoardContentManager = React.RefObject<BoardContentValue & BoardContentActions | null>