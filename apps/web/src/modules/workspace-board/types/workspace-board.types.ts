import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

/**
 * Configuration options for the workspace board hook.
 * Controls the validation rules for category depth in the board structure.
 */
export interface WorkspaceBoardConfig {
    /**
     * Minimum allowed category depth.
     * @default 1
     * @example If minDepth = 2, a path like "/workspace/board/history" would be invalid
     */
    minDepth?: number;

    /**
     * Maximum allowed category depth.
     * @default 5
     * @example If maxDepth = 2, a path like "/workspace/board/school/grade2/math" would be invalid
     */
    maxDepth?: number;
}

/**
 * Return value of the useWorkspaceBoard hook.
 * Provides access to category and date information from the current board URL.
 */
export interface WorkspaceBoardMetadata extends WorkspaceBoardData {

    /**
     * Number of category segments in the current path.
     * 
     * @example
     * // URL: /workspace/board/history
     * categoryDepth = 1
     * 
     * @example
     * // URL: /workspace/board/school/grade2/math
     * categoryDepth = 3
     */
    categoryDepth: number;

    /**
     * Full category path as a single string, joined with " / ".
     * Useful for display purposes.
     * 
     * @example
     * // URL: /workspace/board/history
     * categoryPath = "history"
     * 
     * @example
     * // URL: /workspace/board/school/grade2/math
     * categoryPath = "school/grade2/math"
     */
    categoryPath: string;
}

/**
 * Core data structure representing the parsed information from the workspace board URL.
 */
export interface WorkspaceBoardData {
    /**
     * Array of category segments extracted from the URL path.
     * Categories are URL-decoded automatically.
     * 
     * @example
     * // URL: /workspace/board/history
     * categories = ["history"]
     * 
     * @example
     * // URL: /workspace/board/school/grade2/math
     * categories = ["school", "grade2", "math"]
     */
    categories: string[];

    /**
     * Date information extracted from the URL.
     * Returns null if the last segment is not a valid date (YYMMDD format).
     * 
     * @example
     * // URL: /workspace/board/history/250315
     * date = { raw: "250315", iso: "2025-03-15", display: "March 15, 2025", ... }
     * 
     * @example
     * // URL: /workspace/board/history (no date)
     * date = null
     */
    date: YYMMDDDate | null;
}