/**
 * Generic YYMMDD date format interface.
 * Represents a date in YYMMDD format (e.g., 260325 = March 25, 2026).
 * This format is commonly used in URLs and compact date representations.
 */
export interface YYMMDDDate {
    /**
     * Raw date in YYMMDD format (6-digit string).
     * @example "260325" for March 25, 2026
     */
    raw: string;

    /**
     * ISO 8601 formatted date string (YYYY-MM-DD).
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

/**
 * Type guard to check if an object is a valid YYMMDDDate
 */
export function isYYMMDDDate(obj: unknown): obj is YYMMDDDate {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'raw' in obj &&
        'iso' in obj &&
        'display' in obj &&
        'year' in obj &&
        'month' in obj &&
        'day' in obj
    );
}