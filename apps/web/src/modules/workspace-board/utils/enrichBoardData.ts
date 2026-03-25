import { WorkspaceBoardData, WorkspaceBoardMetadata } from "../types/workspace-board.types";
import { getCategoryDepth } from "./getCategoryDepth";
import { getCategoryPath } from "./getCategoryPath";

/**
 * Transforms raw board data into enriched metadata
 */
export function enrichBoardData(data: WorkspaceBoardData): WorkspaceBoardMetadata {
    const categories = data.categories;
    const categoryDepth = getCategoryDepth(categories);
    const categoryPath = getCategoryPath(categories);
    
    return {
        ...data,
        categoryDepth,
        categoryPath,
    };
}