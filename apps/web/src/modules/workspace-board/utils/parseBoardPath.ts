import { WorkspaceBoardData } from "../types/workspace-board.types";
import { isValidYYMMDD } from "./isValidYYMMDD";
import { parseYYMMDD } from "./parseYYMMDD";

/**
 * Extracts categories and date from a board URL path
 * 
 * @param pathname - The URL pathname (e.g., "/workspace/board/history/250315")
 * @returns WorkspaceBoardData object with categories and optional date
 */
export function parseBoardPath(pathname: string): WorkspaceBoardData {
    // Remove base path "/workspace/board/"
    const basePath = '/workspace/board/';
    let relativePath = pathname;
    
    if (relativePath.startsWith(basePath)) {
        relativePath = relativePath.slice(basePath.length);
    }
    
    // Remove trailing slash
    relativePath = relativePath.replace(/\/$/, '');
    
    if (!relativePath) {
        return { categories: [], date: null };
    }
    
    const segments = relativePath.split('/').map(segment => decodeURIComponent(segment));
    
    // Check if last segment is a date
    const lastSegment = segments[segments.length - 1];
    const date = isValidYYMMDD(lastSegment) ? parseYYMMDD(lastSegment) : null;
    
    // If date exists, remove it from categories
    const categories = date ? segments.slice(0, -1) : segments;
    
    return { categories, date };
}