/**
 * Builds a category path string from categories array
 */
export function buildCategoryPath(categories: string[]): string {
    return categories.join('/');
}