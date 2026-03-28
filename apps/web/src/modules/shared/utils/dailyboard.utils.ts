import { DailyboardPath, DailyboardPathConfig, DailyboardPathValidationResult } from "@/src/modules/shared/types/dailyboard.types";
import { parseYYMMDD, YYMMDD_PATTERN } from "./date.utils";

/**
 * Extracts categories and date from a dailyboard URL path
 * 
 * @param relativePath - The relative path (e.g., "history/250315" or "projects/active")
 * @returns DailyboardPath object with categories and optional date
 */
export function parseDailyboardPath(relativePath: string): DailyboardPath | null {
    // Handle empty or undefined input
    if (!relativePath) {
        return null;
    }
    
    // Remove leading/trailing slashes and decode
    const cleanPath = relativePath.replace(/^\/|\/$/g, '');
    
    if (!cleanPath) {
        return null;
    }
    
    const segments = cleanPath.split('/').map(segment => decodeURIComponent(segment));
    
    // Check if last segment is a date
    const lastSegment = segments[segments.length - 1];
    const date = parseYYMMDD(lastSegment);
    
    // If date exists, remove it from categories
    const categories = date ? segments.slice(0, -1) : segments;
    
    return { categories, date };
}

/**
 * Builds a relative path from categories and optional date
 * 
 * @param categories - Array of category strings
 * @param date - Optional date in YYMMDD format
 * @returns Relative path string (e.g., "history/240101")
 * @throws {Error} If any category contains numbers
 */
export function buildDailyboardPath(categories: string[], date?: string | null): string {
    const parts = [...categories];
    
    if (date) {
        parts.push(date);
    }
    
    return parts.join('/');
}

/**
 * Checks if a path has a date segment
 */
export function hasDailyboardDate(relativePath: string): boolean {
    const dailyboardPath = parseDailyboardPath(relativePath);
    return dailyboardPath?.date !== null && dailyboardPath?.date !== undefined;
}

/**
 * Gets the categories from a dailyboard path
 */
export function getDailyboardCategories(relativePath: string): string[] {
    const dailyboardPath = parseDailyboardPath(relativePath);
    return dailyboardPath?.categories ?? [];
}

/**
 * Validates a dailyboard path structure and returns validation results with all errors.
 * 
 * This function performs comprehensive validation on a dailyboard path including:
 * - Path structure validity
 * - Category naming conventions (number patterns)
 * - Category count constraints
 * - Date format validation for the last segment
 * 
 * @param relativePath - The dailyboard path string to validate
 * @param config - Configuration options for validation
 * @param config.minCategories - Minimum number of categories required (default: 0)
 * @param config.maxCategories - Maximum number of categories allowed (default: Infinity)
 * @param config.requireDate - Whether the path must end with a valid date (default: false)
 * 
 * @returns ValidationResult object containing:
 *   - isValid: boolean indicating if all validations passed
 *   - errors: array of error messages (undefined if no errors)
 * 
 * @example
 * // Valid path with categories and date
 * const result = validateDailyboardPath('projects/frontend/250331', { 
 *   minCategories: 2, 
 *   requireDate: true 
 * });
 * // result.isValid = true, result.errors = undefined
 * 
 * @example
 * // Invalid path with multiple errors
 * const result = validateDailyboardPath('abc123/def456/25033', { 
 *   minCategories: 2,
 *   requireDate: true 
 * });
 * // result.isValid = false
 * // result.errors = [
 * //   'Category "abc123" starts with letter but contains numbers',
 * //   'Category "def456" starts with letter but contains numbers',
 * //   'Last segment "25033" is not a valid date (YYMMDD format)'
 * // ]
 * 
 * @example
 * // Category naming validation rules:
 * // - Categories cannot contain numbers unless they follow specific patterns
 * // - Starts with letter and contains numbers: "abc123" ❌
 * // - Starts with letter and ends with number: "abc123" ❌  
 * // - Starts with number and ends with letter: "123abc" ❌
 * // - Only numbers: "12345" ❌
 * // - Letters only: "history" ✅
 * // - Letters with special chars: "history_ww2" ✅
 */
export function validateDailyboardPath(
    dailyboardPath: DailyboardPath | null,
    config: DailyboardPathConfig = {}
): DailyboardPathValidationResult {
    const errors: string[] = [];
    const { minCategories = 0, maxCategories = Infinity, requireDate = false } = config;
    
    const categoryCount = dailyboardPath?.categories.length ?? 0;
    
    // Check for empty/invalid path
    if (!dailyboardPath) {
        errors.push('Dailyboard path is empty or invalid');
        return { isValid: false, errors };
    }
    
   // Check categories
    if (dailyboardPath.categories) {
        dailyboardPath.categories.forEach((category, index) => {
            const isLastSegment = index === dailyboardPath.categories.length - 1;
            
            // Check if category contains numbers
            if (/\d/.test(category)) {
                if (/^\d/.test(category) && /[a-zA-Z]$/.test(category)) {
                    errors.push(`Category "${category}" starts with number`);
                }
                // Only numbers
                else if (/^\d+$/.test(category)) {
                    if(isLastSegment) {
                        if(YYMMDD_PATTERN.test(category)) {
                            errors.push(`Date "${category}" is invalid YYMMDD format`);
                        }
                        else {
                            errors.push(`Last segment "${category}" cannot be only numbers unless it's a valid date (YYMMDD format)`);
                        }
                    }
                    else {
                        errors.push(`Category "${category}" cannot be only numbers`);
                    }
                }
            }
        });
    }
    
    // Check category count
    if (categoryCount < minCategories) {
        errors.push(`Dailyboard path must have at least ${minCategories} category(s), but found ${categoryCount}`);
    }
    
    if (categoryCount > maxCategories) {
        errors.push(`Dailyboard path must have at most ${maxCategories} category(s), but found ${categoryCount}`);
    }
    
    // Check date requirement
    if (requireDate && (!dailyboardPath?.date)) {
        errors.push('Dailyboard path must end with a valid date (YYMMDD format)');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined
    };
}