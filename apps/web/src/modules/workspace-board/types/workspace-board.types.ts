import { YYMMDDDate } from "@/src/modules/shared/types/date.types";
import { BoardPathConfig, BoardPathValidationResult } from "../../shared/types/board.types";

/**
 * Configuration options for the useWorkspaceBoard hook, allowing customization of how the board path is parsed and validated.
 */
export interface WorkspaceBoardConfig {
    /**
     * Configuration for validating and parsing the board path.
     */
    path?: BoardPathConfig;
}

/**
 * Return value of the useWorkspaceBoard hook.
 * Provides access to category and date information from the current board URL.
 */
export interface WorkspaceBoardMetadata extends WorkspaceBoardData, BoardPathValidationResult {

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