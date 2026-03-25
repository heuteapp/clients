/**
 * Builds a category path string from categories array
 */
export function getCategoryPath(categories: string[]): string {
    return categories.join('/');
}