
/**
 * Configuration options for the workspace board. These options determine how the board is rendered based on the category structure of the workspace.
 */
export interface WorkspaceBoardConfig {
    /**
     * Minimum category depth to consider for board rendering. Categories with depth less than this value will be ignored.
     */
    minDepth: number;

    /**
     * Maximum category depth to consider for board rendering. Categories with depth greater than this value will be ignored.
     */
    maxDepth: number;
}

export interface WorkspaceBoardReturn {
    categories: string[];
    categoryDepth: number;
    categoryPath: string;

    date: WorkspaceBoardDate | null;
}

export interface WorkspaceBoardDate {
    /**
     * YYMMDD format, e.g. "260325"
     */
    raw: string;

    /**
     * ISO 8601 format, e.g. "2026-03-25"
     */
    iso: string;

    /**
     * Human-readable format, e.g. "March 25, 2026"
     */
    display: string;

    /**
     * Year component, e.g. "2026"
     */
    year: string;

    /**
     * Month component, e.g. "03"
     */
    month: string;

    /**
     * Day component, e.g. "25"
     */
    day: string;
}