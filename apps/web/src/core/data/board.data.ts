import { BoardCardData, BoardData } from "@/src/types/core/domain/board/board.data";
import { DataContent } from "../../types/shared/core/data";
import { createDataIdentifier } from "../utils/shared/data";

export function createBoardData(content: DataContent<BoardData>): BoardData {
    return {
        id: createDataIdentifier(),
        ...content,
    };
}

export function createBoardCardData(content: DataContent<BoardCardData>): BoardCardData {
    return {
        id: createDataIdentifier(),
        ...content,
    };
}