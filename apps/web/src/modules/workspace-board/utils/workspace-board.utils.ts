import { WorkspaceBoardDate } from "../types/workspace-board.types";

/**
 * Parses a date string in the format "YYMMDD" and returns a WorkspaceBoardDate object.
 * If the input string is not a valid date in the expected format, returns null.
 */
export const parseDate = (dateStr: string): WorkspaceBoardDate | null => {
    // Check if the string is exactly 6 digits
    if (!/^\d{6}$/.test(dateStr)) {
        return null;
    }

    const year = parseInt(dateStr.substring(0, 2), 10);
    const month = parseInt(dateStr.substring(2, 4), 10);
    const day = parseInt(dateStr.substring(4, 6), 10);

    // Validate date ranges
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return null;
    }

    // Convert 2-digit year to 4-digit (assuming 2000s)
    const fullYear = 2000 + year;
    
    // Validate if it's a real date
    const date = new Date(fullYear, month - 1, day);
    if (date.getFullYear() !== fullYear || 
        date.getMonth() !== month - 1 || 
        date.getDate() !== day) {
        return null;
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    
    return {
        raw: dateStr,
        iso: `${fullYear}-${pad(month)}-${pad(day)}`,
        display: date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        year: fullYear.toString(),
        month: pad(month),
        day: pad(day),
    };
};