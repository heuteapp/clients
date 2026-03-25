import { BoardCardEntity, BoardEntity } from "@/src/ui-board/types/board.entity";
import { DataContent } from "@/src/types/shared/core/data";
import { createDataIdentifier } from "@/src/core/utils/shared/data";

export function createBoardData(content: DataContent<BoardEntity>): BoardEntity {
    return {
        id: createDataIdentifier(),
        ...content,
    };
}

export function createBoardCardData(content: DataContent<BoardCardEntity>): BoardCardEntity {
    return {
        id: createDataIdentifier(),
        ...content,
    };
}