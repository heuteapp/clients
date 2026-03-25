import { WorkspaceBoardConfig } from "../types/workspace-board.types";
import { getCategoryDepth } from "./getCategoryDepth";
import { parseBoardPath } from "./parseBoardPath";
import { validateCategoryDepth } from "./validateCategoryDepth";

/**
 * Checks if a board path is valid based on configuration
 */
export function isValidBoardPath(
    pathname: string,
    config: WorkspaceBoardConfig = {}
): boolean {
    const { categories } = parseBoardPath(pathname);
    const depth = getCategoryDepth(categories);
    const { isValid } = validateCategoryDepth(depth, config);
    return isValid;
}