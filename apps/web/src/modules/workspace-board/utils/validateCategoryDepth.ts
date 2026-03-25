import { WorkspaceBoardConfig } from "../types/workspace-board.types";

/**
 * Validates category depth against configuration
 */
export function validateCategoryDepth(
    depth: number,
    config: WorkspaceBoardConfig = {}
): { isValid: boolean; error?: string } {
    const { minDepth = 1, maxDepth = 3 } = config;
    
    if (depth < minDepth) {
        return {
            isValid: false,
            error: `Category depth ${depth} is below minimum required depth of ${minDepth}`,
        };
    }
    
    if (depth > maxDepth) {
        return {
            isValid: false,
            error: `Category depth ${depth} exceeds maximum allowed depth of ${maxDepth}`,
        };
    }
    
    return { isValid: true };
}