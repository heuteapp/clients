import { WorkspaceBoardDate } from "../types/workspace-board.types";
import { DATE_PATTERN, isValidYYMMDD } from "./isValidYYMMDD";

/**
 * Parses a YYMMDD string into a WorkspaceBoardDate object
 */
export function parseYYMMDD(dateStr: string): WorkspaceBoardDate | null {
    if (!isValidYYMMDD(dateStr)) {
        return null;
    }

    const [, year, month, day] = dateStr.match(DATE_PATTERN) || [];
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
 * Converts a WorkspaceBoardDate object to YYMMDD string format
 */
export function toYYMMDD(date: WorkspaceBoardDate): string | null {
    if (!date || !date.year || !date.month || !date.day) {
        return null;
    }

    const year = parseInt(date.year, 10);
    const shortYear = year % 100;
    const month = date.month.padStart(2, '0');
    const day = date.day.padStart(2, '0');

    return `${shortYear.toString().padStart(2, '0')}${month}${day}`;
}

/**
 * Converts a Date object to YYMMDD string format
 */
export function dateToYYMMDD(date: Date): string | null {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return null;
    }

    const year = date.getFullYear() % 100;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year.toString().padStart(2, '0')}${month}${day}`;
}

/**
 * Converts ISO date string (YYYY-MM-DD) to YYMMDD format
 */
export function isoToYYMMDD(isoDate: string): string | null {
    if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
        return null;
    }

    const [, year, month, day] = isoDate.match(/(\d{4})-(\d{2})-(\d{2})/) || [];
    if (!year || !month || !day) {
        return null;
    }

    const shortYear = parseInt(year, 10) % 100;
    
    return `${shortYear.toString().padStart(2, '0')}${month}${day}`;
}