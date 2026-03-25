// src/modules/shared/utils/date.utils.ts

import { YYMMDDDate } from '../types/date.types';

/**
 * Regular expression for validating YYMMDD format.
 * Matches 6-digit numbers where:
 * - YY: 00-99 (years 2000-2099)
 * - MM: 01-12 (months)
 * - DD: 01-31 (days)
 */
const YYMMDD_PATTERN = /^(\d{2})(\d{2})(\d{2})$/;

/**
 * Regular expression for ISO date format (YYYY-MM-DD)
 */
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Checks if a string is a valid date in YYMMDD format.
 * Validates both format and actual date existence.
 * 
 * @param dateStr - String to validate (e.g., "260325")
 * @returns True if the string is a valid YYMMDD date
 * 
 * @example
 * isValidYYMMDD("260325") // true (March 25, 2026)
 * isValidYYMMDD("250231") // false (invalid day)
 * isValidYYMMDD("991231") // true (December 31, 1999)
 */
export function isValidYYMMDD(dateStr: string): boolean {
    if (!YYMMDD_PATTERN.test(dateStr)) {
        return false;
    }

    const [, year, month, day] = dateStr.match(YYMMDD_PATTERN) || [];
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

/**
 * Parses a YYMMDD string into a YYMMDDDate object.
 * 
 * @param dateStr - Date string in YYMMDD format (e.g., "260325")
 * @returns YYMMDDDate object or null if invalid
 * 
 * @example
 * parseYYMMDD("260325")
 * // Returns: {
 * //   raw: "260325",
 * //   iso: "2026-03-25",
 * //   display: "March 25, 2026",
 * //   year: "2026",
 * //   month: "03",
 * //   day: "25"
 * // }
 */
export function parseYYMMDD(dateStr: string): YYMMDDDate | null {
    if (!isValidYYMMDD(dateStr)) {
        return null;
    }

    const [, year, month, day] = dateStr.match(YYMMDD_PATTERN) || [];
    if (!year || !month || !day) {
        return null;
    }

    const fullYear = 2000 + parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    const date = new Date(fullYear, monthNum - 1, dayNum);
    const iso = date.toISOString().split('T')[0];
    
    // Format display date
    const display = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return {
        raw: dateStr,
        iso,
        display,
        year: fullYear.toString(),
        month: month.padStart(2, '0'),
        day: day.padStart(2, '0'),
    };
}

/**
 * Converts a JavaScript Date object to YYMMDD string format.
 * 
 * @param date - Date object
 * @returns YYMMDD string or null if invalid
 * 
 * @example
 * dateToYYMMDDStr(new Date(2026, 2, 25)) // "260325"
 */
export function dateToYYMMDDStr(date: Date): string | null {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return null;
    }

    const year = date.getFullYear() % 100;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year.toString().padStart(2, '0')}${month}${day}`;
}

/**
 * Converts an ISO date string (YYYY-MM-DD) to YYMMDD format.
 * 
 * @param isoDate - ISO date string (e.g., "2026-03-25")
 * @returns YYMMDD string or null if invalid
 * 
 * @example
 * isoToYYMMDDStr("2026-03-25") // "260325"
 */
export function isoToYYMMDDStr(isoDate: string): string | null {
    if (!isoDate || !ISO_DATE_PATTERN.test(isoDate)) {
        return null;
    }

    const [, year, month, day] = isoDate.match(/(\d{4})-(\d{2})-(\d{2})/) || [];
    if (!year || !month || !day) {
        return null;
    }

    const shortYear = parseInt(year, 10) % 100;
    
    return `${shortYear.toString().padStart(2, '0')}${month}${day}`;
}