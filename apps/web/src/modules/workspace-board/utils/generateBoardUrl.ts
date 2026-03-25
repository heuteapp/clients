import { WorkspaceBoardDate } from "../types/workspace-board.types";

/**
 * Generates a board URL from categories and optional date
 */
export function generateBoardUrl(
    categories: string[],
    date?: WorkspaceBoardDate | string,
    basePath: string = '/workspace/board'
): string {
    const encodedCategories = categories.map(category => encodeURIComponent(category));
    let path = [basePath, ...encodedCategories].join('/');
    
    if (date) {
        const dateStr = typeof date === 'string' ? date : date.raw;
        path = `${path}/${dateStr}`;
    }
    
    return path;
}