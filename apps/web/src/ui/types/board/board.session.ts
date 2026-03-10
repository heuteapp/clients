import { BoardSessionState, BoardSessionUpdater } from "@/src/core/types/domain/board/board.session";

export type BoardSession = React.RefObject<BoardSessionState> &{
    updater: BoardSessionUpdater;
}