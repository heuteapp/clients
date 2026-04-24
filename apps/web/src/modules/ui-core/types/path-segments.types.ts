export interface PathSegmentsConfig {
    startsWith?: string;
    exclude?: string[];
    transform?: (segment: string, index: number) => string;
    maxDepth?: number;
}

export interface PathSegmentsResult {
    segments: string[];
    current: string;
    path: string;
    fullPath: string;
    depth: number;
    isRoot: boolean;
}