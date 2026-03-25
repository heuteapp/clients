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