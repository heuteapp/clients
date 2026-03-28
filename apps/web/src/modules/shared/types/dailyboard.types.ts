import { YYMMDDDate } from "./date.types";

export interface DailyboardPathConfig {
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

export interface DailyboardPath {
    /**
     * Array of category strings extracted from the dailyboard path.
     * 
     * @example
     * // For the path "school/grade2/math/250315"
     * categories: ["school", "grade2", "math"]
     */
    categories: string[];

    /**
     * Optional date extracted from the dailyboard path.
     * If the last segment of the path is a valid YYMMDD date, it will be parsed and included here.
     * Otherwise, this will be null.
     */
    date: YYMMDDDate | null;
}

/**
 * Validation result for dailyboard path validation.
 */
export interface DailyboardPathValidationResult {
    /**
     * Indicates whether the dailyboard path is valid according to the provided configuration.
     */
    isValid: boolean;

    /**
     * Optional array of error messages if the path is invalid.
     */
    errors?: string[];
}