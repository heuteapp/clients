import { YYMMDDDate } from "@/src/modules/shared/types/date.types";
import { DailyboardPathConfig, DailyboardPathValidationResult } from "../../shared/types/dailyboard.types";

/**
 * Configuration options for the useWorkspaceDailyboard hook, allowing customization of how the dailyboard path is parsed and validated.
 */
export interface WorkspaceDailyboardConfig {
    /**
     * Configuration for validating and parsing the dailyboard path.
     */
    path?: DailyboardPathConfig;
}

/**
 * Return value of the useWorkspaceDailyboard hook.
 * Provides access to category and date information from the current dailyboard URL.
 */
export interface WorkspaceDailyboardMetadata extends WorkspaceDailyboardData, DailyboardPathValidationResult {

    /**
     * Number of category segments in the current path.
     * 
     * @example
     * // URL: /workspace/dailyboard/history
     * categoryDepth = 1
     * 
     * @example
     * // URL: /workspace/dailyboard/school/grade2/math
     * categoryDepth = 3
     */
    categoryDepth: number;

    /**
     * Full category path as a single string, joined with " / ".
     * Useful for display purposes.
     * 
     * @example
     * // URL: /workspace/dailyboard/history
     * categoryPath = "history"
     * 
     * @example
     * // URL: /workspace/dailyboard/school/grade2/math
     * categoryPath = "school/grade2/math"
     */
    categoryPath: string;


    /**
     * Boolean indicating whether the date segment (if present) represents today's date.
     */
    isDateToday: boolean;
}

/**
 * Core data structure representing the parsed information from the workspace dailyboard URL.
 */
export interface WorkspaceDailyboardData {
    /**
     * Array of category segments extracted from the URL path.
     * Categories are URL-decoded automatically.
     * 
     * @example
     * // URL: /workspace/dailyboard/history
     * categories = ["history"]
     * 
     * @example
     * // URL: /workspace/dailyboard/school/grade2/math
     * categories = ["school", "grade2", "math"]
     */
    categories: string[];

    /**
     * Date information extracted from the URL.
     * Returns null if the last segment is not a valid date (YYMMDD format).
     * 
     * @example
     * // URL: /workspace/dailyboard/history/250315
     * date = { raw: "250315", iso: "2025-03-15", display: "March 15, 2025", ... }
     * 
     * @example
     * // URL: /workspace/dailyboard/history (no date)
     * date = null
     */
    date: YYMMDDDate | null;
}