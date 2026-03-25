export interface WorkspaceBoardConfig {
    minDepth: number;
    maxDepth: number;
}

export interface WorkspaceBoardReturn {
    categories: string[];
    categoryDepth: number;
    categoryPath: string;
}