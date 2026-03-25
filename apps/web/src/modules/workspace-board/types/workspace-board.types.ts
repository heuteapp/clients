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
     * @example If maxDepth = 2, a path like "/workspace/board/school/grade2/history" would be invalid
     */
    maxDepth?: number;
}

/**
 * Date information extracted from the board URL.
 * Supports YYMMDD format (e.g., 260325 = March 25, 2026).
 */
export interface WorkspaceBoardDate {
    /**
     * Raw date in YYMMDD format (6-digit string).
     * @example "260325" for March 25, 2026
     */
    raw: string;

    /**
     * ISO 8601 formatted date string.
     * @example "2026-03-25"
     */
    iso: string;

    /**
     * Human-readable date format with full month name.
     * @example "March 25, 2026"
     */
    display: string;

    /**
     * 4-digit year component.
     * @example "2026"
     */
    year: string;

    /**
     * 2-digit month component (01-12).
     * @example "03"
     */
    month: string;

    /**
     * 2-digit day component (01-31).
     * @example "25"
     */
    day: string;
}

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
     * // URL: /workspace/board/school/grade2/history
     * categories = ["school", "grade2", "history"]
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
    date: WorkspaceBoardDate | null;
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
     * // URL: /workspace/board/school/grade2/history
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
     * // URL: /workspace/board/school/grade2/history
     * categoryPath = "school/grade2/history"
     */
    categoryPath: string;
}