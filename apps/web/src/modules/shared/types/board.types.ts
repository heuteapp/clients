import { YYMMDDDate } from "./date.types";

export interface BoardPathConfig {
    /**
     * Minimum number of required categories.
     * The path must have at least this many categories to be valid.
     * 
     * @default 0
     */
    minCategories?: number;
    
    /**
     * Maximum number of allowed categories.
     * The path cannot have more than this many categories.
     * 
     * @default Infinity
     */
    maxCategories?: number;
    
    /**
     * Whether a date is required at the end of the path.
     * If true, the last segment must be a valid YYMMDD date.
     * 
     * @default false
     */
    requireDate?: boolean;
}

export interface BoardPath {
    /**
     * Array of category strings extracted from the board path.
     * 
     * @example
     * // For the path "school/grade2/history/250315"
     * categories: ["school", "grade2", "history"]
     */
    categories: string[];

    /**
     * Optional date extracted from the board path.
     * If the last segment of the path is a valid YYMMDD date, it will be parsed and included here.
     * Otherwise, this will be null.
     */
    date: YYMMDDDate | null;
}