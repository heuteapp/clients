import { BoardSessionValue, BoardSessionUpdater } from "@/src/core/types/domain/board/board.session";

export type BoardSessionManager = React.RefObject<BoardSessionValue> &{
    updater: BoardSessionUpdater;
}