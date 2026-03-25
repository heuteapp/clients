import { BoardPath, BoardPathConfig } from "@/src/modules/shared/types/board.types";
import { parseYYMMDD } from "./date.utils";

/**
 * Validates that a category doesn't contain numbers
 * @throws {Error} If category contains numbers
 */
function validateCategory(category: string): void {
    if (/\d/.test(category)) {
        throw new Error(`Category "${category}" cannot contain numbers`);
    }
}

/**
 * Extracts categories and date from a board URL path
 * 
 * @param relativePath - The relative path (e.g., "history/250315" or "projects/active")
 * @returns BoardPath object with categories and optional date
 */
export function parseBoardPath(relativePath: string): BoardPath | null {
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
export function buildBoardPath(categories: string[], date?: string | null): string {
    // Validate each category doesn't contain numbers
    for (const category of categories) {
        validateCategory(category);
    }
    
    const parts = [...categories];
    
    if (date) {
        parts.push(date);
    }
    
    return parts.join('/');
}

/**
 * Checks if a path has a date segment
 */
export function hasBoardDate(relativePath: string): boolean {
    const boardPath = parseBoardPath(relativePath);
    return boardPath?.date !== null && boardPath?.date !== undefined;
}

/**
 * Gets the categories from a board path
 */
export function getBoardCategories(relativePath: string): string[] {
    const boardPath = parseBoardPath(relativePath);
    return boardPath?.categories ?? [];
}

/**
 * Validates a board path against the provided configuration
 * 
 * @param relativePath - The relative path to validate
 * @param config - Configuration options for validation
 * @returns True if the path is valid according to the config, false otherwise
 * 
 * @example
 * // Check if path has at least 1 category
 * isValidBoardPath("history/ww2", { minCategories: 1 }) // true
 * isValidBoardPath("", { minCategories: 1 }) // false
 * 
 * // Check if path has at most 2 categories
 * isValidBoardPath("school/grade2/history", { maxCategories: 2 }) // false
 * 
 * // Check if path has a date
 * isValidBoardPath("history/250315", { requireDate: true }) // true
 * isValidBoardPath("history", { requireDate: true }) // false
 * 
 * // Check if categories contain numbers
 * isValidBoardPath("history/ww2") // true (ww2 is valid as it's not a category)
 * isValidBoardPath("history/2024/events") // false (2024 contains numbers)
 */
export function isValidBoardPath(
    relativePath: string, 
    config: BoardPathConfig = {}
): boolean {
    const {
        minCategories = 0,
        maxCategories = Infinity,
        requireDate = false,
    } = config;
    
    const boardPath = parseBoardPath(relativePath);
    
    if (!boardPath) {
        return minCategories === 0 && !requireDate;
    }
    
    const { categories, date } = boardPath;
    const categoryCount = categories.length;
    
    if (categoryCount < minCategories) return false;
    if (categoryCount > maxCategories) return false;
    
    if (categories.some(cat => /\d/.test(cat))) return false;
    if (requireDate && !date) return false;
    
    return true;
}

/**
 * Validates a board path and throws an error if invalid
 * 
 * @param relativePath - The relative path to validate
 * @param config - Configuration options for validation
 * @throws {Error} If the path is invalid
 */
export function validateBoardPath(
    relativePath: string, 
    config: BoardPathConfig = {}
): void {
    if (!isValidBoardPath(relativePath, config)) {
        const { minCategories = 0, maxCategories = Infinity, requireDate = false } = config;
        
        const boardPath = parseBoardPath(relativePath);
        const categoryCount = boardPath?.categories.length ?? 0;
        
        let errorMessage = 'Invalid board path';
        
        // Check for categories with numbers
        if (boardPath?.categories) {
            const invalidCategory = boardPath.categories.find(cat => /\d/.test(cat));
            if (invalidCategory) {
                errorMessage = `Category "${invalidCategory}" cannot contain numbers`;
            } else if (categoryCount < minCategories) {
                errorMessage = `Board path must have at least ${minCategories} category(s), but found ${categoryCount}`;
            } else if (categoryCount > maxCategories) {
                errorMessage = `Board path must have at most ${maxCategories} category(s), but found ${categoryCount}`;
            } else if (requireDate && (!boardPath?.date)) {
                errorMessage = `Board path must end with a valid date (YYMMDD format)`;
            } else if (!boardPath) {
                errorMessage = `Board path is empty or invalid`;
            }
        } else if (categoryCount < minCategories) {
            errorMessage = `Board path must have at least ${minCategories} category(s), but found ${categoryCount}`;
        } else if (requireDate && (!boardPath?.date)) {
            errorMessage = `Board path must end with a valid date (YYMMDD format)`;
        } else if (!boardPath) {
            errorMessage = `Board path is empty or invalid`;
        }
        
        throw new Error(errorMessage);
    }
}