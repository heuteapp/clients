import { BoardSessionState, BoardSessionUpdater } from "@/src/core/types/domain/board/board.session";

export interface BoardSession {
    ref: React.RefObject<BoardSessionState>;
    updater: BoardSessionUpdater;
}