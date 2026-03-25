import { BoardPath } from "@/src/modules/shared/types/board.types";
import { parseYYMMDD } from "./date.utils";

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
 */
export function buildBoardPath(categories: string[], date?: string | null): string {
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