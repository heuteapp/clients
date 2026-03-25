/**
 * Regular expression for validating YYMMDD date format
 * Matches 6-digit numbers where:
 * - YY: 00-99 (years 2000-2099)
 * - MM: 01-12 (months)
 * - DD: 01-31 (days)
 */
export const DATE_PATTERN = /^(\d{2})(\d{2})(\d{2})$/;

/**
 * Checks if a string is a valid date in YYMMDD format
 */
export function isValidYYMMDD(dateStr: string): boolean {
    if (!DATE_PATTERN.test(dateStr)) {
        return false;
    }

    const [, year, month, day] = dateStr.match(DATE_PATTERN) || [];
    if (!year || !month || !day) {
        return false;
    }

    // Validate actual date
    const fullYear = 2000 + parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    const date = new Date(fullYear, monthNum - 1, dayNum);
    return date.getFullYear() === fullYear &&
           date.getMonth() === monthNum - 1 &&
           date.getDate() === dayNum;
}